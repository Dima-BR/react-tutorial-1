import React, { useContext } from "react";
import { Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from './../../contexts/authContext';

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const navigate = useNavigate();
  const {setisLoggedIn} = useContext(authContext);

  const initialValues = {
    email: "",
    password: "",
  };

 function onSubmit() {
    setIsLoading(true);
    setErrMsg('');
    // const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values); // will create promise 
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    .then(({data})=>{
      // navigate to Home page
        if(data.message == 'success'){
          console.log('data for token',data);
          setisLoggedIn(true);
          localStorage.setItem('token', data.token)
          navigate("/")
        }

    }).catch((err)=>{
      setErrMsg(err.response.data.message);
    }).finally(()=>{
      setIsLoading(false);
    })
  }


  // Yup for validation 
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),

  });

  // custom hook to handle form submission
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="sm:w-2/3 mx-auto py-10">
        <h1 className="text-3xl font-bold text-center my-10">Login Now </h1>

        <form action="" className="" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6 w-3/4 mx-auto">
           
            <Input
              isInvalid={touched.email && errors.email}
              label="Email"
              type="email"
              variant="bordered"
              className="md:col-span-2"
              name="email"
              value={values.email}
              onChange={handleChange}
              errorMessage={errors.email}
              onBlur={handleBlur}
            />
            <Input
              isInvalid={touched.password && errors.password}
              label="Password"
              type="password"
              variant="bordered"
              className="md:col-span-2"
              name="password"
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              onBlur={handleBlur}
              
            />

            <Button
              isLoading={isLoading}
              color="secondary"
              className="md:col-span-2"
              type="submit"
              disabled={isLoading}
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              Login
            </Button>
            {errMsg && <p className="text-red-500 text-center text-sm">{errMsg}</p>}
          </div>
        </form>
      </div>
    </>
  );
}
