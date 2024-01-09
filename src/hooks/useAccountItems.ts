import { useEffect, useState } from "react";
import { BASE_API_URL } from "../lib/constants/Index";
import { TAccountItem, TAccountItemsOptions } from "../typings";

const useAccountItems = (options: TAccountItemsOptions) => {
    const { billId, page, limit } = options;

    const [data, setData] = useState<TAccountItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchAccountItems = async () => {
            setIsLoading(true);

            const urlSearchParams = new URLSearchParams({
                billId: billId.toString(),
                _page: page?.toString() || "1",
                _limit: limit?.toString() || "10",
            });

            try {
                const response = await fetch(`${BASE_API_URL}/Item?${urlSearchParams.toString()}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const itemsData = await response.json();

                const productsData = await Promise.all(itemsData.map(async (item: TAccountItem) => {
                    const response = await fetch(`${BASE_API_URL}/Product/${item.productId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const productData = await response.json();
                    return productData;
                }));

                const data = itemsData.map((item: TAccountItem, index: number) => {
                    return {
                        id: item.id,
                        item,
                        product: productsData[index],
                    };
                });

                setData(data);
                setIsLoading(false);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Something went wrong while fetching the account items";
                setError(errorMessage);
                setIsLoading(false);
            }
        };
        fetchAccountItems();

    }, [billId, page, limit]);

    return { data, isLoading, error };
};

export { useAccountItems };

