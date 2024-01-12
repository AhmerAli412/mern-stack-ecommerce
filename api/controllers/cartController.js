// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');


const getCartByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const addToCart = async (req, res) => {
    try {
      // Ensure the user is authenticated
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const { productId, quantity, color, size, img, title, price } = req.body;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const userId = req.user.id; // Get user ID from authentication middleware
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        // If the cart doesn't exist, create a new one for the user
        cart = new Cart({
          userId,
          products: [{ productId, quantity, color, size, img, title, price }],
        });
  
        await cart.save();
      } else {
        // If the cart exists, check if the product is already in the cart
        const existingProductIndex = cart.products.findIndex(
          (product) => product.productId === productId
        );
  
        if (existingProductIndex !== -1) {
          // If the product is already in the cart, update its details
          const existingProduct = cart.products[existingProductIndex];
          existingProduct.quantity += quantity || 1;
          existingProduct.color = color || existingProduct.color;
          existingProduct.size = size || existingProduct.size;
          existingProduct.img = img || existingProduct.img;
          existingProduct.title = title || existingProduct.title;
          existingProduct.price = price || existingProduct.price;
        } else {
          // If the product is not in the cart, add it to the cart
          cart.products.push({ productId, quantity, color, size, img, title, price });
        }
  
        await cart.save();
      }
  
      res.status(201).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const makePayment = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { products } = req.body;
  
      // Get the user's cart
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Create a new cart without the purchased products
      const updatedCart = {
        userId: cart.userId,
        products: cart.products.filter((cartProduct) => {
          return !products.some((purchasedProduct) => purchasedProduct.productId === cartProduct.productId);
        }),
      };
  
      // Save the updated cart to the database
      await Cart.findOneAndUpdate({ userId }, updatedCart, { new: true });
  
      res.status(200).json({ message: "Cart updated after payment" });
    } catch (error) {
      console.error("Error updating cart after payment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // module.exports = { addToCart, getCartByUserId, makePayment, removeItemFromCart };
  
  
  // module.exports = { addToCart, getCartByUserId, makePayment, removeItemFromCart };
  
  
  const removeItemFromCart = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const userId = req.user.id;
      const productIdToRemove = req.params.productId;
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Remove the product from the cart
      cart.products = cart.products.filter(
        (product) => product.productId !== productIdToRemove
      );
  
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = { addToCart, getCartByUserId, makePayment, removeItemFromCart };