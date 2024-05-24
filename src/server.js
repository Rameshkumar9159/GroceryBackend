const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
 
mongoose.connect('mongodb://localhost:27017/Grocery_connect',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
 
app.use(express.json());
app.use(cors()); // Use the cors middleware
 
const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  image: String,
});
 
const Product = mongoose.model('Product', productSchema);
 
// Function to seed initial data into the database
const seedDatabase = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
 
    const products = [
      {
        name: 'Dhall', 
        type: 'Grains',
        description: 'Energy Booster with Natural',
        price: 150,
        image:'https://www.naatigrains.com/image/cache/catalog/naatigrains-products/NG149/premium-quality-thoor-dhal-naturally-grown-buy-now-online-chennai-karnataka-naati-grains-1000x1000.jpg'
      },
      {
        name: 'Rice',
        type: 'Grains',
        description: 'Rich in Proteins,vitamins and organic',
        price: 75,
        image:
'https://t3.ftcdn.net/jpg/00/44/06/34/240_F_44063487_bVBKq04H4aF27F00jbRoLAUL2QCP6NNY.jpg'
      },
      {
        name: 'Moong Dhall',
        type: 'Grains',
        description: 'Very special contains 25% protein level',
        price: 180,
        image:
'https://www.earthytales.in/uploads/products/3x/moong500.jpg?v=202405136'
      },
      {
        name: 'Carrot',
        type: 'Vegetable',
        description: 'Healthy and crunchy',
        price: 100,
        image:
'https://media.geeksforgeeks.org/wp-content/uploads/20240104142613/carrot.jpg'
      },
      {
        name: 'Broccoli',
        type: 'Vegetable',
        description: 'Nutrient-rich greens',
        price: 175,
        image:
'https://media.geeksforgeeks.org/wp-content/uploads/20240104142601/brocoli.jpg'
      },
      {
        name: 'Masoor Dhall',
        type: 'Grains',
        description: '100% Organic Reddish dhall with healthy packed',
        price: 250,
        image:
'https://www.vegrecipesofindia.com/wp-content/uploads/2022/11/masoor-dal-red-lentils.jpg'
      },
      {
        name: 'Wheat',
        type: 'Grains',
        description: 'You sow wheat once , you feed the world once !!! 100% organic',
        price: 80,
        image:
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4jxRK4TvVwU1jsog8iJIl93iI0jp8TVqt_-Uvje7qkboL7BEm'
      },
      {
        name: 'Lettuce',
        type: 'Vegetable',
        description: 'Crisp and fresh',
        price: 120,
        image:
'https://media.geeksforgeeks.org/wp-content/uploads/20240104142635/lettue.jpg'
      },
      {
        name: 'Tomato',
        type: 'Vegetable',
        description: 'Versatile and flavorful',
        price: 67,
        image:
'https://media.geeksforgeeks.org/wp-content/uploads/20240104142704/tomato.jpg'
      },
      {
        name: 'Channa Dhall',
        type: 'Grains',
        description: 'Warm your soul with our comforting Channa Dhall',
        price: 60,
        image:
'https://5.imimg.com/data5/SELLER/Default/2022/7/UB/ZL/HE/5742893/black-chana-500x500.png'
      },
 
    ];
 
    await Product.insertMany(products);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
 
// Seed the database on server startup
seedDatabase();
 
// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await Product.find();
 
    // Send the entire products array as JSON response
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500)
      .json({ error: 'Internal Server Error' });
  }
});
 
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});