"use client"

import { useEffect, useState } from "react"
import type Product from "../types/typeProduct"
import ProductCard from "./productCard"

export default function ListProduct() {
    
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

                if (!response.ok) {
                    throw new Error("Response not OK");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);
    
    return (
        <div className="w-full">
            <h1>List of Products</h1>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul className="flex flex-col gap-4">
                    {products.map((product, index) => (
                        <li key={index}>
                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}