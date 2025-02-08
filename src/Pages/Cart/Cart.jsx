import axios from "axios";
import { useEffect, useState } from "react";
import CartItems from "../../Components/CartItems/CartItems";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

export default function Cart() {
  const [isLoading, setisLoading] = useState(true);
  const [cartId, setCartId] = useState(null);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [loadingCartEmpty, setLoadingCartEmpty] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  async function getCartItems() {
    setisLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    // console.log("Cart data", data);
    setCartId(data.cartId);
    setNumberOfCartItems(data.numOfCartItems);
    setCartData(data.data);
    setisLoading(false);
  }

  async function removeFromCart(productId, setisLoading) {
    setisLoading(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    // console.log("data", data);
    setCartData(data.data);
    setCartId(data.cartId);
    setNumberOfCartItems(data.numOfCartItems);
    setisLoading(false);
  }

  async function clearCart() {
    setLoadingCartEmpty(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    // console.log("data", data);
    setLoadingCartEmpty(false);
    setCartData(null);
    setCartId(null);
    setNumberOfCartItems(0);
  }

  async function updateCart(productId, count, setincrementIsLoading, setdecrementIsLoading, currentCount) {
    if(count > currentCount) setincrementIsLoading(true);
    if(count < currentCount) setdecrementIsLoading(true);

    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("data update", data);
    setincrementIsLoading(false);
    setdecrementIsLoading(false);
    setCartData(data.data);
    setCartId(data.cartId);
    setNumberOfCartItems(data.numOfCartItems);
  }

  if (numberOfCartItems == 0 && !isLoading) {
    return (
      <>
        <div className="flex items-center justify-center  bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg w-full flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80px"
              height="80px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4"
                stroke="#1C274C"
                strokeWidth="1.5"
              />
              <path
                d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"
                stroke="#1C274C"
                strokeWidth="1.5"
              />
              <path
                d="M4.5 18L12 9M19.5 18L12.5 9.5M4.5 10L12 21L19.5 10"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">
              Looks like you have not added anything to your cart yet.
            </p>
            <Link
              className="block m-8 px-6 py-3 border border-gray-600 text-black text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              to={"/products"}
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    <Loading />;
  }

  return (
    <>
      <h1>Cart</h1>

      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {numberOfCartItems} Items
                </h2>
                <Button
                  className="font-manrope font-bold text-md leading-8 text-gray-600"
                  onPress={clearCart}
                  isLoading={loadingCartEmpty}
                  color="danger"
                  variant="bordered"
                >
                  Clear Cart
                </Button>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {cartData?.products.map((product, index) => (
                <CartItems
                  key={index}
                  product={product}
                  removeFromCart={removeFromCart}
                  updateCart={updateCart}
                />
              ))}

              {/* <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
          <div className="w-full md:max-w-[126px]">
            <img src="https://pagedone.io/asset/uploads/1701162866.png" alt="perfume bottle image" className="mx-auto rounded-xl object-cover" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="md:col-span-2">
              <div className="flex flex-col max-[500px]:items-center gap-3">
                <h6 className="font-semibold text-base leading-7 text-black">Musk Rose Cooper</h6>
                <h6 className="font-normal text-base leading-7 text-gray-500">Perfumes</h6>
                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">$120.00</h6>
              </div>
            </div>
            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
              <div className="flex items-center h-full">
                <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                    <path d="M16.5 11H5.5" stroke strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <input type="text" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent" placeholder={2} />
                <button className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
              <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">$240.00</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
          <div className="w-full md:max-w-[126px]">
            <img src="https://pagedone.io/asset/uploads/1701162880.png" alt="perfume bottle image" className="mx-auto rounded-xl object-cover" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="md:col-span-2">
              <div className="flex flex-col max-[500px]:items-center gap-3">
                <h6 className="font-semibold text-base leading-7 text-black">Dusk Dark Hue</h6>
                <h6 className="font-normal text-base leading-7 text-gray-500">Perfumes</h6>
                <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">$120.00</h6>
              </div>
            </div>
            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
              <div className="flex items-center h-full">
                <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                    <path d="M16.5 11H5.5" stroke strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <input type="text" className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent" placeholder={1} />
                <button className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
              <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">$120.00</p>
            </div>
          </div>
        </div> */}
            </div>
            <div className="sticky top-20 self-start col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="font-normal text-lg leading-8 text-black">
                    {numberOfCartItems} Items
                  </p>
                  <p className="font-medium text-lg leading-8 text-black">
                    ${cartData?.totalCartPrice}
                  </p>
                </div>
                <form>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                    Shipping
                  </label>
                  <div className="flex pb-6">
                    <div className="relative w-full">
                      <div className=" absolute left-0 top-0 py-3 px-4">
                        <span className="font-normal text-base text-gray-300">
                          Second Delivery
                        </span>
                      </div>
                      <input
                        type="text"
                        className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                        placeholder="$5.00"
                      />
                      <button
                        id="dropdown-button"
                        data-target="dropdown-delivery"
                        className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                        type="button"
                      >
                        <svg
                          className="ml-2 my-auto"
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                            stroke="#6B7280"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        id="dropdown-delivery"
                        aria-labelledby="dropdown-delivery"
                        className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Shopping
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Images
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              News
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Finance
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-8">
                    <p className="font-medium text-xl leading-8 text-black">
                      {numberOfCartItems} Items
                    </p>
                    <p className="font-semibold text-xl leading-8 text-indigo-600">
                      ${cartData?.totalCartPrice + 5}
                    </p>
                  </div>
                  <button className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
