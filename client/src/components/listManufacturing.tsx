"use client";

import { useQuery } from "@tanstack/react-query";
import CardSkeleton from "./cardSkeleton";
import { ErrorCard } from "./errorCard";

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

async function fetchProductionProducts(): Promise<ProductProducedResponse> {
    const url = `${import.meta.env.VITE_API_URL}/api/products/production`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Error get production");
    }

    return response.json();
}

export default function ListManufacturing() {

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<ProductProducedResponse>({
        queryKey: ["production-products"],
        queryFn: fetchProductionProducts
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                        <CardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (isError) return <ErrorCard message={`${error.message}: error getting manufacturing`}/>;

    if (!data) return <p>No data</p>;

    return (
        <div className="flex flex-col gap-4">

            {data.products && data.products.length > 0 && (
                <>
                    {data.products.map((product) => (
                        <div
                            key={product.code}
                            className="border p-3 rounded-md flex justify-between"
                        >
                            <div>
                                <p className="font-medium text-secondary">
                                    {product.name}
                                </p>
                                <p className="text-sm opacity-70 text-gray-400">
                                    Code: {product.code}
                                </p>
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