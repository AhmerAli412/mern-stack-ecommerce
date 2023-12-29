

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
// import { useSelector } from 'react-redux';

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

//   const handleClick = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/cart/add-to-cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${currentUser?.accessToken}`,
//           // 'Authorization': `Bearer ${currentUser?.accessToken}`,

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

//   // payment integration
//   const makePayment = async () => {
//     const stripe = await loadStripe("your_stripe_public_key");

//     const body = {
//       products: {
//         ...product,
//         quantity: 1,
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


//   const handleAddToWishlist = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/products/wishlist/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${currentUser?.accessToken}`,
//         },
//       });

//       if (response.ok) {
//         toast.success('Product added to wishlist', {
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//       } else {
//         toast.error('Failed to add product to wishlist', {
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//       }
//     } catch (error) {
//       console.error('Error adding product to wishlist:', error);
//     }
//   };

//   return (
//     <div className="bg-white py-6 sm:py-8 lg:py-12">
//       <div className="mx-auto max-w-screen-xl px-4 md:px-8">
//         <div className="grid gap-8 md:grid-cols-2">
//           {/* Images */}
//           <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
//             <img
//               src={product.img}
//               alt={`Photo of ${product.title}`}
//               className="h-full w-full object-cover object-center"
//             />

//             {product.sale && (
//               <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
//                 sale
//               </span>
//             )}

//             {/* Buy Now Button */}
//             <a
//               href="#"
//               className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </a>
//           </div>
//           {/* <div className="grid gap-4 lg:grid-cols-5">
//             <div className="order-last flex gap-4 lg:order-none lg:flex-col">
//               {product.img?.map((image, index) => (
//                 <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
//                   <img
//                     src={img}
//                     loading="lazy"
//                     alt={`Product ${index + 1}`}
//                     className="h-full w-full object-cover object-center"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
//               <img
//                 src={product.img?.[0]} // Assuming the first image is the main product image
//                 loading="lazy"
//                 alt="Product Main"
//                 className="h-full w-full object-cover object-center"
//               />
//               {product.sale && (
//                 <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
//                   Sale
//                 </span>
//               )}
//               <a
//                 href="#"
//                 className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div> */}

//           {/* Content */}
//           <div className="md:py-8">
//             {/* Name */}
//             <div className="mb-2 md:mb-3">
//               <span className="mb-0.5 inline-block text-gray-500">{product.brand}</span>
//               <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{product.title}</h2>
//             </div>

//             {/* Rating */}
//             <div className="mb-6 flex items-center gap-3 md:mb-10">
//               <div className="flex h-7 items-center gap-1 rounded-full bg-indigo-500 px-2 text-white">
//                 <span className="text-sm">{product.rating}</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               </div>
//               <span className="text-sm text-gray-500 transition duration-100">
//                 {product.numRatings} ratings
//               </span>
//             </div>

//             {/* Color */}
//             <div className="mb-4 md:mb-6">
//               <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
//                 Color
//               </span>
//               <div className="flex flex-wrap gap-2">
//                 {product.colors?.map((productColor, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     className={`h-8 w-8 rounded-full border bg-${productColor} ring-2 ring-${productColor} ring-offset-1 transition duration-100`}
//                     onClick={() => setColor(productColor)}
//                   ></button>
//                 ))}
//               </div>
//             </div>

//             {/* Size */}
//             <div className="mb-8 md:mb-10">
//               <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
//                 Size
//               </span>
//               <div className="flex flex-wrap gap-3">
//                 {product.sizes?.map((productSize, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     className={`flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 ${
//                       size === productSize
//                         ? "bg-indigo-500 text-white"
//                         : "hover:bg-gray-100 active:bg-gray-200"
//                     }`}
//                     onClick={() => setSize(productSize)}
//                     disabled={productSize === "XL"} // Disable XL button
//                   >
//                     {productSize}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="flex items-end gap-2">
//                 <span className="text-xl font-bold text-gray-800 md:text-2xl">
//                   ${product.price?.toFixed(2) || ''}
//                 </span>
//                 {product.salePrice && (
//                   <span className="mb-0.5 text-red-500 line-through">
//                     ${product.salePrice.toFixed(2)}
//                   </span>
//                 )}
//               </div>
//               <span className="text-sm text-gray-500">incl. VAT plus shipping</span>
//             </div>

//             {/* Shipping Notice */}
//             <div className="mb-6 flex items-center gap-2 text-gray-500">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
//                 />
//               </svg>
//               <span className="text-sm">2-4 day shipping</span>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-2.5">
//               <a
//                 href="#"
//                 className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
//               >
//                 Add to cart
//               </a>
//               <a
//                 href="#"
//                 className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
//               >
//                 Buy now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     // <Container>
//     //   <Navbar />
//     //   <Announcement />
//     //   <Wrapper>
//     //     <ImgContainer>
//     //       <Image src={product.img} />
//     //     </ImgContainer>
//     //     <InforContainer>
//     //       <Title>{product.title}</Title>
//     //       <Desc>{product.desc}</Desc>
//     //       <Price>Pkr {product.price}</Price>
//     //       <FilterContainer>
//     //         <Filter>
//     //           <FilterTitle>Color</FilterTitle>
//     //           {product.color?.map((c) => (
//     //             <FilterColor
//     //               color={c}
//     //               key={uuidv4()}
//     //               onClick={() => setColor(c)}
//     //             />
//     //           ))}
//     //         </Filter>
//     //         <Filter>
//     //           <FilterTitle>Size</FilterTitle>
//     //           <FilterSize onChange={(e) => setSize(e.target.value)}>
//     //             {product.size?.map((s) => (
//     //               <FilterSizeOption key={uuidv4()}>{s}</FilterSizeOption>
//     //             ))}
//     //           </FilterSize>
//     //         </Filter>
//     //       </FilterContainer>
//     //       <AddContainer>
//     //         <AmountContainer>
//     //           <Remove onClick={() => handleQuantity("dec")} />
//     //           <Amount>{quantity}</Amount>
//     //           <Add onClick={() => handleQuantity("inc")} />
//     //         </AmountContainer>
//     //         <Button onClick={handleClick}>ADD TO CART</Button>
//     //         <Button onClick={handleAddToWishlist}>ADD TO WISHLIST</Button>
//     //         <Button onClick={() => makePayment()}>BUY</Button>
//     //       </AddContainer>
//     //     </InforContainer>
//     //   </Wrapper>
//     //   <Newsletter />
//     //   <Footer />
//     //   <ToastContainer />
//     // </Container>
//   );
// };

// export default Product;







import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { v4 as uuidv4 } from "uuid";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { mobile } from "../responsive";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Add, Remove } from "@material-ui/icons";

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
      } catch (error) {
        console.error('Error fetching product:', error);
      }
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
        dispatch(addProduct());
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

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/wishlist/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser?.accessToken}`,
        },
      });

      if (response.ok) {
        toast.success('Product added to wishlist', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error('Failed to add product to wishlist', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex-1">
              <img src={product.img} alt="Product" className="w-full h-4/5 object-cover object-center" />
            </div>
            <div className="flex-1 p-4">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{product.title}</h2>
              <p className="my-4 text-justify">{product.desc}</p>
              <span className="text-xl font-bold text-gray-800 md:text-2xl">Pkr {product.price}</span>

              <div className="my-10 flex justify-between">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-500">Color</span>
                  <div className="flex ml-4">
                    {product.color?.map((c) => (
                      <div
                        key={uuidv4()}
                        onClick={() => setColor(c)}
                        className="w-8 h-8 rounded-full border ring-2 ring-gray-800 ring-offset-1 cursor-pointer"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-500">Size</span>
                  <select
                    onChange={(e) => setSize(e.target.value)}
                    className="mx-2 px-3 py-1.5 border"
                  >
                    {product.size?.map((s) => (
                      <option key={uuidv4()}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-10 flex justify-between">
                <div className="flex items-center font-semibold cursor-pointer">
                  <Remove onClick={() => handleQuantity("dec")} className="w-8 h-8 rounded-full border border-teal-500 flex items-center justify-center mx-2" />
                  <span className="w-8 h-8 rounded-full border border-teal-500 flex items-center justify-center mx-2">{quantity}</span>
                  <Add onClick={() => handleQuantity("inc")} className="w-8 h-8 rounded-full border border-teal-500 flex items-center justify-center mx-2" />
                </div>
                <button
                  onClick={handleClick}
                  className="px-8 py-3 bg-indigo-500 text-center text-sm font-semibold text-white rounded-lg outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="px-8 py-3 bg-red-500 text-center text-sm font-semibold text-white rounded-lg outline-none ring-red-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 sm:flex-none md:text-base"
                >
                  ADD TO WISHLIST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Product;
