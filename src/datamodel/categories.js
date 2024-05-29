import { getCategories as _getCategories } from "../services/storeService";
import { getProductsByCategory as _getProductsByCategory } from "../services/storeService";

let categories = [];
let products = {};

export const getCategories = async () => {
    if (categories.length > 0) return categories;
    try {
        const cat = await _getCategories();
        categories = cat;
        return cat;
    } catch (e) {
        console.error("Error:", e);
    }
};

export const getProductsByCategory = async (category) => {
    if (products[category]) {
        return products[category];
    }
    try {
        const prods = await _getProductsByCategory(category);
        products[category] = prods;
        return prods;
    } catch (error) {
        console.error("Error:", error);
    }
};
