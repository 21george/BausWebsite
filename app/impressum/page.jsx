"use client"
import React from "react";
import Impresionpage from "../components/impresion/page";
import { motion } from "framer-motion";



export default function Impressum() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }} className="text-center space-y-4">
      
      <Impresionpage />

    </motion.div>
  );
}
