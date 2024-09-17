import EditProductForm from "@/components/EditProductForm";
import {getProduct} from "@/app/bd/data";
import { notFound } from "next/navigation";
export default async function Page( {params}: { params: { id: string } } ) {
    const id = Number(params.id);
    if (isNaN(id) || id <= 0) 
        notFound();
    
    const product = await getProduct(id);
    if (!product) {
        notFound();
    }
    return (
        <div>
            <EditProductForm id={id} name={product.name} price={product.price} image={product.image}/>
        </div>
    );
}