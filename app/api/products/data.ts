import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
export async function fetchProducts() {
  noStore();
  try{
    const response = await sql`SELECT * FROM products;`;

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
