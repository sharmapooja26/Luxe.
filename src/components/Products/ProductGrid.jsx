import { Link } from "react-router-dom";

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          state={{ product }}
          className="group block"
        >
          <div className="bg-white overflow-hidden transition duration-300">
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img
                src={product?.images?.[0]?.url}
                alt={product?.images?.[0]?.altText || product?.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="mt-3 text-left">
              <h3 className="text-sm text-gray-800">{product?.name}</h3>

              <p className="text-sm text-gray-500 mt-1">${product?.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
