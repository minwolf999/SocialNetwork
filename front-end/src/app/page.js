"use client";
//https://www.youtube.com/watch?v=eUltFtCvQGg  Les secrets pour apprendre à coder comme un génie

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // import the useRouter hook
import { Header } from "./Components/Header.js";

const Login = () => {
  const router = useRouter();
  const [valueMail, setValueMail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  // const [disabled, setDisabled] = useState(true); // Controlled via form validation

  const handleLogin = async (event) => {
    event.preventDefault();

    const formDataLogin = {
      Email: valueMail,
      Password: valuePassword,
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(formDataLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.hasOwnProperty("Success")) {
          document.cookie = `sessionId=${result.sessionId}; path=/`;
          setValueMail("");
          setValuePassword("");
          router.push("/home");
        } else {
          const errorDiv = document.getElementById("divError");
          errorDiv.style.display = "flex";
        }
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <header>
        <title>Home</title>
        <meta name="description" content="React demo app" />
      </header>

      <Header name={"Welcome to the login"} />

      <section className="flex flex-col justify-center items-center flex-[0.6] mt-4">
        <form
          className="flex flex-col p-5 w-auto md:w-auto sm:w-auto lg-[25vw]"
          onSubmit={handleLogin}
        >
          <div className="flex m-3 justify-center text-customBlue text-3xl font-bold text-center">
            Login with an account
          </div>
          <div className="flex flex-col m-4 justify-center text-black">
            <input
              type="text"
              id="Username"
              className="m-3 p-1.5 rounded-md border-2 border-gray-500"
              placeholder="Mail"
              required
              value={valueMail}
              onChange={(e) => setValueMail(e.target.value)}
            />

            <input
              type="password"
              id="Password"
              className="m-3 p-1.5 rounded-md border-2 border-gray-500"
              required
              placeholder="********"
              value={valuePassword}
              onChange={(e) => setValuePassword(e.target.value)}
            />
            <button
              id="LoginButton"
              className="m-3 border-2 p-1 rounded-md bg-customBlue text-white"
              type="submit"
              disabled={!valueMail || !valuePassword}
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              id="ToRegisterButton"
              className="m-3 p-1 justify-center flex no-underline hover:no-underline border-2 rounded-md bg-customBlue text-white"
            >
              Register
            </button>
            <div
              id="divError"
              className="m-3 p-1 justify-center hidden no-underline hover:no-underline border-2 rounded-md bg-red-600 text-white"
            >
              <span>Mauvais mot de passe ou mauvaise adresse mail</span>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
