import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProduct from '../Component/AllProduct';
import { addCartItem } from '../redux/productSlice';

const Menu = () => {
    const { filterby } = useParams();
    const productData = useSelector(state => state.product.productList);
    // console.log(productData);

    const productDisplay = productData.filter(el => el._id === filterby)[0];
    console.log(productDisplay);

    const dispatch = useDispatch();
    const handleAddCartProduct = (e) => {
        // e.stopPropagation();
        dispatch(addCartItem(productDisplay));
    };

    return (
        // p-2 md:p-4
        <div className='pl-2 pr-2 pb-2 pt-20 md:pl-4 md:pr-4 md:pb-4 md:pt-20'>
            <div className='w-full max-w-4xl bg-white m-auto md:flex'>
                <div className='max-w-sm overflow-hidden w-full p-5'>
                    <img src={productDisplay.image} className='hover:scale-105 transition-all h-full' />
                </div>
                <div className='flex flex-col gap-1 pl-3'>
                    <h3 className='font-semibold text-slate-600 capitalize pt-3 text-2xl md:text-4xl'>{productDisplay.name}</h3>
                    <p className='text-slate-500 font-medium capitalize text-2xl'>{productDisplay.category}</p>
                    <p className='font-bold md:text-2xl'><span className='text-red-500'>₹</span>
                        <span>{productDisplay.price}</span></p>
                    <div className='flex gap-3'>
                    <button className='bg-yellow-500 py-1 mt-2 mb-4 rounded min-w-[100px] hover:bg-yellow-600'>Buy</button>
                    <button onClick={handleAddCartProduct} className='bg-yellow-500 py-1 mt-2 mb-4 rounded min-w-[100px] hover:bg-yellow-600'>Add Cart</button>
                    </div>
                    <div>
                        <p className='text-slate-600 font-bold'>Description: </p>
                        <p>{productDisplay.description}</p>
                    </div>
                </div>
            </div>

            <AllProduct heading={"Related Product"} />
        </div>
    )
}
export default Menu;