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

  // Motion values for tracking mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring configuration
  const springConfig = { stiffness: 45, damping: 20 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // 360 Degree rotation based on hover
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

  // Zoom logic
  const scale = useSpring(isHovered ? 1.35 : 1, { stiffness: 70, damping: 15 });

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
      <div className="h-screen flex items-center justify-center font-bold text-[#00a884] animate-pulse text-xl">
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
      <main className="container mx-auto px-6 md:px-12 py-10 flex-grow">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-black mb-12 transition-all font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Shop
        </button>

        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* 360° Zoomable Image Section */}
          <div
            className="w-full lg:w-1/2 flex justify-center"
            style={{ perspective: "1500px" }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-square bg-[#f8fcfb] rounded-[40px] flex items-center justify-center border border-gray-50 shadow-inner overflow-hidden cursor-zoom-in"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-radial-gradient from-[#00a884]/5 to-transparent blur-3xl pointer-events-none"
              />

              <motion.img
                src={product.image}
                alt={product.name}
                style={{
                  rotateY,
                  rotateX,
                  scale,
                  z: isHovered ? 120 : 0,
                  transformStyle: "preserve-3d",
                }}
                className="max-h-[75%] object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.12)] pointer-events-none"
              />

              {/* Top Right Floating Badge */}
              <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute top-10 right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl hidden md:block"
              >
                <div className="text-[10px] font-black text-[#00a884] uppercase">
                  Authentic
                </div>
                <div className="text-xs font-bold text-gray-800 tracking-tighter">
                  Premium Grade
                </div>
              </div>
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="text-[#00a884] font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              Official Mumuso Store
            </div>
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6 leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-5xl font-black text-red-500 tracking-tighter">
                ৳{product.price}
              </span>
              <div className="h-10 w-[1px] bg-gray-200"></div>
              <span className="bg-green-50 text-[#00a884] text-[10px] font-black px-4 py-2 rounded-full uppercase border border-green-100">
                In Stock Now
              </span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-12 text-lg max-w-xl">
              {product.description ||
                "Experience the perfect blend of style and utility with this Mumuso lifestyle essential. Designed for modern living."}
            </p>

            {/* Qty & Add to Cart */}
            <div className="flex flex-wrap items-center gap-8 mb-12">
              <div className="flex items-center border-2 border-gray-100 rounded-full p-1 bg-gray-50/50">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="p-4 hover:bg-white rounded-full transition-all text-gray-400 hover:text-black"
                >
                  <Minus size={20} />
                </button>
                <span className="w-14 text-center font-black text-xl text-gray-800">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-4 hover:bg-white rounded-full transition-all text-gray-400 hover:text-black"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="flex-grow bg-[#00a884] text-white font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-4 hover:bg-black transition-all shadow-2xl shadow-teal-100 uppercase tracking-widest text-sm active:scale-95"
              >
                <ShoppingCart size={22} strokeWidth={2.5} /> Add to Cart
              </button>
            </div>

            {/* Trust Badges - Back to Original Design */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-blue-50 text-blue-500 rounded-3xl">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  100% Genuine
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-purple-50 text-purple-500 rounded-3xl">
                  <Award size={24} />
                </div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Quality Check
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-teal-50 text-[#00a884] rounded-3xl">
                  <CheckCircle size={24} />
                </div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  BSTI Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsPage;
