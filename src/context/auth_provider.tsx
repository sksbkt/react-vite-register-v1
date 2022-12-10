import React, { createContext, Dispatch, SetStateAction, useState } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextType {
    auth: { user: string, pwd: string, roles: {}, accessToken: string },
    setAuth: React.Dispatch<SetStateAction<any>>
}

interface AuthProviderProps {
    children: React.ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {


    const [auth, setAuth] = useState({ user: '', pwd: '', roles: {}, accessToken: '' });
    // console.log(auth);

    return (

        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;