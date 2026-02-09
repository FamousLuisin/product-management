"use client"

import { Pen } from "lucide-react"
import { Link } from "react-router"

export default function Header() {
    return(
        <div className="flex items-center w-11/12 border-b py-4 justify-between">
            <div>
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img src="src/assets/engrenagem.png" alt="" />
                        <h1 className="text-2xl text-white font-bold">Management</h1>
                    </div>           
                </Link>
            </div>

            <div className="flex gap-2">
                <Link to="/createProduct">
                    <button className="bg-primary text-secondary px-2 py-1 font-semibold rounded-md flex gap-2 cursor-pointer"><Pen /> Product</button>         
                </Link>
                <Link to="/createMaterial">
                    <button className="bg-secondary text-primary px-2 py-1 font-semibold rounded-md flex gap-2 cursor-pointer"><Pen /> Material</button>         
                </Link>
            </div>
        </div>
    )
}