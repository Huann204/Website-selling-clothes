import React, { useState } from "react";
import Header from "../components/Header";

import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
const DefaultLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-roboto">
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <div>
        <main className="px-[10px] lg:px-[50px] ">
          <div className="pt-[80px]  lg:pt-[110px] lg:max-w-[1620px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
      <NavMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default DefaultLayout;
