type TToastData = {
    message: string;
    type: "success" | "error" | "";
    show: boolean;
}

type TCustomer = {
    id: number
    guid: string
    name: string
    surname: string
    email: string
    telephone: string
    cityId: number | null
}

type TOrderBy = "asc" | "desc"

type TUseCustomersOptions = {
    page?: number;
    limit?: number;
    sort: string[];
    order: TOrderBy[];
    searchQuery?: string;
};

type TAction = "edit" | "delete" | null;

type TCurrentActionState = {
    action: TAction;
    customer: TCustomer | null;
};

type TCustomerKey = keyof TCustomer | "actions";

type TCustomerColumn = {
    field: TCustomerKey;
    headerName: string;
    sortable?: boolean;
};

export { TAction, TCurrentActionState, TCustomer, TCustomerColumn, TCustomerKey, TOrderBy, TToastData, TUseCustomersOptions };

