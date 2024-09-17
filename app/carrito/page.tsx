"use client"
import { Card } from "@/components/Card";
import ShoppingCart from "@/components/cart/ShoppingCart";
import Link from "next/link";

const CartPage: React.FC = () => {
  return (
    <div>
      <ShoppingCart />
    </div>
  );
};

export default CartPage;
