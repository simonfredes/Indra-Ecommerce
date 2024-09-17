'use client'
import { useState } from 'react';
import { deleteProduct } from '../app/bd/data';
import Link from 'next/link';
import { useEffect } from 'react';
export function DeleteProductButton({ id }: { id: number }) {
    const [showAlert, setShowAlert] = useState(false);

    const delProduct = () => {
        setShowAlert(true);
    };

    const handleAccept = () => {
        deleteProduct(id);
        setShowAlert(false);
    };

    const handleDeny = () => {
        setShowAlert(false);
    };

    return (
        <>
            {showAlert && (
                <div role="alert" className="alert fixed bottom-20 right-10 shadow-md max-w-md" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Are you sure you want to delete this product with id: <div className='badge'>{id}</div>?</span>
                    <div>
                        <button className="btn btn-sm" onClick={handleDeny}>Deny</button>
                        <Link href={'/admin/products'} className="btn btn-sm btn-primary">
                            <button className="btn btn-sm btn-primary" onClick={handleAccept}>Accept</button>
                        </Link>
                    </div>
                </div>
            ) || (
                    <button className="btn btn-error" onClick={delProduct}>Delete</button>

                )
            }
        </>
    );
}
