import { API_URL } from "./serverInfo";

export const getProductById = async (id) => {
    const url = `${API_URL}/products/${id}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const getCategories = async () => {
    const url = `${API_URL}/products/categories`;
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const getProductsByCategory = async (category) => {
    const url = `${API_URL}/products/category/${encodeURIComponent(category)}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
};
