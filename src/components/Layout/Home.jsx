import Hero from "../../pages/Hero";
import GenderCollectionSection from "../Products/GenderCollectionSection";
import NewArrivals from "../Products/NewArrivals";
import ProductGrid from "../Products/ProductGrid";
import FeatureCollection from "../Products/FeatureCollection";
import FeaturesSection from "../Products/FeaturesSection";
import products from "../../data/products";
import { useNavigate } from "react-router-dom";

// Top Wear for Women products
const topWearWomen = products
  .filter((p) => p.gender === "Women" && p.category === "Top Wear")
  .slice(0, 8);

const Home = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  // Handler for Shop Now
  const handleProductClick = (productId) => {
    if (!user) {
      // redirect to login with redirect param
      navigate(`/login?redirect=/collections`);
    } else {
      // go to product details page
      navigate(`/product/${productId}`);
    }
  };

  return (
    <>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <div className="my-16">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            Best Seller
          </p>

          <h2 className="text-5xl font-semibold text-gray-900 leading-tight">
            Our Top Picks
          </h2>

          <div className="w-20 h-[2px] bg-black mt-4 mb-4 mx-auto"></div>

          <p className="text-gray-500 max-w-md mx-auto">
            Explore our most popular products that our customers love the most.
          </p>
        </div>

        <ProductGrid
          products={topWearWomen.slice(0, 4)}
          onProductClick={handleProductClick}
        />
      </div>

      {/* Top Wear for Women */}
      <div className="container mx-auto my-16">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            Top Wear for Women
          </p>

          <h2 className="text-5xl font-semibold text-gray-900 leading-tight">
            Stylish Tops Collection
          </h2>

          <div className="w-20 h-[2px] bg-black mt-4 mb-4 mx-auto"></div>

          <p className="text-gray-500 max-w-md mx-auto">
            Discover our latest collection of stylish tops designed for everyday
            comfort and modern fashion. Perfect for every occasion.
          </p>
        </div>

        <ProductGrid
          products={topWearWomen}
          onProductClick={handleProductClick}
        />
      </div>

      <FeatureCollection />
      <FeaturesSection />
    </>
  );
};

export default Home;
