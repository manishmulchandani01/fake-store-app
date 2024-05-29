import { API_URL } from "./serverInfo";

export const fetchOrders = async (token) => {
    const url = `${API_URL}/orders/all`;
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

export const newOrder = async (token, items) => {
    const url = `${API_URL}/orders/neworder`;
    try {
        const res = await fetch(url, {
            method: "POST",
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

export const updateOrder = async (token, status) => {
    const url = `${API_URL}/orders/updateorder`;
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(status),
        });
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};
