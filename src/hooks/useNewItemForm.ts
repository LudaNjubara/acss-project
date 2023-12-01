import { useEffect, useState } from "react";
import { TNewItemFormData } from "../components/pages/items/AddNewItemForm";
import { fetchCategories, fetchProducts, fetchSubCategories } from "../lib/fetchers/NewItemFetchers";
import { TCategory, TProduct, TSubCategory } from "../typings";
import { usePrevious } from "./common/UsePrevious";

type TData = {
    categories: TCategory[];
    subCategories: TSubCategory[];
    products: TProduct[];
};

const useNewItemForm = (formData: TNewItemFormData) => {
    const { category, subCategory } = formData;

    const prevCategory = usePrevious(category);
    const prevSubCategory = usePrevious(subCategory);

    const [data, setData] = useState<TData | undefined>(undefined);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Initial fetch
                if (!category && !subCategory) {
                    const categoriesData = await fetchCategories();
                    const subCategoriesData = await fetchSubCategories(categoriesData[0]);
                    const productsData = await fetchProducts(subCategoriesData[0]);

                    setData({
                        categories: categoriesData,
                        subCategories: subCategoriesData,
                        products: productsData,
                    });
                    setError(undefined);
                }
                // Category changed, so fetch subcategories and products
                else if (category !== prevCategory) {
                    const subCategoriesData = await fetchSubCategories(category!);
                    const productsData = await fetchProducts(subCategoriesData[0]);

                    setData({
                        categories: data?.categories || [],
                        subCategories: subCategoriesData,
                        products: productsData,
                    });
                    setError(undefined);
                }
                // Subcategory changed, so fetch products
                else if (subCategory !== prevSubCategory) {
                    const productsData = await fetchProducts(subCategory!);

                    setData({
                        categories: data?.categories || [],
                        subCategories: data?.subCategories || [],
                        products: productsData,
                    });
                    setError(undefined);
                }
            } catch (error) {
                console.error(error);
                setData(undefined);
                if (error instanceof Error) setError(error.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [category, subCategory]);

    return { data, error, isLoading };

};

export { useNewItemForm };

