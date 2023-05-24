import React, { useState } from "react";
import { useAppContext } from "../AppProvider";

export default function SigningUp() {
    const {signingUp,setSigningUp,users,setUsers} = useAppContext()
    const [createdUser,setCreatedUser] = useState({name:'',surname:'',password:'',confirmPassword:'',cart:[]})
    const [alert,setAlert] = useState({text:'',showAlert: false})

    function backFunc() {
        setSigningUp(false)
        setCreatedUser({name:'',surname:'',password:'',confirmPassword:'',cart:[]})
    }

    function signUpFunc() {
        if(!createdUser.name) {
            alertFunc('Need to add name!',true)
            return
        } else if(!createdUser.surname) {
            alertFunc('Need to add surname!',true)
            return
        } else if(!createdUser.password) {
            alertFunc('Need to add password!', true)
            return
        } else if(createdUser.password.length < 6) {
            alertFunc('Password need at least 6 characters!',true)
            return
        } else if(createdUser.password !== createdUser.confirmPassword) {
            alertFunc('Passwords didnt matched!', true)
            return
        } else if(users.find(user => user.name === createdUser.name && user.surname === createdUser.surname && user.password === createdUser.password)) {
            alertFunc('User already exist!', true)
            return
        }
        const newUsers = [...users, createdUser]
        setUsers(newUsers)
        localStorage.setItem('lsusers',JSON.stringify(newUsers))
        setCreatedUser({name:'',surname:'',password:'',confirmPassword:'',cart:[]})
        setSigningUp(false)
    }

    function alertFunc(text,alert) {
        setAlert({text: text, showAlert: alert})
        setTimeout(() => {
            setAlert({text:'', showAlert: false})
        },2000)
        setCreatedUser({name:'',surname:'',password:'',confirmPassword:'',cart:[]})
    }
    
    if(signingUp) {
        return (
            <div className="modal">
                    <div className="signInUp__cont">
                        <h3>Sign Up</h3>
                        {alert.showAlert && <p>{alert.text}</p>}
                        <div className="inputs__cont">
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input id="name" type="text" value={createdUser.name} onChange={(e) => setCreatedUser({...createdUser, name: e.target.value})}/>
                            </div>
                            <div>
                                <label htmlFor="surname">Surname:</label>
                                <input id="surname" type="text" value={createdUser.surname} onChange={(e) => setCreatedUser({...createdUser,surname: e.target.value})}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" value={createdUser.password} onChange={(e) => setCreatedUser({...createdUser, password: e.target.value})}/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm password:</label>
                                <input id="confirmPassword" type="password" value={createdUser.confirmPassword} onChange={(e) => setCreatedUser({...createdUser, confirmPassword: e.target.value})}/>
                            </div>
                        </div>
                        <div className="buttons__cont">
                            <button onClick={signUpFunc}>Sign Up</button>
                            <button onClick={backFunc}>Back</button>
                        </div>
                    </div>
                </div>
        )
     }
}