import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../lib/constants/Index';
import { fetchCreditCard } from '../lib/fetchers/AccountsFetchers';
import { fetchCustomer } from '../lib/fetchers/CustomersFetchers';
import { TAccount, TBill, TUseAccountsOptions } from '../typings';

const useAccounts = (options: TUseAccountsOptions) => {
    const { page, limit, customerId } = options;
    const [data, setData] = useState<TAccount[]>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const urlSearchParams = new URLSearchParams({
                    _page: page?.toString() || '1',
                    _limit: limit?.toString() || '10',
                    customerId: customerId?.toString() || '',
                });
                const url = `${BASE_API_URL}/Bill?${urlSearchParams.toString()}`;

                const res = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) throw new Error('Something went wrong');

                const billData = await res.json() as TBill[];

                const data = await Promise.all(billData.map(async (bill) => {
                    const creditCard = await fetchCreditCard(bill.creditCardId);
                    const customer = await fetchCustomer(bill.customerId);

                    const account: TAccount = {
                        id: bill.id,
                        bill,
                        creditCard,
                        customer,
                    }

                    return account;
                }));

                console.log("data", data)
                setData(data);
                setError(undefined);

            } catch (error) {
                setData(undefined);
                if (error instanceof Error) setError(error.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, limit, customerId]);

    return { data, error, isLoading };
};

export { useAccounts };
