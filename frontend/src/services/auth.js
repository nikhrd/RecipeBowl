const getToken = () => {
    return localStorage.getItem("token");
};

const logout = () => {
    localStorage.removeItem("token");
};

const isAuthenticated = () => {
    return !!getToken();
};

export { getToken, logout, isAuthenticated };