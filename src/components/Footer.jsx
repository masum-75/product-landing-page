import React from "react";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#00a884] text-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-4xl font-black tracking-tighter leading-none">
                MUMUSO
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] ml-1">
                BANGLADESH
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold">Follow Us</h4>
              <div className="flex gap-5">
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <Facebook size={26} fill="white" stroke="none" />
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  <Instagram size={26} />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest">
              Product
            </h4>
            <ul className="space-y-4 text-[15px] font-medium opacity-90">
              <li>
                <a href="#" className="hover:underline underline-offset-4">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-4 text-[15px] font-medium opacity-90">
              <li>
                <a href="#" className="hover:underline underline-offset-4">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">
                  Returns and Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline underline-offset-4">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest opacity-60">
          <p>© 2026 Mumuso Bangladesh. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
