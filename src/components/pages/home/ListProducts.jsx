import Link from "next/link";

const ListProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products?.map((product) => (
        <Link
          href={`/products/${product?.slug}`}
          key={product?.id}
          className="w-full p-3 bg-white hover:shadow hover:scale-105 rounded border space-y-1"
        >
          <img
            src={product?.imageUrl}
            alt={product?.name}
            loading="lazy"
            className="w-full h-48 object-contain rounded"
          />
          {/* limit name */}
          <h1 className="text-sm sm:text-lg font-bold">
            {product?.name.length > 20
              ? `${product?.name.slice(0, 25)}...`
              : product?.name}
          </h1>
          <p className="font-semibold">
            {product?.price.toLocaleString("id", {
              currency: "IDR",
              style: "currency",
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-xs text-gray-500">{product?.category.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ListProducts;
