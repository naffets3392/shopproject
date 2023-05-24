import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppProvider";

export default function Product({product}) {
    const {loggedInUser,setLoggedInUser, setCartItems,cartItems,isSignedIn,users,setUsers} = useAppContext()
    const [clickedProduct,setClickedProduct] = useState(false)
    const [selectedSize,setSelectedSize] = useState('')
    const [showAlert,setShowAlert] = useState(false)
    const [alert,setAlert] = useState({text: '', alert: ''})

    function addToCartFunc(product) {
        if(!selectedSize) {
            setShowAlert(true)
            showAlertFunc('need to add size!','error',true)
            return
        } else {
            if(isSignedIn) {
                if(loggedInUser.cart.find(item => item.id === product.id)) {
                    const id = Math.floor(Math.random() * 10000)
                    const userCart = loggedInUser.cart.map(item => {
                        if(item.id === product.id) {
                            return {...item, sizes: [...item.sizes, {id:id, size:selectedSize}]}
                        } else {
                            return item
                        }
                    })
                    const loggedUser = {...loggedInUser, cart: userCart}
                    setLoggedInUser(loggedUser)
                    setUsersAndStorageFunc(loggedUser)
                } else {
                    const id = Math.floor(Math.random() * 10000)
                    const productObj = {id: product.id, model: product.model, price: product.price, image: product.images[0], sizes:[{id:id, size: selectedSize}]}
                    const loggedUser = {...loggedInUser, cart: [...loggedInUser.cart, productObj]}
                    setLoggedInUser(loggedUser)
                    setUsersAndStorageFunc(loggedUser)
                }
                setShowAlert(true)
                showAlertFunc('product is added to cart!', 'sucess')
            } else {
                const productObj = {id: product.id, model: product.model, image: product.images[0] ,price: product.price, sizes: []}
                if(cartItems.find(product => product.id === productObj.id)) {
                    const id = Math.floor(Math.random() * 10000)
                    setCartItems(oldItems => {
                        return oldItems.map(olditem => {
                            if(olditem.id === productObj.id) {
                                return {...olditem, sizes:[...olditem.sizes, {id:id, size:selectedSize}]}
                            } else {
                                return olditem
                            }
                        })
                    })
                } else {
                    const id = Math.floor(Math.random() * 10000)
                    const productObj = {id: product.id, model: product.model,image:product.images[0],price: product.price, sizes:[{id:id, size: selectedSize}]}
                    setCartItems([...cartItems, productObj])
                }
            }
            setShowAlert(true)
            showAlertFunc('product is added to cart!', 'sucess')
            setSelectedSize('')
        }
    }

    function showAlertFunc(text,alert) {
        setAlert({text: text, alert: alert})
    }

    function selectedSizeFunc(size) {
        setSelectedSize(size)
    }

    useEffect(() => {
        setSelectedSize('')
    },[clickedProduct])

    useEffect(() => {
            const removeAlert = setTimeout(() => {
                setShowAlert(false)
                setAlert({text: '', alert: ''})

            },1500)
            return () => {
                clearTimeout(removeAlert)
            }   
    },[alert])

    // localStorage.setItem('lsusers',JSON.stringify(users))

    function setUsersAndStorageFunc(loggedUser) {
        setUsers(oldUsers => {
            return oldUsers.map(user => {
                if(user.name === loggedUser.name && user.password === loggedUser.password) {
                    return loggedUser
                } else {
                    return user
                }
            })
        })
    }

    localStorage.setItem('lsusers',JSON.stringify(users))

    if(clickedProduct) {
        return (
            <div className="product__modal">
                <div className="productModal__cont">
                    <div className="img__cont">
                        <img src={product.images[0]} alt="" />
                    </div>
                    <div className="info__cont">
                        <div className="heading__cont">
                            <div className="name__cont">
                                <h3>{product.model}</h3>
                                <p>{product.brand}</p>
                            </div>
                            <h3>{product.price}$</h3>
                        </div>
                        {showAlert && <p className={`alert ${alert.alert === 'sucess' ? 'sucess' : 'error'}`}>{alert.text}</p>}
                        <div className="sizes__cont">
                            <p className="select">Select a size:</p>
                           <div className="sizes">
                            {product.sizes.map(size => {
                                    return <div key={size} className={`size ${size === selectedSize ? 'selectedSizeClicked' : ''}`} onClick={() => selectedSizeFunc(size)}><p>{size}</p></div>
                                })}
                           </div>
                        </div>
                        <div className="addToCart__cont">
                            <button onClick={() => addToCartFunc(product)}>add to cart</button>
                            <button onClick={() => setClickedProduct(false)}>back</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="product__cont" onClick={() => setClickedProduct(true)}>
                <div className="img__cont">
                    <img src={product.images[0]} alt="" />
                </div>
                <h3>{product.model}</h3>
            </div>
            
        )
    }
}