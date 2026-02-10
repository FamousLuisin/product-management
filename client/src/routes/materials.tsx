"use client"

import ListMaterials from "@/components/listMaterials"

export default function Materials(){
    return (
        <div className="grow w-1/2">
            <h1 className="text-2xl text-primary text-bold text-center">Materials</h1>
            <ListMaterials />
        </div>
    )
}