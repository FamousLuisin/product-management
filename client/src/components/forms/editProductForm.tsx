"use client"

type EditProductFormProps = {
    initialName: string;
    initialPrice: number;
    code: string;
};

export default function EditProductForm({
    initialName,
    initialPrice,
    code,
}: EditProductFormProps) {
  
    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const payload = {
            name: formData.get("name") as string,
            price: Number(formData.get("price")),
            code
        };

        console.log(payload)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
            type="text"
            name="name"
            defaultValue={initialName}
            placeholder="Product Name"
            className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
        />

        <input
            type="number"
            name="price"
            step="0.01"
            min="0"
            defaultValue={initialPrice}
            placeholder="Price"
            className="border-2 p-2 rounded-md text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-secondary-foreground"
        />

        <button
            type="submit"
            className="bg-primary text-secondary px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
        >
            Save changes
        </button>
        </form>
    );
}