"use client"

import { useState } from "react";
import { useNavigate } from "react-router";

type EditProductFormProps = {
    initialName: string;
    initialPrice: number;
    code: string;
};

export default function EditProductForm({
    initialName,
    initialPrice,
    code,
}: EditProductFormProps) {
    const [name, setName] = useState(initialName)
    const [price, setPrice] = useState(initialPrice)
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const url = `${import.meta.env.VITE_API_URL}/api/products/${code}`

        const payload = {
            name: name,
            price: price,
        };

        try {
            const result = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if(!result.ok){
                throw new Error("error update product")
            }

            navigate("/")
        } catch (error) {
            setSubmitError((error as Error).message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {submitError && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
                    <span className="text-red-600 font-bold">⚠</span>
                    <div className="flex-1">
                    <p className="font-semibold">Erro</p>
                    <p className="text-sm">{submitError}</p>
                    </div>
                    <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="text-red-500 hover:text-red-700 font-bold"
                    >
                    ×
                    </button>
                </div>
            )}
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Price"
                className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <button
                type="submit"
                className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
            >
                Save changes
            </button>
        </form>
    );
}