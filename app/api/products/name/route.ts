import { NextRequest } from "next/server"; 
import { searchProductsByName } from "@/app/bd/data";
export async function GET(request: NextRequest) {
    const name = String(request.nextUrl.searchParams.get("name") || "");
    const product = await searchProductsByName(name);
    if (!product) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
    
}