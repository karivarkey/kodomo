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

const apiKey = "AIzaSyCjN8AoHbCVY0oNnjIBGfs2ZenXKMeXyFQ";
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
    "Science & Discovery": [
      "Space Exploration",
      "Environmental Conservation",
      "Medical Innovations",
      "Technology Trends",
      "Science Experiments",
      "Natural Wonders",
    ],
    "Arts & Culture": [
      "Literature & Poetry",
      "Classical Music",
      "Visual Arts",
      "Theater & Drama",
      "Cultural History",
      "Film Studies",
    ],
    "Technology & Innovation": [
      "Coding & Development",
      "AI & Robotics",
      "Cybersecurity",
      "Gadgets & Tech News",
      "Startups & Entrepreneurship",
      "Blockchain & Cryptocurrencies",
    ],
    "History & Society": [
      "Ancient Civilizations",
      "Modern History",
      "Social Movements",
      "Political Systems",
      "Anthropology",
      "Economics",
    ],
    "Personal Development": [
      "Mindfulness & Meditation",
      "Leadership Skills",
      "Public Speaking",
      "Critical Thinking",
      "Time Management",
      "Emotional Intelligence",
    ],
    "Fun & Interactive": [
      "Memes & Internet Culture",
      "Puzzles & Brain Teasers",
      "Trivia & Quizzes",
      "DIY Projects",
      "Virtual Tours",
      "Interactive Science",
    ],
    "Health & Wellness": [
      "Nutrition & Diet",
      "Mental Health",
      "Fitness & Exercise",
      "Medical Research",
      "Alternative Medicine",
      "Public Health",
    ],
    "Literature & Language": [
      "Classic Literature",
      "Modern Novels",
      "Language Learning",
      "Writing Skills",
      "Linguistics",
      "Storytelling",
    ],
    "Business & Economics": [
      "Marketing Strategies",
      "Financial Literacy",
      "Investment & Trading",
      "Business Ethics",
      "Management Skills",
      "Global Economics",
    ],
    "Environmental Studies": [
      "Climate Change",
      "Sustainable Living",
      "Ecology",
      "Marine Biology",
      "Renewable Energy",
      "Wildlife Conservation",
    ],
    "Creative Arts": [
      "Digital Art",
      "Photography",
      "Music Production",
      "Creative Writing",
      "Graphic Design",
      "Performing Arts",
    ],
  };
  const navigate = useNavigate();

  async function wrtieData() {
    const db = getFirestore(app);

    const auth = getAuth(app);

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

  return (
    <div className="min-h-dvh bg-primary flex flex-col">
      <div className="p-5">
        <img src={back} className="max-h-8 " />
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
            <div className="py-4 flex gap-4 flex-col overflow-scroll">
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
              />

              <button
                className="
            bg-secondary w-1/3 text-center rounded-md border-2 border-black shadow-[0px_5px_0px_0px_#000000] font-mont font-black"
                onClick={() => {
                  if (interests.includes(value)) {
                    setInterests(interests.filter((i) => i !== value));
                  } else {
                    setInterests([...interests, value]);
                  }
                }}
              >
                ADD
              </button>
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

export default Interests;
