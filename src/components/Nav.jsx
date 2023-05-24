import React, { useEffect, useState } from "react";
import { FaAngrycreative } from 'react-icons/fa'
import { BsCart2 } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { Link } from "react-router-dom";
import { useAppContext } from "../AppProvider";

export default function Nav() {
    const {setSigningIn,setSigningUp,isSignedIn,setIsSignedIn,setLoggedInUser,loggedInUser,cartItems,setShowCard} = useAppContext()
    const [totalItems,setTotalItems] = useState(0)
    const [showMenu,setShowMenu] = useState(false)

    console.log(cartItems)

   useEffect(() => {
        let totalItemsNum = 0
        if(isSignedIn) {
            loggedInUser.cart.forEach(item => {
                item.sizes.forEach(size => {
                    totalItemsNum = totalItemsNum + 1
                })
            })
            setTotalItems(totalItemsNum)
        } else {
            console.log(cartItems)
            cartItems.forEach(item => {
                item.sizes.forEach(size => {
                    totalItemsNum = totalItemsNum + 1
                })
            })
            setTotalItems(totalItemsNum)
        } 
   },[loggedInUser,cartItems])

    function signingInFunc() {
        setSigningIn(true)
        setSigningUp(false)
        setShowMenu(false)
    }

    function signingUpFunc() {
        setSigningUp(true)
        setSigningIn(false)
        setShowMenu(false)
    }

    function signOutFunc() {
        setLoggedInUser(null)
        setIsSignedIn(false)
        setShowCard(false)
        setShowMenu(false)
    }

    return (
        <div className="nav__cont">
            <div className="logo__cont">
                <Link to='/' className="link"><FaAngrycreative className="logo"/></Link>
            </div>
            <div className={`links__cont ${showMenu ? 'showMenu' : ''}`}>
                <Link onClick={() => setShowMenu(false)} className="link" to='/'>Home</Link>
                <Link onClick={() => setShowMenu(false)} className="link" to='/shop'>Shop</Link>
            </div>
            <div className="buttons__cont">
                {!isSignedIn && <div className="user__cont">
                    <button onClick={signingInFunc}>Sign In</button>
                    <button onClick={signingUpFunc}>Sign Up</button>
                </div>}
                {isSignedIn && <div className="user__cont">
                    <Link onClick={() => setShowMenu(false)} className="link" to='/'><button onClick={signOutFunc}>Sign Out</button></Link>
                    </div>}
            </div>
            <div className="cart__cont">
                <Link onClick={() => setShowMenu(false)} className="link" to='/cart'><BsCart2 className="cart"/></Link>
                {totalItems !== 0 && <p>{totalItems}</p>}
            </div>
            <div className="hamburger__cont">
                {!showMenu && <AiOutlineMenu onClick={() => setShowMenu(true)} className="hamburger"/>}
                {showMenu && <RxCross2 onClick={() => setShowMenu(false)} className="hamburger"/>}
            </div>
        </div>
    )
}