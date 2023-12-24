import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRequest } from '../requestMethods';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await publicRequest.get(`/products/wishlist/${currentUser._id}`);
        setWishlist(res.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (currentUser) {
      getWishlist();
    }
  }, [currentUser]);

  return (
    <>
    <Navbar/>
    <Announcement/>
    <div className="container mx-auto my-10 p-8 bg-white shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Wishlist</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((product) => (
          <li key={product._id} className="border p-4 rounded-md">
            <Link to={`/product/${product._id}`} className="flex flex-col items-center">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-40 object-cover mb-4"
              />
              <p className="text-lg font-semibold mb-2">{product.title}</p>
              <p className="text-gray-500">Price: Pkr {product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Wishlist;
