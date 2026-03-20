import { Link } from "react-router-dom";

import mensCollectionImage from "../../assets/Men-collection.jpg";
import womensCollectionImage from "../../assets/Women-collection.jpg";

const GenderCollectionSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Women's Collection */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[450px] md:h-[550px] object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Women's Collection
          </h2>

          <p className="text-gray-600 max-w-md">
            Discover our latest women's fashion designed for elegance, comfort,
            and everyday confidence.
          </p>

          <Link
            to="/collections/all?gender=Women"
            className="inline-block bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Men's Collection */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Content */}
        <div className="order-2 md:order-1 space-y-4 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Men's Collection
          </h2>

          <p className="text-gray-600 max-w-md">
            Explore modern men's styles crafted for comfort, versatility, and
            everyday sophistication.
          </p>

          <Link
            to="/collections/all?gender=Men"
            className="inline-block bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[450px] md:h-[550px] object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
