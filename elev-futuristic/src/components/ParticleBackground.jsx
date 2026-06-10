import { motion } from "framer-motion";

function ParticleBackground() {
  const particles = [...Array(40)];

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            borderRadius: "50%",
            background: "#60A5FA",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 15px #60A5FA",
          }}
        />
      ))}
    </>
  );
}

export default ParticleBackground;