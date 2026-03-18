import React from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, cartCount } = useCart();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="px-6 py-5 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2 italic">
              CART ({cartCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <ShoppingBag size={50} strokeWidth={1} />
                <p className="mt-4 font-medium uppercase text-xs tracking-widest text-center">
                  Your bag is empty
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-50 pb-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg p-2">
                    <img
                      src={item.image}
                      className="w-full h-full object-contain"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">
                      Quantity: {item.qty}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-black text-[#00a884]">
                        ৳{item.price * item.qty}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50 shadow-inner">
              <div className="flex justify-between text-lg font-black mb-6 uppercase">
                <span>Subtotal</span>
                <span>৳{totalPrice}</span>
              </div>
              <button className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-[#00a884] transition-all uppercase tracking-widest text-xs">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
