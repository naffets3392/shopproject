import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppProvider";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const {signingIn,setSigningIn,user,setUser,users,setLoggedInUser,setIsSignedIn,setCartItems,setShowCard} = useAppContext()
    const [alert,setAlert] = useState(({text:'',showAlert: false}))
    const navigate = useNavigate()

    function backFunc() {
        setSigningIn(false)
        setUser({name: '', password: ''})
    }

    function signInFunc() {
        if(!user.name) {
            alertFunc('Need to add name!',true)
            return 
        } else if(!user.password) {
            alertFunc('Need to add password!',true)
            return
        } else if(users.find(lsuser => lsuser.name === user.name && lsuser.password === user.password)) {
            const loggedInUser = users.find(lsuser => lsuser.name === user.name && lsuser.password === user.password)
            setLoggedInUser(loggedInUser)
            setUser({name: '', password: ''})
            setIsSignedIn(true)
            setSigningIn(false)
            setCartItems([])
            setShowCard(false)
            navigate('/')
            return
        } else{
            alertFunc('User doesnt exist!', true)
            setUser({name: '', password: ''})
        }
    }

    function alertFunc(text,alert) {
        setAlert({text: text, showAlert: alert})
        setTimeout(() => {
            setAlert({text:'', showAlert: false})
        },2000)
        setUser({name:'',surname:''})
    }

    if(signingIn) {
        return (
            <div className="modal">
                <div className="signInUp__cont">
                    <h3>Sign In</h3>
                    {alert.showAlert && <p>{alert.text}</p>}
                    <div className="inputs__cont">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                        </div>
                    </div>
                    <div className="buttons__cont">
                        <button onClick={signInFunc}>Sign In</button>
                        <button onClick={backFunc}>Back</button>
                    </div>
                </div>
            </div>
        )
    }
}