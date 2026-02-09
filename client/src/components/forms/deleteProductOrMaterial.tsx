type DeleteProductManufacturingProps = {
    code: string;
    type: "product" | "material"
};

export default function DeleteProductOrMaterial({code, type}: DeleteProductManufacturingProps) {
    
    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();  
        console.log(code, type)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm">
                Are you sure you want to delete the { type }{" "}
                <strong>{code}</strong> from this product?
            </p>

            <div className="flex gap-2">
                <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:brightness-90 transition"
                >
                Yes, delete
                </button>
            </div>
        </form>
    );
}