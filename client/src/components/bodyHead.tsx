"use client"

import { Link } from "react-router"

export default function BodyHead() {
    return(
        <div className="flex mt-4">
            <li className="flex text-secondary gap-20">
                <ul>
                    <Link to="/products" className="group hover:text-chart-2 transition duration-300 text-lg cursor-pointer">
                        Products
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-chart-2"></span>
                    </Link>
                </ul>
                <ul>
                    <Link to="/Manufacturing" className="group hover:text-chart-2 transition duration-300 text-lg cursor-pointer">
                        Manufacturing
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-chart-2"></span>
                    </Link>
                </ul>
                <ul>
                    <Link to="/materials" className="group hover:text-chart-2 transition duration-300 text-lg cursor-pointer">
                        Materials
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-chart-2"></span>
                    </Link>
                </ul>
            </li>
        </div>
    )
}
