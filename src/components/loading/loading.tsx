export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-52 rounded-lg mb-4"></div>

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
  );
}
