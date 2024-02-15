import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function AdminSignUp() {
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [loading,setLoading] = useState(false)


  const navigate = useNavigate();

  const handleCreation = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}auth/users/`, {
        method: 'POST',
        headers : {
          'Content-type':'application/json',
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`

        },
        body: JSON.stringify({type:"normal",
                              username:username,
                              email:email,
                              password:password
                              }),
      });
      if(!response.ok){
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      window.alert(`Created an admin user with the username "${username}" and password of ${password} `)
      navigate("/admin")
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <header className="flex flex-col items-center mt-5">
        <img
          src="/logo.png"
          alt="Kardan University Logo"
          className="w-40 h-30"
        />
        <div className="text-right hidden md:block"></div>
      </header>

      <main className="flex flex-col items-center mt-8 min-h-screen">
        <div className="bg-white shadow-md rounded-lg px-8 py-3 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Hello!</h2>
          <p className="text-gray-500 text-center mb-8">
            Here you can create an admin
          </p>
          <form onSubmit={handleCreation}>
            <div className="mb-4">
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="fullName"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full shadow-sm bg-gray-50 border rounded-md py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="pl-10 w-full shadow-sm bg-gray-50 border rounded-md py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-10 w-full shadow-sm bg-gray-50 border rounded-md py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 bg-blue-500 border border-transparent rounded-md font-semibold text-base text-white uppercase tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Loading . . ." : "Register"}
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminSignUp;
