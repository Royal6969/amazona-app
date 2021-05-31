import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProducts } from '../../actions/productActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import Rating from '../Rating';
//import Product from '../Product'

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProducts(productId));
    }, [dispatch, productId]);
    
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : ( 
               <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating 
                                rating={product.rating} 
                                numReviews={product.numReviews}
                            ></Rating>
                        </li>
                        <li>Price : {product.price}€</li>
                        <li>Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">{product.price}€</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className="success">In stock</span>
                                        ) : (
                                        <span className="danger">Unavaible</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div> 
            )}
        </div>
        
    );
}