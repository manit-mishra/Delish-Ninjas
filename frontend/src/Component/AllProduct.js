import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const AllProduct = ({ heading, id }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map(el => el.category))];

    //Filter data display
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData)
    }, [productData]
    )

    const handFilterProduct = (category) => {
        setFilterBy(category);
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase());
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }

    const loadingArrayFeature = new Array(10).fill(null);
    return (
        <>
            <div className='my-5'>
                <h2 className='font-bold text-2xl text-slate-800 mb-4'>
                    {heading}
                </h2>

                <div className='flex gap-4 justify-center overflow-scroll no-scrollbar'>
                    {
                        categoryList[0]

                            ?

                            categoryList.map(el => {
                                return (
                                    <FilterProduct 
                                    category={el} 
                                    key={el}
                                    isActive={el === filterby}
                                    onClick={() => handFilterProduct(el)} />
                                );
                            })

                            :

                            (
                                <div className='min-h-[150px] flex justify-center items-center'>
                                    <p>Loading...</p>
                                </div>
                            )
                    }
                </div>

                <div className='flex flex-wrap justify-center gap-4 my-4'>
                    {
                        dataFilter[0]
                            ?
                            dataFilter.map(el => {
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

                            loadingArrayFeature.map((el, index) =>
                                <CardFeature loading="Loading..."
                                    key={index} />
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default AllProduct;