"use client";

import { motion } from "framer-motion";

export default function Transition(props) {
  const { children } = props;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.80 }}
    >
      {children}
    </motion.div>
  );
}

