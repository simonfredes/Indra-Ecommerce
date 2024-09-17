import { NextRequest } from "next/server"; 
import { fetchLatestProduct} from "@/app/bd/data";
export async function GET(request: NextRequest) {
    const product = await fetchLatestProduct();
    if (!product) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
    
}