import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Add these fonts to your index.html or global CSS:
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;600&display=swap" rel="stylesheet">

// Add this CSS globally (index.css or App.css):
/*
.orbit-dot {
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #60A5FA;
  box-shadow: 0 0 12px #60A5FA;
  top: 50%; left: 50%;
  margin: -4px;
  animation: orbitDot 3s linear infinite;
}
.orbit-dot2 {
  position: absolute;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #93C5FD;
  box-shadow: 0 0 8px #93C5FD;
  top: 50%; left: 50%;
  margin: -2.5px;
  animation: orbitDot2 2s linear infinite;
}
@keyframes orbitDot {
  0%   { transform: rotate(0deg)   translateX(90px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
}
@keyframes orbitDot2 {
  0%   { transform: rotate(90deg)  translateX(70px) rotate(-90deg); }
  100% { transform: rotate(450deg) translateX(70px) rotate(-450deg); }
}
*/

const steps = [
  {
    title: "Learn",
    icon: "🧠",
    description: "AI-powered learning paths and structured courses",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.6)",
  },
  {
    title: "Practice",
    icon: "⚡",
    description: "Hands-on exercises and real coding challenges",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.6)",
  },
  {
    title: "Projects",
    icon: "🚀",
    description: "Build real-world industry-grade projects",
    color: "#10B981",
    glow: "rgba(16,185,129,0.6)",
  },
  {
    title: "Certification",
    icon: "🏆",
    description: "Earn globally recognised certifications",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.6)",
  },
  {
    title: "Placement",
    icon: "💼",
    description: "Interview prep, resume building & career support",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.6)",
  },
];

/* ── Ripple rings burst on bg click ── */
function Ripple({ x, y, onDone }) {
  const rings = [0, 1, 2, 3, 4];
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {rings.map((i) => (
        <motion.div
          key={i}
          initial={{ width: 0, height: 0, opacity: 0.9, x: 0, y: 0 }}
          animate={{
            width: 300 + i * 80,
            height: 300 + i * 80,
            opacity: 0,
            x: -(150 + i * 40),
            y: -(150 + i * 40),
          }}
          transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          onAnimationComplete={i === rings.length - 1 ? onDone : undefined}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: `2px solid rgba(96,165,250,${0.8 - i * 0.15})`,
            boxShadow: `0 0 ${20 + i * 10}px rgba(96,165,250,0.4)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Particle burst on bg click ── */
function ParticleBurst({ x, y, onDone }) {
  const count = 24;
  const colors = ["#60A5FA", "#F59E0B", "#10B981", "#EC4899", "#A78BFA"];
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const dist = 80 + Math.random() * 120;
    const rad = (angle * Math.PI) / 180;
    return {
      dx: Math.cos(rad) * dist,
      dy: Math.sin(rad) * dist,
      size: 3 + Math.random() * 6,
      dur: 0.6 + Math.random() * 0.5,
      color: colors[i % 5],
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0 }}
          transition={{ duration: p.dur, ease: "easeOut" }}
          onAnimationComplete={i === 0 ? onDone : undefined}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
          }}
        />
      ))}
    </div>
  );
}

/* ── 3D Tilt Card ── */
function TiltCard({ step, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -18, y: dx * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleClick = (e) => {
    e.stopPropagation(); // prevent bg click firing
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  const delays = [0, 0.15, 0.3, 0.45, 0.6];

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: delays[index],
        duration: 0.7,
        type: "spring",
        stiffness: 80,
      }}
      style={{ perspective: "1000px", flexShrink: 0 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.1 : clicked ? 0.93 : 1,
          y: hovered ? -16 : [0, -10, 0],
        }}
        transition={
          hovered || clicked
            ? { type: "spring", stiffness: 200, damping: 20 }
            : {
                y: {
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                },
              }
        }
        style={{
          width: "200px",
          height: "280px",
          borderRadius: "28px",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          border: `1px solid ${step.color}55`,
          backdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: hovered
            ? `0 30px 80px ${step.glow}, 0 0 0 1px ${step.color}66`
            : "0 8px 32px rgba(0,0,0,0.4)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Rotating inner rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: `1px solid ${step.color}22`,
            top: "50%",
            left: "50%",
            marginLeft: "-100px",
            marginTop: "-100px",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            border: `1px solid ${step.color}33`,
            top: "50%",
            left: "50%",
            marginLeft: "-70px",
            marginTop: "-70px",
          }}
        />

        {/* Orbit dots (shown on hover) */}
        {hovered && (
          <>
            <div className="orbit-dot" style={{ animationDuration: "2s" }} />
            <div className="orbit-dot2" />
          </>
        )}

        {/* Scan shimmer on hover */}
        {hovered && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "400%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "30%",
              background: `linear-gradient(90deg,transparent,${step.color}22,transparent)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Step number badge */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            top: 14,
            right: 18,
            fontSize: "11px",
            fontFamily: "Orbitron, sans-serif",
            color: `${step.color}99`,
            letterSpacing: "2px",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Icon — spins on card click */}
        <motion.div
          animate={{
            scale: hovered ? [1, 1.2, 1] : 1,
            rotateY: clicked ? [0, 360] : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "52px",
            marginBottom: "18px",
            filter: `drop-shadow(0 0 12px ${step.color})`,
            position: "relative",
            zIndex: 2,
          }}
        >
          {step.icon}
        </motion.div>

        <h3
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "16px",
            color: "white",
            marginBottom: "12px",
            letterSpacing: "1px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "13px",
            color: "#94A3B8",
            lineHeight: "1.6",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {step.description}
        </p>

        {/* Bottom colour bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg,transparent,${step.color},transparent)`,
            transformOrigin: "center",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Floating background orb ── */
function FloatingOrb({ style }) {
  return (
    <motion.div
      animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", ...style }}
    />
  );
}

/* ── Main Component ── */
function LearningExperience() {
  const [effects, setEffects] = useState([]);
  const nextId = useRef(0);

  const handleBgClick = useCallback((e) => {
    // Don't fire if a card was clicked
    if (e.target.closest("[data-card]")) return;
    const id = nextId.current++;
    setEffects((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
  }, []);

  const removeEffect = (id) =>
    setEffects((prev) => prev.filter((e) => e.id !== id));

  return (
    <section
      onClick={handleBgClick}
      style={{
        minHeight: "100vh",
        background: "#020617",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 80px",
        cursor: "crosshair",
      }}
    >
      {/* Click effects rendered at cursor position */}
      {effects.map((ef) => (
        <span key={ef.id}>
          <Ripple x={ef.x} y={ef.y} onDone={() => removeEffect(ef.id)} />
          <ParticleBurst x={ef.x} y={ef.y} onDone={() => {}} />
        </span>
      ))}

      {/* Background glow orbs */}
      <FloatingOrb style={{ width: 600, height: 600, background: "#1D4ED8", opacity: 0.12, left: "50%", top: "50%", marginLeft: -300, marginTop: -300 }} />
      <FloatingOrb style={{ width: 300, height: 300, background: "#7C3AED", opacity: 0.10, left: "5%",  top: "10%"  }} />
      <FloatingOrb style={{ width: 200, height: 200, background: "#0891B2", opacity: 0.12, right: "5%", bottom: "15%" }} />
      <FloatingOrb style={{ width: 250, height: 250, background: "#059669", opacity: 0.08, left: "20%", bottom: "5%" }} />

      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(96,165,250,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "80px" }}
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontFamily: "Orbitron, sans-serif", fontSize: "11px", color: "#60A5FA", letterSpacing: "6px", marginBottom: "16px" }}
        >
          YOUR JOURNEY
        </motion.p>

        <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(32px,5vw,64px)", color: "white", letterSpacing: "-1px", lineHeight: 1.1 }}>
          Learning<br />
          <span style={{ background: "linear-gradient(90deg,#3B82F6,#60A5FA,#93C5FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Experience
          </span>
        </h2>

        <p style={{ color: "#475569", fontFamily: "Rajdhani, sans-serif", fontSize: "15px", marginTop: "16px", letterSpacing: "2px" }}>
          Click anywhere on the background ✦ Hover the cards
        </p>
      </motion.div>

      {/* Timeline + Cards */}
      <div style={{ position: "relative", maxWidth: "1300px", margin: "0 auto", padding: "0 40px" }}>

        {/* Animated rail */}
        <div
          style={{
            position: "absolute",
            left: "10%", right: "10%",
            top: "50%", marginTop: "-2px",
            height: "4px",
            background: "linear-gradient(90deg,#1E3A5F,#2563EB,#60A5FA,#2563EB,#1E3A5F)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* Shimmer moving along rail */}
          <motion.div
            animate={{ x: ["0%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)", width: "40%" }}
          />
        </div>

        {/* Glowing traveller dot */}
        <motion.div
          animate={{ x: ["0%", "950%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", left: "10%", top: "50%", marginTop: "-10px", width: "20px", height: "20px", borderRadius: "50%", background: "white", boxShadow: "0 0 20px #60A5FA, 0 0 40px #2563EB", zIndex: 10 }}
        >
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: "absolute", inset: "-6px", borderRadius: "50%", border: "2px solid #60A5FA" }}
          />
        </motion.div>

        {/* Cards row */}
        <div
          data-card
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}
        >
          {steps.map((step, index) => (
            <TiltCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ textAlign: "center", marginTop: "60px", fontFamily: "Rajdhani, sans-serif", color: "#334155", fontSize: "13px", letterSpacing: "3px" }}
      >
        HOVER CARDS · CLICK BACKGROUND · EXPERIENCE THE MAGIC
      </motion.div>
    </section>
  );
}

export default LearningExperience;