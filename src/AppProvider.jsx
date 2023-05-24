import React, { useContext, createContext, useState } from "react";
import { data } from "./data";

export const appContext = createContext()

function LSusers() {
    return localStorage.getItem('lsusers') ? JSON.parse(localStorage.getItem('lsusers')) : []
}

export function AppProvider({children}) {
    const [user,setUser] = useState({name: '', password: ''})
    const [loggedInUser,setLoggedInUser] = useState(null)
    const [users,setUsers] = useState(LSusers())
    const [signingIn,setSigningIn] = useState(false)
    const [signingUp,setSigningUp] = useState(false)
    const [isSignedIn,setIsSignedIn] = useState(false)
    const [cartItems,setCartItems] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [showCard,setShowCard] = useState(true)

    console.log(cartItems)

    return (
        <appContext.Provider value={{
            data,
            signingIn,
            setSigningIn,
            signingUp,
            setSigningUp,
            user,
            setUser,
            users,
            setUsers,
            setLoggedInUser,
            loggedInUser,
            isSignedIn,
            setIsSignedIn,
            cartItems,
            setCartItems,
            totalPrice,
            setTotalPrice,
            showCard,
            setShowCard
            }}>
            {children}
        </appContext.Provider>
    )
}

export function useAppContext() {
    return useContext(appContext)
}