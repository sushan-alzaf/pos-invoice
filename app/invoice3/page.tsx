"use client";
import { motion } from "framer-motion";
export default function page() {


  return (
    <div className="flex justify-center min-h-screen items-center">
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5 }}
        className="text-4xl font-bold text-center"
      >
        👋এখানে আসিস কেন? দূর হয়ে যা এই পেজ থেকে!
      </motion.h1>
  


<h3>go to next page invoice4</h3>



    </div>
  );
}
