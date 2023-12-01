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
  creditCard: TCreditCard | null;
  customer: TCustomer;
}

type TAccountItem = {
  id: number;
  guid: string;
  billId: number;
  quantity: number;
  productId: number;
  totalPrice: number;
};

type TAccountItemsOptions = {
  billId: number;
  page?: number;
  limit?: number;
};

type TAction = "edit" | "delete" | "view_accounts" | null;

type TCurrentActionState = {
  action: TAction;
  current: any | null;
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

type TCategory = {
  id: number;
  guid: string;
  name: string;
}

type TSubCategory = {
  id: number;
  guid: string;
  categoryId: number;
  name: string;
}

type TProduct = {
  id: number;
  guid: string;
  name: string;
  productNumber: string;
  color: string;
  subCategoryId: number;
}

export {
  TAccount, TAccountItem, TAccountItemsOptions, TAccountsTableColumn, TAccountsTableField, TAction, TBill, TCategory, TCreditCard, TCurrentActionState,
  TCustomer, TCustomerKey, TCustomersTableColumn, TOrderBy, TProduct, TSeller, TSubCategory, TToastData, TUseAccountsOptions, TUseCustomersOptions,
  TUser
};

