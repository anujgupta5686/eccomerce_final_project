import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white flex  rounded-lg shadow-lg overflow-hidden w-72">
      {/* Product Image */}
      <div className="w-full h-40 flex justify-center items-center hover:scale-105 transition-all duration-200">
        <img
          src={data?.productImage[0]}
          className="object-cover h-full"
          alt={data.productName}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 line-clamp-2 mb-2">
          {data.productName}
        </h1>
        <p className="text-gray-600 line-clamp-3 mb-4">
          {data.productDescription}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-green-600">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className="flex items-center justify-center w-10 h-10 bg-green-100 group hover:bg-green-600 rounded-full cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline className="text-green-600 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
