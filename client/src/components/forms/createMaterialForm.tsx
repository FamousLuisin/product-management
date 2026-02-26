"use client"

import { useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  onClose: () => void
}

export default function CreateMaterialForm({onClose}: Props) {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate();

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const url = `${import.meta.env.VITE_API_URL}/api/materials`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: name, quantity: quantity})
            })

            if(!response.ok){
                throw new Error("error creating material")
            }

            navigate("/")
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
            type="text"
            name="name"
            value={name}
            placeholder="Material Name"
            onChange={(e) => setName(e.target.value)}
            className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
        />

        <input
            type="number"
            name="quantity"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
        />

        <button
            type="submit"
            className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
        >
            Create Material
        </button>
      </form>
    );
}