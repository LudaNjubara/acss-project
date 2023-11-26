import { TAccountsTableColumn, TAccountsTableField, TCustomer, TCustomersTableColumn } from "../../typings";

const generateCustomerColumns = (fields: (keyof TCustomer | 'actions')[]): TCustomersTableColumn[] => {
    return fields.map((field) => ({
        field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1),
        sortable: field !== 'actions',
    }));
};

const generateAccountsColumns = (fields: TAccountsTableField[]): TAccountsTableColumn[] => {
    return fields.map((field) => ({
        field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1).replaceAll("_", " "),
        sortable: false
    }));
}

export { generateAccountsColumns, generateCustomerColumns };

