import React, { useEffect } from "react";
import { useAppContext } from "../AppProvider";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart({setIsCheckOut}) {
    const {isSignedIn,loggedInUser,cartItems,totalPrice,setTotalPrice,setLoggedInUser,users, setUsers, setCartItems} = useAppContext()

    function removeSizeFunc(item, id) {
        if(isSignedIn) {
            const thisItem = item
            console.log(thisItem)
            const thisItemSizes = thisItem.sizes
            console.log(thisItemSizes)
            const removeSizeFromItem = thisItemSizes.filter(size => size.id !== id)
            console.log(removeSizeFromItem)

           if(!removeSizeFromItem.length) {
            console.log(removeSizeFromItem)
            const loggedInUserUpdatedCart = loggedInUser.cart.filter(item => item.id !== thisItem.id)
            console.log(loggedInUserUpdatedCart)
            const updatedUser = {...loggedInUser, cart: loggedInUserUpdatedCart}
            setLoggedInUser(updatedUser)
            console.log(updatedUser)
            const updatedUsers = users.map(user => {
                if(user.name === updatedUser.name && user.password === updatedUser.password) {
                    return updatedUser
                } else {
                    return user
                }
            })
            localStorage.setItem('lsusers', JSON.stringify(updatedUsers))
            console.log(updatedUsers)
            setUsers(updatedUsers)
           } else {
            const removeSizeFromItem = thisItemSizes.filter(size => size.id !== id)
            console.log(removeSizeFromItem)
            const updatedItem = {...thisItem, sizes: removeSizeFromItem}
            const updatedUserCart = loggedInUser.cart.map(item => {
                if(item.id === updatedItem.id) {
                    return updatedItem
                } else {
                    return item
                }
            })
            console.log(updatedUserCart)
            const updatedUser = {...loggedInUser, cart: updatedUserCart}
            const updatedUsers = users.map(user => {
                if(user.name === updatedUser.name && user.password === updatedUser.password) {
                    return updatedUser
                } else {
                    return user
                }
            })
            setLoggedInUser(updatedUser)
            setUsers(updatedUsers)
           }
        } else {
            const thisItem = item 
            const thisItemSizes = item.sizes
            if(thisItemSizes.length === 1) {
                console.log(thisItem)
                console.log(cartItems)
                const updatedCartItems = cartItems.filter(item => item.id !== thisItem.id)
                console.log(updatedCartItems)
                setCartItems(updatedCartItems)
            } else {
                console.log(cartItems)
                const updatedSizes = thisItemSizes.filter(size => size.id !== id)
                const updatedItem = {...thisItem, sizes: updatedSizes}
                const updatedCartItems = cartItems.map(item => {
                    if(item.id === updatedItem.id) {
                        return updatedItem
                    } else {
                        return item
                    }
                })
                setCartItems(updatedCartItems)
            }
        }
    }

    function removeProduct(compItem) {
        if(isSignedIn) {
            const updatedCart = loggedInUser.cart.filter(item => item.id !== compItem.id)
            const updatedUser = {...loggedInUser, cart: updatedCart}
            console.log(updatedUser)
            const updatedUsers = users.map(user => {
                if(user.name === updatedUser.name && user.password === updatedUser.password) {
                    return updatedUser
                } else {
                    return user
                }
            })
            localStorage.setItem('lsusers', JSON.stringify(updatedUsers))
            setUsers(updatedUsers)
            setLoggedInUser(updatedUser)
        } else {
            const thisItem = compItem
            const updatedCartItems = cartItems.filter(item => item.id !== thisItem.id)
            console.log(updatedCartItems)
            setCartItems(updatedCartItems)
        }
    }

    useEffect(() => {
        let total = 0
        if(isSignedIn) {
            loggedInUser.cart.forEach(item => {
                item.sizes.forEach(size => {
                    total = total + item.price
                })
            })
            setTotalPrice(total)
        } else if(cartItems.length){
            cartItems.forEach(item => {
                item.sizes.forEach(size => {
                    total = total + item.price
                })
            })
            setTotalPrice(total)
        }
    },[cartItems,loggedInUser])

    if(isSignedIn) {
        if(loggedInUser.cart.length) {
            return (
                <div className="cartItems__cont">
                    <div className="headingCartItems__cont">
                        <h3 className="cart">Cart</h3>
                        <div className='total__cont'>
                            <h3 className="total">Total: {totalPrice}$</h3>
                            <Link to='/checkout'><button>Procced to checkout</button></Link>
                        </div>
                    </div>
                    <div className="items__cont">
                        {loggedInUser.cart.map(item => {
                            return <CartItem removeSizeFunc={removeSizeFunc} removeProduct={removeProduct} item={item}/>
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="cartItems__cont">
                   <h1 className="cartEmpty">Cart</h1>
                    <div className="empty__cont">
                        <h3>Cart is empty.</h3>
                    </div>
                </div>
            )
        }
    } else if(cartItems.length) {
        return (
            <div className="cartItems__cont">
                <div className="headingCartItems__cont">
                        <h3 className="cart">Cart</h3>
                        <div className='total__cont'>
                            <h3 className="total">Total: {totalPrice}$</h3>
                            <Link to='/checkout'><button>Procced to checkout</button></Link>
                        </div>
                    </div>
                <div className="items__cont">
                    {cartItems.map(item => {
                        return <CartItem removeSizeFunc={removeSizeFunc} removeProduct={removeProduct} item={item}/>
                    })}
                </div>
            </div>
          )
      } else {
          return (
            <div className="cartItems__cont">
                <h1 className="cartEmpty">Cart</h1>
                <div className="empty__cont">
                    <h3>Cart is empty.</h3>
                </div>
            </div>
          )
      }
}