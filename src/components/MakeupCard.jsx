import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const MakeupCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="p-2 w-full">
      <div
        onClick={() => navigate(`/makeup/${product.slug}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-[400px] w-full rounded-[2rem] bg-white border border-pink-50 p-4 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group"
      >
        <div className="h-full flex flex-col">
          <div className="h-52 w-full flex items-center justify-center relative mb-4">
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className={`absolute w-full h-full object-contain transition-opacity duration-300 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={product.gif || product.image}
                alt={product.name}
                className={`absolute w-full h-full object-contain transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">
                Luxury Makeup
              </span>
              <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mt-1">
                {product.name}
              </h3>
            </div>

            <div className="flex justify-between items-end mt-4">
              <div>
                {product.compare_price && (
                  <span className="text-[10px] text-gray-400 line-through block">
                    ৳{product.compare_price}
                  </span>
                )}
                <span className="text-xl font-black text-[#00a884] hover:text-pink-600">
                  ৳{product.price}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="p-3 bg-[#00a884] text-white rounded-2xl hover:bg-pink-500 transition-all shadow-lg active:scale-90"
              >
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeupCard;
