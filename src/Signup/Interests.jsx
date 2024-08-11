import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import back from "./../assets/Interests/back.svg";
import IneterestCard from "./IneterestCard";

import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import app from "./../Api/Firebase";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_genAIKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function createCourses(interest) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'You are an AI designed to give suggested courses based on the user\'s interest. You should give courses which are socially relevent and which might spike their interest\n[\n  "car",\n  "video games",\n  "programming",\n  "memes"\n]\nRetrun a JSON of the format\n  {\n    {courseName : "xxxxx",\n    descption : "xxxxxxxxx",}\n  }',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[{"courseName": "Automotive Engineering", "descption": "Learn the principles of car design, mechanics, and performance. Explore electric vehicles, autonomous driving, and the future of transportation."}, {"courseName": "Game Design and Development", "descption": "Dive into the world of game creation. Master coding, 3D modeling, level design, and storytelling to bring your game ideas to life."}, {"courseName": "Web Development", "descption": "Build interactive websites and web applications using popular languages like HTML, CSS, JavaScript, and Python.  Develop your skills in front-end and back-end development."}, {"courseName": "Social Media Marketing", "descption": "Learn how to create engaging content, build a strong online presence, and leverage social media platforms to connect with audiences and grow your brand."}, {"courseName": "Digital Media and Storytelling", "descption": "Explore the power of digital media to tell compelling stories. Master video editing, animation, graphic design, and social media strategies."}, {"courseName": "Data Science and Analytics", "descption": "Unlock the secrets of data! Learn data analysis, machine learning, and visualization techniques to gain insights from large datasets and solve real-world problems."}, {"courseName": "Artificial Intelligence and Machine Learning", "descption": "Discover the cutting-edge field of AI. Develop your skills in machine learning algorithms, deep learning, and natural language processing."}, {"courseName": "Cybersecurity", "descption": "Protect yourself and others from cyber threats. Learn ethical hacking, network security, and data privacy best practices."}, {"courseName": "Creative Writing", "descption": "Develop your writing skills and explore different genres, including fiction, non-fiction, poetry, and screenwriting."}, {"courseName": "Psychology of Humor", "descption": "Uncover the science behind laughter and learn about the psychology of memes, comedy, and humor in general."}]\n\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(interest);

  return result.response.text();
}

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [value, setValue] = useState("");
  console.log(interests);
  const data = {
    "STEM & Innovation": [
      "🔬 Science Projects & Experiments",
      "🌌 Space & Astronomy",
      "💻 Coding & App Development",
      "🤖 AI & Robotics",
      "🔒 Cybersecurity Basics",
      "🔋 Renewable Energy & Sustainability",
    ],
    "Tech & Digital Culture": [
      "📱 Gadgets & Tech Trends",
      "🕹️ Game Development & Design",
      "🌐 Internet Safety & Cyber Hygiene",
      "🎮 Esports & Online Gaming",
      "🎥 Digital Content Creation",
      "🧠 AI Memes & Tech Humor",
    ],
    "Arts & Creativity": [
      "🎨 Digital Art & Graphic Design",
      "📸 Photography & Visual Storytelling",
      "🎵 Music Production & Beatmaking",
      "📝 Creative Writing & Blogging",
      "🎭 Performing Arts & Drama",
      "🎬 Film Studies & Critique",
    ],
    "Social Studies & Humanities": [
      "🌍 World History & Ancient Civilizations",
      "🗳️ Modern Political Systems & Democracy",
      "⚖️ Social Justice & Human Rights",
      "🏛️ Civic Education & Community Involvement",
      "🌐 Global Cultures & Traditions",
      "📚 Classic & Modern Literature",
    ],
    "Life Skills & Personal Growth": [
      "🧠 Critical Thinking & Problem Solving",
      "💡 Leadership & Teamwork",
      "🗣️ Public Speaking & Communication",
      "⏰ Time Management & Productivity",
      "😌 Mindfulness & Stress Management",
      "💰 Financial Literacy & Budgeting",
    ],
    "Health & Wellbeing": [
      "🥗 Nutrition & Healthy Eating",
      "💪 Fitness & Exercise Routines",
      "🧘 Mental Health & Wellness",
      "🧬 Human Biology & Anatomy",
      "🚴 Outdoor Activities & Sports",
      "🏥 First Aid & Emergency Skills",
    ],
    "Fun & Interactive Learning": [
      "😂 Memes & Internet Culture",
      "🧩 Puzzles & Brain Games",
      "🎲 Trivia & Quizzes",
      "🎨 DIY & Creative Projects",
      "🌎 Virtual Field Trips",
      "🔬 Interactive Science Experiments",
    ],
  };

  const navigate = useNavigate();

  async function wrtieData() {
    const db = getFirestore(app);

    const auth = getAuth(app);

    if (interests.length == 0) {
      toast.error("Please choose at least one interst");
    } else {
      toast
        .promise(createCourses(interests), {
          loading: "Tuning Kodomo to your interests...",
          success: "Kodomo is ready for you!",
          error: (err) => `This just happened: ${err.toString()}`,
        })
        .then((result) => {
          const courses = JSON.parse(result);
          const data = {
            name: auth.currentUser.displayName,
            userInterest: interests,
            userid: auth.currentUser.uid,
            recommendedCourses: courses,
          };
          setDoc(doc(db, "users", auth.currentUser.uid), data);
          navigate("/home");
        });
    }
  }

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <div className="p-5">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={back} className="max-h-8 " />
        </button>
        <div className="flex flex-col gap-2">
          <p className="text-black font-syne font-bold text-2xl [text-shadow:_2px_2px_0_rgb(229_130_190_/_100%)] text-left">
            WHAT'S YOUR FLASH?
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-syne font-semibold text-xs">
              Choose topics that sparks your curiosity!
            </p>
            <p className="font-syne font-semibold text-xs">
              Kodomo will use this info to teach you topics with memes and makes
              learning a laugh-filled adventure!"
            </p>
          </div>
          <div>
            <div className="py-4 flex gap-4 flex-col overflow-scroll ">
              {Object.keys(data).map((key, index) => (
                <IneterestCard
                  key={index}
                  title={key}
                  interetsts={interests}
                  values={data[key]}
                  setInterests={setInterests}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#FFDADA] rounded-xl min-h-32 border-2 border-black flex flex-col  pb-5 ">
            <p className="font-mont font-black text-base p-3">
              {" "}
              SOMETHING ELSE?
            </p>
            <div className="inline-flex flex-col  gap-5 justify-center items-center px-5 ">
              <input
                type="text"
                placeholder="What are you interested in?"
                className="bg-primary pl-3 font-mont w-full border-2 border-black rounded-md"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />

              <button
                className="
    bg-secondary w-1/3 text-center rounded-md border-2 border-black shadow-[0px_5px_0px_0px_#000000] font-mont font-black"
                onClick={() => {
                  if (value.trim() !== "" && !interests.includes(value)) {
                    setInterests([...interests, value]);
                  }
                  setValue(""); // Clear the input box after adding the interest
                }}
              >
                ADD
              </button>
            </div>
          </div>
          <div className="bg-[#FFDADA] rounded-xl min-h-32 border-2 border-black flex flex-col pb-5">
            <p className="font-mont font-black text-base p-3">CURRENT LIST</p>
            <div className="flex flex-wrap justify-start  gap-2 px-3">
              {interests.length > 0 ? (
                interests.map((interest, index) => (
                  <button
                    key={index}
                    className="bg-secondary text-black font-medium px-3 py-1 rounded-full text-sm border-2 border-black shadow-[0px_5px_0px_0px_#ffffff]"
                    onClick={() => {
                      setInterests(interests.filter((i) => i !== interest));
                    }}
                  >
                    {interest}
                  </button>
                ))
              ) : (
                <p className="text-black text-center w-full font-semibold text-lg">
                  Uh oh! No interests added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5 ">
        <button
          className="bg-white w-1/3 font-mont font-black p-2 border border-black rounded-md shadow-[5px_5px_0px_0px_#E582BE]"
          onClick={() => {
            wrtieData();
          }}
        >
          CONTINUE
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
          duration: 1500,
          style: {
            background: "#E582BE",
            color: "#FAEDCD",
          },

          // Default options for specific types
          success: {
            duration: 2000,
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

export default Interests;
