import React, { useEffect } from 'react';
import Product from '../components/Product';
//import data from '../../data';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]); //el [] estaba vacía y le di a la primera opción del asistente
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : ( 
                <div className="row center">
                    {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                    ))} 
                </div>
            )}
        </div>
    );
}