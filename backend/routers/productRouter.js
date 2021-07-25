import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';
import mongoose from 'mongoose';

const productRouter = express.Router();

productRouter.get(
    '/', 
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
    '/:id', 
    expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    //if(mongoose.Types.ObjectId.isValid(userId.id)) {
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        //_id: Product.ObjectId, //por si ayuda conjunto con el parche ne productModel.js pero tmp... //dupl key _id
        _id: new mongoose.Types.ObjectId, //con esto se quita lo del "document must have an _id before saving" //ojo que esto no debería de estar
        name: 'sample name ' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
    })
  ); 
  
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      //product.category = req.body.category; //ValidationError: Product validation failed: category: Path `category` is required.
      //he tenido que quitar la category porque sino me daba el error que he puesto antes por nodemon y por consola me da un error (500) de internal server aquí en este PUT
      //no entiendo el origen de este error y no sé por qué sólo afectó a este campo de category
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;