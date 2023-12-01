import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../lib/constants/Index';
import { handleSearch } from '../lib/fetchers/CustomersFetchers';
import { TCustomer, TUseCustomersOptions } from '../typings';

const useCustomers = (options: TUseCustomersOptions) => {
    const { page, limit, searchQuery, sort, order } = options;
    const [data, setData] = useState<TCustomer[]>();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (searchQuery) {
                    const data = await handleSearch(searchQuery);
                    setData(data);
                    setError(undefined);
                } else {
                    const urlSearchParams = new URLSearchParams({
                        _page: page?.toString() || '1',
                        _limit: limit?.toString() || '10',
                        _sort: sort?.join(",").toString() || 'id',
                        _order: order?.join(",").toString() || 'asc',
                    });
                    const url = `${BASE_API_URL}/Customer?${urlSearchParams.toString()}`;

                    const res = await fetch(url, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        },
                    });

                    if (!res.ok) throw new Error('Something went wrong');

                    const data = await res.json() as TCustomer[];
                    setData(data);
                    setError(undefined);
                }
            } catch (error) {
                setData(undefined);
                if (error instanceof Error) setError(error.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, limit, searchQuery, sort, order]);

    return { data, error, isLoading };
};



export { useCustomers };
