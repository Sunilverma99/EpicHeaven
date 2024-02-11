import React, { useState  } from "react";
import {  useNavigate ,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice.js";
import OAuth from "./OAuth.jsx";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch=useDispatch();
  const history = useNavigate();
  const [formdata,setFormdata]=useState({
    email:"",
    password:""
 
  });
  const { error, loading } = useSelector((state) => state.user);
  
  const handleChange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
    console.log(formdata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formdata.email === "" || formdata.password === "") {
      toast.error("Please fill all the input fields");
      // Assuming setLoading is a function to manage loading state
      setLoading(false);
      return;
    }
  
    dispatch(signInStart());
  
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formdata),
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/login', config);
      const data = await response.json();
        console.log(data)
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        toast.error('Wrong credential. Please try again.');
        history("/login");
      } else {
        dispatch(signInSuccess(data));
        toast.success('You are logged in successfully.');
        history("/");
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login. Please try again.');
      dispatch(signInFailure('An error occurred during login.'));
      // Assuming history is an object with a push method
      history("/login");
    }
  };
  

  return (
    <section className=" bg-rose-100 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Please Login
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button disabled={loading} type="submit" className="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading?'Loding...':'Login'}</button>
                  <OAuth/>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account?
                     <a> <Link to={"/sign-up"}>Please Sign-up</Link></a>
                  </p>

              </form>
            
          </div>
      </div>
        
      {error || <p className=" text-red-500">{error}</p>}
  </div>
</section>
  );
}
