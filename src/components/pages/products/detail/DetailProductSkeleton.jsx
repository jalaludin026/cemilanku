const DetailProductSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row p-5 max-w-7xl mx-auto">
      <div className="w-full sm:w-1/2">
        <div className="w-full h-64 sm:h-96 bg-gray-300"></div>
      </div>
      <div className="w-full sm:w-1/2 space-y-3 p-5">
        <div className="w-1/2 h-4 bg-gray-300"></div>
        <div className="w-1/3 h-4 bg-gray-300"></div>
        <div className="w-1/4 h-4 bg-gray-300"></div>
        <div className="w-1/5 h-4 bg-gray-300"></div>
        <div className="w-1/6 h-4 bg-gray-300"></div>
      </div>
    </div>
  );
};

export default DetailProductSkeleton;
