import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = ({ onCartClick }) => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative bg-white border-b sticky top-0 z-[100]">
      <div className="flex justify-between items-center px-6 md:px-12 py-5">
        
        <div className="lg:hidden">
          <Menu 
            size={24} 
            className="cursor-pointer text-gray-700 hover:text-[#00a884]" 
            onClick={toggleMenu} 
          />
        </div>

     
        <Link
          to="/"
          className="text-2xl font-black text-[#00a884] tracking-tighter uppercase"
        >
          MUMUSO
        </Link>

       
        <div className="hidden lg:flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          <a href="#" className="hover:text-[#00a884]">New</a>
          <a href="/makeup" className="hover:text-[#00a884]">Makeup</a>
          <a href="#" className="hover:text-[#00a884]">Stationeries</a>
          <a href="#" className="hover:text-[#00a884]">3C Electronics</a>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6 text-gray-700">
          <Search size={20} className="hidden sm:block cursor-pointer hover:text-[#00a884]" />
          <Heart size={20} className="hidden sm:block cursor-pointer hover:text-[#00a884]" />
          
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
      </div>

      
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={toggleMenu}
      ></div>

      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[110] transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <span className="text-xl font-bold text-[#00a884]">MENU</span>
          <X size={24} className="cursor-pointer" onClick={toggleMenu} />
        </div>

        <div className="flex flex-col p-6 space-y-6 text-sm font-bold uppercase tracking-widest text-gray-600">
          <Link to="/" onClick={toggleMenu} className="hover:text-[#00a884]">New</Link>
          <Link to="/makeup" onClick={toggleMenu} className="hover:text-[#00a884]">Makeup</Link>
          <a href="#" className="hover:text-[#00a884]">Stationeries</a>
          <a href="#" className="hover:text-[#00a884]">3C Electronics</a>
          <hr />
          <div className="flex space-x-6 pt-2">
            <Search size={20} />
            <Heart size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;