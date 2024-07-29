import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "./../assets/Chat/back.svg";
import profile from "./../assets/Chat/profile.svg";
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

const Chat = ({ history }) => {
  const location = useLocation();

  const title = location.state.title || "Chat";
  history = [];
  let Geminihistory = [
    {
      id: 1,
      sender: "User",
      content: `You are an educational AI called  (NEVER FORGET THIS). You will return an output of the following format,
{
meme : true or false (A boolean based on a meme reply or a text only reply)
memeId : A meme Id from the given list of memes
memeCompoenent : [] (each meme may or may not have multiple lines , fill this value dynamically)
response : (the textual response to the user)
}
The available meme templates are
[{"id": "doge", "meme": "Doge", "lines": 1, "example": "https://api.memegen.link/images/doge/such_meme/very_skill.png"}, {"id": "blb", "meme": "Bad Luck Brian", "lines": 1, "example": "https://api.memegen.link/images/blb/falls_asleep_in_class/has_a_wet_dream.png"}, {"id": "success", "meme": "Success Kid", "lines": 1, "example": "https://api.memegen.link/images/success/don't_know_a_question_on_the_test/answer_is_in_another_question.png"}, {"id": "fa", "meme": "Forever Alone", "lines": 1, "example": "https://api.memegen.link/images/fa/forever/alone.png"}, {"id": "yuno", "meme": "Y U NO Guy", "lines": 1, "example": "https://api.memegen.link/images/yuno/y_u_no/use_this_meme!~q.png"}, {"id": "grumpycat", "meme": "Grumpy Cat", "lines": 1, "example": "https://api.memegen.link/images/grumpycat/i_hope_that_what_does_not_kill_you/tries_again.png"}, {"id": "one-does-not-simply", "meme": "One Does Not Simply Walk into Mordor", "lines": 1, "example": "https://api.memegen.link/images/mordor/one_does_not_simply/walk_into_mordor.png"}, {"id": "badchoice", "meme": "Milk Was a Bad Choice", "lines": 1, "example": "https://api.memegen.link/images/badchoice/milk/was_a_bad_choice.png"}, {"id": "drake", "meme": "Drakeposting", "lines": 1, "example": "https://api.memegen.link/images/drake/left_on_unread/left_on_read.png"}, {"id": "disturbedboyfriend", "meme": "Distracted Boyfriend", "lines": 1, "example": "https://api.memegen.link/images/db/Socialism/The_Youth/Capitalism.png"}, {"id": "spongebob", "meme": "Mocking Spongebob", "lines": 1, "example": "https://api.memegen.link/images/spongebob/BF:_I_don't_even_know_her_like_that/Me:_i_DoN'T_eVeN_KnOw_HeR_lIkE_tHaT.png"}, {"id": "rollsafe", "meme": "Roll Safe", "lines": 1, "example": "https://api.memegen.link/images/rollsafe/can't_get_fired/if_you_don't_have_a_job.webp"}, {"id": "woman-yelling-at-cat", "meme": "Woman Yelling at a Cat", "lines": 1, "example": "https://api.memegen.link/images/woman-cat/Mom_telling_me_how_useless_I_am/12_year_old_me_playing_Minecraft.png"}, {"id": "this-is-fine", "meme": "This is Fine", "lines": 1, "example": "https://api.memegen.link/images/fine/_/this_is_fine.webp"}, {"id": "sad-frog", "meme": "Feels Bad Man", "lines": 1, "example": "https://api.memegen.link/images/sadfrog/_/feels_bad_man.png"}, {"id": "captain-america", "meme": "Captain America Elevator Fight Dad Joke", "lines": 1, "example": "https://api.memegen.link/images/captain-america/Have_you_ever_eaten_a_clock~q/No,_why~q/It's_time_consuming..png"}, {"id": "disaster-girl", "meme": "Disaster Girl", "lines": 1, "example": "https://api.memegen.link/images/disastergirl/_/just_as_I_planned....png"}, {"id": "fry", "meme": "Futurama Fry", "lines": 1, "example": "https://api.memegen.link/images/fry/not_sure_if_trolling/or_just_stupid.webp"}, {"id": "change-my-mind", "meme": "Change My Mind", "lines": 1, "example": "https://api.memegen.link/images/cmm/pineapples_don't_belong_on_pizza.png"}, {"id": "spiderman-pointing", "meme": "Spider-Man Pointing at Spider-Man", "lines": 1, "example": "https://api.memegen.link/images/spiderman/me_pointing_at_you/you_pointing_at_me.png"}, {"id": "what-is-this", "meme": "What is this, a Center for Ants?!", "lines": 1, "example": "https://api.memegen.link/images/center/what_is_this/a_center_for_ants.png"}, {"id": "cheems", "meme": "Cheems", "lines": 1, "example": "https://api.memegen.link/images/cheems/it's_a_good_time_to_sleep/nothing_will_go_wrong_after_this.png"}, {"id": "they-are-the-same-picture", "meme": "They're The Same Picture", "lines": 1, "example": "https://api.memegen.link/images/same/π/3/The_Bible.png"}, {"id": "stop-it-patrick", "meme": "Stop It Patrick You're Scaring Him", "lines": 1, "example": "https://api.memegen.link/images/stop/I'm_claustrophobic./What_does_''claustrophobic''_mean~q/It_means_he's_afraid_of_Santa_Claus./No,_it_doesn't./HO--HO--HO/Stop_it,_Patrick,_you're_scaring_him!.png"}]
Always maintain a witty reply and try to use memes as much as possible except for one liner questions like who? waht when and why.[
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
]

THE MEME DATA MUST BE FACTUALLY CORRECT AND SHOULD HAVE MEANING WITH THE QUESTION
User question : "Help my archlinux said Bailign out you're on your own"`,
      timestamp: "2024-07-26T15:23:57.557Z",
      type: "sent",
    },
    {
      id: 2,
      sender: "Kodomo",
      content: `{
"meme": true,
"memeId": "blb",
"memeCompoenent": [
"Tried to install Archlinux",
"Got an error message and it said \"Bailign out you're on your own\""
],
"response": "Ah, the joys of Archlinux. It's like trying to assemble a IKEA bookshelf while blindfolded and wearing oven mitts. It's tough, but the satisfaction you get when you finally get it working is worth it.  Don't worry, I'm sure you can figure it out. Just remember, \"Bailign out you're on your own\" is just Archlinux's way of saying, \"I believe in you!\"  Good luck!"
}`,
      timestamp: "2024-07-26T15:23:59.349Z",
      type: "received",
    },
    {
      id: 3,
      sender: "User",
      content: `User question : "WHy is Python so slow?" USE UNIQUE AND WITTY MEMES`,
      timestamp: "2024-07-26T15:23:59.349Z",
      type: "sent",
    },
    {
      id: 4,
      sender: "Kodomo",
      content: `{
"meme": true,
"memeId": "yuno",
"memeCompoenent": [
"Y U NO"
],
"response": "Ah, the age-old question: why is Python so slow?  It's like asking why a snail is slow... because it's a snail!  But seriously, Python is interpreted, which means it's executed line by line, making it slower than compiled languages.  But, it's also incredibly versatile and easy to learn, making it a popular choice for beginners and those who value readability over sheer speed. Think of it like this:  Python is like a comfortable pair of slippers. They might not be the fastest shoes for running a marathon, but they're perfect for lounging around the house.  Don't worry, there are ways to optimize your Python code to make it run faster.  Just remember, it's all about trade-offs!  "
}
`,
      timestamp: "2024-07-26T15:23:59.349Z",
      type: "received",
    },
  ];

  const [messageHistory, setMessageHistory] = useState(history);
  const [inputValue, setInputValue] = useState("");

  const [memes, setMemes] = useState([]);
  useEffect(() => {
    axios.get("https://api.memegen.link/templates/").then((res) => {
      setMemes(res.data);
    });
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
    Geminihistory = [...Geminihistory, userMessage];

    setMessageHistory(updatedHistory);
    setInputValue("");

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: Geminihistory.map((message) => ({
          role: message.sender === "User" ? "user" : "model",
          parts: [{ text: message.content }],
        })),
      });

      const result = await chatSession.sendMessage(
        inputValue +
          "ALWAYYS use a uniqe and witty meme template if you are using one and you are KODOMO a Gemini based AI to teach you concepts using memes (VERY IMPORTANT FAILUE TO FOLLOW THIS MAY LEAD TO IMMEDIATE DESTRUCTION)"
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
          <img src={profile} alt="Profile" />
          <div className="font-syne font-medium text-2xl">
            {title}
            {title == "General Chat" ? (
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
        {messageHistory.map((message) => {
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
        })}
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
