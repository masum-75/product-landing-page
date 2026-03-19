import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Minus,
  Plus,
  Download,
  CheckCircle,
  Truck,
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
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 transition-all duration-300">
            <div
              className="relative aspect-square bg-[#f8f8f8] rounded-[3rem] overflow-hidden flex items-center justify-center p-12 cursor-crosshair group shadow-sm"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image 2 Logic: SAVE Badge */}
              {hasDiscount && (
                <div className="absolute top-8 left-8 bg-[#e91e63] text-white text-[11px] font-black px-5 py-2 rounded-full z-10 uppercase tracking-tighter shadow-lg">
                  SAVE ৳{product.compare_price - product.price}
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

          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-2xl font-black text-pink-600 tracking-tighter">
                ৳{formattedPrice}
              </span>
              {product.in_stock && (
                <div className="flex items-center gap-1.5 bg-[#00a884] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle size={14} /> In Stock
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500 border border-gray-100 px-4 py-3 rounded-xl bg-gray-50/50 mb-6 w-fit">
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

            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-4 mb-8 shadow-sm">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Truck className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Free Shipping Offer
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Buy 1999 taka get free shipping for all products
                </p>
              </div>
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
                <ShoppingBag size={20} /> ADD TO CART
              </button>

              <button className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Heart size={24} />
              </button>
            </div>

            {/* Accordion Style Details */}
            <div className="space-y-4 border-t border-gray-100 pt-10">
              <div className="flex justify-between items-center text-sm font-bold text-gray-700 uppercase tracking-widest border-b border-gray-50 pb-4">
                <span>Description:</span>
                <Plus size={16} />
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-gray-700 uppercase tracking-widest border-b border-gray-50 pb-4">
                <span>SKU:</span>
                <Plus size={16} />
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-gray-700 uppercase tracking-widest border-b border-gray-50 pb-4">
                <span>Categories:</span>
                <span className="text-gray-400 font-medium normal-case">
                  {product.categories?.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupDetails;
