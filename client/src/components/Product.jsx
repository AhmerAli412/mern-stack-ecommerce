// import styled from "styled-components";
// import {
//   FavoriteBorderOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from "@material-ui/icons";
// import { Link } from "react-router-dom";

// const Info = styled.div`
//   opacity: 0;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.5s ease;
//   cursor: pointer;
// `;

// const Container = styled.div`
//   flex: 1;
//   margin: 5px;
//   min-width: 280px;
//   height: 350px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f5fbfd;
//   position: relative;

//   &:hover ${Info} {
//     opacity: 1;
//   }
// `;

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

// const Image = styled.img`
//   height: 75%;
//   z-index: 2;
// `;

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;

//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;

// const Product = ({ item }) => {
//   return (
//     <Container>
//       <Circle />
//       <Image src={item.img} />
//       <Info>
//         <Icon>
//           <Link to={`/product/${item._id}`}>
//             <SearchOutlined />
//           </Link>
//         </Icon>
//       </Info>
//     </Container>
//   );
// };

// export default Product;










// import styled from "styled-components";
// import {
//   FavoriteBorderOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from "@material-ui/icons";
// import { Link } from "react-router-dom";

// const Info = styled.div`
//   opacity: 0;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 3;
//   display: flex;
//   flex-direction: column; /* Adjusted for price display */
//   align-items: center;
//   justify-content: center;
//   transition: all 0.5s ease;
//   cursor: pointer;
// `;

// const Container = styled.div`
//   flex: 1;
//   margin: 5px;
//   min-width: 280px;
//   height: 350px;
//   display: flex;
//   flex-direction: column; /* Adjusted for price display */
//   align-items: center;
//   justify-content: center;
//   background-color: #f5fbfd;
//   position: relative;

//   &:hover ${Info} {
//     opacity: 1;
//   }
// `;

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

// const Image = styled.img`
//   height: 75%;
//   z-index: 2;
// `;

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;

//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;

// const Price = styled.span`
//   margin-top: 10px;
//   font-weight: bold;
// `;

// const Product = ({ item }) => {
//   return (
//     <Container>
//       <Circle />
//       <Image src={item.img} />
//       <Info>
//         <Icon>
//           <Link to={`/product/${item._id}`}>
//             <SearchOutlined />
//           </Link>
//         </Icon>
//         <Price>${item.price}</Price> {/* Added price display */}
//       </Info>
//     </Container>
//   );
// };

// export default Product;







import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link to={`/product/${item._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={item.img} alt="product image" />
        <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src={item.img} alt="product image" />
        <div className="absolute bottom-0 mb-4 flex space-x-4 w-full justify-center">
          <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
          <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
          <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
        </div>
        <svg className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
          <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"></path>
        </svg>
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/product/${item._id}`}>
          <h5 className="text-xl tracking-tight text-slate-900">{item.title}</h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">PKR {item.price}</span>
            <span className="text-sm text-slate-900 line-through">PKR 699</span>
          </p>
        </div>
        <Link to={`/product/${item._id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Add to cart
        </Link>
      </div>
    </div>
  );
};

export default Product;
