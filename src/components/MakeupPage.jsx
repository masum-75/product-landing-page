import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import MakeupCard from "../components/MakeupCard";

const MakeupPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/makeup.json")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900">Makeup</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Browse our premium collection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
                Filters
              </h2>

              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">
                  Product Type
                </h3>
                <div className="space-y-3">
                  {["All Products", "Featured Only", "Discounted"].map(
                    (label, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="p-type"
                          defaultChecked={i === 0}
                          className="w-4 h-4 accent-[#00a884]"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                          {label}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-wider">
                  Price Range
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="৳ Min"
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-[#00a884]"
                  />
                  <input
                    type="number"
                    placeholder="৳ Max"
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-[#00a884]"
                  />
                </div>
              </div>

              <button className="w-full py-3 bg-[#00a884] text-white font-bold rounded-2xl hover:bg-pink-600 transition-all">
                Clear Filters
              </button>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:border-[#00a884] shadow-sm"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 font-bold text-gray-400">
                Loading Products...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((item) => (
                  <MakeupCard key={item.id} product={item} />
                ))}
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  No products found
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupPage;
