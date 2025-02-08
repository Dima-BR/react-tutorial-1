import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { Slide, toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [loadingButtons, setLoadingButtons] = useState({});

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    setisLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log("data", data);
    setProducts(data.data);
    setisLoading(false);
  }

  async function addToCart(productId) {
    setLoadingButtons((prev) => ({ ...prev, [productId]: true })); // ???? not undderstand it 
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log("data product cart", data);

    if (data.status === "success") {
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
    setLoadingButtons((prev) => ({ ...prev, [productId]: false }));
  }

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center py-6">Products</h1>
      <div className="grid grid-cols-1 3xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 xl:gap-8 px-8">
        {products.map((product, index) => (
          <div key={index}>
            <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
              <Link
                className="relative mx-3 mt-3 flex  overflow-hidden rounded-xl"
                to={"/pdp/" + product._id}
              >
                <img
                  className="object-contain w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="absolute top-0 left-0   flex justify-start align-top gap-2">
                  {product?.priceAfterDiscount && (
                    <span className=" rounded-md py-1 bg-red-500 px-2 text-center text-sm font-medium text-white">
                      {/* {product.brand.name} */}
                      {100 -
                        Math.round(
                          (product?.priceAfterDiscount * 100) / product?.price
                        )}
                      %off
                    </span>
                  )}
                  {/* <span className="rounded-md py-1 bg-red-500 px-2 text-center text-sm font-medium text-white">
                    sale
                  </span> */}
                </div>
              </Link>
              {/* ??? why it's not grow?? height for the cards not aligned */}
              <div className="mt-4 px-5 pb-5 flex flex-col justify-between grow">
                <div>
                  <Link to={"/pdp/" + product._id}>
                    <h5 className="text-xl tracking-tight text-slate-900 line-clamp-2">
                      {product.title}
                    </h5>
                  </Link>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-3xl font-bold text-slate-900">
                            ${product.priceAfterDiscount}
                          </span>
                          <span className="text-sm text-slate-900 line-through">
                            {product.price}$
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-slate-900">
                          ${product.price}
                        </span>
                      )}
                    </p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rate) => {
                        return product.ratingsAverage >= rate ? (
                        <svg
                          aria-hidden="true"
                          className={`h-5 w-5 ${
                            product.ratingsAverage >= rate
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        );
                      })}

                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Button */}
                <Button
                  href="#"
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onPress={() => addToCart(product._id)}
                  isLoading={loadingButtons[product._id]}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
