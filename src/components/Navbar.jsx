import React from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = ({ onCartClick }) => {
  const { cartCount } = useCart();

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white border-b sticky top-0 z-[100]">
      <Link
        to="/"
        className="text-2xl font-black text-[#00a884] tracking-tighter uppercase"
      >
        MUMUSO
      </Link>
      <div className="hidden lg:flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-gray-500">
        <a href="#" className="hover:text-[#00a884]">
          New
        </a>
        <a href="/makeup" className="hover:text-[#00a884]">
          Makeup
        </a>
        <a href="#" className="hover:text-[#00a884]">
          Stationeries
        </a>
        <a href="#" className="hover:text-[#00a884]">
          3C Electronics
        </a>
      </div>
      <div className="flex items-center space-x-6 text-gray-700">
        <Search size={20} className="cursor-pointer hover:text-[#00a884]" />
        <Heart size={20} className="cursor-pointer hover:text-[#00a884]" />
        <div className="relative cursor-pointer group" onClick={onCartClick}>
          <ShoppingBag size={20} className="group-hover:text-[#00a884]" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
        <User size={20} className="cursor-pointer hover:text-[#00a884]" />
      </div>
    </nav>
  );
};

export default Navbar;
