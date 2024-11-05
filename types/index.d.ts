interface AccountDetail {
  account: number | [] | {},
  totalBank: number,
  totalAmount: number
}

declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  fname: string;
  lname: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

interface HeaderBoxProps {
  type: 'greeting' | 'title',
  title: string,
  user: User,
  subtext: string

}

interface Rightsidebar {
  user: User,
  banks: [{}, {}],
  transaction: number | [] | {}
}

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}
declare interface CustomInputProps {
  name: string
  placeHolder: StringDecoder,
  label: string,
  form: any
}

declare type SignUpParams = {
  fname?: string;
  lname?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  email: string;
  password: string;
};

declare interface signInProps {
  email: string;
  password: string;
}

declare interface FooterProps {
  user: User;
  type?: 'mobile' | 'desktop'
}