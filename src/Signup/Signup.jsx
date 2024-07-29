import rightarrow from "../assets/Signin/rightarrow.svg";
import or from "../assets/Signin/or.svg";
import google from "../assets/Signin/google.svg";
import facebook from "../assets/Signin/facebook.svg";
import github from "../assets/Signin/github.svg";
import brain from "../assets/Signin/brain.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import app from "../Api/Firebase";
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);
  return (
    <div className="min-h-dvh max-h-dvh bg-primary flex justify-around flex-col realtive">
      <img src={brain} className="absolute left-0 bottom-0 z-[-1]" />
      <div className="flex flex-col gap-3 py-3">
        <p className="text-black font-syne font-bold text-4xl [text-shadow:_2px_2px_0_rgb(229_130_190_/_100%)] text-center">
          Sign Up
        </p>
        <p className="font-syne font-bold text-center text-xs">
          The Learning Adventure Begins - Sign Up!
        </p>
      </div>
      <div className="px-7 flex flex-col gap-6">
        <div>
          <p className="font-syne font-bold text-sm">Name</p>
          <input
            type="text"
            placeholder="Enter your Full Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full border-2 pl-6  border-black rounded-md shadow-[5px_5px_0px_rgb(229_130_190_/_100%)] min-h-10"
          />
        </div>
        <div>
          <p className="font-syne font-bold text-sm">Email</p>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border-2 pl-6  border-black rounded-md shadow-[5px_5px_0px_rgb(229_130_190_/_100%)] min-h-10"
          />
        </div>
        <div>
          <p className="font-syne font-bold text-sm">Password</p>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
            className="w-full border-2 pl-6  border-black rounded-md shadow-[5px_5px_0px_rgb(229_130_190_/_100%)] min-h-10"
          />
        </div>

        <button
          className="flex justify-center "
          onClick={() => {
            toast
              .promise(createUserWithEmailAndPassword(auth, email, password), {
                loading: "Signing in...",
                success: "Signed in successfully",
                error: (err) => `This just happened: ${err.toString()}`,
              })
              .then(() => {
                updateProfile(auth.currentUser, {
                  displayName: name,
                }).then(() => {
                  navigate("/interests");
                });
              });
          }}
        >
          <div className="flex bg-secondary gap-2 font-syne text-base border-2 border-black shadow-[5px_5px_0px_black] font-bold justify-center w-1/2 p-2 rounded-md hover:transition-all east in out hover:shadow-white">
            Sign Up
            <img src={rightarrow} />
          </div>
        </button>
      </div>
      <div className="flex justify-center w-full">
        <img src={or} className="w-5/6" />
      </div>
      <div className="flex flex-col justify-center items-center active:border-none ">
        <div className="flex flex-col gap-5">
          <button
            className="flex items-center justify-start gap-3 group"
            onClick={() => {
              const provider = new GoogleAuthProvider();
              const auth = getAuth();
              signInWithPopup(auth, provider)
                .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  // IdP data available using getAdditionalUserInfo(result)
                  navigate("/interests");
                })
                .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.customData.email;
                  // The AuthCredential type that was used.
                  const credential =
                    GoogleAuthProvider.credentialFromError(error);
                  // ...
                });
            }}
          >
            <img
              src={google}
              className="group-hover:-translate-y-1 group-hover:transition-all"
            />
            <p className="font-syne font-bold underline-offset-2 underline text-sm">
              Continue with Google
            </p>
          </button>
          <button
            className="flex items-center justify-start gap-3 group"
            onClick={() => {
              toast.error("In progress! 🚧");
            }}
          >
            <img
              src={facebook}
              className="group-hover:-translate-y-1 group-hover:transition-all"
            />
            <p className="font-syne font-bold underline-offset-2 underline text-sm">
              Continue with Facebook
            </p>
          </button>
          <button
            className="flex items-center justify-start gap-3 group "
            onClick={() => {
              const provider = new GithubAuthProvider();
              const auth = getAuth();
              signInWithPopup(auth, provider)
                .then((result) => {
                  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                  const credential =
                    GithubAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;

                  // The signed-in user info.
                  const user = result.user;
                  // IdP data available using getAdditionalUserInfo(result)
                  // ...
                })
                .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.customData.email;
                  // The AuthCredential type that was used.
                  const credential =
                    GithubAuthProvider.credentialFromError(error);
                  // ...
                });
            }}
          >
            <img
              src={github}
              className="group-hover:-translate-y-1 group-hover:transition-all"
            />
            <p className="font-syne font-bold underline-offset-2 underline text-sm">
              Continue with Github
            </p>
          </button>
        </div>
      </div>
      <div className="flex justify-center font-syne text-sm gap-2">
        <p className="font-semibold text-[#676262]">Already have an account?</p>
        <button
          className="font-bold"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign In
        </button>
      </div>

      <Toaster
        position="bottom-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#E582BE",
            color: "#FAEDCD",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
};

export default Signup;
