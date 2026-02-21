"use client"

import { useQuery } from "@tanstack/react-query"
import MaterialCard from "./materialCard"
import type Material from "@/types/typeMaterial"
import CardSkeleton from "./cardSkeleton"
import { ErrorCard } from "./errorCard"

async function fetchMaterials(): Promise<Material[]> {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/materials`
    )

    if (!response.ok) {
        throw new Error("Response not OK")
    }

    return response.json()
}

export default function ListMaterials() {

    const {
        data: materials,
        isLoading,
        isError,
        error
    } = useQuery<Material[]>({
        queryKey: ["materials"],
        queryFn: fetchMaterials
    })

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
            </div>
        );
    }

    if (isError) return <ErrorCard message={`${error.message}: error getting materials`}/>;

    return (
        <div className="w-full">
            {!materials || materials.length === 0 ? (
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
