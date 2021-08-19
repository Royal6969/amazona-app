import mongoose from 'mongoose';
//import { ObjectID } from 'mongoose/lib/schema/index.js';
//import ObjectId from 'mongoose/lib/schema/objectid.js';
//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const Schema = mongoose.Types;
const ObjectId = Schema.ObjectId;
//const ObjectId = Schema.Types.ObjectId;


//var Schema = mongoose.Schema;
//var ObjectIdSchema = Schema.ObjectId;
//var ObjectId = mongoose.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );

const productSchema = new mongoose.Schema(
    //{ _id: String },
    {
        //_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // finalmente compruebo la diferencia entre esta sentencia y la otra que tmb funciona... esta tmb capta los productos de data.js y se obtiene el _id de tipo ObjectId. Sin esta sentencia no se captan, pero se sacrifica el tipo de dato de ObjectId
        //_id: { type: String }, //así sería un parche ... no me da el id automático... sino uno secuencial ... MongooseError: document must have an _id before saving        //_id: { type: mongoose.Schema.Types.ObjectId, default: new ObjectId() }, //solucion parche, no sale la numeracion secencial, cuando se crea un nuevo producto si tiene hash
        
        _id: { type: String, default: new ObjectId().toHexString }, //mejor solucion parche, sí sale la numeracion secuancial de los primeros productos, y cuando se crea uno nuevo, da un _id hash pero siendo de tipo String no me saldrá del tipo ObjectId
        name: { type: String, required: true, unique: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //a través de Compass puede insertar en los productos el campo de seller: ObjectId("mismo para todos los productos que quiera que sean para este mismo vendedor") //vamos a usar el ref='use' para la función de populate para la seller information de la user table
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        reviews: [reviewSchema],
    },
    //{_id: false },
    //{_id: new ObjectId().toHexString }
    {
        timestamps: true,
    }
);
//productSchema.path('_id');
const Product = mongoose.model('Product', productSchema);

export default Product;

