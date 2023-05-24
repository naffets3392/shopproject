import React, { useEffect } from "react";
import { useAppContext } from "../AppProvider";
import { FaCreativeCommonsRemix } from "react-icons/fa";

export default function CartItem({removeSizeFunc, removeProduct, item}) {
    const {isSignedIn,cartItems,setCartItems,setLoggedInUser,loggedInUser,users,setUsers} = useAppContext()
    
    return (
        <div className="cartItem__cont">
            <div className="img__cont">
                <img src={item.image} alt="" />
            </div>
            <div className="heading__cont">
                <div className="nameAndPrice__cont">
                    <h3 className="name">{item.model}</h3>
                    <h3 className="price">{item.price}$</h3>
                </div>
                <div className="sizes__cont">
                    <h4>Sizes:</h4>
                    <div className="sizes">
                        {item.sizes.map(size => {
                            return <p key={size.id} className="size" onClick={() => removeSizeFunc(item, size.id)}>{size.size}</p>
                        })}
                    </div>
                </div>
                <button onClick={() => removeProduct(item)}>Remove product</button>
            </div>
        </div>
    )
}