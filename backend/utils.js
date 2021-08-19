import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        }, 
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }  
    );
};
// { esto es lo que puse en el postman y le di a "send"
//     "email":"admin@example.com",
//     "password":"12345" ... aunque ya no es esta contraseña ahoar es 1234
// }

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX ... this only return the token part
        jwt.verify(
            token, 
            process.env.JWT_SECRET || 'somethingsecret', 
            (err, decode) => {
                if(err){
                    res.status(401).send({ message: 'Invalid Token' });
                }else{
                    req.user = decode;
                    next();
                }
            }
        );
    }else {
        res.status(401).send({ message: 'No Token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Seller Token' });
    }
};

export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin/Seller Token' });
    }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
    return `
        <h1>Thanks for shopping with us</h1>
        <p>
            Hi ${order.user.name},
        </p>
        <p>
            We have finished processing your order.
        </p>
        <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
        <table>
            <thead>
                <tr>
                    <td><strong>Product</strong></td>
                    <td><strong>Quantity</strong></td>
                    <td><strong align="right">Price</strong></td>
                </tr>
            </thead>
            <tbody>
                ${order.orderItems
                    .map(
                        (item) => `
                            <tr>
                                <td>${item.name}</td>
                                <td align="center">${item.qty}</td>
                                <td align="right"> ${item.price.toFixed(2)}€</td>
                            </tr>
                        `
                    )
                    .join('\n')
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Items Price:</td>
                    <td align="right">${order.itemsPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="2">Tax Price:</td>
                    <td align="right">${order.taxPrice.toFixed(2)}€</td>
                </tr>
                <tr>
                    <td colspan="2">Shipping Price:</td>
                    <td align="right">${order.shippingPrice.toFixed(2)}€</td>
                </tr>
                <tr>
                    <td colspan="2"><strong>Total Price:</strong></td>
                    <td align="right"><strong>${order.totalPrice.toFixed(2)}€</strong></td>
                </tr>
                <tr>
                    <td colspan="2">Payment Method:</td>
                    <td align="right">${order.paymentMethod}</td>
                </tr>
            </tfoot>
        </table>
        <h2>Shipping Address</h2>
        <p>
            ${order.shippingAddress.fullName},<br/>
            ${order.shippingAddress.address},<br/>
            ${order.shippingAddress.city},<br/>
            ${order.shippingAddress.country},<br/>
            ${order.shippingAddress.postalCode},<br/>
        </p>
        <p>
            Thank you for shopping with us!
        </p>
    `;
};