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

  // Smoothness baranor jonno stiffness komiye damping ektu bariyechi
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 20 });

  // 360 Degree Rotation Logic
  const imgRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["180deg", "-180deg"],
  );
  const imgRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["-30deg", "30deg"],
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="p-2" style={{ perspective: "1500px" }}>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/product/${product.slug}`)}
        className="relative h-[350px] w-full rounded-2xl bg-white border border-gray-100 p-4 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Image Section */}
          <div
            className="h-44 flex items-center justify-center relative mb-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow effect for better depth */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.5,
              }}
              className="absolute h-32 w-32 bg-[#00a884]/10 blur-[50px] rounded-full"
            />

            <motion.img
              src={product.image}
              alt={product.name}
              style={{
                rotateY: imgRotateY,
                rotateX: imgRotateX,
                z: isHovered ? 120 : 0,
                scale: isHovered ? 1.25 : 1,
                transformStyle: "preserve-3d",
              }}
              className="max-h-full max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] pointer-events-none"
            />
          </div>

          {/* Content Section */}
          <div className="flex-grow flex flex-col justify-end">
            <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight mb-2">
              {product.name}
            </h3>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg font-black text-[#00a884]">
                ৳{product.price}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="p-2 bg-[#00a884] text-white rounded-lg hover:bg-black transition-colors active:scale-90"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
