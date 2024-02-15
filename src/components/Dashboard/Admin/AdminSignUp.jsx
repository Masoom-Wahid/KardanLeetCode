import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";


function AdminSignUp() {
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
            Here you can sign up as an admin
          </p>
          <form>
            <div className="mb-4">
              <div className="relative flex items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="fullName"
                  placeholder="Full Name"
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
              Register
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminSignUp;
