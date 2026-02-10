"use client"

import type Manufacturing from "@/types/typeManufacturing";
import { useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: (value: any) => any
}

export default function CreateProductForm({ onClose }: Props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const [materialCode, setMaterialCode] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [manufacturing, setManufacturing] = useState<Manufacturing[]>([]);

    function addManufacturing() {
      if (!materialCode || quantity <= 0) return;

      const trimCode = materialCode.trim()

      setManufacturing([
        ...manufacturing,
        { materialCode: trimCode, quantity },
      ]);

      setMaterialCode("");
      setQuantity(1);
    }

    function removeManufacturing(index: number) {
      setManufacturing(manufacturing.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.SubmitEvent) {
      e.preventDefault();

      const url = `${import.meta.env.VITE_API_URL}/api/products`

      const payload = {
        name,
        price: Number(price),
        manufacturing: manufacturing,
      };

      console.log(JSON.stringify(payload))

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error("error creating product")
        }

        navigate("/")
        onClose(null)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 p-2 rounded-md"
        />

        <input
          type="text"
          inputMode="numeric"
          pattern="^[0-9]+\.?[0-9]*$"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 p-2 rounded-md"
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Material Code"
            value={materialCode}
            onChange={(e) => setMaterialCode(e.target.value)}
            className="border-2 p-2 rounded-md flex-1"
          />

          <input
            type="number"
            min={1}
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border-2 p-2 rounded-md w-24"
          />

          <button
            type="button"
            onClick={addManufacturing}
            className="bg-primary text-secondary px-3 rounded-md font-semibold cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {manufacturing.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm"
            >
              <p>
                {item.materialCode} × {item.quantity}
              </p>

              <button
                type="button"
                onClick={() => removeManufacturing(index)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition cursor-pointer"
        >
          Create
        </button>
      </form>
    );
}
