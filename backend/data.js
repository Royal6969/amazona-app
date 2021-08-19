import bcrypt from 'bcryptjs';

// ATT, este data.js con los usuarios tmb, es el que debe estar en el backend
// y al revés, el data.js que solo contiene los productos debe estar en el frontend (obsoleto)

const data = {
    users: [//estos usuarios fueron borrados y creados de nuevo desde la propia web, asique estos datos ya no deberían servir
        {
            name:'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
            seller: { //a teammate of course called fher333 recomend insert here in the Admin the seller fields 
                name: 'admin',
                logo: '/images/logo1.png',
                description: 'best seller',
                rating: 4.5,
                numReviews: 120,
            }, //it code appear in video 58 to fix some bugs
        },
        {
            name:'Royal',
            email:'royal@example.com',
            password: bcrypt.hashSync('123', 8),
            isAdmin: false,
            isSeller : true,
            seller: { //a teammate of course called fher333 recomend insert here in the Admin the seller fields 
                name: 'royal',
                logo: '/images/logo2.png',
                description: 'best seller',
                rating: 3.5,
                numReviews: 100,
            },
        },
    ],
    products:[
        {
            name:'Nike Slim Shirt',
            category:'Shirts',
            image:'/images/p1.jpg',
            price: 30,
            countInStock: 10,
            brand:'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name:'Adidas Slim Shirt',
            category:'Shirts',
            image:'/images/p2.jpg',
            price: 25,
            countInStock: 20,
            brand:'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name:'Lacoste Free Shirt',
            category:'Shirts',
            image:'/images/p3.jpg',
            price: 20,
            countInStock: 0,
            brand:'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product',
        },
        {
            name:'Nike Slim Pant',
            category:'Pants',
            image:'/images/p4.jpg',
            price: 35,
            countInStock: 15,
            brand:'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product',
        },
        {
            name:'Puma Slim Pant',
            category:'Pants',
            image:'/images/p5.jpg',
            price: 15,
            countInStock: 5,
            brand:'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name:'Adidas Fit Pants',
            category:'Pants',
            image:'/images/p6.jpg',
            price: 30,
            countInStock: 12,
            brand:'Adidas',
            rating: 4.5,
            numReviews: 15,
            description: 'high quality product',
        },
    ],
};
export default data;