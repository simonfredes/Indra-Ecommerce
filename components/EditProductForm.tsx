'use client'
import { updateProduct } from '@/app/bd/data';
import { Producto } from '@/models/Producto';
import Link from 'next/link';
import { useState } from 'react';

export default function EditProductForm({ id, price, name, image }: { id: number, price: number, name: string, image: string }) {
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' | '' }>({ message: '', type: '' });

  const editProduct = () => {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const priceInput = document.getElementById('price') as HTMLInputElement;
    const imageInput = document.getElementById('image') as HTMLInputElement;
    const priceValue = parseFloat(priceInput.value);

    if (priceValue === 0) {
      setAlert({ message: 'Product cannot have a value of zero.', type: 'error' });
      return;
    }

    const newProduct: Producto = {
      name: nameInput.value,
      price: priceValue,
      image: imageInput.value,
      stock: 0,
      seller: '',
      quantity: 0,
      size: '',
      id: id
    };

    updateProduct(newProduct).then((res) => {
      setAlert({ message: 'Product updated successfully!', type: 'success' });
    }).catch((error) => {
      setAlert({ message: 'An error occurred while updating the product.', type: 'error' });
      console.error(error);
    });
  }

  return (
    <div className='flex flex-col' style={{ gap: '10px', minWidth: '50vw' }}>
      {alert.message && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'} p-4 rounded-md mb-4`}>
          {alert.message}
        </div>
      )}
      <label className="input input-bordered  flex items-center gap-2">
        Name
        <input type="text" id='name' className="grow" defaultValue={name} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Price
        <input type="number" id='price' className="grow" defaultValue={price} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Image
        <input type="text" id='image' className="grow" defaultValue={image} />
      </label>

      <button className='btn btn-primary' onClick={editProduct}>Edit</button>
      <Link href='/admin/products'>
        <button className='btn btn-secondary'>Back to TableProducts</button>
      </Link>
    </div>
  );
}
