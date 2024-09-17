"use client"
import React, { useState, useContext } from 'react';
import CartContext from "@/context/CartContext"
import Image from 'next/image';
import { createPreference } from '@/app/payments/payment.controller';
import Link from 'next/link';

import { toast } from 'react-hot-toast';


export async function cleanCarrito() {
  localStorage.removeItem('cart')
}

const ShoppingCart: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { addItemToCart, cart, deleteItemFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

  const handleRemove = (productItem: any) => {
    const idProduct = productItem.product
    let toastID: any;
    const onAccept = () => {
      toast.dismiss(toastID)
      deleteItemFromCart(idProduct)
      toast.success('Item removed from cart')
    }
    toast((t) => (
      toastID = t.id,
      <span className='column gap-2'>
        <b>Confirm delete item from Cart</b>
        <div className='row mt-2 justify-center gap-2'>
          <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mr-2' onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
          <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full' onClick={onAccept}>
            Remove item
          </button>
        </div>


      </span>
    ));
  }



  const handlePayment = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    console.log(cart)

    createPreference(cart, email)
  }

  const handleIncrement = (productItem: any) => {
    const idProduct = productItem.product
    increaseQuantity(idProduct);
  }

  const handleDecrement = (productItem: any) => {
    const idProduct = productItem.product
    if (productItem.quantity <= 1) return

    decreaseQuantity(idProduct);
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const totalAmount: number = 0 + cart?.cartItems?.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">{cart?.cartItems?.length || 0} items in Shopping Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart?.cartItems?.map((cartItem: any) => (
                <div key={cartItem.id} className="rounded-lg border border-gray-200
                bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link href="#" className="w-20 shrink-0 md:order-1">
                      <Image className="h-20 w-20 dark:hidden" src={cartItem.image} alt="imac image" width={100} height={100} />
                      <Image className="hidden h-20 w-20 dark:block" src={cartItem.image} alt="imac image" width={100} height={100} />
                    </Link>

                    <label htmlFor="counter-input" className="sr-only">{cartItem.quantity}Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button type="button" id="decrement-button-5" data-input-counter-decrement="counter-input-5" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          onClick={() => handleDecrement(cartItem)}>
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <input type="text" id="counter-input-5" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={cartItem.quantity} required />
                        <button type="button" id="increment-button-5" data-input-counter-increment="counter-input-5" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          onClick={() => handleIncrement(cartItem)}>
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 font-serif">
                          c/u ${cartItem.price}
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white font-serif">
                          ${(cartItem.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <Link href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{cartItem.name}</Link>

                      <div className="flex items-center gap-4">
                        

                        <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={() => handleRemove(cartItem)}>
                          <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                          </svg>
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Resumen de compra</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email de facturacion</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  />
                  {emailError && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{emailError}</p>}
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white font-serif">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</dd>
                </dl>
              </div>

              <button onClick={handlePayment} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-green-600 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
