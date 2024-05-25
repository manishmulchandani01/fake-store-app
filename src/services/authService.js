import { API_URL } from "./serverInfo";

export const signInUser = async (email, password) => {
    const url = `${API_URL}/users/signin`;
    const user = { email, password };
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const signUpUser = async (name, email, password) => {
    const url = `${API_URL}/users/signup`;
    const user = { name, email, password };
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const updateUser = async (token, name, password) => {
    const url = `${API_URL}/users/update`;
    const updatedDetails = { name, password };
    try {
        const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDetails),
        });
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};
