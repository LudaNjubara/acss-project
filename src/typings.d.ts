type TUser = {
  id: number;
  name: string;
  email: string;
};

type TToastData = {
  message: string;
  type: "success" | "error" | "";
  show: boolean;
};

type TCustomer = {
  id: number;
  guid: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  cityId: number | null;
};

type TOrderBy = "asc" | "desc";

type TUseCustomersOptions = {
  page?: number;
  limit?: number;
  sort: string[];
  order: TOrderBy[];
  searchQuery?: string;
};

type TUseAccountsOptions = {
  page?: number;
  limit?: number;
  customerId?: number;
};

type TBill = {
  id: number;
  guid: string;
  date: string;
  billNumber: string;
  customerId: number;
  sellerId: number | null;
  creditCardId: number | null;
  comment: string;
};

type TCreditCard = {
  id: number;
  guid: string;
  type: string;
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
};

type TSeller = {
  id: number;
  guid: string;
  name: string;
  surname: string;
  permanentEmployee: boolean;
}

type TAccount = {
  id: number;
  bill: TBill;
  creditCard: TCreditCard;
  seller: TSeller;
}

type TAction = "edit" | "delete" | "view_accounts" | null;

type TCurrentActionState = {
  action: TAction;
  customer: TCustomer | null;
};

type TCustomerKey = keyof TCustomer | "actions";

type TCustomersTableColumn = {
  field: TCustomerKey;
  headerName: string;
  sortable?: boolean;
};

type TAccountsTableField = "id" | "bill" | "date" | "creditCard" | "cardNumber" | "expiration";

type TAccountsTableColumn = {
  field: TAccountsTableField;
  nestedField?: string;
  headerName: string;
  sortable?: boolean;
};

export {
  TAccount, TAccountsTableColumn, TAccountsTableField, TAction, TBill, TCreditCard, TCurrentActionState,
  TCustomer, TCustomerKey, TCustomersTableColumn, TOrderBy, TSeller, TToastData, TUseAccountsOptions, TUseCustomersOptions,
  TUser
};

