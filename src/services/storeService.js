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
