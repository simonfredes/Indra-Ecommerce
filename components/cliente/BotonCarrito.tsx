'use client'
import { useContext } from "react"
import CartContext from "@/context/CartContext"
import { Producto } from "@/models/Producto"
import toast from "react-hot-toast";

export default function BotonCarrito({ producto }: { producto: Producto }) {
    const productId = producto.id;
    const { addItemToCart, cart, initializeCart } = useContext(CartContext)

    const addToCartHandler = () => {
        initializeCart();
        try{
        const productInCart = cart.cartItems.find((item: any) => item.product === productId);
        console.log(productInCart)
        if (productInCart) {
            toast.error(producto.name + ' already in your cart.');
        }
        else {
            toast.success(producto.name + ' added to your cart.');
            addItemToCart({ product: productId, name: producto.name, price: producto.price, image: producto.image, quantity: 1 })


        }
    }catch(error){
        toast.success(producto.name + ' added to your cart.');
        addItemToCart({ product: productId, name: producto.name, price: producto.price, image: producto.image, quantity: 1 })
    }


    }
    return (
        <button className="btn btn-primary" onClick={addToCartHandler}>Add to cart</button>
    )


}