import { getProductById as _getProductById } from "../services/storeService";

const products = {};

export const getProductById = async (pId) => {
    if (pId in products) return products[pId];
    try {
        const prod = await _getProductById(pId);
        products[pId] = prod;
        return prod;
    } catch (e) {
        console.error("Error:", e);
    }
};
