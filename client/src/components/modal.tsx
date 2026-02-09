"use client"

import { X } from "lucide-react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void,
  children: React.ReactNode
  modalTitle: string
}

export default function Modal({ isOpen, onClose, children, modalTitle }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
    onClick={onClose}
    className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${isOpen ? "bg-black/50 visible opacity-100" : "bg-transparent invisible opacity-0"}
    `}
    >
    <div
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`
        relative w-full max-w-lg
        bg-secondary rounded-lg
        p-4
        transform transition-all duration-300
        ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
    >
        <header className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-primary">
                {modalTitle}
            </h1>
            <button
                onClick={onClose}
                className="
                p-1 rounded-full
                text-gray-400 hover:text-gray-600
                cursor-pointer
                transition
                "
            >
                <X size={20} />
            </button>
        </header>

        <div>
        {children}
        </div>
    </div>
    </div>
  )
}