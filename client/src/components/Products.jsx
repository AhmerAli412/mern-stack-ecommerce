// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// import Product from "./Product";

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const Products = ({ cat, filters, sort }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const res = await axios.get(
//           cat
//             ? `http://localhost:4000/api/products?category=${cat}`
//             : "http://localhost:4000/api/products?category"
//         );
//         setProducts(res.data);
//       } catch (err) {}
//     };
//     getProducts();
//   }, [cat]);

//   useEffect(() => {
//     cat &&
//       setFilteredProducts(
//         products.filter((item) =>
//           Object.entries(filters).every(([key, value]) => {
//             if (key === 'color' || key === 'size') {
//               // Check if the selected value exists in the product's array
//               return item[key].includes(value);
//             }
//             // Add additional conditions for other filters if needed
//             return true;
//           })
//         )
//       );
//   }, [products, cat, filters]);
  

//   useEffect(() => {
//     if (sort === 'newest') {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => a.createdAt - b.createdAt)
//       );
//     } else if (sort === 'asc') {
//       setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
//     } else {
//       setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
//     }
//   }, [sort]);
  
//   // You can add more filtering conditions for price if needed
//   // Example: Filter products with prices less than or equal to a certain value
//   useEffect(() => {
//     setFilteredProducts((prev) =>
//       prev.filter((item) => item.price <= filters.maxPrice)
//     );
//   }, [filters.maxPrice]);
  

//   return (
//     <Container>
//       {cat
//         ? filteredProducts.map((item) => <Product item={item} key={uuidv4()} />)
//         : products
//             .slice(0, 8)
//             .map((item) => <Product item={item} key={uuidv4()} />)
//             }
//     </Container>
//   );
// };

// export default Products;



import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:4000/api/products?category=${cat}`
            : "http://localhost:4000/api/products?category"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const applyFilters = () => {
      const updatedProducts = products
        .filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            if (key === "color" || key === "size") {
              return item[key].some(
                (itemValue) => itemValue.toLowerCase() === value.toLowerCase()
              );
            }
            return true;
          })
        )
        .sort((a, b) => {
          if (sort === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (sort === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });

      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [products, filters, sort]);

  console.log("Filtered Products:", filteredProducts);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
