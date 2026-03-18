import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  Award,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 45, damping: 20 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    isHovered ? ["180deg", "-180deg"] : ["0deg", "0deg"],
  );
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    isHovered ? ["-25deg", "25deg"] : ["0deg", "0deg"],
  );

  const scale = useSpring(isHovered ? 1.3 : 1, { stiffness: 70, damping: 15 });

  // Mouse and Touch Event Handler
  const handleMove = (clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    const xPct = (clientX - rect.left) / rect.width - 0.5;
    const yPct = (clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((json) => {
        const found = json.data.find((p) => p.slug === slug);
        setProduct(found);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold text-[#00a884] animate-pulse">
        Loading...
      </div>
    );
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-serif text-2xl text-gray-400">
        Product Not Found!
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-10 flex-grow">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-black mb-6 md:mb-12 transition-all font-bold uppercase text-[10px] md:text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          {/* 360° Image Section */}
          <div
            className="w-full lg:w-1/2 flex justify-center"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              onMouseMove={(e) =>
                handleMove(e.clientX, e.clientY, e.currentTarget)
              }
              onTouchMove={(e) => {
                setIsHovered(true);
                handleMove(
                  e.touches[0].clientX,
                  e.touches[0].clientY,
                  e.currentTarget,
                );
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                x.set(0);
                y.set(0);
              }}
              onTouchEnd={() => {
                setIsHovered(false);
                x.set(0);
                y.set(0);
              }}
              className="relative w-full aspect-square bg-[#f8fcfb] rounded-[30px] md:rounded-[40px] flex items-center justify-center border border-gray-50 shadow-inner overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-radial-gradient from-[#00a884]/5 to-transparent blur-3xl"
              />

              <motion.img
                src={product.image}
                alt={product.name}
                style={{
                  rotateY,
                  rotateX,
                  scale,
                  z: isHovered ? 80 : 0,
                  transformStyle: "preserve-3d",
                }}
                className="max-h-[70%] md:max-h-[75%] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.1)] pointer-events-none"
              />

              {/* Floating Badge (Hidden on small mobile for space) */}
              <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-white shadow-lg hidden sm:block">
                <div className="text-[8px] md:text-[10px] font-black text-[#00a884] uppercase">
                  Authentic
                </div>
                <div className="text-[10px] md:text-xs font-bold text-gray-800 tracking-tighter">
                  Premium Grade
                </div>
              </div>
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
            <div className="text-[#00a884] font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-3 md:mb-4">
              Official Mumuso Store
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight md:leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 mb-8 md:mb-10">
              <span className="text-4xl md:text-5xl font-black text-red-500 tracking-tighter">
                ৳{product.price}
              </span>
              <div className="h-8 md:h-10 w-[1px] bg-gray-200"></div>
              <span className="bg-green-50 text-[#00a884] text-[9px] md:text-[10px] font-black px-3 md:px-4 py-2 rounded-full uppercase border border-green-100">
                In Stock Now
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 md:mb-12 text-sm md:text-lg max-w-xl mx-auto lg:mx-0">
              {product.description ||
                "Experience the perfect blend of style and utility with this Mumuso lifestyle essential."}
            </p>

            {/* Qty & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 mb-10 md:mb-12">
              <div className="flex items-center border-2 border-gray-100 rounded-full p-1 bg-gray-50/50">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="p-3 md:p-4 hover:bg-white rounded-full transition-all text-gray-400 hover:text-black"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 md:w-14 text-center font-black text-lg md:text-xl text-gray-800">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 md:p-4 hover:bg-white rounded-full transition-all text-gray-400 hover:text-black"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="w-full sm:flex-grow bg-[#00a884] text-white font-black py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 md:gap-4 hover:bg-black transition-all shadow-xl shadow-teal-100 uppercase tracking-widest text-xs md:text-sm active:scale-95"
              >
                <ShoppingCart size={20} strokeWidth={2.5} /> Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-8 md:pt-10 border-t border-gray-100">
              <Badge
                icon={<ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />}
                label="100% Genuine"
              />
              <Badge
                icon={<Award className="w-5 h-5 md:w-6 md:h-6" />}
                label="Quality Check"
              />
              <Badge
                icon={<CheckCircle className="w-5 h-5 md:w-6 md:h-6" />}
                label="BSTI Certified"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Badge = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 md:gap-3">
    <div className="p-3 md:p-4 bg-gray-50 text-gray-600 rounded-2xl md:rounded-3xl">
      {icon}
    </div>
    <span className="text-[7px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">
      {label}
    </span>
  </div>
);

export default ProductDetailsPage;
