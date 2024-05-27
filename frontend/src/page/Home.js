import React, { useRef,useEffect, useState } from 'react';
import Bicycle from '../Images/bicycle.png';
import HomeCard from '../Component/HomeCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import CardFeature from '../Component/CardFeature';
import { GrPrevious, GrNext } from 'react-icons/gr';
import AllProduct from '../Component/AllProduct';

const Home = () => {
    const productData = useSelector((state) => state.product.productList);
    // console.log(productData);
    const homeProductCartList = productData.slice(1, 5);
    const homeProductCartListVegetables = productData.filter(el => el.category === "vegetable", []);
    // console.log(homeProductCartListVegetables);

    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);

    const slideProductRef = useRef();

    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200;
    }

    const preveProduct = () => {
        slideProductRef.current.scrollLeft -= 200;
    }

    return (
        <div className="pl-2 pr-2 pb-2 pt-20 md:pl-4 md:pr-4 md:pb-4 md:pt-20">
            <div className="md:flex gap-4 py-2">

                <div className="md:w-1/2">
                    <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
                        <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>

                        {/* To insert images like this place Image folder in public folder */}
                        <img src={Bicycle} className='h-7' />

                    </div>
                    <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fastest <br />Delivery to <span className="text-red-600">Your Home</span></h2>
                    <p className='py-3 text-base text-justify'>Welcome to Delish Ninjas, your exclusive haven for gourmet dining, conveniently delivered to your doorstep. We're on a mission to craft extraordinary home dining experiences. Explore our curated menu, a symphony of flavors tailored to indulge your desires. Whether it's a swift weekday dinner or a special celebration, our culinary virtuosos are at your service. Elevate your home dining with us, redefining style, speed, and unwavering quality. Ready for an exceptional culinary journey? Order now and savor the enchantment of Delish Ninjas.</p>
                    <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
                </div>

                <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
                    {
                        homeProductCartList[0] ?

                            homeProductCartList.map(el => {
                                return (
                                    <HomeCard
                                        key={el._id}
                                        id={el._id}
                                        name={el.name}
                                        image={el.image}
                                        category={el.category}
                                        price={el.price}
                                    />
                                );
                            })

                            :

                            (
                                loadingArray.map((el, index) => {
                                    return (
                                        <HomeCard
                                            key={index}
                                            loading={"Loading..."}
                                        />
                                    )
                                })
                            )
                    }

                </div>
            </div>

            <div className=''>
                <div className='flex w-full items-center'>
                    <h2 className='font-bold text-2xl text-slate-800 mb-4'>Fresh Vegetables</h2>
                    <div className='ml-auto flex gap-4'>
                        <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
                        <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>
                    </div>
                </div>
                <div className='flex gap-5 overflow-scroll no-scrollbar scroll-smooth transition-all' ref={slideProductRef}>
                    {
                        homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
                            return (
                                <CardFeature
                                    key={el._id}
                                    id={el._id}
                                    name={el.name}
                                    image={el.image}
                                    category={el.category}
                                    price={el.price}
                                />
                            )
                        })

                            :

                            loadingArrayFeature.map((el,index) =>
                                <CardFeature loading="Loading..." 
                                    key={index}
                                />
                            )
                    }
                </div>
            </div>
        
        <AllProduct heading={"Your Product"} />
        
        </div>
    );
};

export default Home;