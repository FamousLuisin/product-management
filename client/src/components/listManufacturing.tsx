"use client";

import { useEffect, useState } from "react";


type ProductResponseWithQuantity = {
    name: string;
    price: number;
    code: string;
    quantity: number;
};

type ProductProducedResponse = {
    products: ProductResponseWithQuantity[];
    price: number;
};

export default function ListManufacturing() {
    const [data, setData] = useState<ProductProducedResponse | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchProductionProducts() {
        const url = `${import.meta.env.VITE_API_URL}/api/products/production`

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error get production");
            }

            const json: ProductProducedResponse = await response.json();
            setData(json);

        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductionProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!data) return <p>No data</p>;

    return (
            <div className="flex flex-col gap-4">

            {data.products != null && data.products.length > 0 && (
            <>
                {data.products.map((product) => (
                <div
                    key={product.code}
                    className="border p-3 rounded-md flex justify-between"
                >
                    <div>
                    <p className="font-medium text-secondary">{product.name}</p>
                    <p className="text-sm opacity-70 text-gray-400">Code: {product.code}</p>
                    </div>

                    <div className="text-right text-gray-400">
                    <p>Qty: {product.quantity}</p>
                    <p>${product.price}</p>
                    </div>
                </div>
                ))}

                <div className="font-bold text-right text-green-500">
                Total: ${data.price}
                </div>
            </>
            )}
            </div>
    );
}