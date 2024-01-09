import { TCustomer } from "../../typings";
import { BASE_API_URL } from "../constants/Index";

const handleSearch = async (searchQuery: string) => {

    const res = await fetch(`${BASE_API_URL}/Customer?q=${searchQuery}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const data = await res.json() as TCustomer[];

    return data;
}

const fetchCustomer = async (id: number) => {
    const res = await fetch(`${BASE_API_URL}/Customer/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const data = await res.json() as TCustomer;

    return data;
}

export { fetchCustomer, handleSearch };

