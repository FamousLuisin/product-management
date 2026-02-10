"use client"

import { Pen, Plus, Trash } from "lucide-react"
import type Product from "../types/typeProduct"
import { useState } from "react"
import Modal from "./modal"
import EditProductForm from "./forms/editProductForm"
import AddMaterialToProductForm from "./forms/addMaterialToProduct"
import DeleteProductOrMaterial from "./forms/deleteProductOrMaterial"

type ModalType = "add" | "edit" | "delete" | null

export default function ProductCard({ product }: { product: Product }) {
    const [openModal, setOpenModal] = useState<ModalType>(null)

    return (
        <>
            <div className="border p-4 rounded-md shadow-md flex justify-between items-center">
                <div>
                    <h2 className="text-xl text-secondary font-bold mb-2 flex gap-3">{product.name}<span className="text-gray-400 text-xs">{product.code}</span></h2>
                    <p className="text-lg text-gray-400">${product.price.toFixed(2)}</p>
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
                <AddMaterialToProductForm code={product.code}/>
            </Modal>
            <Modal isOpen={openModal === "edit"} onClose={() => setOpenModal(null)} modalTitle="Edit Product">
                <EditProductForm initialName={product.name} initialPrice={product.price} code={product.code}/>
            </Modal>
            <Modal isOpen={openModal === "delete"} onClose={() => setOpenModal(null)} modalTitle="Delete Product">
                <DeleteProductOrMaterial code={product.code} type={"product"}/>
            </Modal>
        </>
    )
}