"use client"

import { useState } from "react";
import { useNavigate } from "react-router";

type EditMaterialFormProps = {
  initialName: string;
  code: string
};

export default function EditMaterialForm({ initialName, code }: EditMaterialFormProps) {
    const [name, setName] = useState(initialName)
    const navigate = useNavigate();
    
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const payload = {
            name: name,
        };

        const url = `${import.meta.env.VITE_API_URL}/api/materials/${code}`

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error("error update material")
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
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Material Name"
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