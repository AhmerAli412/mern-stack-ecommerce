// import { Add, Remove } from "@material-ui/icons";
// import styled from "styled-components";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {loadStripe} from '@stripe/stripe-js';
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import Newsletter from "../components/Newsletter";
// import { mobile } from "../responsive";
// import { publicRequest } from "../requestMethods";
// import { addProduct } from "../redux/cartRedux";
// import { useSelector } from 'react-redux'; // Import the useSelector hook

// const Container = styled.div``;
// const Wrapper = styled.div`
//   padding: 50px;
//   display: flex;
//   ${mobile({ padding: "10px", flexDirection: "column" })}
// `;
// const ImgContainer = styled.div`
//   flex: 1;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 90vh;
//   object-fit: cover;
//   ${mobile({ height: "40vh" })}
// `;

// const InforContainer = styled.div`
//   flex: 1;
//   padding: 0px 50px;
//   ${mobile({ padding: "10px" })}
// `;

// const Title = styled.h1`
//   font-weight: 200;
// `;

// const Desc = styled.p`
//   margin: 20px 0px;
//   text-align: justify;
// `;

// const Price = styled.span`
//   font-weight: 100;
//   font-size: 40px;
// `;

// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `;

// const FilterColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   margin: 0px 5px;
//   cursor: pointer;
// `;

// const FilterSize = styled.select`
//   margin: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;

// const AddContainer = styled.div`
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
//   cursor: pointer;
// `;

// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 5px;
// `;

// const Button = styled.button`
//   padding: 15px;
//   border: 2px solid teal;
//   background-color: white;
//   cursor: pointer;
//   font-weight: 500;

//   &:hover {
//     background-color: teal;
//     color: white;
//   }
// `;

// const Product = () => {
//   const location = useLocation();
//   const id = location.pathname.split("/")[2];
//   const [product, setProduct] = useState({});
//   const [quantity, setQuantity] = useState(1);
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");
//   const dispatch = useDispatch();
  
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const res = await publicRequest.get("/products/find/" + id);
//         setProduct(res.data);
//       } catch {}
//     };
//     getProduct();
//   }, [id]);

//   const handleQuantity = (type) => {
//     if (type === "dec") {
//       quantity > 1 && setQuantity(quantity - 1);
//     } else {
//       setQuantity(quantity + 1);
//     }
//   };

//   // Product.js
// // ... (existing code)

//  const handleClick = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/cart/add-to-cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${currentUser?.accessToken}`, // Assuming your access token is stored in the user slice
//         },
//         body: JSON.stringify({
//           productId: product._id,
//           quantity,
//           color,
//           size,
//           img: product.img,
//           title: product.title,
//           price: product.price,
//         }),
//       });

//       if (response.ok) {
//         toast.success('Product added to cart', {
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//       } else {
//         toast.error('Failed to add product to cart', {
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//       }
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//     }
//   };



//   console.log(product);
//    // payment integration
//    const makePayment = async () => {
//     const stripe = await loadStripe("pk_test_51OEo0uGmLyW5XcAqRUzbzLuO1mqxwY5r4haQhmCxNa4wxr0uuJrSOv3SBRqn3IyykdwL5pJeHRQaJmFlIem0oW7T00UKlNQOKI");
  
//     const body = {
//       products: {
//         ...product,
//         quantity: 1,  // Set the quantity to 1
//       },
//     };
  
//     const headers = {
//       "Content-Type": "application/json",
//     };
  
//     const response = await fetch("http://localhost:4000/api/payment/payment", {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body),
//     });
  
//     const session = await response.json();
  
//     const result = stripe.redirectToCheckout({
//       sessionId: session.id
//     });
  
//     if (result.error) {
//       console.log(result.error);
//     }
//   }
  
//   return (
//     <Container>
//       <Navbar />
//       <Announcement />
//       <Wrapper>
//         <ImgContainer>
//           <Image src={product.img} />
//         </ImgContainer>
//         <InforContainer>
//           <Title>{product.title}</Title>
//           <Desc>{product.desc}</Desc>
//           <Price>€ {product.price}</Price>
//           <FilterContainer>
//             <Filter>
//               <FilterTitle>Color</FilterTitle>
//               {product.color?.map((c) => (
//                 <FilterColor
//                   color={c}
//                   key={uuidv4()}
//                   onClick={() => setColor(c)}
//                 />
//               ))}
//             </Filter>
//             <Filter>
//               <FilterTitle>Size</FilterTitle>
//               <FilterSize onChange={(e) => setSize(e.target.value)}>
//                 {product.size?.map((s) => (
//                   <FilterSizeOption key={uuidv4()}>{s}</FilterSizeOption>
//                 ))}
//               </FilterSize>
//             </Filter>
//           </FilterContainer>
//           <AddContainer>
//             <AmountContainer>
//               <Remove onClick={() => handleQuantity("dec")} />
//               <Amount>{quantity}</Amount>
//               <Add onClick={() => handleQuantity("inc")} />
//             </AmountContainer>
//             <Button onClick={handleClick}>ADD TO CART1</Button>
//             <Button onClick={() => makePayment()}>buy</Button>

//           </AddContainer>
//         </InforContainer>
//       </Wrapper>
//       <Newsletter />
//       <Footer />
//       <ToastContainer />
//     </Container>
//   );
// };

// export default Product;



import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {loadStripe} from '@stripe/stripe-js';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useSelector } from 'react-redux';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InforContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
  text-align: justify;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.accessToken}`,
          // 'Authorization': `Bearer ${currentUser?.accessToken}`,

        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
          color,
          size,
          img: product.img,
          title: product.title,
          price: product.price,
        }),
      });

      if (response.ok) {
        toast.success('Product added to cart', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error('Failed to add product to cart', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe("your_stripe_public_key");

    const body = {
      products: {
        ...product,
        quantity: 1,
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch("http://localhost:4000/api/payment/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      console.log(result.error);
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InforContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Pkr {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={uuidv4()}
                  onClick={() => setColor(c)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={uuidv4()}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
            <Button onClick={() => makePayment()}>BUY</Button>
          </AddContainer>
        </InforContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      <ToastContainer />
    </Container>
  );
};

export default Product;

