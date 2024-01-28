import { TCustomer } from "../../typings";
import { BASE_API_URL } from "../constants/Index";

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

export { fetchCustomer };

