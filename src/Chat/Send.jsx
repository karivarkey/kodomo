import React from "react";
import { motion } from "framer-motion";

const Send = ({ Message }) => {
  return (
    <motion.div
      className="flex justify-end my-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#FEF2E8] p-2 w-fit mr-3 rounded-md border-2 border-black shadow-[-2px_2px_0px_0px_#000000]">
        {Message}
      </div>
    </motion.div>
  );
};

export default Send;
