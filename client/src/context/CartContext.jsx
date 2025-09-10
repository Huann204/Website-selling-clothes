// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // thêm vào giỏ
  function addToCart(product, color, size, qty = 1) {
    const id = `${product.id}_${color}_${size}`;
    setCart((prev) => {
      const exist = prev.find((item) => item.id === id);
      if (exist) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          id,
          productId: product.id,
          title: product.title,
          slug: product.slug,
          thumbnail: product.thumbnail.src,
          color,
          size,
          price: product.salePrice || product.price,
          qty,
        },
      ];
    });
  }

  // xoá
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // cập nhật số lượng
  function updateQty(id, qty) {
    const nextQty = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 1;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: nextQty } : item))
    );
  }

  // clear hết
  function clearCart() {
    setCart([]);
  }

  // tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
