import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData.user || userData);
                setToken(userData.token);
                setIsLoggedIn(true);
            } catch {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
            }
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData.user || userData);
        setToken(userData.token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            user,
            token,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
