import { NextRequest } from "next/server"; 
import { getProduct } from "@/app/bd/data";
export async function GET(request: NextRequest) {
    const id = Number(request.nextUrl.searchParams.get("id") || 0);
    const product = await getProduct(id);
    if (!product) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
    
}