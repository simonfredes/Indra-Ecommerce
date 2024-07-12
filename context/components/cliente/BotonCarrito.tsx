'use client'
import { useContext } from "react"
import CartContext from "@/context/CartContext"

export default function BotonCarrito({productId}: {productId: number}) {

    const {addItemToCart} = useContext(CartContext)
    
    const addToCartHandler = () => {
        addItemToCart({product:  productId})
    }
    function handlePress() {
        console.log('click')

    }
    
    return (
        <button className= "btn btn-primary" onClick={addToCartHandler}>Add to cart</button>
    )
}