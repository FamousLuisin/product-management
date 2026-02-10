"use client"

import { Pen, Plus, Trash } from "lucide-react"
import type Material from "../types/typeMaterial"
import { useState } from "react"
import Modal from "./modal"
import MaterialQuantityForm from "./forms/materialQuantityForm"
import DeleteProductOrMaterial from "./forms/deleteProductOrMaterial"
import EditMaterialForm from "./forms/editMaterialForm"

type ModalType = "add" | "edit" | "delete" | null

export default function MaterialCard({ material }: { material: Material }) {
    const [openModal, setOpenModal] = useState<ModalType>(null)

    return (
        <>
            <div className="border p-4 rounded-md shadow-md flex justify-between items-center">
                <div>
                    <h2 className="text-xl text-secondary font-bold mb-2 flex gap-3">{material.name} <span className="text-gray-400 text-xs">{material.code}</span></h2>
                    <p className="text-lg text-gray-400">{material.quantity} un</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        className="text-green-500 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full flex items-center justify-center w-8 h-8"
                        onClick={() => setOpenModal("add")}>
                            <Plus />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 cursor-pointer hover:bg-blue-100 rounded-full flex items-center justify-center w-8 h-8"
                        onClick={() => setOpenModal("edit")}>
                        <Pen /></button>
                    <button className="text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-100 rounded-full flex items-center justify-center w-8 h-8"
                        onClick={() => setOpenModal("delete")}>
                        <Trash /></button>
                </div>
            </div>
            <Modal isOpen={openModal === "add"} onClose={() => setOpenModal(null)} modalTitle="Add Material">
                <MaterialQuantityForm code={material.code} name={material.name} quantity={material.quantity}/>
            </Modal>
            <Modal isOpen={openModal === "edit"} onClose={() => setOpenModal(null)} modalTitle="Edit Material">
                <EditMaterialForm initialName={material.name} code={material.code} />
            </Modal>
            <Modal isOpen={openModal === "delete"} onClose={() => setOpenModal(null)} modalTitle="Delete Material">
                <DeleteProductOrMaterial code={material.code} type={"material"}/>
            </Modal>
        </>
    )
}