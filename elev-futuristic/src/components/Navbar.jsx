import { motion } from "framer-motion";

function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        background: "rgba(3,7,18,0.8)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(96,165,250,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <motion.h1
        whileHover={{
          scale: 1.05,
          textShadow: "0 0 25px #60A5FA",
        }}
        onClick={() => scrollToSection("home")}
        style={{
          color: "#60A5FA",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        ElevateIQ
      </motion.h1>

      <div
        style={{
          display: "flex",
          gap: "18px",
        }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          className="nav-box"
          onClick={() => scrollToSection("home")}
          style={{ cursor: "pointer" }}
        >
          Home
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="nav-box"
          onClick={() => scrollToSection("courses")}
          style={{ cursor: "pointer" }}
        >
          Courses
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="nav-box"
          onClick={() => scrollToSection("services")}
          style={{ cursor: "pointer" }}
        >
          Services
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="nav-box"
          onClick={() => scrollToSection("contact")}
          style={{ cursor: "pointer" }}
        >
          Contact
        </motion.div>
      </div>

      <motion.button
  whileHover={{
    scale: 1.05,
  }}
  whileTap={{
    scale: 0.95,
  }}
  className="login-btn"
  onClick={() => {
    window.location.href = "/login";
  }}
>
  Login
</motion.button>
    </nav>
  );
}

export default Navbar;