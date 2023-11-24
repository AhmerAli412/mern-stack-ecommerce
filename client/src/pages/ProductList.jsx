import { useLocation } from "react-router";
import { useState } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const ProductList = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment.trim() !== "");
  const cat = pathSegments.length >= 3 ? pathSegments[2] : null;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value.toLowerCase(),
    });
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <h1 className="m-5 text-3xl font-bold">{cat}</h1>
      <div className="flex justify-between m-5">
        <div className="m-2">
          <span className="text-2xl font-semibold mr-2">Filter Products:</span>
          <select
            name="color"
            onChange={handleFilters}
            className="p-2 mr-2 border rounded-md"
          >
            <option>Color</option>
            <option>white</option>
            <option>black</option>
            <option>orange</option>
            <option>silver</option>
            <option>blue</option>
            <option>skin</option>
            <option>pink</option>
            <option>green</option>
          </select>
          <select
            name="size"
            onChange={handleFilters}
            className="p-2 border rounded-md"
          >
            <option disabled>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="m-2">
          <span className="text-2xl font-semibold mr-2">Sort Products:</span>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
