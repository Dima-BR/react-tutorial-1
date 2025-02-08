import { Button } from "@heroui/react";
import { useEffect } from "react";
// import axios from "axios";
import { useState } from "react";

export default function CartItems({ product, removeFromCart, updateCart }) {
  console.log("product cart item", product);
  const [isLoading, setisLoading] = useState(false);
  const [incrementIsLoading, setincrementIsLoading] = useState(false);
  const [decrementIsLoading, setdecrementIsLoading] = useState(false);
  const [productCount, setproductCount] = useState(product.count);

  useEffect(() => {
    setproductCount(product.count);
  }, [product.count]);

  return (
    <>
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
        <Button
          className="bg-transparent"
          isLoading={isLoading}
          onPress={() => removeFromCart(product.product._id, setisLoading)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 27.965 27.965"
            xmlSpace="preserve"
          >
            <g>
              <g id="c142_x">
                <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982    C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78    l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782    c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z" />
              </g>
              <g id="Capa_1_104_" />
            </g>
          </svg>
        </Button>
        <div className="w-full md:max-w-[126px]">
          <img
            src={product.product.imageCover}
            alt="perfume bottle image"
            className="mx-auto rounded-xl object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
          <div className="md:col-span-2">
            <div className="flex flex-col max-[500px]:items-center gap-3">
              <h6 className="font-semibold text-base leading-7 text-black">
                {product.product.title}
              </h6>
              <h6 className="font-normal text-base leading-7 text-gray-500">
                {product.product.category.name}
              </h6>
              <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                ${product.price}
              </h6>
            </div>
          </div>
          <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
            <div className="flex items-center gap-0.5">
              {/* Decrease Button */}
              <Button
                onPress={() =>
                  updateCart(
                    product.product._id,
                    product.count - 1,
                    setincrementIsLoading,
                    setdecrementIsLoading,
                    product.count
                  )
                }
                isLoading={decrementIsLoading}
                className="w-7 h-7 border border-gray-300 bg-white flex items-center justify-center rounded-md hover:bg-gray-100 transition-all"
              >
                <svg
                  className="stroke-gray-900 transition-all duration-300 group-hover:stroke-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M16.5 11H5.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>

              {/* Quantity Input */}
              <input
                type="text"
                className="border border-gray-300 text-gray-900 font-semibold text-xs w-8 h-7 text-center rounded-md outline-none bg-white"
                value={productCount}
                min={1}
                onChange={(e) => setproductCount(e.target.value)}
                onBlur={(e) => updateCart(product.product._id, e.target.value, setincrementIsLoading, setdecrementIsLoading, product.count)}

              />

              {/* Increase Button */}
              <Button
                onPress={() =>
                  updateCart(
                    product.product._id,
                    product.count + 1,
                    setincrementIsLoading,
                    setdecrementIsLoading,
                    product.count
                  )
                }
                isLoading={incrementIsLoading}
                className="w-7 h-7 border border-gray-300 bg-white flex items-center justify-center rounded-md hover:bg-gray-100 transition-all"
              >
                <svg
                  className="stroke-gray-900 transition-all duration-300 group-hover:stroke-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
              ${product.price * product.count}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
