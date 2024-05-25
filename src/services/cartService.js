import { API_URL } from "./serverInfo";

export const fetchCartItems = async (token) => {
    const url = `${API_URL}/cart`;
    try {
        const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const updateCartItems = async ({ token, items }) => {
    const url = `${API_URL}/cart`;
    try {
        const res = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items }),
        });
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};
