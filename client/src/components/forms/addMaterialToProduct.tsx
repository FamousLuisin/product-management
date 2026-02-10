"use client"

import { useState } from "react";
import type Manufacturing from "@/types/typeManufacturing";
import { useNavigate } from "react-router";

type ProductType = {
    code: string
}

export default function AddMaterialToProductForm({ code }: ProductType) {
    const [manufacturing, setManufacturing] = useState<Manufacturing[]>([]);
    const [materialCode, setMaterialCode] = useState("");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    function addManufacturing() {
        if (!materialCode || quantity <= 0) return;

        const trimCode = materialCode.trim()

        setManufacturing([
            ...manufacturing,
            { materialCode: trimCode, quantity },
        ]);

        setMaterialCode("");
        setQuantity(1);
    }

    function removeManufacturing(index: number) {
        setManufacturing(manufacturing.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const url = `${import.meta.env.VITE_API_URL}/api/products/${code}/manufacturing`

        console.log(JSON.stringify(manufacturing))

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(manufacturing)
            })

            if(!response.ok){
                throw new Error("Failed to insert material")
            }

            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="materialCode"
                placeholder="Material Code"
                value={materialCode}
                onChange={(e) => setMaterialCode(e.target.value)}
                className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <input
                type="number"
                name="quantity"
                min={1}
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <div className="flex flex-wrap gap-2">
                {manufacturing.map((item, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm"
                    >
                    <p>
                        {item.materialCode} × {item.quantity}
                    </p>

                    <button
                        type="button"
                        onClick={() => removeManufacturing(index)}
                        className="text-red-500 font-bold cursor-pointer"
                    >
                        ×
                    </button>
                    </span>
                ))}
            </div>

            <button
                onClick={() => addManufacturing()}
                type="button"
                className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
            >
                Add Material
            </button>
            <button
                type="submit"
                className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
            >
                Submit
            </button>
        </form>
    );
}