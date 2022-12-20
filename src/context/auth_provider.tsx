import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextType {
    auth: {
        user: string,
        pwd: string,
        roles: [],
        accessToken: string
    },
    setAuth: React.Dispatch<SetStateAction<any>>,
    // persist: boolean,
    // setPersist: React.Dispatch<SetStateAction<boolean>>,
}

interface AuthProviderProps {
    children: React.ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {


    const [auth, setAuth] = useState({ user: '', pwd: '', roles: [] as [], accessToken: '' });
    // const [persist, setPersist] = useState<boolean>(JSON.parse(localStorage.getItem("persist")!) || false);

    // console.log(auth);

    // useEffect(() => {
    //     console.log(auth);

    // }, [auth]);

    return (

        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;