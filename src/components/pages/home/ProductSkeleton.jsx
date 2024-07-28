const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="w-full p-3 bg-white hover:shadow hover:scale-105 rounded border space-y-3 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300"></div>
          <h1 className="text-xl font-bold">
            <div className="w-1/2 h-4 bg-gray-300"></div>
          </h1>
          <p className="font-semibold">
            <div className="w-1/3 h-4 bg-gray-300"></div>
          </p>
          <p className="text-xs text-gray-500">
            <div className="w-1/4 h-4 bg-gray-300"></div>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
