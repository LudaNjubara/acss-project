

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
    searchQuery?: string;
};

export { TCustomer, TUseCustomersOptions }

