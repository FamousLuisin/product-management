"use client"

import type Material from "@/types/typeMaterial";

export default function MaterialQuantityForm(props: Material) {
    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const payload = {
            quantity: Number(formData.get("quantity")),
            code: props.code
        };
 
        console.log(payload);
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <div className="flex gap-2">
            <button
                type="submit"
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
            >
                Add
            </button>

            <button
                type="submit"
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
                onClick={(e) => {
                    const form = e.currentTarget.form!;
                    const input = form.elements.namedItem("quantity") as HTMLInputElement;
                    input.value = String(-Math.abs(Number(input.value)));
                }}
            >
                Remove
            </button>
            </div>
      </form>
    );
}