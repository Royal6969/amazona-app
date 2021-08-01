import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const { product } = props;
    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img 
                    className="medium" 
                    src={product.image} 
                    alt={product.name} 
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating 
                    rating={product.rating} 
                    numReviews={product.numReviews}
                ></Rating>

                <div className="row">
                    <div className="price">{product.price}€</div>
                    <div>
                        <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                            {/* el profesor Basir puso {product.seller.seller.name} */}
                            {/* first seller point to the product model and second seller point to user model */}
                            {/* pero así me da un fallo en la home screen con todos los productos que dice... */}
                            {/* TypeError: Cannot read property 'name' of undefined */}
                            {/* y un compañero del curso propuso como parche quitar un seller de la sentencia ... {product.seller.name} */}
                            {/* cuando pregunté a los compañeros del curso porque a veces me decía qu eno se podía leer el name y otras veces el _id ... */}
                            {/* otro compañero me dijo que todos los productos deben tener asignado un ObjectId de un seller y aparte tenía que rellenar los campos de name-logo-description del Profile Screen de tales sellers */}
                            {/* pero aunque hice eso, me seguía dando el fallo de que no puede leer el name ... */}
                            {/* finalmente, a lo anterior, me hacía falta añadir la función al ProductRouter de populate() y ya funciona !! */}
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}