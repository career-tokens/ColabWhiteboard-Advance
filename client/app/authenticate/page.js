"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Authenticate = () => {
  const router = useRouter();
  const [formType, setFormType] = useState("login");
  const [data, setData] = useState({});

  const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
      if (data.name === undefined || data.email === undefined)
      {
          toast.error("Please enter all your credentials!");
      }
      else if (handleVerifyEmail(data.email) === false)
      {
          toast.error("Please enter correct email !")
      }
      else
      {
          if (formType === "signup")
          {
              try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
                      method: "POST",
                      headers: {
                          "Content-type": "application/json",
                      },
                      body: JSON.stringify(data)
                  });
                  const response = await res.json();
                  if (res.status === 200)
                  {
                      toast.success(response.message);
                      localStorage.setItem("user", data.email);
                      router.push("/")
                  }
                  else
                  {
                      toast.error(response.message)
                   }
              }
              catch (error)
              {
                  toast.error("Failed to sign up. Please try again.");
              }
              
          }
          else
          {
              try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                      method: "POST",
                      headers: {
                          "Content-type": "application/json",
                      },
                      body: JSON.stringify(data)
                  });
                  const response = await res.json();
                  if (res.status === 200)
                  {
                      toast.success(response.message);
                      localStorage.setItem("user", data.email);
                      router.push("/");
                  }
                  else
                      toast.error(response.message)
              }
              catch (error)
              {
                  toast.error("Failed to login . Please try again.");
              }
          }
      }
  }

  const handleVerifyEmail = (email) => {
      if (!email.match((/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)))
          return false;
      else
          return true;
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center " style={{background:"linear-gradient(to bottom, #0f0c29, #302b63, #24243e)"}}>
      <div className="main w-[350px] h-[500px] bg-red-500 overflow-hidden rounded-2xl shadow-2xl relative"
        style={{
          boxShadow: "5px 20px 50px #000",
          background:"linear-gradient(to bottom, #0f0c29, #302b63, #24243e)"
        }}>
        <input type="checkbox" id="chk" aria-hidden="true" className="hidden" />

        <div className="signup w-full h-full relative">
          <div className="flex flex-col items-center">
            <label htmlFor="chk" aria-hidden="true" className="flex justify-center text-white text-[30px] font-[Montserrat] m-[60px] font-bold cursor-pointer transition duration-500 transform hover:scale-110">
              {
                formType==="signup"? "SIGN UP":"LOGIN"
              }
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              required
              className="flex justify-center mx-auto my-[20px] border-none outline-none w-3/5 bg-gray-300 mb-4 p-2 h-[20px] rounded text-[20px]" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              required
              className="flex justify-center mx-auto my-[20px] border-none outline-none w-3/5 bg-gray-300 mb-4 p-2 h-[20px] rounded text-[20px]" />
            <button
              onClick={handleSubmit}
              className="w-3/5 h-[40px] my-[10px] mx-auto  flex justify-center bg-[#573b8a] mt-[20px] outline-none border-none cursor-pointer text-white text-lg font-bold py-2 rounded transition duration-200 hover:bg-purple-800">
              {
                formType==="signup"? "GET STARTED":"WELCOME BACK"
              }
            </button>
            <div>
              {
                  formType === "login" ?
                      <p  className="text-white cursor-pointer text-[17px]"
                          onClick={() => {
                          setFormType("signup")
                          }}>New User? Register now
                      </p>
                      :
                      <p className="text-white cursor-pointer text-[17px]"
                          onClick={() => {
                          setFormType("login")
                          }}>Already registered? SignIn now
                      </p>
              }
          </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Authenticate;
