import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    return (

        <AuthContext.Provider

            value={{

                user,

                setUser

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthContext;