import React, { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../ContextProvider/ContextProvider";

const Login = () => {
  const { userLogin } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const handleUserLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password)
      .then((userCredential) => {
        // Signed in
        setSuccess(true);
        setError("");
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setSuccess(false);
        setError(errorCode);
      });
  };

  const handleShowHidePassword = () => {
    console.log("PW");
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  return (
    <div className="w-6/12 mx-auto my-10">
      <h2 className="font-bold text-2xl text-center my-5">Login</h2>

      <form onSubmit={handleUserLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />

          <button
            type="button" // Add this line
            onClick={handleShowHidePassword}
            className="btn btn-xs absolute right-1 top-11"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>

          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-secondary">Login</button>
        </div>
      </form>

      {error && (
        <div>
          <p className="text-red-600 text-lg font-bold">{error}</p>
        </div>
      )}

      {success && (
        <div>
          <p className="text-green-600 text-lg font-bold">
            Your have successfully logged in
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
