import { useContext, useState } from "react";
import { AuthContext } from "../ContextProvider/ContextProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUserRegistration = (event) => {
    event.preventDefault();

    setError("");

    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;

    const metaInfo = {
      displayName: name,
      photoURL: photo,
    };

    console.log(name, photo, email, password);

    // password condition checker
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      console.log("Password Error");
      setError(
        "Your password must be 6 characters long, have at least one uppercase letter, at least one lowercase letter, at least one number, at least one lowercase letter  and one special character."
      );
      return;
    }

    if (!terms) {
      setError("You must accept our Terms & Conditions");
      return;
    }

    // signup happens here
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setSuccess(true);
        setError("");

        // During signup update name and photo url here
        updateProfile(auth.currentUser, metaInfo)
          .then(() => {
            console.log("Photo and name updated");
          })
          .catch((error) => {
            console.log("Profile Update Error", error);
          });
        // During signup update name and photo url ends here

        // send verification email starts
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });
        // send verification email ends
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code: ", errorCode);
        console.log("Error Message:", errorMessage);
        errorCode === "auth/email-already-in-use" &&
          setError("An account with ths email address already exists.");
        setSuccess(false);
      });
  };

  const handleShowHidePassword = () => {
    console.log("PW");
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  return (
    <div className="w-6/12 mx-auto my-10">
      <h2 className="font-bold text-2xl text-center my-5">Register</h2>

      <form onSubmit={handleUserRegistration} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered"
            required
          />
        </div>

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

        <div>
          <div className="form-control justify-center">
            <label className="cursor-pointer label">
              <span className="label-text">Accept Terms & Conditions</span>
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-secondary"
              />
            </label>
          </div>
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
            Your account is successfully created
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
