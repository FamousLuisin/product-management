"use client"

import { useNavigate } from "react-router";

type DeleteProductManufacturingProps = {
    code: string;
    type: "product" | "material"
};

export default function DeleteProductOrMaterial({code, type}: DeleteProductManufacturingProps) {

    const navigate = useNavigate();
    
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();  

        const method = type === "material" ? "materials" : "products"

        const url = `${import.meta.env.VITE_API_URL}/api/${method}/${code}`

        try {
            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!result.ok) {
                throw new Error(`error delete ${type}`)
            }
            
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm">
                Are you sure you want to delete the { type }{" "}
                <strong>{code}</strong>?
            </p>

            <div className="flex gap-2">
                <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
                >
                Yes, delete
                </button>
            </div>
        </form>
    );
}