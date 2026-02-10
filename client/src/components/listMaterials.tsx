"use client"

import { useEffect, useState } from "react"
import MaterialCard from "./materialCard";
import type Material from "@/types/typeMaterial";

export default function ListMaterials() {
    
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/materials`);

                if (!response.ok) {
                     throw new Error("Response not OK");
                 }

                const data = await response.json();
                setMaterials(data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        }

        fetchMaterials();
    }, []);
    
    return (
        <div className="w-full">
            <h1>List of materials</h1>
            {materials.length === 0 ? (
                <p>No materials available.</p>
            ) : (
                <ul className="flex flex-col gap-4">
                    {materials.map((material, index) => (
                        <li key={index}>
                            <MaterialCard material={material} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}