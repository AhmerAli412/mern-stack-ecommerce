const router = require("express").Router();


const stripe = require("stripe")("sk_test_51OEo0uGmLyW5XcAq4y1Z6oHWj5HN7j4ML1b6wYPxDB7XIjyQQfZxrxJ7ZSjwGo0rHxEnKc0BCWqxAhvkUXFPTr2v00S8Z7fKOG");

// checkout api
router.post("/payment",async(req,res)=>{
  const {products} = req.body;

    console.log(products);

    const lineItems = products.map((product)=>({
      price_data:{
          currency:"pkr",
          product_data:{
              name:product.title,
              images:[product.img]
          },
          unit_amount:product.price * 100,
      },
      quantity:product.quantity
  }));
    

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/success",
      cancel_url:"http://localhost:3000/cancel",
  });

  res.json({id:session.id})

})

module.exports = router;
