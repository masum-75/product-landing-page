import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Rotate logic: Desktop and Mobile touch-friendly
  const imgRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    isHovered ? ["180deg", "-180deg"] : ["0deg", "0deg"],
  );
  const imgRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    isHovered ? ["-25deg", "25deg"] : ["0deg", "0deg"],
  );

  const handleMove = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const xPct = (clientX - rect.left) / rect.width - 0.5;
    const yPct = (clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const resetValues = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="p-2 w-full" style={{ perspective: "1500px" }}>
      <div
        // Event handlers for both Desktop and Mobile
        onMouseMove={(e) => handleMove(e.clientX, e.clientY, e.currentTarget)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetValues}
        onTouchStart={() => setIsHovered(true)}
        onTouchMove={(e) =>
          handleMove(
            e.touches[0].clientX,
            e.touches[0].clientY,
            e.currentTarget,
          )
        }
        onTouchEnd={resetValues}
        onClick={() => navigate(`/product/${product.slug}`)}
        className="relative h-[380px] md:h-[350px] w-full rounded-3xl bg-white border border-gray-100 p-4 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Image Section: Mobile-e ekhon boro dekhabe */}
          <div
            className="h-56 md:h-44 w-full flex items-center justify-center relative mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background Glow */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.5 : 0.8,
              }}
              className="absolute h-32 w-32 bg-[#00a884]/10 blur-[50px] rounded-full pointer-events-none"
            />

            <motion.img
              src={product.image}
              alt={product.name}
              style={{
                rotateY: imgRotateY,
                rotateX: imgRotateX,
                z: isHovered ? 120 : 0,
                scale: isHovered ? 1.3 : 1, // Increased zoom for mobile
                transformStyle: "preserve-3d",
              }}
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] pointer-events-none"
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>

          {/* Content Section */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-sm md:text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </div>

            <div className="flex justify-between items-end mt-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Price
                </span>
                <span className="text-xl md:text-lg font-black text-[#00a884]">
                  ৳{product.price}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="p-3 bg-[#00a884] text-white rounded-2xl hover:bg-black transition-all shadow-lg shadow-teal-100 active:scale-90"
              >
                <ShoppingCart size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
