import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import countries from '../countries.json'
import countriesandcities from '../countriesandcities.json'
import { useAppContext } from "../AppProvider";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcStripe } from 'react-icons/fa'

export default function Checkout() {
    const {isSignedIn,loggedInUser,showCard,setShowCard} = useAppContext()
    const [countriesAndCities,setCountriesAndCities] = useState([])
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [adress,setAdress] = useState('')
    const [postalcode,setPostalcode] = useState('')
    const [city,setCity] = useState('')
    const [phone,setPhone] = useState('')
    const [countryObj, setCountryObj] = useState({country: '', cities: []})
    const [alert,setAlert] = useState('')
    // const [showCard,setShowCard] = useState(true)

    function countriesAndCitiesFunc() {
        const CAS = []

        for (const country in countriesandcities) {
            const cntryctyObj = {country: country, cities:[]}
            countriesandcities[country].forEach(city => {
                cntryctyObj.cities.push(city.toLowerCase())
            })
            CAS.push(cntryctyObj)
        }
        setCountriesAndCities(CAS)
    }

    function checkoutFunc() {
        if(!countryObj.country) {
            setAlert('error')
            return
        } else if(!city) {
            setAlert('error')
            return
        } else if(!adress) {
            setAlert('error')
            return
        } else if(!name){
            setAlert('error')
            return
        } else if(!surname) {
            setAlert('error')
            return
        } else if(!postalcode) {
            setAlert('error')
            return
        } else if(!phone) {
            setAlert('error')
            return
        } else if(!countryObj.cities.find(cty => cty.toLowerCase() === city.toLowerCase())){
            console.log(`country doesnt have this city`)
            setAlert('error')
        } else {
            setAlert('correct')
            setTimeout(() => {
                setShowCard(true)
            },1500)
        }
    }

    function handleCountry(e) {
        const findCountry = countriesAndCities.find(country => country.country === e.target.value)
        setCountryObj(findCountry)
    }

    useEffect(() => {
        if(isSignedIn) {
            setName(loggedInUser.name)
            setSurname(loggedInUser.surname)
        }
    },[])

    useEffect(() => {
        const alert = setTimeout(() => {
            setAlert('')
        },2000)
        return () => clearTimeout(alert)
    },[alert])

    useEffect(() => {
        countriesAndCitiesFunc()
    },[])

    useEffect(() => {
        setShowCard(false)
    },[])

    if(showCard) {
        return (
            <div className="card__cont">
                <div className="inputs__cont">
                    <div className="cardInfo__cont">
                        <label htmlFor="cardnumber">Card number</label>
                        <input type="text" id='cardnumber'placeholder="xxxx-xxxxx-xxxxxx"/>
                        <div className="cards__cont">
                            <FaCcVisa className="icon"/>
                            <FaCcMastercard  className="icon"/>
                            <FaCcPaypal  className="icon"/>
                            <FaCcStripe  className="icon"/>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="date">Expire date</label>
                    <input type="text" id='date' placeholder='MM/YY'/>
                </div>
                <div>
                    <label htmlFor="cvv">CVC/CCV</label>
                    <input type="text" id='cvv' placeholder='CVC/CCV'/>
                </div>
                <div className="buttons__cont">
                    <button>Procced</button>
                    <button onClick={() => setShowCard(false)}>Back</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`checkout__cont ${alert === 'correct' ? 'correct' : ''} ${alert === 'error' ? 'error' : ''}`}>
                    <div>
                        <div className='select'>
                            <div className="country__cont">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="country"
                                        value={countryObj.country}
                                        label="country"
                                        onChange={handleCountry}
                                        >
                                        {countriesAndCities.map(cntryctyObj => {
                                            return <MenuItem value={cntryctyObj.country}>{cntryctyObj.country}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="input">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="input">
                            <label htmlFor="surname">Surname</label>
                            <input type="text" name="surname" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="input">
                            <label htmlFor="adress">Adress</label>
                            <input type="text" name="adress" id="adress" value={adress} onChange={(e) => setAdress(e.target.value)}/>
                        </div>
                        <div className="input">
                            <label htmlFor="postalcode">Postal code</label>
                            <input type="text" name="postalcode" id="postalcode" value={postalcode} onChange={(e) => setPostalcode(e.target.value)}/>
                        </div>
                        <div className="input">
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)}/>
                        </div>
                        <div className="input">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className="buttons__cont">
                            <button onClick={checkoutFunc}>Procced</button>
                            <Link to='/cart'><button>Back</button></Link>
                        </div>
                </div>
            </div>
        )
    }
 
    // return (
    //     <div className={`checkout__cont ${alert === 'correct' ? 'correct' : ''} ${alert === 'error' ? 'error' : ''}`}>
    //             <div>
    //                 <div className='select'>
    //                     <div className="country__cont">
    //                         <FormControl fullWidth>
    //                             <InputLabel id="demo-simple-select-label">Country</InputLabel>
    //                             <Select
    //                                 labelId="demo-simple-select-label"
    //                                 id="country"
    //                                 value={countryObj.country}
    //                                 label="country"
    //                                 onChange={handleCountry}
    //                                 >
    //                                 {countriesAndCities.map(cntryctyObj => {
    //                                     return <MenuItem value={cntryctyObj.country}>{cntryctyObj.country}</MenuItem>
    //                                 })}
    //                             </Select>
    //                         </FormControl>
    //                     </div>
    //                 </div>
    //                 <div className="input">
    //                     <label htmlFor="name">Name</label>
    //                     <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
    //                 </div>
    //                 <div className="input">
    //                     <label htmlFor="surname">Surname</label>
    //                     <input type="text" name="surname" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
    //                 </div>
    //                 <div className="input">
    //                     <label htmlFor="adress">Adress</label>
    //                     <input type="text" name="adress" id="adress" value={adress} onChange={(e) => setAdress(e.target.value)}/>
    //                 </div>
    //                 <div className="input">
    //                     <label htmlFor="postalcode">Postal code</label>
    //                     <input type="text" name="postalcode" id="postalcode" value={postalcode} onChange={(e) => setPostalcode(e.target.value)}/>
    //                 </div>
    //                 <div className="input">
    //                     <label htmlFor="city">City</label>
    //                     <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)}/>
    //                 </div>
    //                 <div className="input">
    //                     <label htmlFor="phone">Phone</label>
    //                     <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
    //                 </div>
    //                 <div className="buttons__cont">
    //                     <button onClick={checkoutFunc}>Procced</button>
    //                     <Link to='/cart'><button>Back</button></Link>
    //                 </div>
    //         </div>
    //     </div>
    // )
}