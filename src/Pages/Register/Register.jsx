import React from "react";
import { Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

 function onSubmit() {
    setIsLoading(true);
    setErrMsg('');
    // const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values); // will create promise 
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .then(({data})=>{
      // console.log('data', data);
      // navigate to Login page
        if(data.message == 'success'){
          navigate("/login")
        }

    }).catch((err)=>{
      console.log('err', err);
      console.log('err.response.data.message', err.response.data.message);
      
      // setErrMsg(err.response.data.errors.msg) || setErrMsg(err.response.data.message);
       setErrMsg(err.response.data.message);
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  // function validate(values) {
  //   const errors = {};
  //   if (values.name == '') {
  //     errors.name = "Name is required";
  //   }else if(values.name.length < 3){
  //     errors.name = "Name must be at least 3 characters";
  //   }else if(values.name.length > 50){
  //     errors.name = "Name must be less than 50 characters";
  //   }

  //   if (values.email == '') {
  //     errors.email = "Email is required";
  //   }else if(!values.email.includes('@')){
  //     errors.email = "Email is invalid";
  //   }else if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)){
  //     errors.email = "Email is invalid";
  //   }

  //   if (values.password == '') {
  //     errors.password = "Password is required";
  //   }else if(values.password.length < 8){
  //     errors.password = "Password must be at least 8 characters";
  //   }

  //   if (values.rePassword == '') {
  //     errors.rePassword = "Repassword is required";
  //   }else if(values.rePassword !== values.password){
  //     errors.rePassword = "Repassword must match password";
  //   }

  //   if (values.phone == '') {
  //     errors.phone = "Phone is required";
  //   }else if(!/^\d{10}$/.test(values.phone)){
  //     errors.phone = "Phone is invalid";
  //   }

  //   return errors;
  // }

  // Yup for validation 
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    rePassword: Yup.string().required("Repassword is required").oneOf([Yup.ref('password')], 'Repassword must match password'),
    phone: Yup.string().required("Phone is required").matches(/^\d{12}$/, "Phone is invalid"),
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
        <h1 className="text-3xl font-bold text-center my-10">Register Now</h1>

        <form action="" className="" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6 w-3/4 mx-auto">
            <Input
              isInvalid={touched.name && errors.name}
              label="Name"
              type="text"
              variant="bordered"
              className="md:col-span-2"
              name="name"
              value={values.name}
              onChange={handleChange}
              errorMessage={errors.name}
              onBlur={handleBlur}
            />
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
              className=""
              name="password"
              value={values.password}
              onChange={handleChange}
              errorMessage={errors.password}
              onBlur={handleBlur}
            />
            <Input
              isInvalid={touched.rePassword && errors.rePassword}
              label="Repassword"
              type="password"
              variant="bordered"
              className=""
              name="rePassword"
              value={values.rePassword}
              onChange={handleChange}
              errorMessage={errors.rePassword}
              onBlur={handleBlur}
            />
            <Input
              isInvalid={touched.phone && errors.phone}
              label="Phone"
              type="tel"
              variant="bordered"
              className="md:col-span-2"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              errorMessage={errors.phone}
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
              Register
            </Button>
            {errMsg && <p className="text-red-500 text-center text-sm">{errMsg}</p>}
          </div>
        </form>
      </div>
    </>
  );
}
