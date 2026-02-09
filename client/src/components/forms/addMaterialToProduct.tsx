type ProductManufacturing = {
    materialCode: string;
    quantity: number;
};

type ProductType = {
    code: string
}

export default function AddMaterialToProductForm({ code }: ProductType) {
    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const payload: ProductManufacturing[] = [
            {
            materialCode: formData.get("materialCode") as string,
            quantity: Number(formData.get("quantity")),
            },
        ];

        console.log(payload, code)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="materialCode"
              placeholder="Material Code"
              className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <input
              type="number"
              name="quantity"
              min={1}
              placeholder="Quantity"
              className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
            />

            <button
              type="submit"
              className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
            >
              Add Material
            </button>
        </form>
    );
}