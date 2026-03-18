import React from "react";
import { useNavigate } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onClick={() => navigate(`/product/${product.slug}`)}
      className="relative h-96 w-full rounded-2xl bg-white border border-gray-100 p-6 cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="h-full flex flex-col justify-between"
      >
        {/* Floating Image */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="flex-1 flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-48 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
          />
        </div>

        {/* Content */}
        <div style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-black text-[#00a884]">
              ৳{product.price}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="p-3 bg-[#00a884] text-white rounded-xl hover:bg-black transition-colors shadow-lg"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
