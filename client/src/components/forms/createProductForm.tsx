"use client"

import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

type Props = {
  onClose: () => void;
};

type Material = {
  code: string;
  name: string;
};

type Manufacturing = {
  materialCode: string;
  materialName: string;
  quantity: number;
};

export default function CreateProductForm({ onClose }: Props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [materialCode, setMaterialCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [manufacturing, setManufacturing] = useState<Manufacturing[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: materials = [], isLoading, isError } = useQuery({
    queryKey: ["materials"],
    queryFn: async (): Promise<Material[]> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/materials/all`
      );

      if (!response.ok) {
        throw new Error("Error fetching materials");
      }

      const data = await response.json();
      console.log("MATERIALS:", data);

      return data;
    },
  });

  function addManufacturing() {
    if (!materialCode || quantity <= 0) return;

    const selectedMaterial = materials.find(
      (m) => m.code === materialCode
    );

    if (!selectedMaterial) return;

    const alreadyExists = manufacturing.some(
      (item) => item.materialCode === materialCode
    );

    if (alreadyExists) return;

    setManufacturing([
      ...manufacturing,
      {
        materialCode: selectedMaterial.code,
        materialName: selectedMaterial.name,
        quantity,
      },
    ]);

    setMaterialCode("");
    setQuantity(1);
  }

  function removeManufacturing(index: number) {
    setManufacturing(manufacturing.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name,
      price: Number(price),
      manufacturing,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error creating product");
      }

      navigate("/");
      onClose();
    } catch (error) {
      setSubmitError((error as Error).message);
    }
  }

  if (isLoading) return <p>Loading materials...</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {submitError && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
          <span className="text-red-600 font-bold">⚠</span>
          <div className="flex-1">
            <p className="font-semibold">Erro</p>
            <p className="text-sm">{submitError}</p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitError(null)}
            className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 p-2 rounded-md"
      />

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border-2 p-2 rounded-md"
      />

      <div className="flex gap-2">
        <select
          value={materialCode}
          onChange={(e) => setMaterialCode(e.target.value)}
          className="border-2 p-2 rounded-md flex-1"
        >
          <option value="">Select Material</option>

          {materials.map((material) => (
            <option key={material.code} value={material.code}>
              {material.name} ({material.code})
            </option>
          ))}
        </select>

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
          disabled={!materialCode}
          className="cursor-pointer bg-primary text-secondary px-3 rounded-md font-semibold disabled:opacity-50"
        >
          Add
        </button>
      </div>
      {isError && (
        <p className="text-red-500 text-sm">Error loading materials</p>
      )}

      <div className="flex flex-wrap gap-2">
        {manufacturing.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm"
          >
            <p>
              {item.materialName} × {item.quantity}
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