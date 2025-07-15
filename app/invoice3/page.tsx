"use client";
import { motion } from "framer-motion";
export default function page() {
  const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        👋 Hello, welcome!
      </motion.h1>
      <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Click Me
</motion.button>


<motion.ul
  variants={list}
  initial="hidden"
  animate="visible"
>
  {[1, 2, 3].map(i => (
    <motion.li key={i} variants={item}>Item {i}</motion.li>
  ))}
</motion.ul>



    </div>
  );
}
