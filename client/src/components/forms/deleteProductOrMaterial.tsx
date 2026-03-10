"use client"

import { useState } from "react";
import { useNavigate } from "react-router";

type DeleteProductManufacturingProps = {
    code: string;
    type: "product" | "material"
};

export default function DeleteProductOrMaterial({code, type}: DeleteProductManufacturingProps) {

    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);
    
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