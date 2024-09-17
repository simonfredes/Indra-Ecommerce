import { Producto } from "@/models/Producto";
import BotonCarrito from "./cliente/BotonCarrito";
import Image from 'next/image';
import Link from 'next/link';

export function Card({ producto }: { producto: Producto }) {
  return (
    <div className="card-compact w-full max-w-sm bg-base-100 shadow-xl m-4 image-full hover:opacity-80 rounded-lg cursor-pointer object-cover transition duration-200 hover:scale-105" >
      <figure className="relative h-64 w-full">
        <Image 
          src={producto.image} 
          alt={producto.name} 
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg" 
        />
      </figure>
      <div className="card-body p-4 ">
        <h2 className="card-title text-lg font-semibold">{producto.name}</h2>
        <p className="text-gray-700">unit price: ${producto.price}</p>
        <div className="card-actions justify-end">
          <BotonCarrito producto={producto} />
          <Link href={`/products/${producto.id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
