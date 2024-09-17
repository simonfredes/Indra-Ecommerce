import { Producto } from "@/models/Producto";
import Image from 'next/image';

export function ProductDetails({ product }: { product: Producto }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 h-64">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="md:ml-4 mt-4 md:mt-0">
          <p className="text-xl mb-2">Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
}
