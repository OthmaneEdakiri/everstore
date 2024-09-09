import { UserApi } from "@/services/Api/UserApi";
import { createContext, useContext, useState } from "react";

const UserStateContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: {},
    setUser: () => {},
    getUser: () => {},
    login: (email, password) => {},
    register: (payload) => {},
    logout: () => {},
    setToken: () => {},
});

const UserContext = ({ children }) => {
    const [isAuthenticated, _setIsAuthenticated] = useState(
        "true" === localStorage.getItem("AUTHENTICATED")
    );
    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    const login = async (email, password) => {
        return await UserApi.login(email, password);
    };

    const register = async (payload) => {
        return await UserApi.register(payload);
    };

    const logout = () => {
        setUser({});
        setIsAuthenticated(false);
        setToken("");
    };

    const setIsAuthenticated = (isAuthenticated) => {
        _setIsAuthenticated(isAuthenticated);
        localStorage.setItem("AUTHENTICATED", isAuthenticated);
    };

    const setToken = (token) => {
        localStorage.setItem("token", token);
    };

    const getUser = async () => {
        return await UserApi.getUser();
    };

    return (
        <UserStateContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                login,
                register,
                user,
                setUser,
                getUser,
                logout,
                setToken,
            }}
        >
            {children}
        </UserStateContext.Provider>
    );
};

export const UseUserContext = () => useContext(UserStateContext);

export default UserContext;
