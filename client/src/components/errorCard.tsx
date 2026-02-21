type ErrorCardProps = {
  message?: string;
};

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="w-full flex justify-center">
        <div className="w-1/2 border border-red-400 bg-red-50 text-red-700 p-4 rounded-md shadow-md flex justify-between items-center">
      
            <div className="flex flex-col">
                <h2 className="font-bold text-lg">
                Something went wrong
                </h2>
                <p className="text-sm opacity-80">
                {message || "An unexpected error occurred. Please try again."}
                </p>
            </div>

            <div className="text-2xl">
                ❌
            </div>

        </div>
    </div>
  );
}