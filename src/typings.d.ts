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

type TUseCustomersOptions = {
    page?: number;
    limit?: number;
    sort?: string[];
    order: "asc" | "desc";
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

export { TAction, TCurrentActionState, TCustomer, TCustomerColumn, TCustomerKey, TToastData, TUseCustomersOptions };

