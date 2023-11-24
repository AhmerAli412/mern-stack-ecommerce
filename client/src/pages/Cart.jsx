// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";

// import { useEffect, useState } from "react";
// import { useHistory } from "react-router";
// import { Link } from "react-router-dom";

// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { mobile } from "../responsive";
// import { userRequest } from "../requestMethods";

// const KEY = process.env.REACT_APP_STRIPE;

// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 20px;
//   ${mobile({ padding: "10px" })}
// `;

// const Title = styled.h1`
//   font-weight: 300;
//   text-align: center;
// `;

// const Top = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
// `;

// const TopButton = styled.button`
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "black" : "transparent"};
//   color: ${(props) => props.type === "filled" && "white"};
// `;

// const TopTexts = styled.div`
//   ${mobile({ display: "none" })}
// `;

// const TopText = styled.span`
//   text-decoration: underline;
//   cursor: pointer;
//   margin: 0px 10px;
// `;

// const Bottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const Info = styled.div`
//   flex: 3;
// `;

// const Product = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const ProductDetail = styled.div`
//   flex: 2;
//   display: flex;
// `;

// const Image = styled.img`
//   width: 200px;
// `;

// const Details = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;

// const ProductName = styled.span``;

// const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

// const ProductSize = styled.span``;

// const PriceDetail = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const ProductPrice = styled.div`
//   font-size: 30px;
//   font-weight: 200;
//   ${mobile({ marginBottom: "20px" })}
// `;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

// const Summary = styled.div`
//   flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: 50vh;
// `;

// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
// `;

// const Cart = () => {
//   const cart = useSelector((state) => state.cart);
//   const quantity = useSelector((state) => state.cart.quantity);
 
//   const history = useHistory();

  

//   return (
//     <Container>
//       <Navbar />
//       <Announcement />
//       <Wrapper>
//         <Title>YOUR BAG</Title>
//         <Top>
//           <Link to="/">
//             <TopButton>CONTINUE SHOPPING</TopButton>
//           </Link>
//           <TopTexts>
//             <TopText>Shopping Bag ({quantity})</TopText>
//           </TopTexts>
         
//             <TopButton>CHECKOUT NOW</TopButton>
         
//         </Top>
//         <Bottom>
//           <Info>
//             {cart.products.map((product) => (
//               <Product key={uuidv4()}>
//                 <ProductDetail>
//                   <Image src={product.img} />
//                   <Details>
//                     <ProductName>
//                       <b>Product:</b> {product.title}
//                     </ProductName>
//                     <ProductId>
//                       <b>ID:</b> {product._id}
//                     </ProductId>
//                     <ProductColor color={product.color} />
//                     <ProductSize>
//                       <b>Size:</b> {product.size}
//                     </ProductSize>
//                   </Details>
//                 </ProductDetail>
//                 <PriceDetail>
//                   <ProductPrice>
//                     €{product.price * product.quantity}
//                   </ProductPrice>
//                 </PriceDetail>
//               </Product>
//             ))}
//             <Hr />
//           </Info>
//           <Summary>
//             <SummaryTitle>ORDER SUMMARY</SummaryTitle>
//             <SummaryItem>
//               <SummaryItemText>Subtotal</SummaryItemText>
//               <SummaryItemPrice>€ {cart.total}</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem>
//               <SummaryItemText>Estimated Shipping</SummaryItemText>
//               <SummaryItemPrice>€ 5.90</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem>
//               <SummaryItemText>Shipping Discount</SummaryItemText>
//               <SummaryItemPrice>€ -5.90</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem type="total">
//               <SummaryItemText>Total</SummaryItemText>
//               <SummaryItemPrice>€ {cart.total}</SummaryItemPrice>
//             </SummaryItem>
        
         
//               <Button>CHECKOUT NOW</Button>
            
//           </Summary>
//         </Bottom>
//       </Wrapper>
//       <Footer />
//     </Container>
//   );
// };

// export default Cart;



// Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';


const Cart = () => {
  const [cart, setCart] = useState([]);
  // const { search } = useLocation();
  // const userId = new URLSearchParams(search).get('userId');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!currentUser || !currentUser.userId || !currentUser.accessToken) {
          console.error('User information is missing.');
          return;
        }
  
        const response = await axios.get(`http://localhost:4000/api/cart/find/${currentUser.userId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });
        setCart(response.data.products);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
  
    if (currentUser) {
      fetchCart();
    }
  }, [currentUser]);
  
   // Calculate total price
   const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  console.log(cart);
  // console.log("User ID:", userId);


// payment integration
const makePayment = async()=>{
  const stripe = await loadStripe("pk_test_51OEo0uGmLyW5XcAqRUzbzLuO1mqxwY5r4haQhmCxNa4wxr0uuJrSOv3SBRqn3IyykdwL5pJeHRQaJmFlIem0oW7T00UKlNQOKI");

  const body = {
      products:cart
  }
  const headers = {
      "Content-Type":"application/json"
  }
  const response = await fetch("http://localhost:4000/api/payment/payment",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
  });

  const session = await response.json();

  const result = stripe.redirectToCheckout({
      sessionId:session.id
  });
  
  if(result.error){
      console.log(result.error);
  }
}



  return (
    <>
    <Navbar/>
    <Announcement/>
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-lg px-4 md:px-8">
      
      <div class="mb-6 sm:mb-10 lg:mb-16">
      <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Your Cart</h2>
    </div>
    {/* <p>User ID: {userId}</p> */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
        {/* Map through cart items and render each product */}
        {cart.map((item) => (
          <div key={item.productId} className="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
            <a href="#" className="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40">
              <img src={item.img} loading="lazy" alt={item.title} className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>

            <div className="flex flex-1 flex-col justify-between py-4">
              <div>
                <a href="#" className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{item.title}</a>

                <span className="block text-gray-500">Size: {item.size}</span>
                <span className="block text-gray-500">Color: {item.color}</span>
                <span className="block text-gray-500">Quantity: {item.quantity}</span>
              </div>

              <div>
                <span className="mb-1 block font-bold text-gray-800 md:text-lg">${item.price.toFixed(2)}</span>

                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>

                  In stock
                </span>
              </div>
            </div>

            <div className="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
              {/* ... (existing code) */}
            </div>
          </div>
        ))}
        {/* Map end */}
      </div>

     
    <div class="flex flex-col items-end gap-4">
      <div class="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
        <div class="space-y-1">
        
        </div>

        <div class="mt-4 border-t pt-4">
          <div class="flex items-start justify-between gap-4 text-gray-800">
            <span class="text-lg font-bold">Total</span>

            <span class="flex flex-col items-end">
              <span class="text-lg font-bold">${calculateTotalPrice().toFixed(2)}</span>
              <span class="text-sm text-gray-500">including VAT</span>
            </span>
          </div>
        </div>
      </div>

      <button onClick={makePayment} class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Check out</button>
    </div>
  
    </div>
    </div>
    </>
  );
};

export default Cart;


