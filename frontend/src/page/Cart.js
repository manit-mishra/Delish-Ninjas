import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../Component/CartProduct';
import emptyCartImage from '../Images/empty.gif';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
   const productCartItem = useSelector((state) => state.product.cartItem);
   console.log(productCartItem);

   const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
   const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);

   const handlePayment = async () => {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      // console.log("Payment button");
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(productCartItem),
      });
      if (res.statusCode === 500) return;

      const data = await res.json();
      console.log(data);

      toast("Redirecting to the Payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
   }

   return (
      <>
         <div className='pl-2 pr-2 pb-2 pt-20 md:pl-4 md:pr-4 md:pb-4 md:pt-20'>
            <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Your Cart Items</h2>

            {
               productCartItem[0] ?

                  <div className='my-4 flex gap-3'>
                     {/* display cart items */}
                     <div className='w-full max-w-3xl'>
                        {
                           productCartItem.map(el => {
                              return (
                                 <CartProduct
                                    key={el._id}
                                    id={el._id}
                                    name={el.name}
                                    image={el.image}
                                    category={el.category}
                                    qty={el.qty}
                                    total={el.total}
                                    price={el.price}
                                 />
                              )
                           })
                        }
                     </div>

                     {/* total cart items */}
                     <div className='w-full max-w-md  ml-auto'>
                        <h2 className='bg-blue-500 text-white p-2 text-lg'>Summary</h2>
                        <div className='flex w-full py-2 text-lg border-b'>
                           <p>Total Qty :</p>
                           <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                        </div>
                        <div className='flex w-full py-2 text-lg border-b'>
                           <p>Total Price :</p>
                           <p className='ml-auto w-32 font-bold'><span className='text-red-500'>₹</span>{totalPrice}</p>
                        </div>
                        <button className='bg-red-500 w-full text-lg font-bold py-2 text-white' onClick={handlePayment}>Payment</button>
                     </div>
                  </div>

                  :

                  <>
                     <div className='flex w-full justify-center items-center flex-col'>
                        <img src={emptyCartImage} className='w-full max-w-sm' />
                        <p className='text-slate-500 text-3xl font-bold'>Empty Cart</p>
                     </div>
                  </>
            }
         </div>
      </>
   );
};

export default Cart;