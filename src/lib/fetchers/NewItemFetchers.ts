import { TCategory, TProduct, TSubCategory } from "../../typings";
import { BASE_API_URL } from "../constants/Index";

const fetchCategories = async (): Promise<TCategory[]> => {
    const response = await fetch(`${BASE_API_URL}/Category`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    });
    const data = await response.json();
    return data;
}

const fetchSubCategories = async (category: TCategory): Promise<TSubCategory[]> => {
    const urlSearchParams = new URLSearchParams({ categoryId: category.id.toString() });

    const response = await fetch(`${BASE_API_URL}/SubCategory?${urlSearchParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    });
    const data = await response.json();
    return data;
}

const fetchProducts = async (subCategory: TSubCategory): Promise<TProduct[]> => {
    const urlSearchParams = new URLSearchParams({ subCategoryId: subCategory.id.toString() });

    const response = await fetch(`${BASE_API_URL}/Product?${urlSearchParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    });
    const data = await response.json();
    return data;
}

export { fetchCategories, fetchProducts, fetchSubCategories };

