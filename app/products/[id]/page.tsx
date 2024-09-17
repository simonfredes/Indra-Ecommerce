import { getProduct } from "@/app/bd/data";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/ProductDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0) {
    notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
