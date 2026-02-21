export default function CardSkeleton() {
    return (
    <div className="border p-4 rounded-md shadow-md flex justify-between items-center animate-pulse">
      
      <div className="flex flex-col gap-3 w-2/3">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-300 rounded w-40"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>

        <div className="h-5 bg-gray-300 rounded w-24"></div>
      </div>

      <div className="flex gap-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

    </div>
  );
}