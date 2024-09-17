const { sql } = require('@vercel/postgres');
const createTables = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image TEXT,
        stock INTEGER,
        seller VARCHAR(100),
        quantity INTEGER,
        size VARCHAR(10)
      );
    `;
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

const seedData = async () => {
  const products = [
    {
      name: 'Cerveza',
      price: 5.99,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 10,
      seller: 'Vendedor 1',
      quantity: 1,
      size: 'M'
    },
    {
      name: 'Camisa',
      price: 19.99,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 20,
      seller: 'Vendedor 2',
      quantity: 2,
      size: 'L'
    },
    {
      name: 'Remeron',
      price: 15,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 20,
      seller: 'Vendedor 3',
      quantity: 2,
      size: 'L'
    },
    {
      name: 'Remeron',
      price: 10,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 10,
      seller: 'Vendedor 4',
      quantity: 2,
      size: 'M'
    },
    {
      name: 'lompa',
      price: 10,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 20,
      seller: 'Vendedor 2',
      quantity: 2,
      size: 'L'
    },
    {
      name: 'gorra',
      price: 19.99,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 20,
      seller: 'Vendedor 2',
      quantity: 2,
      size: 'L'
    },
    {
      name: 'Ojotas',
      price: 5.35,
      image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
      stock: 20,
      seller: 'Vendedor 2',
      quantity: 2,
      size: 'L'
    },
    
  ];

  try {
    for (const product of products) {
      await sql`
        INSERT INTO products (name, price, image, stock, seller, quantity, size)
        VALUES (${product.name}, ${product.price}, ${product.image}, ${product.stock}, ${product.seller}, ${product.quantity}, ${product.size})
      `;
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

const runSeeds = async () => {
  await createTables();
  await seedData();
};

runSeeds();
