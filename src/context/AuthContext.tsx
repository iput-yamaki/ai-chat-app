"use client"
import { auth } from "@/lib/firebase/firebaseClient";
import { UserInfo } from "firebase/auth";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
interface AuthContextState {
    currentUser: UserInfo | null
}
const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: ReactNode})=>{
    const[currentUser,setCurerntUser] = useState<UserInfo | null>(null);
    const[isLoading, setIsLoading] = useState(true);
 
    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) =>{
            if(user) {
                setCurerntUser(user);
            } else {
                setCurerntUser(null);
            }
            setIsLoading(false);
        })
        return() => unsubscribe();

    },[]);
    return(
        <AuthContext.Provider value={{currentUser}}>
            {!isLoading && children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("contextはAuthProvider内で取得する必要があります。")
    }
    return context;
}