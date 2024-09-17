"use server"
import { Producto } from '@/models/Producto';
import {MercadoPagoConfig, Preference} from 'mercadopago';
import {redirect} from "next/navigation";
import { addOrder } from '../bd/data';
import { getServerSession } from 'next-auth';


export async  function createPreference(cart : any, buyerEmail: string) {
    const products: any = [];    
    cart.cartItems.map((product : ({ product: any; name: any; price: any; image: any; quantity: any; })) => {
        products.push({
            id: String (product.product),
            title: product.name,
            quantity: product.quantity,
            unit_price: Number(product.price)
        })
    })

    console.log("HOLA")
    products.map((product : any) => {
        console.log(product);

    })
    const data = {
        email: buyerEmail,
        products: products
    }
    const orderId= await addOrder(data);
    const client = new MercadoPagoConfig({ accessToken: "APP_USR-8054286611689859-061420-03d72c9dd0217415d53abc9ac36d0dc6-195730350"});
    const preference = await new Preference(client).create({
        body: {
            items: products,
            external_reference: orderId.toString(),

        }
    })
    

    redirect(preference.init_point!);

}