import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Collections = () => {
  return (
    <div>
        <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 class="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">Collections</h2>

    <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
   
      <div>
        <Link to="/products" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src="https://i.insider.com/5c6eb18f342cca7f135ba1f3?width=1000&format=jpeg&auto=webp" loading="lazy" alt="Photo by Austin Wade" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
            <span class="text-gray-500">Men</span>
            <span class="text-lg font-bold text-gray-800 lg:text-xl">Business Causual</span>
          </div>
        </Link>
      </div>
     
      <div>
        <Link to="/products" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src="https://cdn.shopify.com/s/files/1/0549/8912/7731/products/Riga-Baby-Look_ab9ea789-62d8-456b-9771-25a1ab2bca43.jpg" loading="lazy" alt="Photo by engin akyurt" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
            <span class="text-gray-500">Women</span>
            <span class="text-lg font-bold text-gray-800 lg:text-xl">Summer Season</span>
          </div>
        </Link>
      </div>
    
      <div>
        <Link to="/products" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src="https://static.thehoneycombers.com/wp-content/uploads/sites/6/2020/03/kids-clothes-in-Hong-Kong.jpg" loading="lazy" alt="Photo by Austin Wade" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
            <span class="text-gray-500">Men</span>
            <span class="text-lg font-bold text-gray-800 lg:text-xl">Streetwear</span>
          </div>
        </Link>
      </div>
      
      <div>
        <Link to="/products" class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src="https://www.verywellfamily.com/thmb/vy3Au-X1TWDhdFNFcIJn_FfshMk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-places-to-buy-kids-clothes-5190552-v1-d45adce7b25f414e89d16a85dc7e077f.jpg" loading="lazy" alt="Photo by Austin Wade" class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

          <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
            <span class="text-gray-500">Women</span>
            <span class="text-lg font-bold text-gray-800 lg:text-xl">Sale</span>
          </div>
        </Link>
      </div>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default Collections