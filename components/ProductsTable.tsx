import { fetchProductsAPI } from "../app/bd/data";
import { Producto } from "../models/Producto";
import Image from "next/image";
import Link from "next/link";
import { EditProductButton } from "./EditProductButton";
import { DeleteProductButton } from "./DeleteProductButton";

export async function ProductsTable() {
  const products = await fetchProductsAPI();

  return (
    <div className="overflow-x-auto w-full max-w-7xl">
      <Link href="/admin/products/create">
        <button className="btn btn-primary mb-8">Add Product</button>
      </Link>
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-2" style={{ minWidth: '50px' }}>ID</th>
            <th className="border border-gray-300 px-2 py-2" style={{ minWidth: '100px' }}>Image</th>
            <th className="border border-gray-300 px-2 py-2" style={{ minWidth: '70px' }}>Delete</th>
            <th className="border border-gray-300 px-2 py-2" style={{ minWidth: '70px' }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Producto, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-2">{product.id}</td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex justify-center">
                  <Image alt={product.name} src={product.image} width={50} height={50} className="object-cover" />
                </div>
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <DeleteProductButton id={product.id} />
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <EditProductButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
