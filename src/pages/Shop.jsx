import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppContext } from "../AppProvider";
import Product from "../components/Product";

export default function Shop() {
    const {data} = useAppContext()
    const [gender,setGender] = useState('')
    const [category,setCategory] = useState('')
    const [brand,setBrand] = useState('')
    const [products,setProducts] = useState(data)

    const dataCategory = ['All', ...new Set(data.map(item => item.category))]
    const dataBrand = ['All', ...new Set(data.map(item => item.brand))]
    const dataGender = ['All', ...new Set(data.map(item => item.gender))]

    function handleGender(e) {
        setGender(e.target.value)
        e.stopPropagation()
    }

    function handleCategory(e) {
        setCategory(e.target.value)
        e.stopPropagation()
    }

    function handleBrand(e) {
        setBrand(e.target.value)
        e.stopPropagation()
    }

    useEffect(() => {
        const showProducts = data.filter(product => {
            if((product.gender === gender || gender === 'All' || !gender) 
            && (product.category === category || category === 'All' || !category) && 
            (product.brand === brand || brand === 'All' || !brand)) {
                return product
            }
        })
        setProducts(showProducts)
    },[gender,category,brand])

    return (
        <div className="shop__cont">
            <div className="buttons__cont">
                <div className="category__cont" onMouseEnter={(e) => e.stopPropagation()}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={(e) => handleGender(e)}
                            >
                            {dataGender.map(gender => {
                                return <MenuItem value={gender}>{gender}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="category__cont" onMouseEnter={(e) => e.stopPropagation()}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => handleCategory(e)}
                            >
                            {dataCategory.map(category => {
                                return <MenuItem value={category}>{category}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="category__cont" onMouseEnter={(e) => e.stopPropagation()}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={brand}
                            label="Brand"
                            onChange={(e) => handleBrand(e)}
                            >
                            {dataBrand.map(brand => {
                                return <MenuItem value={brand}>{brand}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="products__cont">
                {products.length == 0 && <h3 className="noProducts">No products found!</h3>}
                {products.map(product => {
                    return <Product key={product.id} product={product}/>
                })}
            </div>
        </div>
    )
}