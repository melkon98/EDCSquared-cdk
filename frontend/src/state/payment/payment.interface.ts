export interface IPayment {
  id?: string | null;
  fullName: string;
  firstAddress: string;
  secondAddress: string;
  country: string;
  accountNumber: string;
  swiftCode: string;
  documentID: string;
  postCode: string;
}

export interface IPaymentError {
  fullName?: string | null;
  firstAddress?: string | null;
  secondAddress?: string | null;
  country?: string | null;
  accountNumber?: string | null;
  swiftCode?: string | null;
  documentID?: string | null;
  postCode?: string | null;
}
