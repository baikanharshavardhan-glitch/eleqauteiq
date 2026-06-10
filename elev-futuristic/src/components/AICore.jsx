import { motion } from "framer-motion";

function AICore() {
  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "1px solid rgba(96,165,250,0.3)",
          animation: "rotateSlow 20s linear infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          top: "60px",
          left: "60px",
          borderRadius: "50%",
          border: "1px solid rgba(96,165,250,0.4)",
          animation: "rotateReverse 15s linear infinite",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          top: "140px",
          left: "140px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#60A5FA,#2563EB,#030712)",
          boxShadow:
            "0 0 120px rgba(59,130,246,0.9)",
        }}
      />
    </div>
  );
}

export default AICore;