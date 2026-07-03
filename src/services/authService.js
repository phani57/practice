import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const login = async (email, password) => {

    const response = await axios.post(
        `${API_URL}/login-api`,
        {
            email,
            password
        }
    );

    localStorage.setItem(
        "token",
        response.data.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
    );

    return response.data;
};

const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

};

const getToken = () => {

    return localStorage.getItem("token");

};

const getUser = () => {

    return JSON.parse(
        localStorage.getItem("user") || "{}"
    );

};

const isLoggedIn = () => {

    return !!localStorage.getItem("token");

};
const clearAuth = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

};

export default {

    login,

    logout,

    getToken,

    getUser,

    isLoggedIn,
    clearAuth

};