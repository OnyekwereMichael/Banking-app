"use server"
import { cookies } from "next/headers";
import { createSessionClient, createAdminClient } from "../appwrite";
import { ID } from "node-appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { plaidClient } from "../plaid";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { addFundingSource, createDwollaCustomer } from "./dwolla.server";
import { revalidatePath } from "next/cache";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

 export const SignUp  = async (newUsers:SignUpParams) => {
   const {email, password, fname, lname} = newUsers
   let newUserAccount;
  try {
   const { account, database } = await createAdminClient();

  //  const newUserAcc = await account.create(ID.unique(),
  //   email,
  //   password,
  //  `${fname} ${lname}`);
  //  const session = await account.createEmailPasswordSession(email, password);
 
  //  cookies().set("appwrite-session", session.secret, {
  //     path: "/",
  //     httpOnly: true,
  //     sameSite: "strict",
  //     secure: true,
  //   });  
    
  //   return parseStringify(newUserAcc)

  // Creates a new user account using a unique ID, the user’s email, password, and full name. hence creates a basic account in the Appwrite service.

  newUserAccount = await account.create(ID.unique(),
    email,
    password,
   `${fname} ${lname}`);

  //  this ensures that user stays logged in after signup
   const session = await account.createEmailPasswordSession(email, password);

    //  checks if the newUserAccount is null or undefined, and if it is, it throws an error.
   if(!newUserAccount) throw new Error('Error creating user')

    // this createDwollaCustomer, creates a customer in Dwolla which as we know is a service for transferring money between banks.

    //then based on that particular customer created the function takes information about the user and the customer type (personal for individual users).

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: 'personal'
    })
  
    // this checks if the dwollaCustomerUrl is null or undefined, and if it is, it throws an error.
    if(!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')


      // this Takes the dwollaCustomerUrl which is a link to the new Dwolla customer and extracts the actual ID for that customer, which will be used later.

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    //  DATABASE_ID and USER_COLLECTION_ID identify the specific database and collection where user records are stored.
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl
      }
    )

 
   cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });  
    
    // return parseStringify(newUserAcc)
    return parseStringify(newUser)
 }catch (error) {
   console.log(error);  
}
 }
 
 export const SignIn  = async ({email, password}: signInProps) => {
  try {
   const { account } = await createAdminClient();
   const res = await account.createEmailPasswordSession(email, password)
   return parseStringify(res)
  } catch (error) {
     console.log('Error', error);
     
  }
 }

//  This function is  used in our components and routes to check if a user is logged in, and access the user's details comming from appwrite
export async function getLoggedInUser() {
   try {
     const { account } = await createSessionClient();
     const user = await account.get();
     return parseStringify(user)
   } catch (error) {
    console.log(error);
     return null;
   }
 }


 export async function LogOutAcc() {
   const { account } = await createSessionClient();
   cookies().delete('appwrite-session')
   await account.deleteSession('current')
 }

 export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.fname} ${user.lname}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}

// this code creates a bank account as a document in our database and then creates a bank account in our database note: this happens becos appwrite does not support bank accounts so we have to create a bank account in our database
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    )

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
}

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

     // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
     const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    
    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
}
