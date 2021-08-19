import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                //type: Number, //con el tipo de dato Number he evitado el error de cast de ObjectID
                ref: 'Product',
                required: true,
            },
        },   
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        lat: Number,
        lng: Number,
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { 
        id: String, 
        status: String, 
        update_time: String, 
        email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //a través de Compass puede insertar en los productos el campo de seller: ObjectId("mismo para todos los productos que quiera que sean para este mismo vendedor") //vamos a usar el ref='User' para la función de populate para la seller information de la user table
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
}, 
{
    timestamps: true,
}
);
const Order = mongoose.model('Order', orderSchema);
export default Order;