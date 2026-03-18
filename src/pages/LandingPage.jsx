import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";

const LandingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((json) => setProducts(json.data || []));
  }, []);

  return (
    <>
      <Banner />
      <div className="container mx-auto px-6 md:px-12 py-20">
        <h2 className="text-2xl font-bold mb-10 tracking-widest uppercase flex items-center gap-4 text-gray-800">
          New Arrivals <span className="h-[2px] w-16 bg-[#00a884]"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
