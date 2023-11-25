import React from "react";
import { TCustomer } from "../../../typings";

type TAccountsTableProps = {
  customer: TCustomer | null;
};

export default function AccountsTable({ customer }: TAccountsTableProps) {
  return <div>{customer?.name}</div>;
}
