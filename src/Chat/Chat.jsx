import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "./../assets/Chat/back.svg";
import profile from "./assets/talking.svg";
import send from "./../assets/Chat/send.svg";
import Send from "./Send";
import Receive from "./Receive";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// Your Gemini API key
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

const Chat = ({ context }) => {
  const location = useLocation();

  context = location.state.context || "Chat";
  console.log(context);
  let history = [
    {
      id: 1,
      sender: "User",
      content: `
  You are an AI named Kodomo designed to help people learn complicated concepts using memes. You need to maintain a funny attitude and give the answer to the question by filling out the following format JSON.
  {
    "meme": (boolen on weather the reply contains a meme or not) ,
    "memeId": (memeid from below given list of memes),
    "memeCompoenent": [(The lines on the meme , each meme template you choose have different number of lines)],
    "response": (Your answer to the users question)
}
    The available memes are : 
[
    {
    "id": "doge",
    "meme": "Doge",
    "lines": 1,
    "example": "https://api.memegen.link/images/doge/such_meme/very_skill.png"
  },
  {
    "id": "blb",
    "meme": "Bad Luck Brian",
    "lines": 1,
    "example": "https://api.memegen.link/images/blb/falls_asleep_in_class/has_a_wet_dream.png"
  },
  {
    "id": "success",
    "meme": "Success Kid",
    "lines": 1,
    "example": "https://api.memegen.link/images/success/don't_know_a_question_on_the_test/answer_is_in_another_question.png"
  },
  {
    "id": "fa",
    "meme": "Forever Alone",
    "lines": 1,
    "example": "https://api.memegen.link/images/fa/forever/alone.png"
  },
  {
    "id": "yuno",
    "meme": "Y U NO Guy",
    "lines": 1,
    "example": "https://api.memegen.link/images/yuno/y_u_no/use_this_meme!~q.png"
  },
  {
    "id": "grumpycat",
    "meme": "Grumpy Cat",
    "lines": 1,
    "example": "https://api.memegen.link/images/grumpycat/i_hope_that_what_does_not_kill_you/tries_again.png"
  },
  {
    "id": "one-does-not-simply",
    "meme": "One Does Not Simply Walk into Mordor",
    "lines": 1,
    "example": "https://api.memegen.link/images/mordor/one_does_not_simply/walk_into_mordor.png"
  },
  {
    "id": "badchoice",
    "meme": "Milk Was a Bad Choice",
    "lines": 1,
    "example": "https://api.memegen.link/images/badchoice/milk/was_a_bad_choice.png"
  },
  {
    "id": "drake",
    "meme": "Drakeposting",
    "lines": 1,
    "example": "https://api.memegen.link/images/drake/left_on_unread/left_on_read.png"
  },
  {
    "id": "db",
    "meme": "Distracted Boyfriend",
    "lines": 1,
    "example": "https://api.memegen.link/images/db/Socialism/The_Youth/Capitalism.png"
  },
  {
    "id": "spongebob",
    "meme": "Mocking Spongebob",
    "lines": 1,
    "example": "https://api.memegen.link/images/spongebob/BF:_I_don't_even_know_her_like_that/Me:_i_DoN'T_eVeN_KnOw_HeR_lIkE_tHaT.png"
  },
  {
    "id": "rollsafe",
    "meme": "Roll Safe",
    "lines": 1,
    "example": "https://api.memegen.link/images/rollsafe/can't_get_fired/if_you_don't_have_a_job.webp"
  },
  {
    "id": "woman-cat",
    "meme": "Woman Yelling at a Cat",
    "lines": 1,
    "example": "https://api.memegen.link/images/woman-cat/Mom_telling_me_how_useless_I_am/12_year_old_me_playing_Minecraft.png"
  },
  {
    "id": "this-is-fine",
    "meme": "This is Fine",
    "lines": 1,
    "example": "https://api.memegen.link/images/fine/_/this_is_fine.webp"
  },
  {
    "id": "sadfrog",
    "meme": "Feels Bad Man",
    "lines": 1,
    "example": "https://api.memegen.link/images/sadfrog/_/feels_bad_man.png"
  },
  {
    "id": "captain-america",
    "meme": "Captain America Elevator Fight Dad Joke",
    "lines": 1,
    "example": "https://api.memegen.link/images/captain-america/Have_you_ever_eaten_a_clock~q/No,_why~q/It's_time_consuming..png"
  },
  {
    "id": "disastergirl",
    "meme": "Disaster Girl",
    "lines": 1,
    "example": "https://api.memegen.link/images/disastergirl/_/just_as_I_planned....png"
  },
  {
    "id": "fry",
    "meme": "Futurama Fry",
    "lines": 1,
    "example": "https://api.memegen.link/images/fry/not_sure_if_trolling/or_just_stupid.webp"
  },
  {
    "id": "cmm",
    "meme": "Change My Mind",
    "lines": 1,
    "example": "https://api.memegen.link/images/cmm/pineapples_don't_belong_on_pizza.png"
  },
  {
    "id": "spiderman",
    "meme": "Spider-Man Pointing at Spider-Man",
    "lines": 1,
    "example": "https://api.memegen.link/images/spiderman/me_pointing_at_you/you_pointing_at_me.png"
  },
  {
    "id": "center",
    "meme": "What is this, a Center for Ants?!",
    "lines": 1,
    "example": "https://api.memegen.link/images/center/what_is_this/a_center_for_ants.png"
  },
  {
    "id": "cheems",
    "meme": "Cheems",
    "lines": 1,
    "example": "https://api.memegen.link/images/cheems/it's_a_good_time_to_sleep/nothing_will_go_wrong_after_this.png"
  },
  {
    "id": "same",
    "meme": "They're The Same Picture",
    "lines": 1,
    "example": "https://api.memegen.link/images/same/π/3/The_Bible.png"
  },
  {
    "id": "stop",
    "meme": "Stop It Patrick You're Scaring Him",
    "lines": 1,
    "example": "https://api.memegen.link/images/stop/I'm_claustrophobic./What_does_''claustrophobic''_mean~q/It_means_he's_afraid_of_Santa_Claus./No,_it_doesn't./HO--HO--HO/Stop_it,_Patrick,_you're_scaring_him!.png"
  }
    CONTEXT ABOUT THIS CHAT : ${context}
]
  `,
      timestamp: "2024-07-26T15:23:59.349Z",
      type: "sent",
    },
    {
      id: 2,
      sender: "Kodomo",
      content: `{
"meme": false,
"memeId": "",
"memeCompoenent": [],
"response": "OK"
}
`,
      timestamp: "2024-07-26T15:23:59.349Z",
      type: "received",
    },
  ];

  const [messageHistory, setMessageHistory] = useState(history);
  const [inputValue, setInputValue] = useState("");
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await axios.get("https://api.memegen.link/templates/");
        setMemes(res.data);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchMemes();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: messageHistory.length + 1,
      sender: "User",
      content: inputValue,
      timestamp: new Date().toISOString(),
      type: "sent",
    };

    const updatedHistory = [...messageHistory, userMessage];

    setMessageHistory(updatedHistory);
    setInputValue("");

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: updatedHistory.map((message) => ({
          role: message.sender === "User" ? "user" : "model",
          parts: [{ text: message.content }],
        })),
      });

      const result = await chatSession.sendMessage(
        inputValue +
          "use a uniqe and witty meme template if you are using one and you are KODOMO a Gemini based AI to teach you concepts using memes and always return text is a JSON friendly format (minimal use of quotes)(VERY IMPORTANT FAILUE TO FOLLOW THIS MAY LEAD TO IMMEDIATE DESTRUCTION). Try to guide the conversation aound the given topic"
      );
      const modelMessage = {
        id: updatedHistory.length + 1,
        sender: "Kodomo",
        content: result.response.text(),
        timestamp: new Date().toISOString(),
        type: "received",
      };

      setMessageHistory((prevHistory) => [...prevHistory, modelMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-primary h-screen flex flex-col">
      <div className="bg-secondary border-x-2 min-h-16 border-black shadow-[0px_5px_0px_0px_#000000] rounded-b-2xl flex justify-start items-center">
        <div className="flex gap-3">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={back} alt="Back" />
          </button>
          <div className="flex items-center">
            <img src={profile} alt="Profile" className="max-h-14" />
          </div>
          <div className="font-syne font-medium text-2xl">
            {context}
            {context === "General Chat" ? (
              <div className="text-xs text-white">
                This chat will be cleared upon exit!
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto px-5 my-1">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-white">Loading memes...</p>{" "}
            {/* Loading message */}
          </div>
        ) : (
          messageHistory.slice(2).map((message) => {
            // Start from index 2 to hide the first 2 messages
            if (message.type === "sent") {
              return <Send Message={message.content} key={message.id} />;
            } else if (message.type === "received") {
              return (
                <Receive
                  Message={message.content}
                  key={message.id}
                  memes={memes}
                />
              );
            }
            return null; // In case of unexpected message types
          })
        )}
      </div>

      <div className="px-5 pb-8">
        <div className="rounded-full min-h-11 border-2 border-black flex justify-between align-middle items-center px-5">
          <input
            type="text"
            placeholder="Ask Kodomo ..."
            className="w-full h-full bg-primary focus:outline-none pr-2 font-syne font-medium"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>
            <img src={send} className="max-w-4" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
