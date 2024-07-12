import { Producto } from "@/models/Producto";
import BotonCarrito from "./cliente/BotonCarrito";
import Image from 'next/image';

export function Card({ producto }: { producto: Producto }) {
  return (
    <div className="card-compact w-full max-w-sm bg-base-100 shadow-xl m-4 image-full">
      <figure className="relative h-64 w-full">
        <Image 
          src={producto.image} 
          alt={producto.name} 
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg" 
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">nombre: {producto.name}</h2>
        <p className="text-gray-700">precio: ${producto.price}</p>
        <div className="card-actions justify-end">
          <BotonCarrito productId={producto.id} />
        </div>
      </div>
    </div>
  );
}
