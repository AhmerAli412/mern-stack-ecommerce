const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
// const cartRoute = require("./routes/carts");
const orderRoute = require("./routes/order");
const cartRoutes = require('./routes/cartRoutes');

const stripeRoute = require("./routes/stripe");

const stripe = require("stripe")("sk_test_51OEo0uGmLyW5XcAq4y1Z6oHWj5HN7j4ML1b6wYPxDB7XIjyQQfZxrxJ7ZSjwGo0rHxEnKc0BCWqxAhvkUXFPTr2v00S8Z7fKOG");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
// app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", stripeRoute);
app.use('/api/cart', cartRoutes);

// app.use('/api/cart', cartRoutes);


// checkout api
// app.post("/api/create-checkout-session",async(req,res)=>{
//   const { product } = req.body;

//     console.log(product);

//     const lineItems = {
//       price_data: {
//         currency: "pkr",
//         product_data: {
//           name: product.name,
//           images: [product.image],
//         },
//         unit_amount: product.price * 100 ,
//       },
//       quantity: product.quantity,
     
//     };

//   const session = await stripe.checkout.sessions.create({
//       payment_method_types:["card"],
//       line_items:lineItems,
//       mode:"payment",
//       success_url:"http://localhost:3000/sucess",
//       cancel_url:"http://localhost:3000/cancel",
//   });

//   res.json({id:session.id})

// })

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 4000, () => {
  console.log("Backend server is running");
});
