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

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const imgRotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["25deg", "-25deg"],
  );
  const imgRotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-25deg", "25deg"],
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <div className="p-2" style={{ perspective: "1000px" }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          x.set(0);
          y.set(0);
        }}
        style={{
          rotateY: isHovered ? rotateY : 0,
          rotateX: isHovered ? rotateX : 0,
          transformStyle: "preserve-3d",
        }}
        onClick={() => navigate(`/product/${product.slug}`)}
        className="relative h-[350px] w-full rounded-2xl bg-white border border-gray-100 p-4 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        <div
          style={{
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
            transformStyle: "preserve-3d",
            transition:
              "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          className="h-full flex flex-col"
        >
          {/* Image Section */}
          <div
            className="h-44 flex items-center justify-center relative mb-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              style={{
                rotateX: isHovered ? imgRotateX : 0,
                rotateY: isHovered ? imgRotateY : 0,
                z: isHovered ? 60 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              className="max-h-full max-w-full object-contain drop-shadow-2xl pointer-events-none"
            />
          </div>

          {/* Content Section */}
          <div
            className="flex-grow flex flex-col justify-end"
            style={{
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
            }}
          >
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
      </motion.div>
    </div>
  );
};

export default ProductCard;
