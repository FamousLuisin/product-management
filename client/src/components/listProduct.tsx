"use client"

import { useQuery } from "@tanstack/react-query"
import type Product from "../types/typeProduct"
import ProductCard from "./productCard"
import CardSkeleton from "./cardSkeleton"
import { ErrorCard } from "./errorCard"

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`
    )

    if (!response.ok) {
        throw new Error("Response not OK")
    }

    return response.json()
}

export default function ListProduct() {

    const {
        data: products,
        isLoading,
        isError,
        error
    } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts
    })

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
            </div>
        );
    }

    if (isError) return <ErrorCard message={`${error.message}: error getting products`}/>;

    return (
        <div className="w-full">
            {!products || products.length === 0 ? (
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