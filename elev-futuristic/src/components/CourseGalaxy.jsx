import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Floating particle field ──────────────────────────────────────────────── */
function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 20 + 10,
    delay: Math.random() * -20,
    drift: (Math.random() - 0.5) * 40,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -120, 0], x: [0, p.drift, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(96,165,250,0.9), rgba(37,99,235,0.3))`,
            boxShadow: `0 0 ${p.size * 3}px rgba(96,165,250,0.6)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated grid that pulses ────────────────────────────────────────────── */
function PulseGrid() {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

/* ── Orbiting glow blobs ──────────────────────────────────────────────────── */
function OrbBlobs() {
  return (
    <>
      <motion.div
        animate={{ x: [0, 80, 0, -60, 0], y: [0, -60, 40, 20, 0], scale: [1, 1.15, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "fixed", top: -200, left: "15%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.14),transparent 70%)", pointerEvents: "none", zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, -70, 30, 0], y: [0, 50, -40, 0], scale: [1, 0.85, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ position: "fixed", bottom: -200, right: "8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.1),transparent 70%)", pointerEvents: "none", zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        style={{ position: "fixed", top: "40%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.07),transparent 70%)", pointerEvents: "none", zIndex: 0 }}
      />
    </>
  );
}

/* ── 3D Rotating cube — bigger, more dramatic ─────────────────────────────── */
function RotatingCube() {
  const size = 100;
  const faces = [
    { label: "ELEVATE", rotate: `rotateY(0deg)   translateZ(${size}px)`, accent: "#60A5FA" },
    { label: "IQ",      rotate: `rotateY(90deg)  translateZ(${size}px)`, accent: "#a78bfa" },
    { label: "LEARN",   rotate: `rotateY(180deg) translateZ(${size}px)`, accent: "#34d399" },
    { label: "GROW",    rotate: `rotateY(-90deg) translateZ(${size}px)`, accent: "#f472b6" },
    { label: "BUILD",   rotate: `rotateX(90deg)  translateZ(${size}px)`, accent: "#fb923c" },
    { label: "SHIP",    rotate: `rotateX(-90deg) translateZ(${size}px)`, accent: "#60A5FA" },
  ];
  return (
    <div style={{ perspective: "800px", width: size * 2, height: size * 2, margin: "0 auto 60px", position: "relative" }}>
      {/* Outer glow rings */}
      {[260, 200, 150].map((r, i) => (
        <motion.div
          key={i}
          animate={{ rotateZ: 360 * (i % 2 === 0 ? 1 : -1), rotateX: [60, 65, 60] }}
          transition={{ rotateZ: { duration: 8 + i * 4, repeat: Infinity, ease: "linear" }, rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          style={{
            position: "absolute", width: r, height: r,
            borderRadius: "50%",
            border: `1px solid rgba(96,165,250,${0.15 - i * 0.03})`,
            top: "50%", left: "50%",
            transform: `translate(-50%,-50%) rotateX(60deg)`,
            pointerEvents: "none",
          }}
        />
      ))}
      <motion.div
        animate={{ rotateY: 360, rotateX: [0, 25, 0, -25, 0] }}
        transition={{ rotateY: { duration: 10, repeat: Infinity, ease: "linear" }, rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
      >
        {faces.map((f, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            transform: f.rotate,
            background: `linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.7))`,
            border: `1.5px solid ${f.accent}66`,
            borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: f.accent,
            fontFamily: "'Orbitron',sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: 2,
            backdropFilter: "blur(8px)",
            boxShadow: `inset 0 0 20px ${f.accent}22, 0 0 30px ${f.accent}11`,
          }}>{f.label}</div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Magnetic tilt card wrapper ───────────────────────────────────────────── */
function MagneticCard({ children, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Spinning ring ────────────────────────────────────────────────────────── */
function SpinRing({ size, dur, color, style = {}, reverse = false }) {
  return (
    <motion.div
      animate={{ rotateX: 70, rotateZ: reverse ? -360 : 360 }}
      transition={{
        rotateZ: { duration: dur, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 0 },
      }}
      style={{
        position: "absolute", width: size, height: size,
        borderRadius: "50%", border: `1px solid ${color}`,
        pointerEvents: "none", ...style,
      }}
    />
  );
}

/* ── Courses data ─────────────────────────────────────────────────────────── */
const COURSES = [
  { name: "AI Engineering",   price: "₹4,999", duration: "6 Months", level: "Beginner → Advanced", projects: "10+ Projects", icon: "🤖", tag: "HOT", color: "#f87171" },
  { name: "Full Stack",       price: "₹3,999", duration: "5 Months", level: "Intermediate",        projects: "8+ Projects",  icon: "🌐", tag: "TOP", color: "#60A5FA" },
  { name: "Cyber Security",   price: "₹5,999", duration: "6 Months", level: "Advanced",            projects: "12+ Projects", icon: "🔒", tag: "NEW", color: "#4ade80" },
  { name: "Data Science",     price: "₹4,499", duration: "5 Months", level: "Intermediate",        projects: "10+ Projects", icon: "📊", tag: null,  color: "#fb923c" },
  { name: "Cloud Computing",  price: "₹3,499", duration: "4 Months", level: "Beginner",            projects: "6+ Projects",  icon: "☁️", tag: null,  color: "#a78bfa" },
  { name: "DevOps",           price: "₹4,999", duration: "5 Months", level: "Advanced",            projects: "9+ Projects",  icon: "⚙️", tag: "TOP", color: "#60A5FA" },
  { name: "Machine Learning", price: "₹5,999", duration: "6 Months", level: "Advanced",            projects: "12+ Projects", icon: "🧠", tag: "HOT", color: "#f87171" },
  { name: "UI/UX Design",     price: "₹2,999", duration: "3 Months", level: "Beginner",            projects: "5+ Projects",  icon: "🎨", tag: null,  color: "#f472b6" },
  { name: "Python",           price: "₹2,499", duration: "2 Months", level: "Beginner",            projects: "4+ Projects",  icon: "🐍", tag: null,  color: "#4ade80" },
  { name: "Java",             price: "₹2,999", duration: "3 Months", level: "Intermediate",        projects: "6+ Projects",  icon: "☕", tag: null,  color: "#fb923c" },
  { name: "AWS",              price: "₹4,999", duration: "4 Months", level: "Advanced",            projects: "8+ Projects",  icon: "🛰️", tag: "HOT", color: "#f87171" },
  { name: "React",            price: "₹3,499", duration: "3 Months", level: "Intermediate",        projects: "6+ Projects",  icon: "⚛️", tag: null,  color: "#38bdf8" },
];

const TAG_COLORS = {
  HOT: { bg: "rgba(239,68,68,0.15)",  color: "#f87171", border: "rgba(239,68,68,0.5)"  },
  TOP: { bg: "rgba(96,165,250,0.15)", color: "#60A5FA", border: "rgba(96,165,250,0.6)" },
  NEW: { bg: "rgba(34,197,94,0.15)",  color: "#4ade80", border: "rgba(34,197,94,0.5)"  },
};

/* ── Course card with mag-tilt + flip + shimmer ───────────────────────────── */
function CourseCard({ course, index, onClick }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 });
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100]);

  const onMouseMove = (e) => {
    if (flipped) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0); my.set(0); setFlipped(false); setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px", cursor: "pointer" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => { setFlipped(true); setHovered(true); }}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(course)}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", position: "relative" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* FRONT */}
        <div style={{
          backfaceVisibility: "hidden",
          background: "linear-gradient(145deg,rgba(13,20,40,0.97),rgba(22,33,56,0.93))",
          border: `1px solid ${course.color}30`,
          borderRadius: 22,
          padding: "26px 22px",
          height: 210,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${course.color}22, inset 0 1px 0 ${course.color}33`
            : `0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: "box-shadow 0.3s",
          position: "relative", overflow: "hidden",
        }}>
          {/* Shimmer gradient that follows cursor */}
          <motion.div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 22,
              background: useTransform([glowX, glowY], ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, ${course.color}18 0%, transparent 60%)`
              ),
            }}
          />
          {/* Animated corner accent */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.4, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "0 22px 0 80px", background: `linear-gradient(225deg, ${course.color}18, transparent)`, pointerEvents: "none" }}
          />
          {/* Animated border pulse */}
          <motion.div
            animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: "absolute", inset: 0, borderRadius: 22, border: `1px solid ${course.color}60`, pointerEvents: "none" }}
          />

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <motion.span
              animate={{ scale: hovered ? [1, 1.2, 1] : 1, rotate: hovered ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: 38, display: "block", filter: `drop-shadow(0 0 8px ${course.color}66)` }}
            >{course.icon}</motion.span>
            {course.tag && (
              <motion.span
                animate={{ scale: hovered ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "3px 9px", borderRadius: 6,
                  background: TAG_COLORS[course.tag].bg, color: TAG_COLORS[course.tag].color,
                  border: `1px solid ${TAG_COLORS[course.tag].border}`,
                  fontFamily: "'Orbitron',sans-serif",
                  boxShadow: `0 0 12px ${TAG_COLORS[course.tag].border}`,
                }}>{course.tag}</motion.span>
            )}
          </div>

          {/* Name */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 7 }}>{course.name}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ color: "#64748b", fontSize: 11.5 }}>{course.duration}</span>
              <span style={{ color: "#334155" }}>·</span>
              <span style={{ color: "#64748b", fontSize: 11.5 }}>{course.level}</span>
            </div>
          </div>

          {/* Price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
            <motion.span
              animate={{ textShadow: hovered ? `0 0 20px ${course.color}` : "none" }}
              style={{ color: course.color, fontFamily: "'Orbitron',sans-serif", fontSize: 18, fontWeight: 700 }}
            >{course.price}</motion.span>
            <span style={{ color: "#475569", fontSize: 11.5 }}>{course.projects}</span>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: `linear-gradient(145deg, rgba(15,23,42,0.98), rgba(${course.color === "#60A5FA" ? "37,99,235" : "30,41,59"},0.3))`,
          border: `1px solid ${course.color}80`,
          borderRadius: 22,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 14,
          boxShadow: `0 0 60px ${course.color}22, inset 0 0 40px ${course.color}08`,
          overflow: "hidden",
        }}>
          {/* Animated back glow circles */}
          {[100, 70, 45].map((r, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.4 }}
              style={{
                position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%",
                background: `radial-gradient(circle, ${course.color}22, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          ))}
          <motion.div
            animate={{ letterSpacing: ["2px", "4px", "2px"] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: course.color, fontFamily: "'Orbitron',sans-serif", fontSize: 11, position: "relative", zIndex: 1 }}
          >ENROLL NOW</motion.div>
          <div style={{ color: "#f1f5f9", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, textAlign: "center", position: "relative", zIndex: 1 }}>{course.name}</div>
          <motion.div
            animate={{ scale: [1, 1.05, 1], textShadow: [`0 0 10px ${course.color}`, `0 0 30px ${course.color}`, `0 0 10px ${course.color}`] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: course.color, fontFamily: "'Orbitron',sans-serif", fontSize: 24, fontWeight: 700, position: "relative", zIndex: 1 }}
          >{course.price}</motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "10px 28px",
              background: `${course.color}22`,
              border: `1px solid ${course.color}88`,
              borderRadius: 10, color: course.color,
              fontSize: 12, fontWeight: 600,
              position: "relative", zIndex: 1,
              boxShadow: `0 0 20px ${course.color}33`,
            }}
          >Click to View Details</motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Animated counter ─────────────────────────────────────────────────────── */
function AnimCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const raw = parseInt(target.replace(/[^0-9]/g, ""));
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(raw / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= raw) { setCount(raw); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [raw]);
  return <>{target.replace(/[0-9]+/, count.toLocaleString())}</>;
}

/* ── Floating 3D orbits in hero bg ───────────────────────────────────────── */
function HeroOrbits() {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", width: 500, height: 500 }}>
      {[380, 280, 180].map((r, i) => (
        <motion.div
          key={i}
          animate={{ rotateZ: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: 0, margin: "auto",
            width: r, height: r, borderRadius: "50%",
            border: `1px dashed rgba(96,165,250,${0.12 - i * 0.02})`,
            top: "50%", left: "50%",
            transform: `translate(-50%,-50%) rotateX(${50 + i * 10}deg)`,
          }}
        >
          {/* Orbiting dot */}
          <motion.div
            style={{
              position: "absolute", top: -4, left: "50%",
              width: 8, height: 8, borderRadius: "50%",
              background: `rgba(96,165,250,${0.6 - i * 0.15})`,
              boxShadow: "0 0 12px rgba(96,165,250,0.8)",
              transform: "translateX(-50%)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Payment modal ────────────────────────────────────────────────────────── */
function CourseModal({ course, onClose }) {
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setPaid(true); }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(2,6,16,0.88)",
        backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 999, padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 60, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0,  rotateX: 0  }}
        exit={{   opacity: 0, scale: 0.75, y: 60, rotateX: 20 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: 560, maxHeight: "92vh", overflowY: "auto",
          background: "rgba(8,14,30,0.99)",
          border: `1px solid ${course.color}44`,
          borderRadius: 30,
          padding: "48px 42px",
          color: "white",
          position: "relative",
          boxShadow: `0 0 100px ${course.color}22, 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 ${course.color}22`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Multi-ring spinner system */}
        <SpinRing size={500} dur={20} color={`${course.color}08`} style={{ top: -100, left: "50%", transform: "translateX(-50%)" }} />
        <SpinRing size={360} dur={14} color={`${course.color}12`} style={{ top: -30, left: "50%", transform: "translateX(-50%)" }} />
        <SpinRing size={220} dur={9}  color={`${course.color}18`} style={{ top: 40,  left: "50%", transform: "translateX(-50%)" }} reverse />
        <SpinRing size={140} dur={6}  color={`${course.color}25`} style={{ top: 80,  left: "50%", transform: "translateX(-50%)" }} />

        {/* Corner pulse dots */}
        {[{ top: 16, left: 16 }, { top: 16, right: 16 }, { bottom: 16, left: 16 }, { bottom: 16, right: 16 }].map((pos, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            style={{
              position: "absolute", ...pos, width: 6, height: 6, borderRadius: "50%",
              background: course.color, boxShadow: `0 0 10px ${course.color}`,
            }}
          />
        ))}

        {/* Close */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20,
            background: "rgba(30,41,59,0.8)", border: `1px solid ${course.color}44`,
            borderRadius: 10, width: 36, height: 36,
            color: "#94a3b8", cursor: "pointer", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>✕</motion.button>

        {/* Header */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 14 }}>
            <motion.span
              animate={{ filter: [`drop-shadow(0 0 8px ${course.color})`, `drop-shadow(0 0 20px ${course.color})`, `drop-shadow(0 0 8px ${course.color})`] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: 50 }}
            >{course.icon}</motion.span>
            <div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ color: "#64748b", fontFamily: "'Orbitron',sans-serif", fontSize: 11, letterSpacing: 2.5, marginBottom: 5, overflow: "hidden", whiteSpace: "nowrap" }}
              >COURSE DETAILS</motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ margin: 0, fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "#f1f5f9" }}
              >{course.name}</motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ height: 1, background: `linear-gradient(90deg,${course.color}80,transparent)`, transformOrigin: "left" }}
          />
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28, position: "relative", zIndex: 1 }}>
          {[["⏱", "Duration", course.duration], ["📈", "Level", course.level], ["🛠", "Projects", course.projects]].map(([icon, k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.03, borderColor: `${course.color}66` }}
              style={{
                background: "rgba(20,30,55,0.7)",
                border: `1px solid rgba(96,165,250,0.12)`,
                borderRadius: 16, padding: "16px 14px",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: "#475569", fontSize: 10, marginBottom: 4, fontFamily: "'Orbitron',sans-serif", letterSpacing: 1 }}>{k.toUpperCase()}</div>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 13 }}>{v}</div>
            </motion.div>
          ))}
        </div>

        {/* Price row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: "relative", zIndex: 1, marginBottom: 26,
            padding: "22px 26px",
            background: `linear-gradient(135deg, ${course.color}12, rgba(30,41,59,0.4))`,
            border: `1px solid ${course.color}33`,
            borderRadius: 18,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ x: [-200, 400] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent, ${course.color}08, transparent)`, pointerEvents: "none" }}
          />
          <div style={{ color: "#94a3b8", fontSize: 13 }}>Total Fee</div>
          <motion.div
            animate={{ textShadow: [`0 0 8px ${course.color}`, `0 0 24px ${course.color}`, `0 0 8px ${course.color}`] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: course.color, fontFamily: "'Orbitron',sans-serif", fontSize: 30, fontWeight: 700 }}
          >{course.price}</motion.div>
        </motion.div>

        {/* Payment method */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 22 }}>
          <div style={{ color: "#475569", fontSize: 11, fontFamily: "'Orbitron',sans-serif", letterSpacing: 2, marginBottom: 12 }}>PAYMENT METHOD</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["UPI", "Card", "Net Banking"].map(m => (
              <motion.button
                key={m}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setMethod(m)}
                style={{
                  flex: 1, padding: "12px 0",
                  background: method === m ? `${course.color}22` : "rgba(20,30,55,0.6)",
                  border: `1px solid ${method === m ? course.color + "88" : "rgba(96,165,250,0.12)"}`,
                  borderRadius: 12,
                  color: method === m ? course.color : "#64748b",
                  cursor: "pointer", fontSize: 13, fontWeight: method === m ? 700 : 400,
                  boxShadow: method === m ? `0 0 16px ${course.color}33` : "none",
                  transition: "all 0.2s",
                }}>{m}</motion.button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, position: "relative", zIndex: 1 }}>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${course.color}66` }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePay}
            disabled={paid || loading}
            style={{
              flex: 1, padding: "16px 0",
              background: paid
                ? "linear-gradient(135deg,#166534,#15803d)"
                : `linear-gradient(135deg, ${course.color}cc, ${course.color}88)`,
              border: "none", borderRadius: 16,
              color: "white", cursor: paid ? "default" : "pointer",
              fontSize: 14, fontWeight: 700,
              fontFamily: "'Syne',sans-serif",
              boxShadow: `0 0 30px ${course.color}44`,
              position: "relative", overflow: "hidden",
              transition: "all 0.3s",
            }}
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >Processing…</motion.span>
            ) : paid ? "✅ Enrolled!" : "Proceed to Payment →"}
            {/* Shimmer sweep on button */}
            {!paid && !loading && (
              <motion.div
                animate={{ x: [-200, 400] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)", pointerEvents: "none" }}
              />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            style={{
              padding: "16px 22px",
              background: "rgba(20,30,55,0.7)",
              border: "1px solid rgba(96,165,250,0.15)",
              borderRadius: 16, color: "#94a3b8",
              cursor: "pointer", fontSize: 14,
            }}
          >Cancel</motion.button>
        </div>

        {/* Success */}
        <AnimatePresence>
          {paid && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0,  scale: 1   }}
              style={{
                marginTop: 20, position: "relative", zIndex: 1,
                padding: "20px 24px",
                background: "rgba(21,128,61,0.12)",
                border: "1px solid rgba(34,197,94,0.5)",
                borderRadius: 16,
                display: "flex", alignItems: "center", gap: 14,
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ x: [-300, 600] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(34,197,94,0.08),transparent)", pointerEvents: "none" }}
              />
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: 26 }}
              >✅</motion.span>
              <div>
                <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 16 }}>Payment Successful!</div>
                <div style={{ color: "#86efac", fontSize: 12, marginTop: 3 }}>
                  You're enrolled in <strong>{course.name}</strong>. Check your email for details.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Filter button with animated selection indicator ─────────────────────── */
function FilterBtn({ label, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{
        padding: "10px 26px",
        background: active ? "rgba(37,99,235,0.2)" : "rgba(10,18,38,0.8)",
        border: `1px solid ${active ? "rgba(96,165,250,0.8)" : "rgba(96,165,250,0.12)"}`,
        borderRadius: 12,
        color: active ? "#60A5FA" : "#64748b",
        cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400,
        fontFamily: "'Syne',sans-serif",
        boxShadow: active ? "0 0 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(96,165,250,0.2)" : "none",
        position: "relative", overflow: "hidden",
        transition: "all 0.25s",
      }}
    >
      {active && (
        <motion.div
          layoutId="filterActive"
          style={{ position: "absolute", inset: 0, background: "rgba(37,99,235,0.15)", borderRadius: 12 }}
        />
      )}
      <motion.span
        animate={{ x: active ? [-200, 200] : 0 }}
        transition={{ duration: 2, repeat: active ? Infinity : 0, repeatDelay: 1 }}
        style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.08),transparent)", pointerEvents: "none" }}
      />
      <span style={{ position: "relative" }}>{label}</span>
    </motion.button>
  );
}

/* ── Stats strip with counters ────────────────────────────────────────────── */
function StatsStrip() {
  const stats = [
    ["12+", "Courses Available"],
    ["2,400+", "Students Enrolled"],
    ["100%", "Project-Based"],
    ["6", "Industry Mentors"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      style={{
        marginTop: 72, display: "flex", gap: 0,
        background: "rgba(8,15,35,0.85)",
        border: "1px solid rgba(96,165,250,0.12)",
        borderRadius: 22, overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Scanning light */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.04),transparent)", pointerEvents: "none" }}
      />
      {stats.map(([num, label], i, arr) => (
        <motion.div
          key={label}
          whileHover={{ background: "rgba(37,99,235,0.06)" }}
          style={{
            flex: 1, textAlign: "center", padding: "30px 16px",
            borderRight: i < arr.length - 1 ? "1px solid rgba(96,165,250,0.08)" : "none",
            transition: "background 0.3s", position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            style={{ color: "#60A5FA", fontFamily: "'Orbitron',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}
          >
            <AnimCounter target={num} />
          </motion.div>
          <div style={{ color: "#475569", fontSize: 12 }}>{label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
export default function CourseGalaxy() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = filter === "All" ? COURSES : COURSES.filter(c => c.level.includes(filter));

  return (
    <section style={{
      minHeight: "100vh",
      background: "#020812",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Syne',sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Orbitron:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080f25; }
        ::-webkit-scrollbar-thumb { background: #1e3a6e; border-radius: 99px; }
      `}</style>

      <PulseGrid />
      <OrbBlobs />
      <ParticleField />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 32px 80px" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", marginBottom: 68, position: "relative" }}>
          <HeroOrbits />
          <RotatingCube />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <motion.div
              animate={{ letterSpacing: ["4px", "6px", "4px"] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ color: "#60A5FA", fontFamily: "'Orbitron',sans-serif", fontSize: 11, letterSpacing: 4, marginBottom: 20, textTransform: "uppercase" }}
            >Elevate IQ · Course Catalog</motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                margin: "0 0 22px",
                fontSize: "clamp(44px,6.5vw,76px)",
                fontWeight: 800, lineHeight: 1.04,
                background: "linear-gradient(130deg,#f1f5f9 20%,#60A5FA 60%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >Course Galaxy</motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ color: "#4e6080", fontSize: 16, maxWidth: 480, margin: "0 auto 42px", lineHeight: 1.75 }}
            >
              Hover any card to flip it. Click to enroll. Every course ships with real projects.
            </motion.p>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.5),rgba(167,139,250,0.3),transparent)", maxWidth: 600, margin: "0 auto", transformOrigin: "center" }}
            />
          </motion.div>
        </div>

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 52, flexWrap: "wrap" }}
        >
          {levels.map(l => (
            <FilterBtn key={l} label={l} active={filter === l} onClick={() => setFilter(l)} />
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 22 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <CourseCard key={course.name} course={course} index={i} onClick={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>

        <StatsStrip />
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && <CourseModal course={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}