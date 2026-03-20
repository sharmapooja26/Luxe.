import React from "react";
import { Truck, RotateCcw, CreditCard, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck size={28} />,
      title: "Free Shipping",
      desc: "Free shipping on all orders above ₹999",
    },
    {
      icon: <RotateCcw size={28} />,
      title: "7 Days Return",
      desc: "Easy return & exchange within 7 days",
    },
    {
      icon: <CreditCard size={28} />,
      title: "Secure Payment",
      desc: "100% secure online payments",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      desc: "We are here to help anytime",
    },
  ];

  return (
    <section className="bg-gray-100 py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 animate-slide">
          {[...features, ...features].map((feature, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
            >
              <div className="text-black">{feature.icon}</div>

              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
