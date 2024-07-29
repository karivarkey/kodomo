import React, { useEffect } from "react";
import { useState } from "react";
import Markdown from "react-markdown";

const Receive = ({ Message, memes }) => {
  console.log(Message);
  const response = JSON.parse(Message);

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (response.meme) {
      //loop through the memes array and find the meme with same memid as response.memId
      const meme = memes.find((meme) => meme.id === response.memeId);
      //remove .png from meme.blank

      let url = meme.blank.replace(".png", "");
      if (response.memeCompoenent.length >= 1) {
        let string = "/";
        //map throught the memeComponent array and add the component to the string
        response.memeCompoenent.map((component) => {
          string += component + "/";
        });
        string = string.replaceAll(" ", "_");
        url += string;
      }
      setUrl(url);
    }
  }, []);

  return !response.meme ? (
    <div className="flex justify-start my-6 w-fit">
      <div className="bg-[#E582BE] p-2  max-w-lg text-wrap text-md ml-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere">
        {response.response}
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-start my-1 w-fit">
        <div className="bg-[#E582BE] p-2  max-w-lg text-wrap text-md ml-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere">
          <img src={url} />
        </div>
      </div>
      <div className="flex justify-start my-1 w-fit">
        <div className="bg-[#E582BE] p-2  max-w-lg text-wrap text-md ml-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere">
          {response.response}
        </div>
      </div>
    </>
  );
};

export default Receive;
