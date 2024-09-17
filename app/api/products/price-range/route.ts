import { NextRequest } from "next/server"; 
import { fetchProductsByPriceRange } from "@/app/bd/data";
export async function GET(request: NextRequest) {
    const minPrice = Number(request.nextUrl.searchParams.get("minPrice") || 0);
    const maxPrice = Number(request.nextUrl.searchParams.get("maxPrice") || 0);

    const product = await fetchProductsByPriceRange(minPrice, maxPrice);
    if (!product) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
    
}