"use client"

import { CirclePlus } from "lucide-react"
import { Link } from "react-router"
import Modal from "./modal"
import CreateProductForm from "./forms/createProductForm"
import CreateMaterialForm from "./forms/createMaterialForm"
import { useState } from "react"

type ModalType = "product" | "material" | null

export default function Header() {
    const [openModal, setOpenModal] = useState<ModalType>(null)

    return(
        <nav className="flex items-center w-11/12 border-b py-4 justify-between">
            <div>
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img src="src/assets/engrenagem.png" alt="" />
                        <h1 className="text-2xl text-white font-bold">Management</h1>
                    </div>           
                </Link>
            </div>

            <div className="flex gap-2">
                <button 
                    className="
                    bg-primary text-secondary 
                    px-3 py-2 
                    font-semibold 
                    rounded-xl 
                    flex gap-2 items-center
                    cursor-pointer
                    shadow-md
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-1
                    hover:scale-105
                    hover:shadow-xl
                    active:scale-95
                    "
                    onClick={() => setOpenModal("product")}
                >
                    <CirclePlus /> Product
                </button>         

                <button 
                    className="
                    bg-secondary text-primary 
                    px-3 py-2 
                    font-semibold 
                    rounded-xl 
                    flex gap-2 items-center
                    cursor-pointer
                    shadow-md
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-1
                    hover:scale-105
                    hover:shadow-xl
                    active:scale-95
                    "
                    onClick={() => setOpenModal("material")}
                >
                    <CirclePlus /> Material
                </button>         
            </div>

            <Modal isOpen={openModal === "product"} onClose={() => setOpenModal(null)} modalTitle="Create Product">
                <CreateProductForm onClose={() => setOpenModal(null)} />
            </Modal>
            <Modal isOpen={openModal === "material"} onClose={() => setOpenModal(null)} modalTitle="Create Material">
                <CreateMaterialForm onClose={() => setOpenModal(null)} />
            </Modal>
        </nav>
    )
}