'use client'
import { useState } from 'react';
import { addProduct } from '@/app/bd/data';
import { Producto } from '@/models/Producto';
import { CldUploadButton } from 'next-cloudinary';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CreateProductForm({ price, name, image }: { price: number, name: string, image: string }) {
  const [imageUrl, setImageUrl] = useState<string>(image);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const handleUpload = (result: any) => {
    setImageUrl(result.info.secure_url);
    
    toast(
      "Image uploaded successfully",
      {
        duration: 6000,
        position: "top-center",
        icon: "👏",
        
        style: {
          background: "#363636",
          color: "#00ff00",
        },
      }
    );  };

  const createProduct =  () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const price = (document.getElementById('price') as HTMLInputElement).value;
    const priceValue = parseFloat(price);

    if (priceValue === 0) {
      toast.error("Product cannot have a value of zero");
    }
    
    if (!name || !price || !imageUrl) {
      toast.error("Please, fill all the fields");
    } else {

      const newProduct: Producto = {
        name,
        price: Number(price),
        image: imageUrl,
        stock: 0,
        seller: '',
        quantity: 0,
        size: '',
        id: 0
      };
      try {
         toast.promise(
          addProduct(newProduct),
          {
            loading: 'Saving...',
            success: <b>Product created successfully!</b>,
            error: <b>Could not save the product.</b>,
          }
        );
  
      } catch (error) {
        toast.error("Error creating product");
      }
    }

  };

  return (
    <div className='flex flex-col' style={{ gap: '10px', minWidth: '50vw' }}>
      {alert.message && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'} p-4 rounded-md mb-4`}>
          {alert.message}
        </div>
      )}
      <label className="input input-bordered flex items-center gap-2">
        Name
        <input type="text" id='name' className="grow" defaultValue={name} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Price
        <input type="number" id='price' className="grow" defaultValue={price} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Image
        <CldUploadButton uploadPreset='ml_default' onUpload={handleUpload} />
      </label>

      <button className='btn btn-primary' onClick={createProduct}>Create</button>
      <Link href='/admin/products'>
        <button className='btn btn-secondary'>Back to TableProducts</button>
      </Link>
    </div>
  );
}
