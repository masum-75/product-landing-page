import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Download,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const MakeupDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const formattedPrice = Number(product.price).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
  });
  const hasDiscount = product.compare_price > product.price;

  return (
    <div className="min-h-screen bg-white pt-28 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          <div className="w-full lg:w-1/2 sticky top-32">
            <div
              className="relative aspect-square bg-[#f8f8f8] rounded-[3rem] overflow-hidden flex items-center justify-center p-12 cursor-crosshair group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {hasDiscount && (
                <div className="absolute top-8 left-8 bg-pink-600 text-white text-[10px] font-black px-4 py-2 rounded-full z-10 uppercase tracking-widest">
                  Save ৳{product.compare_price - product.price}
                </div>
              )}

              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  y: isHovered ? -15 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`absolute max-h-full object-contain drop-shadow-2xl transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
                />
                <img
                  src={product.gif || product.image}
                  alt={product.name}
                  className={`absolute max-h-full object-contain drop-shadow-2xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-4">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-6 mb-10">
              <span className="text-2xl font-black text-pink-600 tracking-tighter">
                ৳{formattedPrice}
              </span>
              {hasDiscount && (
                <span className="text-2xl text-gray-300 line-through font-bold">
                  ৳
                  {Number(product.compare_price).toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
              {product.in_stock && (
                <div className="flex items-center gap-1.5 bg-[#00a884] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle size={14} /> In Stock
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 border border-gray-100 px-4 py-3 rounded-xl bg-gray-50/50 mb-8 w-fit">
              <Download size={16} className="text-purple-600" />
              <span>
                Download App for{" "}
                <a href="#" className="text-purple-600 font-black underline">
                  iOS
                </a>{" "}
                or{" "}
                <a href="#" className="text-purple-600 font-black underline">
                  Android
                </a>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center justify-between border-2 border-gray-100 rounded-2xl bg-white px-5 h-16 w-full sm:w-44 shadow-inner">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-pink-600 hover:text-[#00a884] transition-colors"
                >
                  <Minus size={18} />
                </button>

                <span className="w-12 text-center font-black text-xl text-gray-900">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-pink-600 hover:text-[#00a884] transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-grow bg-[#00a884] text-white h-14 rounded-2xl font-black text-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl active:scale-95"
              >
                <ShoppingBag size={20} /> Add to Bag
              </button>

              <button className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Heart size={24} />
              </button>
            </div>

            <div className="border-t border-gray-100 pt-10 text-gray-500 text-sm font-medium">
              Categories: {product.categories?.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupDetails;
