"use client"
import React from "react";
import { motion } from "framer-motion";

export default function page() {
  return     <div className="flex justify-center min-h-screen items-center">
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5 }}
        className="text-4xl font-bold text-center"
      >
        👋আবার আসছিস এই পেজে? বলেছি না, দূর হয়ে যা!
      </motion.h1>
  






    </div>;
}
