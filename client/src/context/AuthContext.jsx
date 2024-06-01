import React, { createContext, useContext, useEffect, useState } from "react";

import { getUserName, loginUser, registerUser } from "../api/index";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(()=>{
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser):null;
    });

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            fetchUserName(token);
        }
    }, []);

    const login = async (userData) => {
        try {
            const response = await loginUser(userData);
            localStorage.setItem('token',response.data.token);
            fetchUserName(response.data.token);
        } catch (error) {
            console.log("Login failed", error);
        }
    };

    const register = async (userData) => {
        try {
            await registerUser(userData);
            await login(userData);
        } catch (error) {
            console.error('Registration or login failed', error);
        }
    };

    const fetchUserName = async (token) => {
        try {
            const response = await getUserName(token);
            setUser({name: response.data});
            localStorage.setItem('user',JSON.stringify({name:response.data}));
        } catch (error) {
            console.error('Fetching user name failed:', error);
            logout();
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);