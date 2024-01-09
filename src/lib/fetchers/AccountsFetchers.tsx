import { TCreditCard, TSeller } from "../../typings";
import { BASE_API_URL } from "../constants/Index";

const fetchSeller = async (sellerId: number | null) => {
  if (!sellerId) return null;

  const response = await fetch(`${BASE_API_URL}/Seller/${sellerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = (await response.json()) as TSeller;
  return data;
};

const fetchCreditCard = async (creditCardId: number | null) => {
  if (!creditCardId) return null;

  const response = await fetch(`${BASE_API_URL}/CreditCard/${creditCardId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = (await response.json()) as TCreditCard;
  return data;
};

export { fetchCreditCard, fetchSeller };
