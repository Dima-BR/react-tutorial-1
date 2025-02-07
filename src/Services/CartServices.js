import axios from "axios";
import { Slide, toast } from "react-toastify";



export async function addToCart(productId, setisLoadingbtn) {
    setisLoadingbtn(true);
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
    
    setisLoadingbtn(false);

    if (data.status == "success") {
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
  }