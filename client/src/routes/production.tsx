"use client"

import ListManufacturing from "@/components/listManufacturing"

export default function Productions() {
    return (
        <div className="grow w-1/2 flex gap-4 flex-col">
            <h1 className="text-2xl text-primary text-bold text-center">Manufacturings</h1>
            <ListManufacturing />
        </div>
    )
}