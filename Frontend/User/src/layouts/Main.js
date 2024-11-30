import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home"
import UserLogin from "./UserLogin"
import ListingGrid from "./ListingGrid"
import ProductDetail from "./ProductDetail"
import Cart from "./Cart"

const Main = () => (
    <main>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/login" element={<UserLogin/>}></Route>
            <Route path="/listingGrid" element={<ListingGrid/>}></Route>
            <Route path="/productDetail" element={<ProductDetail/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
        </Routes>   
    </main>
)

export default Main