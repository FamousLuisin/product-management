"use client"

import ListProduct from "../components/listProduct"

export default function Product() {
    return (
        <div className="grow w-1/2">
            <h1 className="text-2xl text-primary text-bold text-center">Products</h1>
            <ListProduct />
        </div>
    )
}