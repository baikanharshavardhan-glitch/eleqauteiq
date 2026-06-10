import { motion } from "framer-motion";

function HeroButtons() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop: "40px",
      }}
    >
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px #3B82F6",
        }}
        className="login-btn"
      >
        Start Learning
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        className="nav-box"
      >
        Explore Platform
      </motion.button>
    </div>
  );
}

export default HeroButtons;