"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

type ProductType = {
  code: string;
};

type Material = {
  code: string;
  name: string;
  quantity: number;
};

type Manufacturing = {
  materialCode: string;
  materialName: string;
  quantity: number;
};

export default function AddMaterialToProductForm({ code }: ProductType) {
  const navigate = useNavigate();

  const [materialCode, setMaterialCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [manufacturing, setManufacturing] = useState<Manufacturing[]>([]);

  const {
    data: allMaterials = [],
    isLoading: loadingAll,
    isError: errorAll,
  } = useQuery({
    queryKey: ["all-materials"],
    queryFn: async (): Promise<Material[]> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/materials/all`
      );

      if (!response.ok) throw new Error("Error fetching materials");

      return response.json();
    },
  });

  const {
    data: productMaterials = [],
    isLoading: loadingProduct,
    isError: errorProduct,
  } = useQuery({
    queryKey: ["product-materials", code],
    queryFn: async (): Promise<Material[]> => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/materials/product/${code}`
      );

      if (!response.ok)
        throw new Error("Error fetching product materials");

      return response.json();
    },
    enabled: !!code,
  });

  useEffect(() => {
    if (productMaterials.length > 0) {
      const mapped = productMaterials.map((mat) => ({
        materialCode: mat.code,
        materialName: mat.name,
        quantity: mat.quantity,
      }));

      setManufacturing(mapped);
    }
  }, [productMaterials]);

  function addManufacturing() {
    if (!materialCode || quantity <= 0) return;

    const selectedMaterial = allMaterials.find(
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

    const payload = manufacturing.map((item) => ({
      materialCode: item.materialCode,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${code}/manufacturing`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update manufacturing");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  if (loadingAll || loadingProduct)
    return <p>Loading materials...</p>;

  if (errorAll || errorProduct)
    return <p>Error loading materials</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div className="flex gap-2">
        <select
          value={materialCode}
          onChange={(e) => setMaterialCode(e.target.value)}
          className="border-2 p-2 rounded-md flex-1"
        >
          <option value="">Select Material</option>

          {allMaterials.map((material) => (
            <option key={material.code} value={material.code}>
              {material.name} ({material.code})
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
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
        className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
      >
        Save Changes
      </button>
    </form>
  );
}