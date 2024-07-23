import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-48 bg-white rounded-sm shadow-md flex animate-pulse"
              >
                <div className="bg-slate-200 h-full w-1/3 p-4"></div>
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="h-6 bg-slate-200 rounded-full"></div>
                  <div className="h-4 bg-slate-200 rounded-full"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
                  <div className="h-8 bg-slate-200 rounded-full mt-auto"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={"product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-48 bg-white rounded-sm shadow-md flex group transition-transform"
                key={product?._id}
              >
                <div className="bg-slate-200 h-full w-1/3 p-4 flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt={product?.productName}
                    className="object-contain h-full w-full group-hover:scale-110 transition-transform mix-blend-multiply"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <h2 className="font-medium text-base md:text-lg text-black text-ellipsis line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-cyan-500 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-cyan-500 hover:bg-cyan-700 text-white px-3 py-1 rounded-full mt-auto"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
