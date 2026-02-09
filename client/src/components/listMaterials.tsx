"use client"

import { useEffect, useState } from "react"
import MaterialCard from "./materialCard";
import type Material from "@/types/typeMaterial";

export default function ListMaterials() {
    
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        async function fetchMaterials() {
            try {
                // const response = await fetch('/api/materials');

                // if (!response.ok) {
                //     throw new Error("Response not OK");
                // }

                // console.log("Response status:", response.status);
                // const data = await response.json();
                // setmaterials(data);
                setMaterials([{code:"AA0000", name:"AAAAA", quantity:10}, {code:"BB0000", name:"BBBBB", quantity:1}]);
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