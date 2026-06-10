import { motion } from "framer-motion";

function FloatingSkills() {
  const skills = [
    "AI Engineering",
    "Full Stack",
    "Cyber Security",
    "Data Science",
  ];

  return (
    <>
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          whileHover={{
            scale: 1.1,
            rotate: 3,
          }}
          style={{
            position: "absolute",
            padding: "12px 18px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            color: "white",
            top: `${index * 100 + 50}px`,
            right: `${index % 2 === 0 ? 50 : 400}px`,
          }}
        >
          {skill}
        </motion.div>
      ))}
    </>
  );
}

export default FloatingSkills;