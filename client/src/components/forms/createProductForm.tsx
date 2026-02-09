"use client"
import { useState } from "react";

type Manufacturing = {
    materialCode: string;
    quantity: number;
};

export default function CreateProductForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [materialCode, setMaterialCode] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [manufacturing, setManufacturing] = useState<Manufacturing[]>([]);

    function addManufacturing() {
      if (!materialCode || quantity <= 0) return;

      setManufacturing([
        ...manufacturing,
        { materialCode, quantity },
      ]);

      setMaterialCode("");
      setQuantity(1);
    }

    function removeManufacturing(index: number) {
      setManufacturing(manufacturing.filter((_, i) => i !== index));
    }

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      const payload = {
        name,
        price: Number(price),
        manufacturing,
      };

      console.log(payload);
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
            className="bg-primary text-secondary px-3 rounded-md font-semibold"
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
          className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
        >
          Create
        </button>
      </form>
    );
}
