"use server"
import { cookies } from "next/headers";
import { createSessionClient, createAdminClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

 export const SignUp  = async (newUsers:SignUpParams) => {
   const {email, password, fname, lname} = newUsers
  try {
   const { account } = await createAdminClient();

   const newUserAcc = await account.create(ID.unique(),
    email,
    password,
   `${fname} ${lname}`);
   const session = await account.createEmailPasswordSession(email, password);
 
   cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });  
    
    return parseStringify(newUserAcc)
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