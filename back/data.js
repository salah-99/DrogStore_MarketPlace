const bcrypt = require('bcryptjs');

const data = {
    users: [
        {
            name: 'Salah',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Yassin',
            email: 'userYassin@example.com',
            password: bcrypt.hashSync('4321', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'medical equipment 1',
            category: 'equipment',
            image: '/images/pic5.jpg',
            price: 50,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'medical equipment 2',
            category: 'equipment',
            image: '/images/pic2.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'medical equipment 3',
            category: 'equipment',
            image: '/images/pic1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'medical equipment 4',
            category: 'equipment',
            image: '/images/pic4.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'medical equipment 5',
            category: 'equipment',
            image: '/images/pic1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        },
        {
            name: 'medical equipment 6',
            category: 'equipment',
            image: '/images/pic3.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product',
        }
    ]
};
module.exports = data;