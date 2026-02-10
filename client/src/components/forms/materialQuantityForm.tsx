"use client"

import type Material from "@/types/typeMaterial";
import { useState } from "react";
import { useNavigate } from "react-router";

type AlterType = "add" | "remove" | null

export default function MaterialQuantityForm({ code }: Material) {
    const [alterType, setAlterType] = useState<AlterType>(null)
    const [alterQuantity, setAlterQuantity] = useState(0)
    const navigate = useNavigate();

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const url = `${import.meta.env.VITE_API_URL}/api/materials/${code}/${alterType}`

        const payload = {
            quantity: alterQuantity,
        };

        try {
            const result = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!result.ok) {
                throw new Error(`error ${alterType} materials quantity`)
            }

            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            defaultValue={0}
            onChange={(e) => setAlterQuantity(Number(e.target.value))}
            className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <div className="flex gap-2">
            <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
                onClick={() => setAlterType("add")}
            >
                Add
            </button>

            <button
                type="submit"
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
                onClick={() => setAlterType("remove")}
            >
                Remove
            </button>
            </div>
      </form>
    );
}