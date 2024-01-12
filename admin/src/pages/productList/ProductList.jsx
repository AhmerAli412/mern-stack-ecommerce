// import "./productList.css";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProduct, getProducts } from "../../redux/apiCalls";

// export default function ProductList() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.product.products);

//   useEffect(() => {
//     getProducts(dispatch);
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     updateProduct(id, dispatch);
//   };

//   const columns = [
//     {
//       field: "_id",
//       headerName: "Identifier",
//       width: 300,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "product",
//       headerName: "Product",
//       width: 300,
//       renderCell: (params) => {
//         return (
//           <div className="productListItem">
//             <img className="productListImg" src={params.row.img} alt="" />
//             {params.row.title}
//           </div>
//         );
//       },
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "inStock",
//       headerName: "inStock",
//       width: 300,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 300,
//       align: "center",
//       headerAlign: "center",
//     },
//     {
//       field: "action",
//       headerName: "Actions",
//       width: 300,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/product/" + params.row._id}>
//               <button className="productListEdit">Edit123</button>
//             </Link>
//             <DeleteOutline
//               className="productListDelete"
//               onClick={() => handleDelete(params.row._id)}
//             />
//           </>
//         );
//       },
//       align: "center",
//       headerAlign: "center",
//     },
//   ];

//   return (
//     <div className="productList">
//       <DataGrid
//         rows={products}
//         disableSelectionOnClick
//         columns={columns}
//         getRowId={(row) => row._id}
//         pageSize={12}
//       />
//     </div>
//   );
// }




import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTE0NGVkNWRlMzM1YTQxN2RjMjQ5YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTA2Nzc1NywiZXhwIjoxNzEwNjgzNzU3fQ.3vBoOTQScc9AlBzRwQAFWtMu9idQYOECWrl1kBa9g5I';
    deleteProduct(id, dispatch, token);
  };

  const handleUpdate = (id) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTE0NGVkNWRlMzM1YTQxN2RjMjQ5YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTA2Nzc1NywiZXhwIjoxNzEwNjgzNzU3fQ.3vBoOTQScc9AlBzRwQAFWtMu9idQYOECWrl1kBa9g5I'; // Replace with your actual access token
    const productToUpdate = products.find((product) => product._id === id);
  
    // Check if productToUpdate exists and has the 'title' property
    if (productToUpdate && 'title' in productToUpdate) {
      updateProduct(id, productToUpdate, dispatch, token);
    } else {
      console.error("Product does not exist or does not contain 'title' property:", productToUpdate);
      // Handle the error or provide a default 'title'
    }
  };
  
  
  
  

  const columns = [
    { field: "_id", headerName: "Identifier", width: 300, align: "center", headerAlign: "center" },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => (
        <div className="productListItem">
          <img className="productListImg" src={params.row.img} alt="" />
          {params.row.title}
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
    // { field: "inStock", headerName: "inStock", width: 300, align: "center", headerAlign: "center" },
    { field: "price", headerName: "Price", width: 300, align: "center", headerAlign: "center" },
    {
      field: "action",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
                       <Link to={"/product/" + params.row._id}>
               <button className="productListEdit">Edit</button>
             </Link>
          <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
        </>
      ),
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div className="productList">
      <DataGrid rows={products} disableSelectionOnClick columns={columns} getRowId={(row) => row._id} pageSize={12} />
    </div>
  );
}

