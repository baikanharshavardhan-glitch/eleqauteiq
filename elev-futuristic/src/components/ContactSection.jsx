import { motion } from "framer-motion";

function ContactSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "white",
        padding: "100px 50px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "60px",
          marginBottom: "50px",
        }}
      >
        Contact Us
      </h2>

      <motion.form
        whileHover={{ scale: 1.01 }}
        style={{
          maxWidth: "700px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "rgba(255,255,255,0.05)",
          padding: "40px",
          borderRadius: "30px",
          border: "1px solid rgba(96,165,250,0.3)",
          backdropFilter: "blur(20px)",
        }}
      >
        <input
          placeholder="Full Name"
          style={inputStyle}
        />

        <input
          placeholder="Email Address"
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          style={inputStyle}
        />

        <textarea
          rows={5}
          placeholder="Your Message"
          style={inputStyle}
        />

        <button
          style={{
            padding: "15px",
            background: "#2563EB",
            border: "none",
            borderRadius: "12px",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
}

const inputStyle = {
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid rgba(96,165,250,0.3)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none",
};

export default ContactSection;