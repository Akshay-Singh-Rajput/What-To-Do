import { useState } from 'react';
import { motion } from "framer-motion";


const Loader = () => {
    
    const [ anchorEl, setAnchorEl ] = useState(null);

    
    return (
      <motion.div
      className="box"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    >
      <img
                className="h-32 w-32"
                src="/What__1_dark.png"
                alt="Light Theme Logo"
              />
    </motion.div>
    );
};

export default Loader;
