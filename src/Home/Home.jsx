import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import menu from "../assets/Home/menu.svg";
import search from "../assets/Home/search.svg";
import line from "../assets/Home/line.svg";
import Cards from "./Cards";
import Course from "./Course";
import profile from "./../assets/Home/Buttons/profile.svg";
import home from "./../assets/Home/Buttons/home.svg";
import chat from "./../assets/Home/Buttons/chat.svg";
import app from "../Api/Firebase";

// Create a function to choose a random color from an array of colors
const colors = [
  "#BBD700",
  "#7385DE",
  "#FF5E8C",
  "#FBA979",
  "#39DBFF",
  "#00FF75",
  "#FFF500",
];

const Home = () => {
  const auth = getAuth(app);
  const [userData, setUserData] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore(app);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          try {
            const response = await axios.get(
              "https://opensheet.elk.sh/1GEiuQarQBMnXMHh0THG47fwiNNi-PeAjER_DRq7zQcM/popular"
            );

            const valuesArray = response.data.map(
              (course) => course["Top Courses"]
            );

            if (Array.isArray(valuesArray)) {
              setPopular(valuesArray);
            } else {
              console.error("Expected an array, but got:", valuesArray);
            }
          } catch (error) {
            console.error("Error fetching popular courses:", error);
          }

          setIsLoading(false);
        } else {
          console.log("No such document!");
          toast.error("Enter your interests to get personalized courses");
          window.location.href = "/interests";
        }
      } else {
        toast.error("Please login Again");
        navigate("/signin");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchData = (value) => {
    const result = userData.recommendedCourses.filter((course) => {
      return (
        value &&
        course &&
        course.courseName &&
        course.courseName.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchResults(result);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value === "") {
      setSearchResults([]);
    } else {
      fetchData(value);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-dvh bg-primary ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-white animate-spin dark:text-white fill-secondary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between bg-primary min-h-dvh max-h-cvh gap-7">
      <div className="bg-[#FEF2E8] min-h-16 flex justify-between items-center border-b-2 border-black">
        <img src={menu} className="max-w-10 pl-3" />
        <div className="font-bold font-mont">KODOMO</div>
        <div></div>
      </div>
      <div className="px-3 relative">
        <div className="border-2 border-black flex shadow-[5px_5px_0px_rgb(229_130_190_/_100%)] p-1 gap-3 rounded-md">
          <img src={search} />
          <input
            type="text"
            placeholder="Search"
            className="w-full font-syne font-semibold bg-primary focus:outline-none"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {input && searchResults.length > 0 && (
          <div className="absolute z-10 bg-primary border-2 border-black mt-2  rounded-md shadow-lg max-h-60   overflow-y-auto max-w-50 font-fyne font-semibold">
            {searchResults.map((item, key) => (
              <div
                key={key}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setInput(item.courseName);
                  setSearchResults([]);
                  navigate("/home/chat", {
                    state: { context: item.courseName },
                  });
                }}
              >
                {item.courseName}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-3 ">
        <div className="border-2 border-black rounded-md shadow-[0px_5px_0px_0px_#000000] pb-2">
          <div className="font-syne font-bold pl-4 text-xl ">
            <p>Popular courses this week</p>
            <div className="font-bold text-xs">Stay Ahead of the Curve!</div>
          </div>
          <div className="flex justify-center w-full">
            <img src={line} />
          </div>
          <div>
            <div className="flex p-3 gap-3 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide">
              {popular.map((item, key) => (
                <Cards
                  key={key}
                  title={item}
                  button={item.button}
                  color={colors[(key % colors.length) + 1]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 pb-10 mp-10">
        <div className="border-2 border-black rounded-md shadow-[0px_5px_0px_0px_#000000]">
          <div className="font-syne font-bold pl-4 text-xl">
            <p>Suggested Topics</p>
            <div className="font-bold text-xs">
              Dive into Courses Suggested by Kodomo
            </div>
          </div>
          <div className="flex justify-center w-full py-2">
            <img src={line} />
          </div>
          <div className="flex flex-col max-h-96 overflow-y-auto px-2 py-2 scroll-smooth scrollbar-hide pb-10">
            <div className="flex flex-col p-3 gap-3 rounded">
              {userData.recommendedCourses.map((item, key) => (
                <Course
                  key={key}
                  title={item.courseName}
                  button={item.button}
                  color={colors[key % colors.length]}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 inline-flex 0 mx-auto bg-primary border-2 border-black w-11/12 rounded-full h-16 shadow-[3px_5px_0px_0px_#000000] justify-around">
          <button
            onClick={() => {
              navigate("/home/profile");
            }}
          >
            <div className="flex justify-center items-center">
              <img src={profile} />
            </div>
          </button>
          <div className="flex flex-col justify-center items-center ">
            <img src={home} />
            <div className="w-1/2 h-1 mt-2 bg-black"></div>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                navigate("/home/chat", { state: { context: "General Chat" } });
              }}
            >
              <img src={chat} />
            </button>
          </div>
        </div>
      </div>

      <Toaster
        position="bottom-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#E582BE",
            color: "#FAEDCD",
          },
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

export default Home;
