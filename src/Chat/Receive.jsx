import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";
import ReactMarkdown from "react-markdown";
import gif from "./assets/talking.svg";
import kodomo from "./assets/talkingNew.svg";
const Receive = ({ Message, memes }) => {
  // Parse the incoming message

  console.log(Message);
  const response = JSON.parse(Message);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (response.meme) {
      // Find the meme in the memes array

      const meme = memes.find((meme) => meme.id === response.memeId) || "";

      if (meme) {
        let url = meme.blank.replace(".png", "");
        if (response.memeCompoenent.length >= 1) {
          let string = "/";
          response.memeCompoenent.map((component) => {
            string += component + "/";
          });
          string = string.replaceAll(" ", "_");
          url += string;
        }
        setUrl(url);
        console.log(url);
      }
    }
  }, [response.meme, response.memeId, response.memeCompoenent, memes]);

  return !response.meme ? (
    <motion.div
      className="flex justify-start my-6 w-fit flex-col"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#E582BE] p-2 max-w-lg  text-wrap text-md ml-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere">
        <MarkdownRenderer markdown={response.response} />
      </div>
      {response.code ? (
        <div className="bg-[#E582BE] p-3 max-w-lg text-xs  rounded-md border-2 text-wrap border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere w-full">
          <pre>
            <code>{response.code}</code>
          </pre>
        </div>
      ) : (
        <></>
      )}
    </motion.div>
  ) : (
    <>
      <motion.div
        className="flex justify-start my-1 w-fit"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-end space-x-3">
            <div>
              <div className="bg-[#E582BE] p-2 max-w-lg text-wrap text-md ml-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere">
                <img src={url} />
              </div>
              <div className="bg-[#E582BE] p-3 max-w-lg text-md rounded-md border-2 text-wrap border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere w-full">
                <ReactMarkdown>{response.response}</ReactMarkdown>
              </div>
              {response.code ? (
                <div className="bg-[#E582BE] p-3 max-w-lg text-xs  rounded-md border-2 text-wrap border-black shadow-[-2px_2px_0px_0px_#000000] break-words overflow-wrap-anywhere w-full">
                  <pre>
                    <code>{response.code}</code>
                  </pre>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <img src={kodomo} alt="" className="max-h-12 mt-2" />
        </div>
      </motion.div>
    </>
  );
};

export default Receive;
