'use client'
import { useContext } from "react"
import CartContext from "@/context/CartContext"

export default function BotonCarrito({productId}: {productId: number}) {

    const {addItemToCart} = useContext(CartContext)
    
    const addToCartHandler = () => {
        console.log(productId)
        addItemToCart({product:  productId, quantity: 1}) //aca, tengo que llenar los parametros que recibe addItemToCart
                                                          //TODO> recibir el item, desglosarlo, y pasarle al additemToCart
                                                          // los parametros desglosados.
        
    }
    function handlePress() {
        console.log('click')

    }
    
    return (
        <button className= "btn btn-primary" onClick={addToCartHandler}>Add to cart</button>
    )
}