'use server'
import { Producto } from '@/models/Producto';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
export async function fetchProducts(limit: number, offset: number) {
  noStore();
  try {
    const response = await sql<Producto>`SELECT * FROM products ORDER BY id ASC LIMIT ${limit} OFFSET ${offset};`;
    return response.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function fetchLatestProduct() {
  noStore();
  try {
    const response = await sql<Producto>`SELECT * FROM products ORDER BY id DESC LIMIT 1;`;
    return response.rows[0];
  } catch (error) {
    console.error('Error fetching latest product:', error);
    throw error;
  }
}
export async function searchProductsByName(name: string) {
  noStore();
  try {
    const response = await sql<Producto>`SELECT * FROM products WHERE name ILIKE ${'%' + name + '%'};`;
    return response.rows;
  } catch (error) {
    console.error('Error searching products by name:', error);
    throw error;
  }
}

export async function fetchProductsByPriceRange(minPrice: number, maxPrice: number) {
  noStore();
  try {
    const response = await sql<Producto>`SELECT * FROM products WHERE price BETWEEN ${minPrice} AND ${maxPrice};`;
    return response.rows;
  } catch (error) {
    console.error('Error fetching products by price range:', error);
    throw error;
  }
}
export async function fetchProductsAPI() {
  noStore();
  try {
    const response = await sql<Producto>`SELECT * FROM products ORDER by id ASC`;
    return response.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchTotalProducts() {
  noStore();
  try {
    const response = await sql<{ count: number }>`SELECT COUNT(*) FROM products;`;
    return response.rows[0].count;
  } catch (error) {
    console.error('Error fetching total products:', error);
    throw error;
  }
}

export async function addProduct(product: Producto) {
  noStore();
  try {
    const response = await sql`
      INSERT INTO products (name, price, image, stock, seller, quantity, size)
      VALUES (${product.name}, ${product.price}, ${product.image}, ${product.stock}, ${product.seller}, ${product.quantity}, ${product.size});
    `;
    return response;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}
export async function getProduct(id: number) {
  noStore();
  try {
    const response = await sql<Producto>`SELECT * FROM products WHERE id = ${id};`;
    return response.rows[0];
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function updateProduct(product: Producto) {
  noStore();
  try {
    const response = await sql`
      UPDATE products
      SET
        name = ${product.name},
        price = ${product.price},
        image = ${product.image},
        stock = ${product.stock},
        seller = ${product.seller},
        quantity = ${product.quantity},
        size = ${product.size}
      WHERE id = ${product.id};
    `;
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  noStore();
  try {
    const response = await sql`
      DELETE FROM products
      WHERE id = ${id};
    `;
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export async function addPayment(id: string) {
  if (id == "") {
    return
  }
  noStore();
  try {
    const response = await sql`
    UPDATE orders
    SET
      status = TRUE
    WHERE id = ${id};
  `;
  return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function addOrder(data: any) {
  noStore();
  try {
    const responseOrder = await sql`
    INSERT INTO orders (id,email,status)
    VALUES (default, ${data.email}, default) RETURNING id;
  `;
  data.products.forEach(async (product: any) => {
    await sql`
      INSERT INTO orderitems (id,idorder, idproduct, amount,price)
      VALUES (default, ${responseOrder.rows[0].id}, ${product.id}, ${product.quantity}, ${product.unit_price})
    `;
  })
  return responseOrder.rows[0].id;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
export async function fetchUsers() {
  noStore();
  try {
    const response = await sql<User>`SELECT id, email FROM users ORDER BY id ASC;`;
    return response.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

}
export async function fetchOrders() {
  noStore();
  try {
    const response = await sql`SELECT * FROM orders ORDER BY id ASC;`;
    const orders = response.rows;

    for (const order of orders) {
      const items = await sql`SELECT * FROM orderitems WHERE idorder = ${order.id};`;
      order.items = items.rows;
    }
    console.log(response.rows)
    return response.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}