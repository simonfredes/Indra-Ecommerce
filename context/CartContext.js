"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();
//TODO: ver por que no se carga la imagen en carrito, si se la paso pero no se carga en vista.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter;

  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    setCartToState();
  }, []);
  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };
  const initializeCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) => {
    const item = {
      product,
      name: name,
      price: price,
      image: image,
      stock,
      seller,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };
  
  const decreaseQuantity = (id) => {
    const newCartItems = cart?.cartItems?.map((i) =>
      i.product === id ? { ...i, quantity: i.quantity - 1 } : i
    );
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const increaseQuantity = (id) => {
    const newCartItems = cart?.cartItems?.map((i) =>
      i.product === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        increaseQuantity,
        decreaseQuantity,
        initializeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;