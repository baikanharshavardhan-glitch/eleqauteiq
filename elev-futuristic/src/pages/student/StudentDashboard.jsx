import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Video, Monitor, ClipboardList,
  FolderKanban, BarChart2, Bot, Target, Award, Users,
  Ticket, User, Bell, Play, Download, CheckCircle,
  MessageSquare, Upload, Search, Menu, Send, Zap,
  GitBranch, Link2 as Linkedin, FileText, TrendingUp,
  X, Plus, Star, Clock, Trophy, Flame, BookMarked,
  CalendarCheck, Code2, Layers, ChevronRight, RefreshCw,
  ThumbsUp, Eye, Lock, Unlock, AlertCircle, BarChart, LogOut,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, AreaChart, Area,
} from "recharts";

const T = {
  bg: "#020917", sidebar: "#040D24", card: "rgba(6,18,44,0.85)",
  border: "rgba(96,165,250,0.15)", blue: "#2563EB", blueLight: "#60A5FA",
  text: "#E2EEFF", textMuted: "#6B9BD2", textDim: "#2C4878",
  green: "#34D399", yellow: "#FBBF24", red: "#F87171", purple: "#A78BFA",
};

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(96,165,250,0.2);border-radius:2px;}
  select option{background:#040D24;}
  input[type="date"]::-webkit-calendar-picker-indicator,input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(0.5);}

  @keyframes fadeInUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeInLeft{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
  @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  @keyframes rotateRing{from{transform:rotateZ(0deg) rotateX(70deg);}to{transform:rotateZ(360deg) rotateX(70deg);}}
  @keyframes rotateRing2{from{transform:rotateZ(0deg) rotateX(50deg) rotateY(20deg);}to{transform:rotateZ(-360deg) rotateX(50deg) rotateY(20deg);}}
  @keyframes rotateRing3{from{transform:rotateZ(60deg) rotateX(30deg);}to{transform:rotateZ(420deg) rotateX(30deg);}}
  @keyframes spinCube{0%{transform:rotateX(0deg) rotateY(0deg);}100%{transform:rotateX(360deg) rotateY(360deg);}}
  @keyframes pulseGlow{0%,100%{box-shadow:0 0 15px rgba(96,165,250,0.4),0 0 30px rgba(96,165,250,0.15);}50%{box-shadow:0 0 35px rgba(96,165,250,0.8),0 0 70px rgba(96,165,250,0.3);}}
  @keyframes pulseGlowG{0%,100%{box-shadow:0 0 12px rgba(52,211,153,0.4);}50%{box-shadow:0 0 30px rgba(52,211,153,0.8);}}
  @keyframes pulseGlowY{0%,100%{box-shadow:0 0 12px rgba(251,191,36,0.3);}50%{box-shadow:0 0 28px rgba(251,191,36,0.7);}}
  @keyframes pulseGlowP{0%,100%{box-shadow:0 0 12px rgba(167,139,250,0.3);}50%{box-shadow:0 0 28px rgba(167,139,250,0.7);}}
  @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
  @keyframes drift{0%,100%{transform:translateY(0) translateX(0) scale(1);opacity:.8;}50%{transform:translateY(-14px) translateX(8px) scale(1.15);opacity:1;}}
  @keyframes borderGlow{0%,100%{border-color:rgba(96,165,250,0.2);}50%{border-color:rgba(96,165,250,0.6);}}
  @keyframes progressFill{from{width:0;}to{width:var(--w);}}
  @keyframes hexSpin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes popIn{0%{transform:scale(0.7);opacity:0;}80%{transform:scale(1.05);}100%{transform:scale(1);opacity:1;}}
  @keyframes ripple{0%{transform:scale(0);opacity:1;}100%{transform:scale(3);opacity:0;}}
  @keyframes bounce{0%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}70%{transform:translateY(-3px);}}

  .nav-btn:hover{background:rgba(37,99,235,0.15)!important;color:#60A5FA!important;transform:translateX(4px);transition:all .2s ease!important;}
  .card3d{transition:transform .3s ease,box-shadow .3s ease!important;}
  .card3d:hover{transform:translateY(-4px) !important;box-shadow:0 12px 40px rgba(37,99,235,0.25)!important;}
  .btn-primary{background:linear-gradient(135deg,#2563EB,#1D4ED8);border:none;border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s ease;position:relative;overflow:hidden;}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,99,235,0.5)!important;}
  .btn-primary:active{transform:scale(0.97);}
  .btn-green{background:linear-gradient(135deg,#059669,#34D399);border:none;border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s ease;}
  .btn-green:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(52,211,153,0.5)!important;}
  .btn-yellow{background:linear-gradient(135deg,#D97706,#FBBF24);border:none;border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s ease;}
  .btn-yellow:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(251,191,36,0.4)!important;}
  .btn-purple{background:linear-gradient(135deg,#7C3AED,#A78BFA);border:none;border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s ease;}
  .btn-purple:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(167,139,250,0.5)!important;}
  .btn-ghost{background:rgba(37,99,235,0.12);border:1px solid rgba(96,165,250,0.25);border-radius:9px;color:#60A5FA;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .2s ease;}
  .btn-ghost:hover{background:rgba(37,99,235,0.22);border-color:rgba(96,165,250,0.5);box-shadow:0 0 14px rgba(96,165,250,0.3);}
  .btn-danger{background:linear-gradient(135deg,#DC2626,#F87171);border:none;border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:all .2s ease;}
  .btn-danger:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(248,113,113,0.4)!important;}
  .input-field{background:rgba(10,25,60,0.7);border:1px solid rgba(59,130,246,0.2);border-radius:9px;color:#E2EEFF;font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s;}
  .input-field:focus{border-color:rgba(96,165,250,0.5);box-shadow:0 0 0 3px rgba(96,165,250,0.08);}
  .toast{position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:12px;font-size:13px;font-family:'DM Sans',sans-serif;z-index:9999;animation:popIn .3s ease both;}
`;

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };
  return [toast, show];
}
function Toast({ toast }) {
  if (!toast) return null;
  const colors = { success: { bg: "rgba(5,150,105,0.95)", border: T.green }, error: { bg: "rgba(185,28,28,0.95)", border: T.red }, info: { bg: "rgba(37,99,235,0.95)", border: T.blueLight } };
  const c = colors[toast.type] || colors.success;
  return <div className="toast" style={{ background: c.bg, border: `1px solid ${c.border}`, color: "#fff" }}>{toast.msg}</div>;
}

const card = { background: T.card, border: "1px solid rgba(96,165,250,0.15)", borderRadius: 14, padding: "18px 20px" };

function Tag({ children, color }) {
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + "22", color, border: `1px solid ${color}44` }}>{children}</span>;
}
function SectionTitle({ children, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: T.text }}>{children}</h3>
      {action && <button onClick={action.fn} style={{ fontSize: 12, color: T.blueLight, background: "none", border: "none", cursor: "pointer" }}>{action.label} →</button>}
    </div>
  );
}
function ProgressBar({ value, color, animated }) {
  return (
    <div style={{ height: 6, background: "rgba(96,165,250,0.08)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color || T.blue, borderRadius: 3, boxShadow: `0 0 8px ${color || T.blue}66`, backgroundImage: animated ? `linear-gradient(90deg, ${color}88, ${color}, ${color}88)` : "none", backgroundSize: "200%", animation: animated ? "shimmer 2s linear infinite" : "none", transition: "width 1.2s ease" }} />
    </div>
  );
}
function Label({ children }) {
  return <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>{children}</label>;
}

const student = { name: "Aryan Mehta", id: "STU-2024-0041", course: "Full Stack Development", batch: "Batch B - 2024" };
const upcomingClasses = [
  { subject: "React Advanced Hooks", trainer: "Priya Sharma", time: "Today, 4:00 PM", duration: "90 min" },
  { subject: "Node.js REST APIs", trainer: "Rahul Verma", time: "Tomorrow, 11:00 AM", duration: "60 min" },
  { subject: "MongoDB Aggregation", trainer: "Priya Sharma", time: "Thu, 3:00 PM", duration: "75 min" },
];
const upcomingTests = [
  { name: "JavaScript Fundamentals", date: "Jun 5, 2026", type: "Technical", difficulty: "Medium" },
  { name: "Aptitude - Quantitative", date: "Jun 7, 2026", type: "Aptitude", difficulty: "Easy" },
  { name: "React Component Design", date: "Jun 10, 2026", type: "Technical", difficulty: "Hard" },
];
const timeline = [
  { event: "Submitted Assignment: CSS Flexbox", time: "2h ago", icon: Upload, color: T.green },
  { event: "Completed Module: JavaScript ES6", time: "Yesterday", icon: CheckCircle, color: T.blueLight },
  { event: "Attended Live Class: Python Basics", time: "2 days ago", icon: Video, color: T.purple },
  { event: "Mock Test: Aptitude - Score 78%", time: "3 days ago", icon: ClipboardList, color: T.yellow },
  { event: "Project Feedback Received", time: "4 days ago", icon: MessageSquare, color: T.red },
];
const radarData = [
  { subject: "Technical", score: 78 }, { subject: "Communication", score: 65 },
  { subject: "Assignments", score: 88 }, { subject: "Attendance", score: 92 }, { subject: "Projects", score: 72 },
];
const monthlyData = [
  { month: "Jan", score: 70 }, { month: "Feb", score: 74 }, { month: "Mar", score: 68 },
  { month: "Apr", score: 79 }, { month: "May", score: 81 }, { month: "Jun", score: 85 },
];
const placementData = [
  { label: "Resume Score", value: 68, color: T.blueLight },
  { label: "LinkedIn Score", value: 55, color: "#5B9BD5" },
  { label: "GitHub Score", value: 72, color: T.text },
  { label: "Aptitude Readiness", value: 80, color: T.green },
  { label: "Technical Readiness", value: 74, color: T.purple },
  { label: "Mock Interview", value: 60, color: T.yellow },
];
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "live", label: "Live Classes", icon: Monitor },
  { id: "recorded", label: "Recorded Classes", icon: Video },
  { id: "tests", label: "Tests & Assessments", icon: ClipboardList },
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "performance", label: "Performance", icon: BarChart2 },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "placement", label: "Placement Roadmap", icon: Target },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "community", label: "Community", icon: Users },
  { id: "tickets", label: "Tickets", icon: Ticket },
  { id: "profile", label: "Profile", icon: User },
];

function OrbitalScene() {
  return (
    <div style={{ width: 200, height: 200, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", perspective: "600px", flexShrink: 0 }}>
      <div style={{ width: 50, height: 50, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #93C5FD, #1D4ED8, #0A1628)", animation: "pulseGlow 2.5s ease-in-out infinite, floatY 4s ease-in-out infinite", zIndex: 10, position: "absolute" }} />
      {[{ w: 140, anim: "rotateRing 4s linear infinite", border: "rgba(96,165,250,0.5)", dot: { top: -5, left: "50%", tx: "-50%", bg: "radial-gradient(circle,#60A5FA,#2563EB)", glow: "#60A5FA" } },
        { w: 110, anim: "rotateRing2 3s linear infinite", border: "rgba(167,139,250,0.5)", dot: { bottom: -5, right: "20%", bg: "radial-gradient(circle,#A78BFA,#7C3AED)", glow: "#A78BFA" } },
        { w: 175, anim: "rotateRing3 7s linear infinite", border: "rgba(52,211,153,0.3)", dot: { top: "15%", right: -4, bg: "radial-gradient(circle,#34D399,#059669)", glow: "#34D399" } }
      ].map((r, i) => (
        <div key={i} style={{ position: "absolute", width: r.w, height: r.w, borderRadius: "50%", border: `1.5px solid ${r.border}`, animation: r.anim, transformStyle: "preserve-3d" }}>
          <div style={{ position: "absolute", ...r.dot, width: 9, height: 9, background: r.dot.bg, borderRadius: "50%", boxShadow: `0 0 10px ${r.dot.glow}`, transform: r.dot.tx ? `translateX(${r.dot.tx})` : undefined }} />
        </div>
      ))}
      {[{ top: "10%", left: "15%", c: "#60A5FA", s: 4, d: "0s", dur: "3s" }, { top: "75%", left: "8%", c: "#A78BFA", s: 3, d: "1s", dur: "4s" }, { top: "80%", left: "78%", c: "#34D399", s: 4, d: "0.5s", dur: "3.5s" }, { top: "12%", left: "82%", c: "#FBBF24", s: 3, d: "2s", dur: "5s" }].map((p, i) => (
        <div key={i} style={{ position: "absolute", top: p.top, left: p.left, width: p.s, height: p.s, borderRadius: "50%", background: p.c, boxShadow: `0 0 7px ${p.c}`, animation: `drift ${p.dur} ${p.d} ease-in-out infinite` }} />
      ))}
    </div>
  );
}

function FloatingCube({ color = T.blueLight }) {
  return (
    <div style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", perspective: "400px", flexShrink: 0 }}>
      <div style={{ width: 60, height: 60, position: "relative", transformStyle: "preserve-3d", animation: "spinCube 6s linear infinite" }}>
        {[
          { transform: "rotateY(0deg) translateZ(30px)", bg: `${color}22`, border: `1px solid ${color}66` },
          { transform: "rotateY(180deg) translateZ(30px)", bg: `${color}22`, border: `1px solid ${color}66` },
          { transform: "rotateY(90deg) translateZ(30px)", bg: `${color}33`, border: `1px solid ${color}88` },
          { transform: "rotateY(-90deg) translateZ(30px)", bg: `${color}33`, border: `1px solid ${color}88` },
          { transform: "rotateX(90deg) translateZ(30px)", bg: `${color}44`, border: `1px solid ${color}99` },
          { transform: "rotateX(-90deg) translateZ(30px)", bg: `${color}44`, border: `1px solid ${color}99` },
        ].map((f, i) => (
          <div key={i} style={{ position: "absolute", width: 60, height: 60, background: f.bg, border: f.border, transform: f.transform, backdropFilter: "blur(4px)" }} />
        ))}
      </div>
    </div>
  );
}

function HexSpinner() {
  return (
    <div style={{ width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {[80, 60, 40].map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: s, height: s, borderRadius: "50%",
          border: `2px solid ${[T.blueLight, T.purple, T.green][i]}`,
          animation: `hexSpin ${[4, 3, 2][i]}s linear infinite ${i % 2 === 1 ? "reverse" : ""}`,
          boxShadow: `0 0 12px ${[T.blueLight, T.purple, T.green][i]}44`,
        }}>
          <div style={{ position: "absolute", top: -4, left: "50%", marginLeft: -4, width: 8, height: 8, borderRadius: "50%", background: [T.blueLight, T.purple, T.green][i], boxShadow: `0 0 8px ${[T.blueLight, T.purple, T.green][i]}` }} />
        </div>
      ))}
      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #93C5FD, #1D4ED8)", animation: "pulseGlow 2s ease-in-out infinite" }} />
    </div>
  );
}

function StatCard({ st, index }) {
  const glows = { [T.green]: "pulseGlowG", [T.blueLight]: "pulseGlow", [T.yellow]: "pulseGlowY", [T.purple]: "pulseGlowP" };
  return (
    <div className="card3d" style={{ background: T.card, border: `1px solid ${st.color}33`, borderLeft: `3px solid ${st.color}`, borderRadius: 14, padding: "18px 20px", animation: `fadeInUp 0.4s ease ${index * 0.1}s both, ${glows[st.color] || "pulseGlow"} 3s ease-in-out ${index * 0.6}s infinite`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, transparent 40%, ${st.color}0d 50%, transparent 60%)`, backgroundSize: "200%", animation: "shimmer 3s linear infinite", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
        <div>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{st.label}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: st.color, fontFamily: "'Syne',sans-serif" }}>{st.value}</div>
          <div style={{ fontSize: 11, color: T.textDim, marginTop: 4 }}>{st.sub}</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${st.color}18`, border: `1px solid ${st.color}33`, display: "flex", alignItems: "center", justifyContent: "center", animation: `${glows[st.color] || "pulseGlow"} 2s ease-in-out infinite` }}>
          <st.icon size={18} color={st.color} />
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ setPage }) {
  const stats = [
    { label: "Attendance", value: "87%", icon: CheckCircle, color: T.green, sub: "+2% this week" },
    { label: "Course Completion", value: "62%", icon: BookOpen, color: T.blueLight, sub: "8 of 13 modules" },
    { label: "Placement Readiness", value: "74%", icon: Target, color: T.yellow, sub: "Resume pending" },
    { label: "Overall Performance", value: "81%", icon: TrendingUp, color: T.purple, sub: "Top 15%" },
  ];
  return (
    <div>
      <div style={{ ...card, background: "linear-gradient(135deg,rgba(29,78,216,0.35),rgba(6,18,44,0.95))", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, border: "1px solid rgba(96,165,250,0.2)", animation: "pulseGlow 4s ease-in-out infinite", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(96,165,250,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.04) 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: T.text }}>Welcome back, {student.name} 👋</div>
          <div style={{ color: T.textMuted, fontSize: 13, marginTop: 4 }}>{student.batch} · {student.course}</div>
          <button className="btn-primary" onClick={() => setPage("courses")} style={{ marginTop: 14, padding: "10px 22px", fontSize: 13 }}>Continue Learning →</button>
        </div>
        <OrbitalScene />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 }}>
        {stats.map((st, i) => <StatCard key={st.label} st={st} index={i} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 290px", gap: 16 }}>
        <div className="card3d" style={card}>
          <SectionTitle action={{ label: "View All", fn: () => setPage("live") }}>Upcoming Classes</SectionTitle>
          {upcomingClasses.map((cls, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < upcomingClasses.length - 1 ? "1px solid rgba(96,165,250,0.08)" : "none", animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}>
              <div>
                <div style={{ color: T.text, fontSize: 13, fontWeight: 500 }}>{cls.subject}</div>
                <div style={{ color: T.textMuted, fontSize: 12, marginTop: 2 }}>{cls.trainer} · {cls.duration}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: T.blueLight, marginBottom: 4 }}>{cls.time}</div>
                <button className="btn-primary" style={{ padding: "4px 12px", fontSize: 11 }}>Join</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card3d" style={card}>
          <SectionTitle action={{ label: "View All", fn: () => setPage("tests") }}>Upcoming Tests</SectionTitle>
          {upcomingTests.map((t, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < upcomingTests.length - 1 ? "1px solid rgba(96,165,250,0.08)" : "none", animation: `fadeInUp 0.4s ease ${i * 0.1}s both` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ color: T.text, fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                <Tag color={t.difficulty === "Hard" ? T.red : t.difficulty === "Medium" ? T.yellow : T.green}>{t.difficulty}</Tag>
              </div>
              <div style={{ color: T.textMuted, fontSize: 12 }}>{t.type} · {t.date}</div>
            </div>
          ))}
        </div>
        <div className="card3d" style={card}>
          <SectionTitle>Recent Activity</SectionTitle>
          {timeline.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 8px ${item.color}44` }}>
                <item.icon size={13} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: T.text }}>{item.event}</div>
                <div style={{ fontSize: 11, color: T.textDim, marginTop: 2 }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage() {
  const [toast, show] = useToast();
  const [enrolled, setEnrolled] = useState([0, 1, 2, 3]);
  const courses = [
    { name: "Full Stack Web Development", progress: 62, modules: 13, done: 8, color: T.blueLight, tag: "Primary" },
    { name: "Data Structures & Algorithms", progress: 45, modules: 10, done: 4, color: T.green, tag: "Elective" },
    { name: "System Design Fundamentals", progress: 20, modules: 8, done: 1, color: T.purple, tag: "Elective" },
    { name: "Aptitude & Reasoning", progress: 80, modules: 6, done: 5, color: T.yellow, tag: "Placement" },
  ];
  const extra = [
    { name: "DevOps Basics", color: T.red }, { name: "Cloud with AWS", color: T.green }, { name: "GraphQL Mastery", color: T.purple },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>My Courses</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {courses.map((c, i) => (
            <div key={i} className="card3d" style={{ ...card, borderTop: `3px solid ${c.color}`, animation: `fadeInUp 0.4s ease ${i * 0.1}s both` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>{c.name}</div>
                <Tag color={c.color}>{c.tag}</Tag>
              </div>
              <div style={{ color: T.textMuted, fontSize: 12, marginBottom: 8 }}>{c.done}/{c.modules} modules done</div>
              <ProgressBar value={c.progress} color={c.color} animated />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <span style={{ fontSize: 12, color: c.color, fontWeight: 600 }}>{c.progress}%</span>
                <button className="btn-primary" onClick={() => show(`Resuming ${c.name}...`, "info")} style={{ padding: "6px 14px", fontSize: 12 }}>Resume →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Learning Engine</div>
          <FloatingCube color={T.blueLight} />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>4 Courses Active</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>57% avg. progress</div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 12 }}>Explore More</div>
          {extra.map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: T.textMuted }}>{e.name}</span>
              <button className="btn-ghost" onClick={() => { setEnrolled(prev => [...prev, i + 10]); show(`Enrolled in ${e.name}!`, "success"); }} style={{ padding: "4px 10px", fontSize: 11 }}>
                <Plus size={10} style={{ marginRight: 4, verticalAlign: "middle" }} />Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveClassesPage() {
  const [toast, show] = useToast();
  const [joined, setJoined] = useState(null);
  const [secs, setSecs] = useState(3600);
  useEffect(() => { const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, []);
  const fmt = s => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const history = [
    { name: "React Intro", date: "May 28", attended: true },
    { name: "JS ES6 Deep Dive", date: "May 25", attended: true },
    { name: "HTML & CSS Basics", date: "May 20", attended: false },
    { name: "Git & GitHub", date: "May 15", attended: true },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>Live Classes</SectionTitle>
        {upcomingClasses.map((cls, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", animation: `fadeInUp 0.4s ease ${i * 0.1}s both`, borderLeft: joined === i ? `3px solid ${T.green}` : "1px solid rgba(96,165,250,0.15)" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 46, height: 46, background: "rgba(37,99,235,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseGlow 3s ease-in-out infinite", boxShadow: "0 0 15px rgba(96,165,250,0.25)" }}>
                <Monitor size={20} color={T.blueLight} />
              </div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>{cls.subject}</div>
                <div style={{ color: T.textMuted, fontSize: 12, marginTop: 3 }}>{cls.trainer} · {cls.duration}</div>
                <div style={{ fontSize: 12, color: T.blueLight, marginTop: 2 }}>{cls.time}</div>
              </div>
            </div>
            {joined === i
              ? <button className="btn-danger" onClick={() => { setJoined(null); show("Left the class", "error"); }} style={{ padding: "8px 18px", fontSize: 12 }}>Leave</button>
              : <button className="btn-primary" onClick={() => { setJoined(i); show(`Joined: ${cls.subject}`, "success"); }} style={{ padding: "8px 20px", fontSize: 13 }}>Join Class</button>
            }
          </div>
        ))}
        <div style={{ ...card, marginTop: 4 }}>
          <SectionTitle>Session History</SectionTitle>
          {history.map((h, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < history.length - 1 ? "1px solid rgba(96,165,250,0.07)" : "none" }}>
              <div>
                <div style={{ fontSize: 13, color: T.text }}>{h.name}</div>
                <div style={{ fontSize: 11, color: T.textDim }}>{h.date}</div>
              </div>
              <Tag color={h.attended ? T.green : T.red}>{h.attended ? "Attended" : "Missed"}</Tag>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Next Class In</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: T.blueLight, letterSpacing: 2, textShadow: "0 0 20px rgba(96,165,250,0.5)", animation: "pulseGlow 2s ease-in-out infinite" }}>{fmt(secs)}</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 6 }}>React Advanced Hooks</div>
          <div style={{ margin: "14px 0", display: "flex", justifyContent: "center" }}><HexSpinner /></div>
          <button className="btn-primary" onClick={() => { setJoined(0); show("Joined React Advanced Hooks!", "success"); }} style={{ width: "100%", padding: "10px 0", fontSize: 13 }}>🎯 Join Now</button>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.15s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>This Week</div>
          {[{ d: "Mon", n: "React Hooks", done: true }, { d: "Wed", n: "Node.js APIs", done: false }, { d: "Fri", n: "MongoDB", done: false }].map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: w.done ? T.green + "22" : "rgba(37,99,235,0.15)", border: `1px solid ${w.done ? T.green : T.blueLight}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: w.done ? T.green : T.blueLight, fontWeight: 700 }}>{w.d}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: T.text }}>{w.n}</div></div>
              {w.done && <CheckCircle size={14} color={T.green} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecordedClassesPage() {
  const [toast, show] = useToast();
  const [search, setSearch] = useState("");
  const [watched, setWatched] = useState([0, 1]);
  const videos = [
    { title: "React Hooks Deep Dive", course: "Full Stack", duration: "45:20" },
    { title: "Node.js Event Loop Explained", course: "Full Stack", duration: "38:10" },
    { title: "MongoDB Schema Design", course: "Full Stack", duration: "52:40" },
    { title: "Array & Linked Lists", course: "DSA", duration: "61:15" },
    { title: "Binary Trees Visualized", course: "DSA", duration: "48:30" },
    { title: "REST vs GraphQL APIs", course: "Full Stack", duration: "35:00" },
  ];
  const filtered = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));
  const streak = watched.length;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: T.card, border: "1px solid rgba(96,165,250,0.15)", borderRadius: 10, padding: "0 14px", animation: "borderGlow 3s ease-in-out infinite" }}>
            <Search size={15} color={T.textMuted} />
            <input className="input-field" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search videos..." style={{ flex: 1, background: "none", border: "none", padding: "10px 0", color: T.text }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {filtered.map((v, i) => (
            <div key={i} className="card3d" style={{ ...card, cursor: "pointer", animation: `fadeInUp 0.35s ease ${i * 0.06}s both`, borderTop: watched.includes(i) ? `3px solid ${T.green}` : `3px solid rgba(96,165,250,0.15)` }}>
              <div style={{ height: 100, background: "rgba(37,99,235,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(135deg,rgba(37,99,235,0.05),rgba(96,165,250,0.12))", animation: "shimmer 3s linear infinite", backgroundSize: "200%" }} />
                <button onClick={() => { if (!watched.includes(i)) { setWatched(p => [...p, i]); show("Marked as watched!", "success"); } }} style={{ width: 40, height: 40, borderRadius: "50%", background: watched.includes(i) ? T.green : T.blue, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 1, animation: "pulseGlow 2s ease-in-out infinite", transition: "all 0.2s" }}>
                  {watched.includes(i) ? <CheckCircle size={16} color="#fff" /> : <Play size={16} color="#fff" fill="#fff" />}
                </button>
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 8 }}>{v.title}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Tag color={T.blueLight}>{v.course}</Tag>
                <span style={{ fontSize: 11, color: T.textMuted }}>{v.duration}</span>
              </div>
              {watched.includes(i) && <div style={{ marginTop: 8, fontSize: 11, color: T.green, display: "flex", alignItems: "center", gap: 4 }}><CheckCircle size={11} /> Watched</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Watch Streak</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #FCD34D, #D97706, #92400E)", animation: "pulseGlowY 2s ease-in-out infinite, floatY 3s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={28} color="#fff" />
            </div>
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: T.yellow, textShadow: "0 0 20px rgba(251,191,36,0.6)" }}>{streak}</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>videos watched</div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ height: 20, borderRadius: 3, background: i < streak ? T.yellow + "66" : "rgba(96,165,250,0.08)", border: `1px solid ${i < streak ? T.yellow + "44" : "rgba(96,165,250,0.1)"}` }} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: T.textDim, marginTop: 6 }}>This Week</div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Quick Filters</div>
          {["All Videos", "Full Stack", "DSA", "Watched", "Unwatched"].map((f, i) => (
            <button key={i} className="btn-ghost" onClick={() => setSearch(f === "All Videos" ? "" : f === "Watched" || f === "Unwatched" ? "" : f)} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 12px", marginBottom: 6, fontSize: 12 }}>{f}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestsPage() {
  const [toast, show] = useToast();
  const [testDate, setTestDate] = useState("");
  const [testType, setTestType] = useState("Aptitude Test");
  const [testTime, setTestTime] = useState("");
  const [scheduled, setScheduled] = useState([]);
  const [scores, setScores] = useState({ 0: "78%", 1: "82%" });
  const mockTests = [
    { name: "Aptitude Mock #1", type: "Aptitude", questions: 30, duration: "45 min", done: true },
    { name: "JavaScript Technical", type: "Technical", questions: 25, duration: "40 min", done: true },
    { name: "React Fundamentals", type: "Technical", questions: 20, duration: "35 min", done: false },
    { name: "Company Pattern - TCS", type: "Company", questions: 45, duration: "60 min", done: false },
    { name: "HR Interview Simulation", type: "HR Mock", questions: 10, duration: "30 min", done: false },
  ];
  const typeColor = { Technical: T.blueLight, Aptitude: T.green, Company: T.yellow, "HR Mock": T.purple };
  const handleSchedule = () => {
    if (!testDate || !testTime) { show("Please fill date and time", "error"); return; }
    setScheduled(p => [...p, { type: testType, date: testDate, time: testTime }]);
    show(`${testType} scheduled for ${testDate}!`, "success");
    setTestDate(""); setTestTime("");
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>Mock Tests & Assessments</SectionTitle>
        {mockTests.map((t, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>{t.name}</div>
              <div style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>{t.questions} questions · {t.duration}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Tag color={typeColor[t.type] || T.blueLight}>{t.type}</Tag>
              {t.done
                ? <span style={{ fontSize: 13, color: T.green, fontWeight: 700, textShadow: `0 0 10px ${T.green}` }}>{scores[i]}</span>
                : <button className="btn-primary" onClick={() => { setScores(p => ({ ...p, [i]: `${Math.floor(Math.random() * 20 + 70)}%` })); show(`${t.name} submitted!`, "success"); }} style={{ padding: "7px 18px", fontSize: 12 }}>Start Test</button>
              }
            </div>
          </div>
        ))}
        {scheduled.length > 0 && (
          <div style={{ ...card, marginTop: 4 }}>
            <SectionTitle>Scheduled Tests</SectionTitle>
            {scheduled.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(96,165,250,0.07)", fontSize: 13 }}>
                <span style={{ color: T.text }}>{s.type}</span>
                <span style={{ color: T.textMuted }}>{s.date} at {s.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Test Engine</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}><HexSpinner /></div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: T.text }}>Avg Score</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, color: T.green, textShadow: "0 0 18px rgba(52,211,153,0.5)" }}>80%</div>
          <div style={{ fontSize: 11, color: T.textMuted }}>across 2 tests</div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <SectionTitle>Schedule a Test</SectionTitle>
          <div style={{ marginBottom: 10 }}>
            <Label>Test Type</Label>
            <select className="input-field" value={testType} onChange={e => setTestType(e.target.value)} style={{ width: "100%", padding: "9px 12px" }}>
              {["Aptitude Test", "Technical Test", "Mock Interview", "Company Pattern"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Label>Date</Label>
            <input type="date" className="input-field" value={testDate} onChange={e => setTestDate(e.target.value)} style={{ width: "100%", padding: "9px 12px" }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Label>Time</Label>
            <input type="time" className="input-field" value={testTime} onChange={e => setTestTime(e.target.value)} style={{ width: "100%", padding: "9px 12px" }} />
          </div>
          <button className="btn-primary" onClick={handleSchedule} style={{ width: "100%", padding: "10px 0", fontSize: 13 }}>
            <CalendarCheck size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Schedule Test
          </button>
        </div>
      </div>
    </div>
  );
}

function AssignmentsPage() {
  const [toast, show] = useToast();
  const [assignments, setAssignments] = useState([
    { title: "Build a Todo App with React", due: "Jun 4, 2026", status: "Submitted", score: "18/20" },
    { title: "CSS Layout Challenge", due: "Jun 6, 2026", status: "Pending", score: null },
    { title: "Node.js CRUD API", due: "Jun 9, 2026", status: "Pending", score: null },
    { title: "Database Normalization Exercise", due: "May 30, 2026", status: "Graded", score: "16/20" },
  ]);
  const [file, setFile] = useState({});
  const statusColor = { Submitted: T.blueLight, Pending: T.yellow, Graded: T.green };
  const handleUpload = (i) => {
    setAssignments(prev => prev.map((a, idx) => idx === i ? { ...a, status: "Submitted" } : a));
    show("Assignment submitted successfully!", "success");
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>Assignments</SectionTitle>
        {assignments.map((a, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 12, animation: `fadeInUp 0.4s ease ${i * 0.1}s both`, borderLeft: `3px solid ${statusColor[a.status]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: a.status === "Pending" ? 12 : 0 }}>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>{a.title}</div>
                <div style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>Due: {a.due}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {a.score && <span style={{ fontSize: 13, color: T.green, fontWeight: 700 }}>{a.score}</span>}
                <Tag color={statusColor[a.status]}>{a.status}</Tag>
              </div>
            </div>
            {a.status === "Pending" && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="file" id={`file-${i}`} style={{ display: "none" }} onChange={e => setFile(p => ({ ...p, [i]: e.target.files[0]?.name }))} />
                <button className="btn-ghost" onClick={() => document.getElementById(`file-${i}`).click()} style={{ padding: "7px 14px", fontSize: 12, flex: 1 }}>
                  <Upload size={12} style={{ marginRight: 5, verticalAlign: "middle" }} />{file[i] ? file[i] : "Choose File"}
                </button>
                <button className="btn-green" onClick={() => handleUpload(i)} style={{ padding: "7px 18px", fontSize: 12 }}>Submit</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Assignment Core</div>
          <FloatingCube color={T.yellow} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            {[{ l: "Submitted", v: assignments.filter(a => a.status === "Submitted").length, c: T.blueLight },
              { l: "Graded", v: assignments.filter(a => a.status === "Graded").length, c: T.green },
              { l: "Pending", v: assignments.filter(a => a.status === "Pending").length, c: T.yellow },
              { l: "Total", v: assignments.length, c: T.purple }].map((s, i) => (
              <div key={i} style={{ background: `${s.c}18`, borderRadius: 8, padding: "8px", border: `1px solid ${s.c}33`, textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 10, color: T.textMuted }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Upcoming Deadlines</div>
          {assignments.filter(a => a.status === "Pending").map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10, padding: "8px", background: "rgba(251,191,36,0.05)", borderRadius: 8, border: "1px solid rgba(251,191,36,0.15)" }}>
              <AlertCircle size={14} color={T.yellow} style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: T.text }}>{a.title}</div>
                <div style={{ fontSize: 11, color: T.yellow, marginTop: 2 }}>{a.due}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [toast, show] = useToast();
  const [projects, setProjects] = useState([
    { title: "E-Commerce Platform", status: "In Progress", deadline: "Jun 20, 2026", progress: 40, trainer: "Priya Sharma", color: T.blueLight },
    { title: "Portfolio Website", status: "Completed", deadline: "May 25, 2026", progress: 100, trainer: "Rahul Verma", color: T.green },
  ]);
  const [file, setFile] = useState({});
  const handleUpload = (i) => {
    show(`Deliverable for "${projects[i].title}" uploaded!`, "success");
    setProjects(prev => prev.map((p, idx) => idx === i ? { ...p, progress: Math.min(p.progress + 10, 100) } : p));
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>Projects</SectionTitle>
        {projects.map((p, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 14, borderTop: `3px solid ${p.color}`, animation: `fadeInUp 0.4s ease ${i * 0.15}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>{p.title}</div>
              <Tag color={p.status === "Completed" ? T.green : T.blueLight}>{p.status}</Tag>
            </div>
            <div style={{ color: T.textMuted, fontSize: 12, marginBottom: 12 }}>Trainer: {p.trainer} · Deadline: {p.deadline}</div>
            <ProgressBar value={p.progress} color={p.color} animated />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <span style={{ fontSize: 13, color: p.color, fontWeight: 700 }}>{p.progress}%</span>
              {p.status !== "Completed" && (
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="file" id={`proj-${i}`} style={{ display: "none" }} onChange={e => setFile(f => ({ ...f, [i]: e.target.files[0]?.name }))} />
                  <button className="btn-ghost" onClick={() => document.getElementById(`proj-${i}`).click()} style={{ padding: "6px 12px", fontSize: 12 }}>
                    <Upload size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />{file[i] ? "File Ready" : "Choose File"}
                  </button>
                  <button className="btn-primary" onClick={() => handleUpload(i)} style={{ padding: "6px 16px", fontSize: 12 }}>Upload</button>
                </div>
              )}
              {p.status === "Completed" && (
                <button className="btn-green" onClick={() => show("Certificate requested!", "success")} style={{ padding: "6px 16px", fontSize: 12 }}>
                  <Award size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />Get Certificate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Project Orbit</div>
          <OrbitalScene />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: T.blueLight }}>{projects.filter(p => p.status === "Completed").length}/{projects.length}</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>Projects Completed</div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Milestones</div>
          {[{ t: "Design Phase", done: true }, { t: "Backend API", done: true }, { t: "Frontend UI", done: false }, { t: "Testing", done: false }, { t: "Deployment", done: false }].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: m.done ? T.green + "22" : "rgba(96,165,250,0.1)", border: `2px solid ${m.done ? T.green : "rgba(96,165,250,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {m.done && <CheckCircle size={10} color={T.green} />}
              </div>
              <span style={{ fontSize: 12, color: m.done ? T.text : T.textMuted }}>{m.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
      <div>
        <SectionTitle>Performance Center</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div className="card3d" style={card}>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 10 }}>Skills Overview</div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(96,165,250,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: T.textMuted, fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="score" stroke={T.blueLight} fill={T.blue} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card3d" style={card}>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 10 }}>Monthly Trend</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.blueLight} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={T.blueLight} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(96,165,250,0.06)" />
                <XAxis dataKey="month" tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#040D24", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 8, color: T.text, fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke={T.blueLight} strokeWidth={2} fill="url(#scoreGrad)" dot={{ fill: T.blue, r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={card}>
          <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 14 }}>Score Breakdown</div>
          {radarData.map((r, i) => (
            <div key={i} style={{ marginBottom: 14, animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: T.text }}>{r.subject}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: r.score >= 80 ? T.green : r.score >= 65 ? T.yellow : T.red, textShadow: `0 0 8px ${r.score >= 80 ? T.green : r.score >= 65 ? T.yellow : T.red}` }}>{r.score}%</span>
              </div>
              <ProgressBar value={r.score} color={r.score >= 80 ? T.green : r.score >= 65 ? T.blueLight : T.yellow} animated />
            </div>
          ))}
          <div style={{ marginTop: 14, padding: 12, background: "rgba(37,99,235,0.07)", borderRadius: 8, border: "1px solid rgba(96,165,250,0.1)" }}>
            <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 4 }}>Trainer Remark</div>
            <div style={{ fontSize: 13, color: T.text }}>"Aryan shows strong progress in assignments and attendance. Communication skills need improvement." — Priya Sharma</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Overall Rank</div>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #FCD34D,#D97706,#92400E)", animation: "pulseGlowY 2.5s ease-in-out infinite, floatY 3s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
            <Trophy size={28} color="#fff" />
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: T.yellow, textShadow: "0 0 20px rgba(251,191,36,0.5)" }}>Top 15%</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>in your batch</div>
          <div style={{ marginTop: 14 }}><HexSpinner /></div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Badges Earned</div>
          {[{ name: "Streak Master", icon: Flame, color: T.yellow }, { name: "Code Ninja", icon: Code2, color: T.blueLight }, { name: "Team Player", icon: Users, color: T.green }].map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, padding: "8px 10px", background: `${b.color}10`, borderRadius: 8, border: `1px solid ${b.color}22`, animation: `fadeInUp 0.4s ease ${i * 0.1}s both` }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${b.color}22`, display: "flex", alignItems: "center", justifyContent: "center", animation: `pulseGlow 3s ease-in-out ${i * 0.5}s infinite` }}>
                <b.icon size={15} color={b.color} />
              </div>
              <span style={{ fontSize: 13, color: T.text }}>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Aryan! I am your ElevateIQ AI Assistant. Ask me anything about your courses, doubts, resume tips, or interview prep!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const suggestions = ["Explain useEffect with example", "Prepare for React interview", "MERN stack roadmap", "Suggest a project idea", "Review my resume score of 68%"];
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  const send = async (overrideText) => {
    const userMsg = (overrideText || input).trim();
    if (!userMsg || loading) return;
    const updatedMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    const apiMessages = updatedMessages.filter((_, i) => i > 0).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "ai", text: data.data?.reply || data.message || "Could not get a response. Try again." }]);
    } catch(e) {
      setMessages(m => [...m, { role: "ai", text: "Server error. Please try again." }]);
    }
    setLoading(false);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
      <div style={{ ...card, display: "flex", flexDirection: "column", height: 500, border: "1px solid rgba(96,165,250,0.2)", animation: "borderGlow 3s ease-in-out infinite" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid rgba(96,165,250,0.1)" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseGlow 2s ease-in-out infinite" }}>
            <Bot size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>ElevateIQ Assistant</div>
            <div style={{ fontSize: 11, color: T.green, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.green, animation: "pulseGlowG 1.5s ease-in-out infinite" }} /> Online
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12, animation: "fadeInUp 0.3s ease both" }}>
              <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? "linear-gradient(135deg,#2563EB,#1D4ED8)" : "rgba(96,165,250,0.08)", color: T.text, fontSize: 13, border: m.role === "ai" ? "1px solid rgba(96,165,250,0.15)" : "none", boxShadow: m.role === "user" ? "0 0 15px rgba(37,99,235,0.35)" : "none", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 5, padding: "10px 14px" }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: T.blueLight, animation: `bounce 1s ${i * 0.2}s ease-in-out infinite` }} />)}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything..." style={{ flex: 1, padding: "10px 14px" }} />
          <button className="btn-primary" onClick={() => send()} style={{ padding: "10px 16px", opacity: loading ? 0.5 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            <Send size={15} />
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>AI Core</div>
          <OrbitalScene />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: T.text }}>Powered by Claude</div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Context-aware tutor</div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Quick Prompts</div>
          {suggestions.map((s, i) => (
            <button key={i} className="btn-ghost" onClick={() => send(s)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", marginBottom: 7, fontSize: 12, animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
              <ChevronRight size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />{s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlacementPage() {
  const [toast, show] = useToast();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>Placement Roadmap</SectionTitle>
        <div style={{ ...card, marginBottom: 14, animation: "fadeInUp 0.4s ease both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: T.text }}>Overall Readiness</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: T.yellow, fontFamily: "'Syne',sans-serif", textShadow: `0 0 15px ${T.yellow}` }}>74%</span>
          </div>
          <ProgressBar value={74} color={T.yellow} animated />
        </div>
        {placementData.map((p, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 10, animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: T.text }}>{p.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.color, textShadow: `0 0 8px ${p.color}` }}>{p.value}%</span>
            </div>
            <ProgressBar value={p.value} color={p.color} animated />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Placement Engine</div>
          <FloatingCube color={T.yellow} />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>Ready for TCS, Infosys</div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>2 companies match profile</div>
        </div>
        {[{ icon: GitBranch, label: "GitHub", score: "72%", color: T.text, btn: "btn-ghost", action: "View Profile" },
          { icon: Linkedin, label: "LinkedIn", score: "55%", color: "#5B9BD5", btn: "btn-ghost", action: "Optimize" },
          { icon: FileText, label: "Resume", score: "68%", color: T.blueLight, btn: "btn-primary", action: "Review" },
        ].map((item, i) => (
          <div key={i} className="card3d" style={{ ...card, display: "flex", alignItems: "center", gap: 12, animation: `fadeInLeft 0.4s ease ${i * 0.1 + 0.1}s both` }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${item.color}18`, border: `1px solid ${item.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "pulseGlow 3s ease-in-out infinite" }}>
              <item.icon size={18} color={item.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: T.text }}>{item.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: item.color, textShadow: `0 0 10px ${item.color}` }}>{item.score}</div>
            </div>
            <button className={item.btn} onClick={() => show(`Opening ${item.label}...`, "info")} style={{ padding: "6px 12px", fontSize: 11 }}>{item.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesPage() {
  const [toast, show] = useToast();
  const certs = [
    { name: "Full Stack Web Development - Module 1", issued: "May 15, 2026", id: "CERT-FSW-001" },
    { name: "JavaScript Fundamentals", issued: "Apr 28, 2026", id: "CERT-JS-002" },
    { name: "HTML & CSS Mastery", issued: "Mar 10, 2026", id: "CERT-HC-003" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>My Certificates</SectionTitle>
        {certs.map((c, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `3px solid ${T.yellow}`, animation: `fadeInUp 0.4s ease ${i * 0.1}s both` }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 46, height: 46, background: "rgba(251,191,36,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseGlowY 2.5s ease-in-out infinite" }}>
                <Award size={22} color={T.yellow} />
              </div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>{c.name}</div>
                <div style={{ color: T.textMuted, fontSize: 12, marginTop: 3 }}>Issued: {c.issued} · {c.id}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost" onClick={() => show(`Viewing ${c.id}`, "info")} style={{ padding: "7px 12px", fontSize: 12 }}>
                <Eye size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />View
              </button>
              <button className="btn-yellow" onClick={() => show(`Downloading ${c.id}...`, "success")} style={{ padding: "7px 14px", fontSize: 12 }}>
                <Download size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />Download
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Achievement</div>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #FCD34D,#D97706,#92400E)", animation: "pulseGlowY 2.5s ease-in-out infinite, floatY 3s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <Award size={36} color="#fff" />
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: T.yellow, textShadow: "0 0 20px rgba(251,191,36,0.5)" }}>{certs.length}</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>Certificates Earned</div>
          <div style={{ marginTop: 14 }}><FloatingCube color={T.yellow} /></div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Upcoming Certs</div>
          {["React Advanced", "Node.js APIs", "System Design"].map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
              <span style={{ fontSize: 12, color: T.textMuted }}>{c}</span>
              <button className="btn-ghost" onClick={() => show(`Started ${c} track!`, "info")} style={{ padding: "4px 10px", fontSize: 11 }}>Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityPage() {
  const [toast, show] = useToast();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    { author: "Rahul K.", time: "1h ago", content: "Can anyone explain the difference between useMemo and useCallback?", replies: 5, liked: false, likes: 8, color: T.blueLight },
    { author: "Sneha P.", time: "3h ago", content: "Just cracked my TCS interview! Aptitude section was tough. Practice previous year papers.", replies: 12, liked: false, likes: 24, color: T.green },
    { author: "Trainer - Priya Sharma", time: "Yesterday", content: "📢 Reminder: React Hooks assignment due tomorrow 11:59 PM.", replies: 8, liked: false, likes: 15, color: T.yellow },
  ]);
  const handlePost = () => {
    if (!postText.trim()) { show("Write something first!", "error"); return; }
    setPosts(p => [{ author: "Aryan Mehta (You)", time: "Just now", content: postText, replies: 0, liked: false, likes: 0, color: T.purple }, ...p]);
    setPostText("");
    show("Post published!", "success");
  };
  const handleLike = (i) => {
    setPosts(p => p.map((post, idx) => idx === i ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post));
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>Community</SectionTitle>
        <div style={{ ...card, marginBottom: 14 }}>
          <textarea value={postText} onChange={e => setPostText(e.target.value)} placeholder="Ask a question or share something..." rows={3} style={{ width: "100%", background: "none", border: "none", outline: "none", color: T.text, fontSize: 13, resize: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button className="btn-primary" onClick={handlePost} style={{ padding: "8px 20px", fontSize: 13 }}>
              <Send size={12} style={{ marginRight: 5, verticalAlign: "middle" }} />Post
            </button>
          </div>
        </div>
        {posts.map((p, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 12, borderLeft: `3px solid ${p.color}`, animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{p.author}</span>
              <span style={{ fontSize: 12, color: T.textDim }}>{p.time}</span>
            </div>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 12, lineHeight: 1.5 }}>{p.content}</div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => handleLike(i)} style={{ fontSize: 12, color: p.liked ? T.red : T.textMuted, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}>
                <ThumbsUp size={13} fill={p.liked ? T.red : "none"} color={p.liked ? T.red : T.textMuted} /> {p.likes}
              </button>
              <button style={{ fontSize: 12, color: T.blueLight, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <MessageSquare size={13} /> {p.replies} replies
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Community Hub</div>
          <OrbitalScene />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>42 Active Members</div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Online now</div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>Top Contributors</div>
          {[{ name: "Sneha P.", pts: 340, rank: 1 }, { name: "Aryan M.", pts: 280, rank: 2 }, { name: "Rahul K.", pts: 210, rank: 3 }].map((u, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px", background: i === 1 ? "rgba(96,165,250,0.08)" : "transparent", borderRadius: 8, border: i === 1 ? "1px solid rgba(96,165,250,0.15)" : "none" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: [T.yellow, T.blueLight, T.textMuted][i] + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: [T.yellow, T.blueLight, T.textMuted][i] }}>{u.rank}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: T.text }}>{u.name}</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{u.pts} pts</div>
              </div>
              {i === 0 && <Star size={14} color={T.yellow} fill={T.yellow} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TicketsPage() {
  const [toast, show] = useToast();
  const [tickets, setTickets] = useState([
    { id: "TKT-001", type: "Technical Issue", subject: "Cannot access recorded class", status: "In Progress", date: "Jun 1, 2026" },
    { id: "TKT-002", type: "Certificate Issue", subject: "Certificate not generated for Module 1", status: "Resolved", date: "May 28, 2026" },
  ]);
  const [type, setType] = useState("Technical Issue");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const statusColor = { Open: T.yellow, "In Progress": T.blueLight, Resolved: T.green, Closed: T.textMuted };
  const submitTicket = () => {
    if (!subject.trim()) { show("Please enter a subject", "error"); return; }
    setTickets(t => [{ id: `TKT-00${t.length + 1}`, type, subject, status: "Open", date: "Jun 3, 2026" }, ...t]);
    show("Ticket raised! We will respond within 24h", "success");
    setSubject(""); setDetails("");
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 16 }}>
      <Toast toast={toast} />
      <div>
        <SectionTitle>My Tickets</SectionTitle>
        {tickets.map((t, i) => (
          <div key={i} className="card3d" style={{ ...card, marginBottom: 12, animation: `fadeInUp 0.4s ease ${i * 0.1}s both`, borderLeft: `3px solid ${statusColor[t.status]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>{t.subject}</div>
                <div style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>{t.id} · {t.type} · {t.date}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <Tag color={statusColor[t.status]}>{t.status}</Tag>
                {t.status !== "Resolved" && t.status !== "Closed" && (
                  <button className="btn-ghost" onClick={() => { setTickets(p => p.map((tk, idx) => idx === i ? { ...tk, status: "Resolved" } : tk)); show("Ticket marked resolved", "success"); }} style={{ padding: "3px 10px", fontSize: 11 }}>Mark Resolved</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Support Status</div>
          <HexSpinner />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            {[{ l: "Open", c: T.yellow, v: tickets.filter(t => t.status === "Open").length },
              { l: "In Progress", c: T.blueLight, v: tickets.filter(t => t.status === "In Progress").length },
              { l: "Resolved", c: T.green, v: tickets.filter(t => t.status === "Resolved").length },
              { l: "Total", c: T.purple, v: tickets.length }].map((s, i) => (
              <div key={i} style={{ background: `${s.c}18`, borderRadius: 8, padding: 8, border: `1px solid ${s.c}33`, textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 10, color: T.textMuted }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <SectionTitle>Raise a Ticket</SectionTitle>
          <div style={{ marginBottom: 10 }}>
            <Label>Type</Label>
            <select className="input-field" value={type} onChange={e => setType(e.target.value)} style={{ width: "100%", padding: "9px 12px" }}>
              {["Technical Issue", "Course Issue", "Certificate Issue", "Assessment Issue", "Account Access", "Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Label>Subject</Label>
            <input className="input-field" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief description..." style={{ width: "100%", padding: "9px 12px" }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <Label>Details</Label>
            <textarea className="input-field" value={details} onChange={e => setDetails(e.target.value)} placeholder="Describe your issue..." rows={3} style={{ width: "100%", padding: "9px 12px", resize: "none" }} />
          </div>
          <button className="btn-primary" onClick={submitTicket} style={{ width: "100%", padding: "10px 0", fontSize: 13 }}>
            <Send size={13} style={{ marginRight: 6, verticalAlign: "middle" }} />Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [toast, show] = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("aryan.mehta@email.com");
  const [skills, setSkills] = useState(["React", "JavaScript", "Node.js", "HTML/CSS", "Python", "Git"]);
  const [newSkill, setNewSkill] = useState("");
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills(s => [...s, newSkill.trim()]);
    setNewSkill("");
    show(`Added skill: ${newSkill}`, "success");
  };
  const removeSkill = (i) => setSkills(s => s.filter((_, idx) => idx !== i));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 16 }}>
      <Toast toast={toast} />
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInUp 0.4s ease both" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: "'Syne',sans-serif", animation: "pulseGlow 3s ease-in-out infinite" }}>
            {name.split(" ").map(n => n[0]).join("")}
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>{name}</div>
          <div style={{ color: T.textMuted, fontSize: 12, marginTop: 4 }}>{student.id}</div>
          <div style={{ marginTop: 8 }}><Tag color={T.blueLight}>{student.batch}</Tag></div>
          <button className={editing ? "btn-green" : "btn-ghost"} onClick={() => { setEditing(!editing); if (editing) show("Profile saved!", "success"); }} style={{ marginTop: 14, width: "100%", padding: "8px 0", fontSize: 12 }}>
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
        <div style={{ ...card, animation: "fadeInUp 0.4s ease 0.1s both" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            {[["Full Name", name, setName], ["Phone", phone, setPhone], ["Email", email, setEmail], ["Course", student.course, null], ["Batch", student.batch, null], ["Student ID", student.id, null]].map(([label, val, setter], i) => (
              <div key={label}>
                <Label>{label}</Label>
                {editing && setter
                  ? <input className="input-field" value={val} onChange={e => setter(e.target.value)} style={{ width: "100%", padding: "7px 10px" }} />
                  : <div style={{ fontSize: 13, color: T.text }}>{val}</div>
                }
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(96,165,250,0.1)", paddingTop: 14 }}>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 10 }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: editing ? 10 : 0 }}>
              {skills.map((sk, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: T.blueLight + "22", color: T.blueLight, border: `1px solid ${T.blueLight}44` }}>
                  {sk}
                  {editing && <button onClick={() => removeSkill(i)} style={{ background: "none", border: "none", color: T.red, cursor: "pointer", padding: 0, lineHeight: 1 }}><X size={10} /></button>}
                </span>
              ))}
            </div>
            {editing && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input className="input-field" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()} placeholder="Add skill..." style={{ flex: 1, padding: "7px 10px" }} />
                <button className="btn-primary" onClick={addSkill} style={{ padding: "7px 14px", fontSize: 12 }}><Plus size={13} /></button>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn-ghost" onClick={() => show("Opening LinkedIn...", "info")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 12 }}>
              <Linkedin size={14} /> LinkedIn
            </button>
            <button className="btn-ghost" onClick={() => show("Opening GitHub...", "info")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 12 }}>
              <GitBranch size={14} /> GitHub
            </button>
            <button className="btn-primary" onClick={() => show("Resume upload opened!", "info")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 12 }}>
              <Upload size={14} /> Resume
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...card, textAlign: "center", animation: "fadeInLeft 0.5s ease both" }}>
          <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Profile Strength</div>
          <FloatingCube color={T.purple} />
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: T.purple, textShadow: "0 0 15px rgba(167,139,250,0.5)" }}>78%</div>
          <div style={{ fontSize: 12, color: T.textMuted }}>Profile complete</div>
          <div style={{ marginTop: 8 }}><ProgressBar value={78} color={T.purple} animated /></div>
        </div>
        <div style={{ ...card, animation: "fadeInLeft 0.5s ease 0.1s both" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10 }}>To Complete Profile</div>
          {[{ t: "Add profile photo", done: false }, { t: "Link GitHub", done: true }, { t: "Upload Resume", done: false }, { t: "Add 5+ Skills", done: skills.length >= 5 }].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: item.done ? T.green + "22" : "rgba(96,165,250,0.1)", border: `2px solid ${item.done ? T.green : "rgba(96,165,250,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.done && <CheckCircle size={10} color={T.green} />}
              </div>
              <span style={{ fontSize: 12, color: item.done ? T.textMuted : T.text, textDecoration: item.done ? "line-through" : "none" }}>{item.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <div style={{ width: collapsed ? 60 : 230, minHeight: "100vh", background: "#040D24", borderRight: "1px solid rgba(96,165,250,0.1)", display: "flex", flexDirection: "column", transition: "width 0.25s ease", flexShrink: 0 }}>
      <div style={{ padding: collapsed ? "16px 0" : "16px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", borderBottom: "1px solid rgba(96,165,250,0.08)", gap: 8 }}>
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseGlow 3s ease-in-out infinite" }}>
              <Zap size={14} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#F0F6FF", fontSize: 15 }}>ElevateIQ</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 4 }}>
          <Menu size={16} />
        </button>
      </div>
      <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} className="nav-btn" onClick={() => setActive(item.id)} title={collapsed ? item.label : ""}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: collapsed ? "10px 0" : "9px 16px", justifyContent: collapsed ? "center" : "flex-start", background: isActive ? "rgba(37,99,235,0.2)" : "none", border: "none", borderLeft: isActive ? `3px solid ${T.blue}` : "3px solid transparent", color: isActive ? T.blueLight : T.textMuted, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}>
              <item.icon size={16} />
              {!collapsed && <span style={{ fontWeight: isActive ? 500 : 400 }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      {!collapsed && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(96,165,250,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>AM</div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{student.name}</div>
            <div style={{ fontSize: 11, color: T.textDim }}>Student</div>
          </div>
        </div>
      )}
    </div>
  );
}

const PAGES = {
  dashboard: DashboardPage, courses: CoursesPage, live: LiveClassesPage, recorded: RecordedClassesPage,
  tests: TestsPage, assignments: AssignmentsPage, projects: ProjectsPage, performance: PerformancePage,
  ai: AIAssistantPage, placement: PlacementPage, certificates: CertificatesPage,
  community: CommunityPage, tickets: TicketsPage, profile: ProfilePage,
};

export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitials = (user.name || "S").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const PageComponent = PAGES[activePage] || DashboardPage;
  const pageTitle = navItems.find(n => n.id === activePage)?.label || "Dashboard";
  return (
    <>
      <style>{G}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'DM Sans',sans-serif", color: T.text }}>
        <Sidebar active={activePage} setActive={setActivePage} collapsed={collapsed} setCollapsed={setCollapsed} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 56, background: "rgba(4,13,36,0.92)", borderBottom: "1px solid rgba(96,165,250,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, backdropFilter: "blur(10px)" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: T.text }}>{pageTitle}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <Bell size={18} color={T.textMuted} />
                <div style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, background: T.red, borderRadius: "50%", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, animation: "pulseGlowP 2s ease-in-out infinite" }}>3</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", animation: "pulseGlow 4s ease-in-out infinite" }}>{userInitials}</div>
              <button onClick={handleLogout} style={{ background:"#7f1d1d22", color:"#f87171", border:"1px solid #ef444433", borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                <LogOut size={12}/>Sign Out
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px" }}>
            <PageComponent setPage={setActivePage} />
          </div>
        </div>
      </div>
    </>
  );
}