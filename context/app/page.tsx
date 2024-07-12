import { Card } from "@/components/Card";
import { Producto } from "@/models/Producto";
import { fetchProducts } from "./api/products/data";
export default async function Home() {
    const { rows } = await fetchProducts();
    const productos: Producto[] = rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        price: row.price,
        image: row.image,
        stock: row.stock,
        seller: row.seller,
        quantity: row.quantity,
        size: row.size
    }));
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {productos.map((elemento: Producto) => (
                <Card producto={elemento} key={elemento.id} />
            ))}
        </div>
    );
}