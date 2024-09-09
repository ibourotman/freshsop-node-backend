// const mongoose = require('mongoose');
// const fs = require('fs');
// const Product = require('./models/Product');
// const Order = require('./models/Order');
// const OrderItem = require('./models/OrderItem');
// const User = require('./models/User');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/freshshop', {})
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // Read JSON data (Products and Users are already inserted)
// const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
// const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

// // Generate Random Fake Data for Orders and OrderItems
// async function migrateData() {
//     try {
//         // Fetch inserted users and products from the database
//         const insertedUsers = await User.find();
//         const insertedProducts = await Product.find();

//         if (!insertedUsers.length || !insertedProducts.length) {
//             console.log('No users or products found, make sure the data is inserted first.');
//             return;
//         }

//         const orders = [];
//         const orderItems = [];

//         // Create fake orders and order items for each user
//         insertedUsers.forEach(user => {
//             // Each user will have 2 random orders
//             for (let i = 0; i < 2; i++) {
//                 const order = new Order({
//                     user: user._id,
//                     items: [],  // This will be populated with OrderItems
//                     createdAt: new Date()
//                 });

//                 // Each order will contain 2-3 random products (as OrderItems)
//                 const numOrderItems = Math.floor(Math.random() * 2) + 2;  // 2 or 3 items per order
//                 for (let j = 0; j < numOrderItems; j++) {
//                     const randomProduct = insertedProducts[Math.floor(Math.random() * insertedProducts.length)];
//                     const randomQuantity = Math.floor(Math.random() * 5) + 1;  // Random quantity between 1 and 5

//                     const orderItem = new OrderItem({
//                         order: order._id,
//                         product: randomProduct._id,
//                         quantity: randomQuantity
//                     });

//                     order.items.push(orderItem._id);  // Add OrderItem reference to Order
//                     orderItems.push(orderItem);  // Add OrderItem to the list to insert later
//                 }

//                 orders.push(order);  // Add Order to the list to insert later
//             }
//         });

//         // Insert Orders and OrderItems into MongoDB
//         await Order.insertMany(orders);
//         console.log('Orders inserted');

//         await OrderItem.insertMany(orderItems);
//         console.log('OrderItems inserted');

//         console.log('Data migration completed');
//         mongoose.connection.close();
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         mongoose.connection.close();
//     }
// }

// migrateData();

// const mongoose = require('mongoose');
// const User = require('./models/User');
// const Product = require('./models/Product');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/freshshop', {})
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // User and Product data
// const users = [
//     { username: 'otman', email: 'otman.ibbour@usmba.ac.ma' },
//     { username: 'malak', email: 'oibour558@gmail.com' }
// ];

// const products = [
//     { name: 'Grapes', price: 4.99, image_url: 'http://fruite-item-5.jpg', weight: '1', country_of_origin: 'espagne', quality: 'Premium', category: 'Fruits', description: 'Lorem ipsum...' },
//     { name: 'Parsely', price: 2.5, image_url: 'http://vegetable-item-6.jpg', weight: '2', country_of_origin: 'Morroco', quality: 'Premium', category: 'Vegetables', description: 'Lorem ipsum...' },
//     { name: 'Banana', price: 2, image_url: 'http://fruite-item-3.jpg', weight: '1', country_of_origin: 'Kongo', quality: 'Standard', category: 'Fruits', description: 'Lorem ipsum...' },
//     { name: 'Apricots', price: 4.99, image_url: 'http://vegetable-item-1.jpg', weight: '1', country_of_origin: 'France', quality: 'Standard', category: 'Vegetables', description: 'Lorem ipsum...' },
//     { name: 'Oranges', price: 1.99, image_url: 'http://fruite-item-1.jpg', weight: '1', country_of_origin: 'Morroco', quality: 'Premium', category: 'Fruits', description: 'Lorem ipsum...' },
//     { name: 'Potatoes', price: 2.99, image_url: 'http://vegetable-item-5.jpg', weight: '1', country_of_origin: 'Belgique', quality: 'Premium', category: 'Vegetables', description: 'Lorem ipsum...' },
//     { name: 'Raspberries', price: 3.99, image_url: 'http://fruite-item-2.jpg', weight: '1', country_of_origin: 'France', quality: 'Premium', category: 'Fruits', description: 'Lorem ipsum...' },
//     { name: 'Bell Papper', price: 2.99, image_url: 'http://vegetable-item-4.jpg', weight: '1', country_of_origin: 'Morroco', quality: 'Standard', category: 'Vegetables', description: 'Lorem ipsum...' },
//     { name: 'Grapes', price: 2.65, image_url: 'http://fruite-item-5.jpg', weight: '1', country_of_origin: 'France', quality: 'Standard', category: 'Fruits', description: 'Lorem ipsum...' }
// ];

// // Insert Users and Products
// async function insertData() {
//     try {
//         await User.insertMany(users);
//         console.log('Users inserted');

//         await Product.insertMany(products);
//         console.log('Products inserted');

//         mongoose.connection.close();
//     } catch (err) {
//         console.error('Error inserting users or products:', err);
//         mongoose.connection.close();
//     }
// }

// insertData();

const mongoose = require('mongoose');
const Product = require('./models/Product');  // Make sure you have a Product model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/freshshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Map of product names to new image URLs
const imageUpdates = {
    'Grapes': 'http://localhost:3000/images/grapes.jpg',
    'Parsely': 'http://localhost:3000/images/parsely.jpg',
    'Banana': 'http://localhost:3000/images/banana.jpg',
    'Apricots': 'http://localhost:3000/images/apricots.jpg',
    'Oranges': 'http://localhost:3000/images/oranges.jpg',
    'Potatoes': 'http://localhost:3000/images/potatoes.jpg',
    'Raspberries': 'http://localhost:3000/images/raspberries.jpg',
    'Bell Papper': 'http://localhost:3000/images/bell-papper.jpg',
};

// Function to update the image URL for each product
async function updateProductImages() {
    try {
        // Loop through the image updates and update each product in the database
        for (const [productName, newImageUrl] of Object.entries(imageUpdates)) {
            const result = await Product.updateOne({ name: productName }, { image_url: newImageUrl });
            if (result.nModified > 0) {
                console.log(`Updated ${productName} with new image URL: ${newImageUrl}`);
            } else {
                console.log(`No product found for ${productName} or no changes made.`);
            }
        }
    } catch (error) {
        console.error('Error updating product images:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Call the function to update the images
updateProductImages();
