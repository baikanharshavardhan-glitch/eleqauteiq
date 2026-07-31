import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Video, BookOpen, ClipboardList,
  BarChart2, Calendar, FolderOpen, Bot, Ticket, User,
  Bell, Send, Menu, Upload, Search, CheckCircle, Plus,
  Play, Download, Edit, Trash2, Star, Award, TrendingUp,
  Clock, ChevronRight, X, Check, AlertCircle, Zap,
  MessageSquare, Eye, FileText, Settings, LogOut,
  PieChart, Activity, Target, Monitor, Palmtree
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PieChart as RPieChart,
  Pie, Cell
} from "recharts";

// ─── CANVAS ANIMATIONS ───────────────────────────────────────────────────────

function OrbitalScene({ color = "#22d3ee" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    const W = canvas.width = 320, H = canvas.height = 320;
    const cx = W / 2, cy = H / 2;
    const particles = Array.from({ length: 40 }, (_, i) => ({
      angle: (i / 40) * Math.PI * 2, r: 60 + Math.random() * 60,
      speed: 0.003 + Math.random() * 0.005, size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.7,
    }));
    function draw() {
      ctx.clearRect(0, 0, W, H);
      [80, 110, 140].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.35, t * 0.3 + i * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = color + "55"; ctx.lineWidth = 1; ctx.stroke();
      });
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.r;
        const py = cy + Math.sin(p.angle) * p.r * 0.35 * (1 + 0.3 * Math.sin(t));
        ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      grad.addColorStop(0, color + "cc"); grad.addColorStop(1, color + "00");
      ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      t += 0.01; frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function FloatingCube({ color = "#f59e0b" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    const W = canvas.width = 320, H = canvas.height = 320;
    const cx = W / 2, cy = H / 2;
    function project([x, y, z]) { const fov = 300, sc = fov / (fov + z); return [cx + x * sc, cy + y * sc]; }
    function rotateY(pts, a) { return pts.map(([x, y, z]) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)]); }
    function rotateX(pts, a) { return pts.map(([x, y, z]) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)]); }
    const base = [[-60,-60,-60],[60,-60,-60],[60,60,-60],[-60,60,-60],[-60,-60,60],[60,-60,60],[60,60,60],[-60,60,60]];
    const faces = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
    function draw() {
      ctx.clearRect(0, 0, W, H);
      let pts = rotateY(rotateX(base, t * 0.7), t);
      const fl = Math.sin(t * 1.5) * 15;
      pts = pts.map(([x, y, z]) => [x, y + fl, z]);
      faces.forEach((face, i) => {
        const proj = face.map(idx => project(pts[idx]));
        ctx.beginPath(); ctx.moveTo(...proj[0]); proj.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath();
        const alpha = (0.15 + i * 0.05);
        ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, "0"); ctx.fill();
        ctx.strokeStyle = color + "99"; ctx.lineWidth = 1.5; ctx.stroke();
      });
      t += 0.012; frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function HexSpinner({ color = "#a78bfa" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    const W = canvas.width = 320, H = canvas.height = 320;
    const cx = W / 2, cy = H / 2;
    function hex(x, y, r, rot) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + rot;
        i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
                : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      [100, 75, 50, 25].forEach((r, i) => {
        hex(cx, cy, r, t * (i % 2 === 0 ? 1 : -1) * 0.5);
        ctx.strokeStyle = color + ["ff","bb","77","44"][i]; ctx.lineWidth = 2; ctx.stroke();
        if (i === 0) { ctx.fillStyle = color + "11"; ctx.fill(); }
      });
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t;
        ctx.beginPath(); ctx.arc(cx + 100 * Math.cos(a), cy + 100 * Math.sin(a), 4, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      }
      t += 0.015; frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function TrophyScene() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    const W = canvas.width = 320, H = canvas.height = 320;
    const cx = W / 2, cy = H / 2;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const bob = Math.sin(t * 1.2) * 8;
      const g = ctx.createRadialGradient(cx, cy + bob, 10, cx, cy + bob, 70);
      g.addColorStop(0, "#fbbf2444"); g.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(cx, cy + bob, 70, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - 35, cy - 40 + bob);
      ctx.quadraticCurveTo(cx - 55, cy - 10 + bob, cx - 30, cy + 10 + bob);
      ctx.lineTo(cx - 15, cy + 20 + bob); ctx.lineTo(cx + 15, cy + 20 + bob);
      ctx.lineTo(cx + 30, cy + 10 + bob);
      ctx.quadraticCurveTo(cx + 55, cy - 10 + bob, cx + 35, cy - 40 + bob);
      ctx.closePath(); ctx.fillStyle = "#fbbf24cc"; ctx.fill();
      ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.rect(cx - 8, cy + 20 + bob, 16, 20); ctx.fillStyle = "#f59e0b"; ctx.fill();
      ctx.beginPath(); ctx.rect(cx - 25, cy + 40 + bob, 50, 8); ctx.fillStyle = "#f59e0b"; ctx.fill();
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 + t;
        ctx.beginPath(); ctx.arc(cx + 80 * Math.cos(a), cy + bob * 0.3 + 80 * Math.sin(a) * 0.5, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fbbf24"; ctx.fill();
      }
      t += 0.02; frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

// ─── TOAST ───────────────────────────────────────────────────────────────────

function Toast({ toasts, remove }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type==="error"?"#7f1d1d":t.type==="warn"?"#78350f":"#052e16",
          border:`1px solid ${t.type==="error"?"#ef4444":t.type==="warn"?"#f59e0b":"#22c55e"}`,
          color:"#f1f5f9", padding:"12px 18px", borderRadius:10, fontSize:13,
          display:"flex", alignItems:"center", gap:10, minWidth:260,
          boxShadow:"0 8px 32px #0008"
        }}>
          {t.type==="error"||t.type==="warn"?<AlertCircle size={16} color={t.type==="warn"?"#f59e0b":"#ef4444"}/>:<CheckCircle size={16} color="#22c55e"/>}
          {t.msg}
          <X size={14} style={{ marginLeft:"auto", cursor:"pointer", opacity:0.6 }} onClick={() => remove(t.id)}/>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = (msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const remove = id => setToasts(p => p.filter(t => t.id !== id));
  return { toasts, add, remove };
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState("rohan@elevateiq.com");
  const [password, setPassword] = useState("trainer123");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (email !== "rohan@elevateiq.com" || password !== "trainer123") {
      setError("Invalid credentials. Use rohan@elevateiq.com / trainer123"); return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  };

  const inp = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#e2e8f0", padding:"12px 14px", fontSize:14, boxSizing:"border-box", outline:"none" };

  return (
    <div style={{ minHeight:"100vh", background:"#020917", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',system-ui,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');*{box-sizing:border-box;}`}</style>
      <div style={{ position:"fixed", inset:0, background:"radial-gradient(ellipse at 30% 40%,#1d4ed811,transparent 60%),radial-gradient(ellipse at 70% 70%,#7c3aed0a,transparent 50%)", pointerEvents:"none" }}/>
      <div style={{ width:"100%", maxWidth:420, padding:24, position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:60, height:60, background:"linear-gradient(135deg,#1d4ed8,#0891b2)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:800, color:"#fff", margin:"0 auto 16px" }}>T</div>
          <div style={{ color:"#f1f5f9", fontSize:26, fontWeight:700, marginBottom:4 }}>ElevateIQ</div>
          <div style={{ color:"#64748b", fontSize:14 }}>Trainer Portal — Sign In</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:20, padding:32 }}>
          {error && (
            <div style={{ background:"#7f1d1d33", border:"1px solid #ef4444", borderRadius:8, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
              <AlertCircle size={14} color="#ef4444"/>
              <span style={{ color:"#f87171", fontSize:13 }}>{error}</span>
            </div>
          )}
          <div style={{ marginBottom:16 }}>
            <label style={{ color:"#64748b", fontSize:12, display:"block", marginBottom:6 }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} onKeyDown={e => e.key==="Enter"&&handleLogin()}/>
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={{ color:"#64748b", fontSize:12, display:"block", marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inp} onKeyDown={e => e.key==="Enter"&&handleLogin()}/>
          </div>
          <button onClick={handleLogin} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:13, fontSize:14, fontWeight:700, cursor:loading?"wait":"pointer", opacity:loading?0.7:1 }}>
            {loading ? "Signing in…" : "Sign In to Dashboard →"}
          </button>
          <div style={{ marginTop:20, padding:"12px 14px", background:"#1e293b", borderRadius:10 }}>
            <div style={{ color:"#64748b", fontSize:11, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>Demo credentials</div>
            <div style={{ color:"#94a3b8", fontSize:12, marginBottom:2 }}>Email: rohan@elevateiq.com</div>
            <div style={{ color:"#94a3b8", fontSize:12 }}>Password: trainer123</div>
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:20, color:"#475569", fontSize:12 }}>ElevateIQ · Trainer Portal v2.0</div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

const NAV = [
  { id:"dashboard",   label:"Dashboard",          icon:LayoutDashboard },
  { id:"batches",     label:"My Batches",          icon:Users },
  { id:"schedule",    label:"Schedule Classes",    icon:Calendar },
  { id:"assignments", label:"Assignments",         icon:ClipboardList },
  { id:"tests",       label:"Tests & Assessments", icon:FileText },
  { id:"performance", label:"Student Performance", icon:BarChart2 },
  { id:"attendance",  label:"Attendance",          icon:CheckCircle },
  { id:"resources",   label:"Resources",           icon:FolderOpen },
  { id:"leave",       label:"Leave Application",   icon:Palmtree },
  { id:"ai",          label:"AI Assistant",        icon:Bot },
  { id:"tickets",     label:"Tickets",             icon:Ticket },
  { id:"profile",     label:"Profile",             icon:User },
];

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────

function DashboardPage({ toast }) {
  const stats = [
    { label:"Total Students",      value:148,   icon:Users,           color:"#22d3ee", delta:"+12" },
    { label:"Active Batches",      value:6,     icon:LayoutDashboard, color:"#a78bfa", delta:"+1"  },
    { label:"Sessions This Month", value:34,    icon:Video,           color:"#f59e0b", delta:"+5"  },
    { label:"Avg. Completion",     value:"78%", icon:TrendingUp,      color:"#22c55e", delta:"+3%" },
  ];
  const progressData = [
    { name:"Batch A", completed:85, pending:15 }, { name:"Batch B", completed:62, pending:38 },
    { name:"Batch C", completed:91, pending:9  }, { name:"Batch D", completed:45, pending:55 },
    { name:"Batch E", completed:73, pending:27 },
  ];
  const upcoming = [
    { batch:"Batch A", topic:"React Hooks Deep Dive",  time:"Today 3:00 PM",     type:"Live"     },
    { batch:"Batch C", topic:"Node.js Authentication", time:"Tomorrow 10:00 AM", type:"Live"     },
    { batch:"Batch B", topic:"MongoDB Aggregation",    time:"Jun 5 2:00 PM",     type:"Recorded" },
  ];
  const feedback = [
    { student:"Aryan K.", msg:"Great explanation on async/await!", rating:5 },
    { student:"Priya M.", msg:"Could elaborate more on closures.",  rating:4 },
    { student:"Rahul S.", msg:"Best batch I've attended!",          rating:5 },
  ];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ background:"linear-gradient(135deg,#0f2a4a,#0a1628)", border:"1px solid #1e40af44", borderRadius:16, padding:"24px 28px", marginBottom:24, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:0, top:0, width:200, height:"100%", background:"radial-gradient(ellipse at right,#1e40af22,transparent)", pointerEvents:"none" }}/>
          <div style={{ fontSize:22, fontWeight:700, color:"#f1f5f9", marginBottom:6 }}>Welcome back, Trainer Rohan 👋</div>
          <div style={{ color:"#94a3b8", fontSize:14 }}>You have 3 classes scheduled today. Keep inspiring!</div>
          <div style={{ marginTop:16, display:"flex", gap:12 }}>
            <button onClick={() => toast("Session started!")} style={{ background:"#1d4ed8", color:"#fff", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Start Session</button>
            <button onClick={() => toast("Schedule opened")} style={{ background:"transparent", color:"#60a5fa", border:"1px solid #1e40af", borderRadius:8, padding:"8px 18px", fontSize:13, cursor:"pointer" }}>View Schedule</button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:"#0f172a", border:`1px solid ${s.color}33`, borderRadius:14, padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ color:"#64748b", fontSize:12, marginBottom:6 }}>{s.label}</div>
                  <div style={{ color:"#f1f5f9", fontSize:26, fontWeight:700 }}>{s.value}</div>
                </div>
                <div style={{ background:s.color+"22", padding:10, borderRadius:10 }}><s.icon size={20} color={s.color}/></div>
              </div>
              <div style={{ color:"#22c55e", fontSize:12, marginTop:8 }}>{s.delta} this month</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20, marginBottom:24 }}>
          <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16 }}>Batch Completion Overview</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
              <XAxis dataKey="name" stroke="#475569" tick={{ fontSize:12 }}/>
              <YAxis stroke="#475569" tick={{ fontSize:12 }}/>
              <Tooltip contentStyle={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:8 }}/>
              <Bar dataKey="completed" fill="#22d3ee" radius={[4,4,0,0]}/>
              <Bar dataKey="pending"   fill="#1e40af" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Upcoming Sessions</div>
            {upcoming.map((u, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14, paddingBottom:14, borderBottom:i<upcoming.length-1?"1px solid #1e293b":"none" }}>
                <div style={{ background:"#1e40af22", padding:8, borderRadius:8, marginTop:2 }}><Video size={14} color="#60a5fa"/></div>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{u.topic}</div>
                  <div style={{ color:"#64748b", fontSize:12 }}>{u.batch} · {u.time}</div>
                </div>
                <span style={{ background:u.type==="Live"?"#dc262622":"#16a34a22", color:u.type==="Live"?"#f87171":"#4ade80", fontSize:11, padding:"2px 8px", borderRadius:6 }}>{u.type}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Student Feedback</div>
            {feedback.map((f, i) => (
              <div key={i} style={{ marginBottom:14, paddingBottom:14, borderBottom:i<feedback.length-1?"1px solid #1e293b":"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{f.student}</span>
                  <span style={{ color:"#fbbf24", fontSize:12 }}>{"★".repeat(f.rating)}</span>
                </div>
                <div style={{ color:"#94a3b8", fontSize:12 }}>{f.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #0891b233", borderRadius:16, padding:20, marginBottom:16, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Session Orbit</div>
          <OrbitalScene color="#22d3ee"/>
          <div style={{ color:"#22d3ee", fontSize:13, fontWeight:700, marginTop:8 }}>6 Active Batches</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>Quick Actions</div>
          {["New Session","Upload Resource","Create Test","View Reports"].map(a => (
            <button key={a} onClick={() => toast(`${a} — opened!`)} style={{ width:"100%", background:"#1e293b", color:"#cbd5e1", border:"none", borderRadius:8, padding:"8px 12px", fontSize:12, cursor:"pointer", marginBottom:8, textAlign:"left" }}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BATCHES PAGE ─────────────────────────────────────────────────────────────

function BatchesPage({ toast }) {
  const [batches] = useState([
    { id:1, name:"Batch A", course:"Full Stack Web Dev",  students:28, progress:85, status:"Active",   start:"Jan 2025" },
    { id:2, name:"Batch B", course:"React + Node.js",     students:22, progress:62, status:"Active",   start:"Feb 2025" },
    { id:3, name:"Batch C", course:"Python & ML",         students:31, progress:91, status:"Active",   start:"Dec 2024" },
    { id:4, name:"Batch D", course:"DevOps Foundations",  students:18, progress:45, status:"Active",   start:"Mar 2025" },
    { id:5, name:"Batch E", course:"Data Analytics",      students:24, progress:73, status:"Active",   start:"Feb 2025" },
    { id:6, name:"Batch F", course:"Java Backend",        students:25, progress:30, status:"Upcoming", start:"Jun 2025" },
  ]);
  const [selected, setSelected] = useState(null);
  const students = ["Aryan K.","Priya M.","Rahul S.","Neha T.","Kiran J.","Divya P.","Arun V.","Sanya B.","Rohan C.","Meera L."];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700 }}>My Batches</div>
          <button onClick={() => toast("New batch form opened")} style={{ background:"#1d4ed8", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}><Plus size={14}/> New Batch</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
          {batches.map(b => (
            <div key={b.id} style={{ background:"#0f172a", border:`1px solid ${selected?.id===b.id?"#22d3ee55":"#1e293b"}`, borderRadius:14, padding:20, cursor:"pointer" }} onClick={() => setSelected(b)}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <div>
                  <div style={{ color:"#e2e8f0", fontWeight:700, fontSize:15 }}>{b.name}</div>
                  <div style={{ color:"#64748b", fontSize:12, marginTop:2 }}>{b.course}</div>
                </div>
                <span style={{ background:b.status==="Active"?"#16a34a22":"#1e40af22", color:b.status==="Active"?"#4ade80":"#60a5fa", fontSize:11, padding:"2px 10px", borderRadius:20, height:"fit-content" }}>{b.status}</span>
              </div>
              <div style={{ display:"flex", gap:20, marginBottom:12 }}>
                <div style={{ color:"#94a3b8", fontSize:12 }}><Users size={12} style={{ display:"inline", marginRight:4 }}/>{b.students} students</div>
                <div style={{ color:"#94a3b8", fontSize:12 }}><Calendar size={12} style={{ display:"inline", marginRight:4 }}/>{b.start}</div>
              </div>
              <div style={{ background:"#1e293b", borderRadius:999, height:6, marginBottom:6 }}>
                <div style={{ width:`${b.progress}%`, background:"linear-gradient(90deg,#22d3ee,#1d4ed8)", borderRadius:999, height:"100%" }}/>
              </div>
              <div style={{ color:"#94a3b8", fontSize:12, textAlign:"right" }}>{b.progress}% complete</div>
              <div style={{ display:"flex", gap:8, marginTop:12 }}>
                <button onClick={e => { e.stopPropagation(); toast(`${b.name} details opened`); }} style={{ flex:1, background:"#1e293b", color:"#cbd5e1", border:"none", borderRadius:8, padding:"7px 0", fontSize:12, cursor:"pointer" }}>View</button>
                <button onClick={e => { e.stopPropagation(); toast(`${b.name} session started!`); }} style={{ flex:1, background:"#1d4ed8", color:"#fff", border:"none", borderRadius:8, padding:"7px 0", fontSize:12, cursor:"pointer" }}>Start Class</button>
              </div>
            </div>
          ))}
        </div>
        {selected && (
          <div style={{ background:"#0f172a", border:"1px solid #22d3ee44", borderRadius:14, padding:20, marginTop:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ color:"#e2e8f0", fontWeight:700 }}>{selected.name} — Students</div>
              <X size={16} style={{ cursor:"pointer", color:"#64748b" }} onClick={() => setSelected(null)}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
              {students.map((s, i) => (
                <div key={i} style={{ background:"#1e293b", borderRadius:8, padding:"8px 10px", color:"#cbd5e1", fontSize:12, textAlign:"center" }}>
                  <div style={{ width:30, height:30, background:"#22d3ee22", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 6px", color:"#22d3ee", fontSize:13, fontWeight:700 }}>{s[0]}</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #a78bfa33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Batch Cube</div>
          <FloatingCube color="#a78bfa"/>
          <div style={{ color:"#a78bfa", fontSize:13, fontWeight:700, marginTop:8 }}>148 Total Students</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>Summary</div>
          {[["Active Batches","5"],["Avg Progress","72%"],["Top Batch","Batch C"],["Next Ending","Jun 2025"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SCHEDULE PAGE ────────────────────────────────────────────────────────────

function SchedulePage({ toast }) {
  const [form, setForm] = useState({ batch:"", topic:"", date:"", time:"", type:"Live", duration:"60", link:"" });
  const [classes, setClasses] = useState([
    { batch:"Batch A", topic:"React Hooks",  date:"2025-06-03", time:"15:00", type:"Live",     duration:"90" },
    { batch:"Batch C", topic:"Node Auth",    date:"2025-06-04", time:"10:00", type:"Live",     duration:"60" },
    { batch:"Batch B", topic:"MongoDB",      date:"2025-06-05", time:"14:00", type:"Recorded", duration:"45" },
  ]);
  const schedule = () => {
    if (!form.batch || !form.topic || !form.date) { toast("Fill all required fields","warn"); return; }
    setClasses(p => [form, ...p]);
    setForm({ batch:"", topic:"", date:"", time:"", type:"Live", duration:"60", link:"" });
    toast("Class scheduled successfully!");
  };
  const selStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" };
  const inpStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" };
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Schedule Classes</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}><Plus size={16} color="#22d3ee"/> New Session</div>
            {[
              { label:"Batch*", key:"batch", type:"select", opts:["Batch A","Batch B","Batch C","Batch D","Batch E"] },
              { label:"Topic*", key:"topic",    type:"text"   },
              { label:"Date*",  key:"date",     type:"date"   },
              { label:"Time",   key:"time",     type:"time"   },
              { label:"Duration (min)", key:"duration", type:"number" },
              { label:"Meet Link",      key:"link",     type:"text"   },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:12 }}>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>{f.label}</div>
                {f.type==="select" ? (
                  <select value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))} style={selStyle}>
                    <option value="">Select...</option>
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))} style={inpStyle}/>
                )}
              </div>
            ))}
            <div style={{ marginBottom:12 }}>
              <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Type</div>
              <div style={{ display:"flex", gap:8 }}>
                {["Live","Recorded"].map(t => (
                  <button key={t} onClick={() => setForm(p => ({ ...p, type:t }))}
                    style={{ flex:1, padding:8, background:form.type===t?"#1d4ed8":"#1e293b", color:form.type===t?"#fff":"#94a3b8", border:"none", borderRadius:8, fontSize:13, cursor:"pointer" }}>{t}</button>
                ))}
              </div>
            </div>
            <button onClick={schedule} style={{ width:"100%", background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:"10px 0", fontSize:14, fontWeight:600, cursor:"pointer", marginTop:4 }}>Schedule Session</button>
          </div>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16 }}>Upcoming Sessions</div>
            {classes.map((c, i) => (
              <div key={i} style={{ background:"#1e293b", borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{c.topic}</span>
                  <span style={{ background:c.type==="Live"?"#dc262622":"#16a34a22", color:c.type==="Live"?"#f87171":"#4ade80", fontSize:11, padding:"2px 8px", borderRadius:6 }}>{c.type}</span>
                </div>
                <div style={{ color:"#64748b", fontSize:12 }}>{c.batch} · {c.date} {c.time} · {c.duration}min</div>
                <div style={{ display:"flex", gap:8, marginTop:8 }}>
                  <button onClick={() => toast("Reminder set!")} style={{ flex:1, background:"#0f172a", color:"#94a3b8", border:"none", borderRadius:6, padding:"5px 0", fontSize:11, cursor:"pointer" }}>Set Reminder</button>
                  <button onClick={() => { setClasses(p => p.filter((_,j) => j!==i)); toast("Session removed"); }} style={{ flex:1, background:"#7f1d1d22", color:"#f87171", border:"none", borderRadius:6, padding:"5px 0", fontSize:11, cursor:"pointer" }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #f59e0b33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Schedule Orbit</div>
          <OrbitalScene color="#f59e0b"/>
          <div style={{ color:"#f59e0b", fontSize:13, fontWeight:700, marginTop:8 }}>3 Sessions Today</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>This Week</div>
          {[["Mon","2 sessions"],["Tue","1 session"],["Wed","3 sessions"],["Thu","2 sessions"],["Fri","1 session"]].map(([d,v]) => (
            <div key={d} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{d}</span>
              <span style={{ color:"#e2e8f0", fontSize:12 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ASSIGNMENTS PAGE ─────────────────────────────────────────────────────────

function AssignmentsPage({ toast }) {
  const [tab, setTab] = useState("create");
  const [form, setForm] = useState({ title:"", batch:"", due:"", desc:"", points:"" });
  const [assignments, setAssignments] = useState([
    { title:"React Component Library", batch:"Batch A", due:"2025-06-07", submissions:22, total:28, status:"Active" },
    { title:"REST API Design",          batch:"Batch B", due:"2025-06-05", submissions:18, total:22, status:"Active" },
    { title:"ML Model Evaluation",      batch:"Batch C", due:"2025-05-30", submissions:31, total:31, status:"Closed" },
  ]);
  const [reviews, setReviews] = useState([
    { student:"Aryan K.", assignment:"React Component Library", score:"", feedback:"" },
    { student:"Priya M.", assignment:"REST API Design",          score:"", feedback:"" },
    { student:"Rahul S.", assignment:"React Component Library",  score:"", feedback:"" },
  ]);
  const create = () => {
    if (!form.title || !form.batch) { toast("Fill required fields","warn"); return; }
    setAssignments(p => [{ ...form, submissions:0, total:25, status:"Active" }, ...p]);
    setForm({ title:"", batch:"", due:"", desc:"", points:"" });
    toast("Assignment created!");
  };
  const inpStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" };
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          {["create","review","list"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background:tab===t?"#1d4ed8":"#1e293b", color:tab===t?"#fff":"#94a3b8", border:"none", borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:tab===t?600:400, cursor:"pointer" }}>
              {t==="create"?"Create":t==="review"?"Review & Grade":"All Assignments"}
            </button>
          ))}
        </div>
        {tab==="create" && (
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20, maxWidth:500 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16 }}>Create Assignment</div>
            {[["Title*","title","text"],["Batch*","batch","text"],["Due Date","due","date"],["Points","points","number"],["Description","desc","text"]].map(([l,k,t]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>{l}</div>
                {k==="desc"
                  ? <textarea value={form[k]} onChange={e => setForm(p => ({ ...p, [k]:e.target.value }))} rows={3} style={{ ...inpStyle, resize:"vertical" }}/>
                  : <input type={t} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]:e.target.value }))} style={inpStyle}/>
                }
              </div>
            ))}
            <button onClick={create} style={{ background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer" }}>Publish Assignment</button>
          </div>
        )}
        {tab==="review" && reviews.map((r, i) => (
          <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:18, marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <div>
                <div style={{ color:"#e2e8f0", fontWeight:600 }}>{r.student}</div>
                <div style={{ color:"#64748b", fontSize:12 }}>{r.assignment}</div>
              </div>
              <button onClick={() => toast("Submission opened")} style={{ background:"#1e293b", color:"#60a5fa", border:"none", borderRadius:8, padding:"6px 14px", fontSize:12, cursor:"pointer" }}>View Submission</button>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <input placeholder="Score (0-100)" value={r.score} onChange={e => { const n=[...reviews]; n[i].score=e.target.value; setReviews(n); }} style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"7px 10px", fontSize:13, width:140, boxSizing:"border-box" }}/>
              <input placeholder="Feedback..." value={r.feedback} onChange={e => { const n=[...reviews]; n[i].feedback=e.target.value; setReviews(n); }} style={{ flex:1, background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"7px 10px", fontSize:13, boxSizing:"border-box" }}/>
              <button onClick={() => { if (!reviews[i].score){toast("Enter a score","warn");return;} toast(`Graded ${r.student}`); }} style={{ background:"#16a34a", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", fontSize:13, cursor:"pointer" }}>Submit</button>
            </div>
          </div>
        ))}
        {tab==="list" && assignments.map((a, i) => (
          <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:18, marginBottom:14, display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ flex:1 }}>
              <div style={{ color:"#e2e8f0", fontWeight:600 }}>{a.title}</div>
              <div style={{ color:"#64748b", fontSize:12, marginTop:2 }}>{a.batch} · Due: {a.due}</div>
              <div style={{ background:"#1e293b", borderRadius:999, height:5, marginTop:8, width:200 }}>
                <div style={{ width:`${(a.submissions/a.total)*100}%`, background:"#22d3ee", borderRadius:999, height:"100%" }}/>
              </div>
              <div style={{ color:"#94a3b8", fontSize:11, marginTop:4 }}>{a.submissions}/{a.total} submitted</div>
            </div>
            <span style={{ background:a.status==="Active"?"#16a34a22":"#1e293b", color:a.status==="Active"?"#4ade80":"#94a3b8", padding:"3px 10px", borderRadius:20, fontSize:12 }}>{a.status}</span>
            <button onClick={() => toast(`${a.title} details opened`)} style={{ background:"#1e293b", color:"#94a3b8", border:"none", borderRadius:8, padding:"6px 14px", fontSize:12, cursor:"pointer" }}>Manage</button>
          </div>
        ))}
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #f59e0b33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <TrophyScene/>
          <div style={{ color:"#fbbf24", fontSize:13, fontWeight:700, marginTop:8 }}>Grading Hub</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          {[["Total Assignments","12"],["Pending Reviews","8"],["Avg Score","76/100"],["Completed","4"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TESTS PAGE ───────────────────────────────────────────────────────────────

function TestsPage({ toast }) {
  const [form, setForm] = useState({ title:"", batch:"", date:"", duration:"", questions:"" });
  const tests = [
    { title:"React Fundamentals Quiz", batch:"Batch A", date:"2025-06-08", duration:"45min", avg:72,   status:"Upcoming"  },
    { title:"Node.js Mid-Term",        batch:"Batch B", date:"2025-05-28", duration:"60min", avg:68,   status:"Completed" },
    { title:"Python ML Test",          batch:"Batch C", date:"2025-06-10", duration:"90min", avg:null, status:"Upcoming"  },
  ];
  const inpStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" };
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Tests & Assessments</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16 }}>Create Test</div>
            {[["Test Title*","title","text"],["Batch*","batch","text"],["Date","date","date"],["Duration (min)","duration","number"],["No. of Questions","questions","number"]].map(([l,k,t]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>{l}</div>
                <input type={t} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]:e.target.value }))} style={inpStyle}/>
              </div>
            ))}
            <button onClick={() => { if(!form.title||!form.batch){toast("Fill required fields","warn");return;} setForm({title:"",batch:"",date:"",duration:"",questions:""}); toast("Test created!"); }}
              style={{ background:"linear-gradient(135deg,#7c3aed,#1d4ed8)", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", fontSize:14, fontWeight:600, cursor:"pointer", width:"100%" }}>Schedule Test</button>
          </div>
          <div>
            {tests.map((t, i) => (
              <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:18, marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div style={{ color:"#e2e8f0", fontWeight:600 }}>{t.title}</div>
                  <span style={{ background:t.status==="Upcoming"?"#1d4ed822":"#16a34a22", color:t.status==="Upcoming"?"#60a5fa":"#4ade80", fontSize:11, padding:"2px 8px", borderRadius:6 }}>{t.status}</span>
                </div>
                <div style={{ color:"#64748b", fontSize:12, marginBottom:8 }}>{t.batch} · {t.date} · {t.duration}</div>
                {t.avg && <div style={{ color:"#94a3b8", fontSize:12 }}>Avg Score: <span style={{ color:"#22d3ee", fontWeight:600 }}>{t.avg}%</span></div>}
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  <button onClick={() => toast("Test details opened")} style={{ flex:1, background:"#1e293b", color:"#94a3b8", border:"none", borderRadius:8, padding:"6px 0", fontSize:12, cursor:"pointer" }}>View</button>
                  {t.status==="Completed" && <button onClick={() => toast("Results downloaded")} style={{ flex:1, background:"#16a34a22", color:"#4ade80", border:"none", borderRadius:8, padding:"6px 0", fontSize:12, cursor:"pointer" }}>Results</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #a78bfa33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <HexSpinner color="#a78bfa"/>
          <div style={{ color:"#a78bfa", fontSize:13, fontWeight:700, marginTop:8 }}>Assessment Engine</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          {[["Upcoming Tests","3"],["Completed","8"],["Avg Score","71%"],["Highest","94%"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PERFORMANCE PAGE ─────────────────────────────────────────────────────────

function PerformancePage({ toast }) {
  const [selected, setSelected] = useState("Aryan K.");
  const students = ["Aryan K.","Priya M.","Rahul S.","Neha T.","Kiran J."];
  const lineData = [
    { week:"W1", score:65 },{ week:"W2", score:72 },{ week:"W3", score:68 },
    { week:"W4", score:80 },{ week:"W5", score:85 },{ week:"W6", score:78 },
  ];
  const radarData = [
    { subject:"Assignments", A:85 },{ subject:"Tests", A:72 },{ subject:"Projects", A:90 },
    { subject:"Attendance", A:95 },{ subject:"Participation", A:70 },
  ];
  const batchPerf = [
    { batch:"Batch A", avg:78 },{ batch:"Batch B", avg:65 },{ batch:"Batch C", avg:88 },
    { batch:"Batch D", avg:55 },{ batch:"Batch E", avg:72 },
  ];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Student Performance</div>
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {students.map(s => (
            <button key={s} onClick={() => setSelected(s)} style={{ background:selected===s?"#1d4ed8":"#1e293b", color:selected===s?"#fff":"#94a3b8", border:"none", borderRadius:8, padding:"7px 14px", fontSize:12, cursor:"pointer", fontWeight:selected===s?600:400 }}>{s}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>{selected} — Progress Trend</div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                <XAxis dataKey="week" stroke="#475569" tick={{ fontSize:11 }}/>
                <YAxis stroke="#475569" tick={{ fontSize:11 }}/>
                <Tooltip contentStyle={{ background:"#0f172a", border:"1px solid #1e293b" }}/>
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} dot={{ fill:"#22d3ee", r:3 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Skills Radar</div>
            <ResponsiveContainer width="100%" height={160}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b"/>
                <PolarAngleAxis dataKey="subject" tick={{ fill:"#64748b", fontSize:10 }}/>
                <Radar name={selected} dataKey="A" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
          <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Batch Average Performance</div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={batchPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
              <XAxis dataKey="batch" stroke="#475569" tick={{ fontSize:11 }}/>
              <YAxis stroke="#475569" tick={{ fontSize:11 }}/>
              <Tooltip contentStyle={{ background:"#0f172a", border:"1px solid #1e293b" }}/>
              <Bar dataKey="avg" fill="#22d3ee" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #22c55e33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <TrophyScene/>
          <div style={{ color:"#22c55e", fontSize:13, fontWeight:700, marginTop:8 }}>Top Performer</div>
          <div style={{ color:"#94a3b8", fontSize:12, marginTop:4 }}>Rahul S. — 91%</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>{selected}</div>
          {[["Avg Score","78%"],["Assignments","8/10"],["Attendance","92%"],["Rank","#4 / 28"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
          <button onClick={() => toast(`Report generated for ${selected}`)} style={{ width:"100%", background:"#1d4ed8", color:"#fff", border:"none", borderRadius:8, padding:"8px 0", fontSize:12, cursor:"pointer", marginTop:8 }}>Generate Report</button>
        </div>
      </div>
    </div>
  );
}

// ─── ATTENDANCE PAGE ──────────────────────────────────────────────────────────

function AttendancePage({ toast }) {
  const [batch, setBatch] = useState("Batch A");
  const [date, setDate]   = useState("");
  const students = ["Aryan K.","Priya M.","Rahul S.","Neha T.","Kiran J.","Divya P.","Arun V.","Sanya B.","Rohan C.","Meera L."];
  const [attendance, setAttendance] = useState(() => students.reduce((a,s) => ({ ...a, [s]:"present" }), {}));
  const toggle = s => setAttendance(p => ({ ...p, [s]:p[s]==="present"?"absent":"present" }));
  const summary = [
    { batch:"Batch A", rate:"92%", trend:"up" },{ batch:"Batch B", rate:"85%", trend:"down" },
    { batch:"Batch C", rate:"97%", trend:"up"  },{ batch:"Batch D", rate:"78%", trend:"down" },
  ];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Attendance Management</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
          {summary.map(s => (
            <div key={s.batch} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:16, textAlign:"center" }}>
              <div style={{ color:"#94a3b8", fontSize:12, marginBottom:6 }}>{s.batch}</div>
              <div style={{ color:s.trend==="up"?"#22c55e":"#f87171", fontSize:22, fontWeight:700 }}>{s.rate}</div>
              <div style={{ color:"#64748b", fontSize:11 }}>attendance</div>
            </div>
          ))}
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
          <div style={{ display:"flex", gap:12, marginBottom:18, alignItems:"center" }}>
            <div style={{ flex:1 }}>
              <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Batch</div>
              <select value={batch} onChange={e => setBatch(e.target.value)} style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" }}>
                {["Batch A","Batch B","Batch C","Batch D","Batch E"].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Date</div>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" }}/>
            </div>
          </div>
          <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Mark Attendance — {batch}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:18 }}>
            {students.map(s => (
              <div key={s} onClick={() => toggle(s)} style={{ background:attendance[s]==="present"?"#16a34a22":"#7f1d1d22", border:`1px solid ${attendance[s]==="present"?"#22c55e44":"#f8717144"}`, borderRadius:10, padding:"10px 8px", textAlign:"center", cursor:"pointer" }}>
                <div style={{ width:30, height:30, background:attendance[s]==="present"?"#22c55e22":"#f8717122", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 6px", color:attendance[s]==="present"?"#22c55e":"#f87171", fontSize:13, fontWeight:700 }}>{s[0]}</div>
                <div style={{ color:attendance[s]==="present"?"#4ade80":"#f87171", fontSize:11 }}>{s}</div>
                <div style={{ color:"#64748b", fontSize:10, marginTop:2 }}>{attendance[s]}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => setAttendance(students.reduce((a,s) => ({ ...a, [s]:"present" }), {}))} style={{ background:"#1e293b", color:"#94a3b8", border:"none", borderRadius:8, padding:"8px 16px", fontSize:12, cursor:"pointer" }}>Mark All Present</button>
            <button onClick={() => { if(!date){toast("Select a date","warn");return;} const ab=students.filter(s=>attendance[s]==="absent"); toast(`Attendance saved! ${students.length-ab.length}/${students.length} present`); }} style={{ background:"linear-gradient(135deg,#16a34a,#0891b2)", color:"#fff", border:"none", borderRadius:8, padding:"8px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Save Attendance</button>
            <button onClick={() => toast("Report downloaded")} style={{ background:"#1e293b", color:"#60a5fa", border:"none", borderRadius:8, padding:"8px 16px", fontSize:12, cursor:"pointer" }}>Download Report</button>
          </div>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #22c55e33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <HexSpinner color="#22c55e"/>
          <div style={{ color:"#22c55e", fontSize:13, fontWeight:700, marginTop:8 }}>Attendance Tracker</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>Today Summary</div>
          <div style={{ color:"#e2e8f0", fontSize:28, fontWeight:700, textAlign:"center", marginBottom:4 }}>{Object.values(attendance).filter(v=>v==="present").length}/{students.length}</div>
          <div style={{ color:"#64748b", fontSize:12, textAlign:"center" }}>present</div>
        </div>
      </div>
    </div>
  );
}

// ─── RESOURCES PAGE ───────────────────────────────────────────────────────────

function ResourcesPage({ toast }) {
  const [resources, setResources] = useState([
    { name:"React Complete Guide.pdf",    type:"PDF",   batch:"Batch A", size:"4.2 MB",  date:"2025-05-20" },
    { name:"Node.js REST API Template",   type:"Code",  batch:"Batch B", size:"1.1 MB",  date:"2025-05-22" },
    { name:"ML Algorithms Overview.pptx", type:"PPT",   batch:"Batch C", size:"6.8 MB",  date:"2025-05-25" },
    { name:"Database Design Principles",  type:"Video", batch:"All",     size:"320 MB",  date:"2025-05-28" },
  ]);
  const [link, setLink] = useState("");
  const colorMap = { PDF:"#f87171", Code:"#60a5fa", PPT:"#f59e0b", Video:"#a78bfa" };
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Resources</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Upload File</div>
            <div onClick={() => toast("File picker opened")} style={{ border:"2px dashed #334155", borderRadius:12, padding:"28px 20px", textAlign:"center", cursor:"pointer", marginBottom:12 }}>
              <Upload size={28} color="#64748b" style={{ margin:"0 auto 8px", display:"block" }}/>
              <div style={{ color:"#94a3b8", fontSize:13 }}>Click or drag file to upload</div>
              <div style={{ color:"#64748b", fontSize:11, marginTop:4 }}>PDF, PPT, Code, Video supported</div>
            </div>
            <button onClick={() => toast("Resource uploaded!")} style={{ width:"100%", background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:"10px 0", fontSize:14, fontWeight:600, cursor:"pointer" }}>Upload</button>
          </div>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Add Video Link</div>
            <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>YouTube / Drive URL</div>
            <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box", marginBottom:10 }}/>
            <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Assign to Batch</div>
            <select style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box", marginBottom:12 }}>
              {["All Batches","Batch A","Batch B","Batch C","Batch D"].map(b => <option key={b}>{b}</option>)}
            </select>
            <button onClick={() => { if(!link){toast("Enter a link","warn");return;} setLink(""); toast("Video link added!"); }} style={{ width:"100%", background:"#7c3aed", color:"#fff", border:"none", borderRadius:10, padding:"10px 0", fontSize:14, fontWeight:600, cursor:"pointer" }}>Add Link</button>
          </div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
          <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>All Resources</div>
          {resources.map((r, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:i<resources.length-1?"1px solid #1e293b":"none" }}>
              <div style={{ background:colorMap[r.type]+"22", padding:"8px 10px", borderRadius:8, color:colorMap[r.type], fontSize:11, fontWeight:700, minWidth:40, textAlign:"center" }}>{r.type}</div>
              <div style={{ flex:1 }}>
                <div style={{ color:"#e2e8f0", fontSize:13, fontWeight:500 }}>{r.name}</div>
                <div style={{ color:"#64748b", fontSize:11 }}>{r.batch} · {r.size} · {r.date}</div>
              </div>
              <button onClick={() => toast(`${r.name} downloaded`)} style={{ background:"#1e293b", color:"#60a5fa", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer" }}>Download</button>
              <button onClick={() => { setResources(p => p.filter((_,j) => j!==i)); toast("Resource removed"); }} style={{ background:"#7f1d1d22", color:"#f87171", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer" }}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #60a5fa33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <FloatingCube color="#60a5fa"/>
          <div style={{ color:"#60a5fa", fontSize:13, fontWeight:700, marginTop:8 }}>Resource Library</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          {[["Total Resources","24"],["Videos","8"],["PDFs","10"],["Code Files","6"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── LEAVE PAGE ───────────────────────────────────────────────────────────────

function LeavePage({ toast }) {
  const [tab, setTab] = useState("apply");
  const [form, setForm] = useState({ type:"", from:"", to:"", reason:"", impact:"", coverage:"" });
  const [fileName, setFileName] = useState("");
  const [fileObj, setFileObj] = useState(null);
  const fileRef = useRef(null);

  const [leaves, setLeaves] = useState([
    { id:"LV-001", type:"Sick Leave",      from:"2025-05-10", to:"2025-05-11", days:2, reason:"Fever and fatigue",  status:"Approved", doc:"medical_cert.pdf",  applied:"2025-05-09" },
    { id:"LV-002", type:"Casual Leave",    from:"2025-05-22", to:"2025-05-22", days:1, reason:"Personal work",      status:"Approved", doc:null,                applied:"2025-05-20" },
    { id:"LV-003", type:"Emergency Leave", from:"2025-06-02", to:"2025-06-03", days:2, reason:"Family emergency",   status:"Pending",  doc:"family_letter.pdf", applied:"2025-06-01" },
  ]);

  const calcDays = (from, to) => {
    if (!from || !to) return 0;
    const d = Math.round((new Date(to) - new Date(from)) / 86400000) + 1;
    return d > 0 ? d : 0;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast("File too large. Max 10MB.", "warn"); return; }
    setFileObj(file); setFileName(file.name); toast(`${file.name} attached!`);
  };

  const removeFile = () => {
    setFileObj(null); setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const submitLeave = () => {
    if (!form.type)            { toast("Select a leave type", "warn"); return; }
    if (!form.from || !form.to){ toast("Select from and to dates", "warn"); return; }
    if (new Date(form.to) < new Date(form.from)) { toast("End date must be after start date", "warn"); return; }
    if (!form.reason)          { toast("Enter a reason", "warn"); return; }
    if ((form.type==="Sick Leave"||form.type==="Emergency Leave") && !fileObj) {
      toast(`${form.type} requires a proof document`, "warn"); return;
    }
    const days = calcDays(form.from, form.to);
    const id = `LV-00${leaves.length + 4}`;
    setLeaves(p => [{ id, ...form, days, status:"Pending", doc:fileObj?fileObj.name:null, applied:new Date().toISOString().slice(0,10) }, ...p]);
    setForm({ type:"", from:"", to:"", reason:"", impact:"", coverage:"" });
    removeFile();
    toast(`Application ${id} submitted!`);
    setTab("history");
  };

  const inp = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" };
  const statusColor = { Approved:{ bg:"#16a34a22", text:"#4ade80" }, Pending:{ bg:"#f59e0b22", text:"#fbbf24" }, Rejected:{ bg:"#dc262622", text:"#f87171" } };
  const balance = [
    { type:"Casual Leave",    total:12, used:4 },
    { type:"Sick Leave",      total:6,  used:1 },
    { type:"Earned Leave",    total:12, used:0 },
    { type:"Emergency Leave", total:3,  used:0 },
  ];

  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700 }}>Leave Application</div>
          <div style={{ display:"flex", gap:8 }}>
            {[["apply","Apply"],["history","My Leaves"],["balance","Balance"]].map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)}
                style={{ background:tab===id?"#1d4ed8":"#1e293b", color:tab===id?"#fff":"#94a3b8", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:tab===id?600:400, cursor:"pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab==="apply" && (
          <div>
            <div style={{ background:"#1e40af22", border:"1px solid #1e40af44", borderRadius:10, padding:"10px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
              <AlertCircle size={15} color="#60a5fa"/>
              <span style={{ color:"#93c5fd", fontSize:13 }}>Submit at least 2 days in advance. Sick &amp; Emergency Leave require a proof document.</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
                <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                  <Palmtree size={16} color="#22d3ee"/> Leave Details
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Leave Type *</div>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type:e.target.value }))} style={inp}>
                    <option value="">Select type...</option>
                    {["Casual Leave","Sick Leave","Emergency Leave","Earned Leave","Maternity / Paternity Leave","Unpaid Leave"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                  <div>
                    <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>From *</div>
                    <input type="date" value={form.from} onChange={e => setForm(p => ({ ...p, from:e.target.value }))} style={inp}/>
                  </div>
                  <div>
                    <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>To *</div>
                    <input type="date" value={form.to} onChange={e => setForm(p => ({ ...p, to:e.target.value }))} style={inp}/>
                  </div>
                </div>
                {form.from && form.to && calcDays(form.from, form.to) > 0 && (
                  <div style={{ background:"#1e293b", borderRadius:8, padding:"8px 12px", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                    <Calendar size={13} color="#22d3ee"/>
                    <span style={{ color:"#22d3ee", fontSize:12, fontWeight:600 }}>
                      {calcDays(form.from, form.to)} day{calcDays(form.from, form.to)>1?"s":""} selected
                    </span>
                  </div>
                )}
                <div style={{ marginBottom:12 }}>
                  <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Reason *</div>
                  <textarea value={form.reason} onChange={e => setForm(p => ({ ...p, reason:e.target.value }))} rows={3}
                    placeholder="Brief reason for leave..." style={{ ...inp, resize:"vertical" }}/>
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Session Impact</div>
                  <select value={form.impact} onChange={e => setForm(p => ({ ...p, impact:e.target.value }))} style={inp}>
                    <option value="">Select...</option>
                    {["Sessions will be rescheduled","Substitute trainer arranged","Recorded session will be shared","No sessions during leave"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Covering Arrangements</div>
                  <textarea value={form.coverage} onChange={e => setForm(p => ({ ...p, coverage:e.target.value }))} rows={2}
                    placeholder="How will batches be managed..." style={{ ...inp, resize:"vertical" }}/>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
                  <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                    <Upload size={16} color="#22d3ee"/> Proof Document
                  </div>
                  <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style={{ display:"none" }} onChange={handleFile}/>
                  {!fileName ? (
                    <div onClick={() => fileRef.current?.click()}
                      style={{ border:"2px dashed #334155", borderRadius:12, padding:"28px 20px", textAlign:"center", cursor:"pointer", marginBottom:14 }}>
                      <Upload size={28} color="#64748b" style={{ margin:"0 auto 10px", display:"block" }}/>
                      <div style={{ color:"#94a3b8", fontSize:13, marginBottom:4 }}>Click to upload proof document</div>
                      <div style={{ color:"#64748b", fontSize:11 }}>Medical certificate, letter, or any document</div>
                      <div style={{ color:"#64748b", fontSize:11, marginTop:2 }}>PDF, JPG, PNG, DOC · Max 10MB</div>
                    </div>
                  ) : (
                    <div style={{ background:"#16a34a22", border:"1px solid #22c55e44", borderRadius:10, padding:"12px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                      <FileText size={16} color="#22d3ee"/>
                      <div style={{ flex:1 }}>
                        <div style={{ color:"#e2e8f0", fontSize:13, fontWeight:500 }}>{fileName}</div>
                        <div style={{ color:"#22c55e", fontSize:11, marginTop:2 }}>✓ Document attached</div>
                      </div>
                      <button onClick={removeFile} style={{ background:"#7f1d1d22", color:"#f87171", border:"none", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>Remove</button>
                    </div>
                  )}
                  <div style={{ background:"#1e293b", borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ color:"#64748b", fontSize:11, marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>Document Required For</div>
                    <div style={{ color:"#f87171", fontSize:12, marginBottom:3 }}>● Sick Leave — Medical certificate</div>
                    <div style={{ color:"#f87171", fontSize:12, marginBottom:3 }}>● Emergency Leave — Supporting proof</div>
                    <div style={{ color:"#64748b", fontSize:12 }}>○ Other types — Optional</div>
                  </div>
                </div>
                <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
                  <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:12 }}>Quick Balance</div>
                  {balance.map(b => (
                    <div key={b.type} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <span style={{ color:"#94a3b8", fontSize:12 }}>{b.type}</span>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ background:"#1e293b", borderRadius:999, height:4, width:60 }}>
                          <div style={{ width:`${((b.total-b.used)/b.total)*100}%`, background:"#22d3ee", borderRadius:999, height:"100%" }}/>
                        </div>
                        <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600, minWidth:36, textAlign:"right" }}>{b.total-b.used} left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop:20, display:"flex", gap:10 }}>
              <button onClick={submitLeave} style={{ background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:"11px 28px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                <Send size={15}/> Submit Application
              </button>
              <button onClick={() => { setForm({ type:"", from:"", to:"", reason:"", impact:"", coverage:"" }); removeFile(); }} style={{ background:"#1e293b", color:"#94a3b8", border:"none", borderRadius:10, padding:"11px 20px", fontSize:13, cursor:"pointer" }}>
                Clear
              </button>
            </div>
          </div>
        )}

        {tab==="history" && (
          <div>
            {leaves.length===0
              ? <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:40, textAlign:"center", color:"#64748b" }}>No leave applications yet.</div>
              : leaves.map((l, i) => (
                <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:18, marginBottom:14, display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ background:"#1e40af22", padding:10, borderRadius:10, flexShrink:0 }}>
                    <Palmtree size={18} color="#60a5fa"/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                      <span style={{ color:"#e2e8f0", fontWeight:600 }}>{l.type}</span>
                      <span style={{ background:statusColor[l.status]?.bg, color:statusColor[l.status]?.text, fontSize:11, padding:"2px 10px", borderRadius:20 }}>{l.status}</span>
                    </div>
                    <div style={{ color:"#64748b", fontSize:12, marginBottom:2 }}>{l.from} → {l.to} · {l.days} day{l.days>1?"s":""}</div>
                    <div style={{ color:"#94a3b8", fontSize:12 }}>{l.reason}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ color:"#64748b", fontSize:11, marginBottom:6 }}>{l.id} · Applied {l.applied}</div>
                    {l.doc
                      ? <div style={{ display:"flex", alignItems:"center", gap:6, justifyContent:"flex-end" }}><FileText size={12} color="#22d3ee"/><span style={{ color:"#22d3ee", fontSize:11 }}>{l.doc}</span></div>
                      : <span style={{ color:"#475569", fontSize:11 }}>No document</span>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {tab==="balance" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
              {balance.map(b => (
                <div key={b.type} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20, textAlign:"center" }}>
                  <div style={{ color:"#64748b", fontSize:11, marginBottom:6 }}>{b.type}</div>
                  <div style={{ color:"#22d3ee", fontSize:28, fontWeight:700 }}>{b.total-b.used}</div>
                  <div style={{ color:"#475569", fontSize:11, marginTop:2 }}>remaining</div>
                  <div style={{ background:"#1e293b", borderRadius:999, height:4, marginTop:10 }}>
                    <div style={{ width:`${((b.total-b.used)/b.total)*100}%`, background:"linear-gradient(90deg,#22d3ee,#1d4ed8)", borderRadius:999, height:"100%" }}/>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
              <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16 }}>Leave Usage — FY 2025</div>
              {balance.map(b => (
                <div key={b.type} style={{ display:"flex", alignItems:"center", gap:16, marginBottom:14, paddingBottom:14, borderBottom:"1px solid #1e293b" }}>
                  <div style={{ width:150, color:"#94a3b8", fontSize:13 }}>{b.type}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ background:"#1e293b", borderRadius:999, height:6 }}>
                      <div style={{ width:`${(b.used/b.total)*100}%`, background:"#f59e0b", borderRadius:999, height:"100%", minWidth:b.used>0?"4px":"0" }}/>
                    </div>
                  </div>
                  <div style={{ color:"#94a3b8", fontSize:12, minWidth:120, textAlign:"right" }}>{b.used} used / {b.total} allotted</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #22d3ee33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center", marginBottom:16 }}>
          <OrbitalScene color="#22d3ee"/>
          <div style={{ color:"#22d3ee", fontSize:13, fontWeight:700, marginTop:8 }}>Leave Portal</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>This Year</div>
          {[["Applied","3"],["Approved","2"],["Pending","1"],["Days Taken","5"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #1e293b", marginTop:10, paddingTop:10 }}>
            <div style={{ color:"#64748b", fontSize:11, lineHeight:1.7 }}>
              Submit 2 days in advance.<br/>
              Medical proof required for Sick Leave.<br/>
              Emergency leave can be same day.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AI PAGE ──────────────────────────────────────────────────────────────────

function AIPage({ toast }) {
  const [msgs, setMsgs] = useState([
    { role:"assistant", text:"Hi Rohan! I'm your AI teaching assistant. Ask me to help with lesson plans, quiz generation, student feedback, or any teaching queries!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(p => [...p, { role:"user", text:userMsg }]);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://eleqauteiq-backend.vercel.app", {
        method:"POST",
        headers:{ "Content-Type":"application/json", ...(token ? { Authorization:`Bearer ${token}` } : {}) },
        body:JSON.stringify({
          messages:[
            ...msgs.map(m => ({ role:m.role, content:m.text })),
            { role:"user", content:userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.data?.reply || data.message || "Sorry, couldn't respond right now.";
      setMsgs(p => [...p, { role:"assistant", text:reply }]);
    } catch(e) {
      setMsgs(p => [...p, { role:"assistant", text:"Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const prompts = ["Generate a quiz on React Hooks","Write feedback for struggling student","Plan a 60-min live session","Suggest engaging teaching activities"];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:16 }}>AI Teaching Assistant</div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, height:420, overflowY:"auto", padding:20, marginBottom:14, display:"flex", flexDirection:"column", gap:12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"75%", background:m.role==="user"?"linear-gradient(135deg,#1d4ed8,#0891b2)":"#1e293b", color:"#e2e8f0", padding:"10px 14px", borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", justifyContent:"flex-start" }}>
              <div style={{ background:"#1e293b", color:"#64748b", padding:"10px 14px", borderRadius:"14px 14px 14px 4px", fontSize:13 }}>Thinking...</div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
          {prompts.map(p => <button key={p} onClick={() => setInput(p)} style={{ background:"#1e293b", color:"#94a3b8", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer" }}>{p}</button>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter"&&send()} placeholder="Ask your AI assistant..."
            style={{ flex:1, background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#e2e8f0", padding:"10px 14px", fontSize:14, boxSizing:"border-box" }}/>
          <button onClick={send} disabled={loading} style={{ background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", cursor:"pointer" }}><Send size={18}/></button>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #22d3ee33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <OrbitalScene color="#22d3ee"/>
          <div style={{ color:"#22d3ee", fontSize:13, fontWeight:700, marginTop:8 }}>AI Powered</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Capabilities</div>
          {["Lesson Planning","Quiz Generation","Student Feedback","Teaching Strategies","Content Creation"].map(c => (
            <div key={c} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
              <Zap size={11} color="#22d3ee"/>
              <span style={{ color:"#cbd5e1", fontSize:12 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TICKETS PAGE ─────────────────────────────────────────────────────────────

function TicketsPage({ toast }) {
  const [form, setForm] = useState({ subject:"", category:"Technical", priority:"Medium", desc:"" });
  const [tickets, setTickets] = useState([
    { id:"TKT-201", subject:"Cannot upload video resource",  category:"Technical", priority:"High",   status:"Open",     date:"2025-06-01" },
    { id:"TKT-195", subject:"Student grade not reflecting",  category:"Platform",  priority:"Medium", status:"Resolved", date:"2025-05-28" },
    { id:"TKT-188", subject:"Attendance report discrepancy", category:"Data",      priority:"Low",    status:"Open",     date:"2025-05-20" },
  ]);
  const inpStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" };
  const priorityColor = { High:"#f87171", Medium:"#fbbf24", Low:"#4ade80" };
  const statusColor   = { Open:"#60a5fa",  Resolved:"#4ade80" };

  const submit = () => {
    if (!form.subject) { toast("Enter a subject","warn"); return; }
    const id = `TKT-${200 + tickets.length + 1}`;
    setTickets(p => [{ id, ...form, status:"Open", date:new Date().toISOString().slice(0,10) }, ...p]);
    setForm({ subject:"", category:"Technical", priority:"Medium", desc:"" });
    toast(`Ticket ${id} submitted!`);
  };

  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Support Tickets</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}><Plus size={16} color="#22d3ee"/> New Ticket</div>
            <div style={{ marginBottom:12 }}>
              <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Subject *</div>
              <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject:e.target.value }))} placeholder="Describe the issue briefly..." style={inpStyle}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              <div>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Category</div>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category:e.target.value }))} style={inpStyle}>
                  {["Technical","Platform","Data","Billing","Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Priority</div>
                <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority:e.target.value }))} style={inpStyle}>
                  {["Low","Medium","High"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ color:"#94a3b8", fontSize:12, marginBottom:4 }}>Description</div>
              <textarea value={form.desc} onChange={e => setForm(p => ({ ...p, desc:e.target.value }))} rows={4}
                placeholder="Detailed description of the issue..." style={{ ...inpStyle, resize:"vertical" }}/>
            </div>
            <button onClick={submit} style={{ width:"100%", background:"linear-gradient(135deg,#1d4ed8,#0891b2)", color:"#fff", border:"none", borderRadius:10, padding:"10px 0", fontSize:14, fontWeight:600, cursor:"pointer" }}>Submit Ticket</button>
          </div>

          <div>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>My Tickets</div>
            {tickets.map((t, i) => (
              <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:"14px 16px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ color:"#e2e8f0", fontSize:13, fontWeight:600 }}>{t.subject}</span>
                  <span style={{ background:t.status==="Open"?"#1e40af22":"#16a34a22", color:statusColor[t.status], fontSize:11, padding:"2px 8px", borderRadius:6 }}>{t.status}</span>
                </div>
                <div style={{ display:"flex", gap:12, marginBottom:6 }}>
                  <span style={{ color:"#64748b", fontSize:11 }}>{t.id}</span>
                  <span style={{ color:"#64748b", fontSize:11 }}>{t.category}</span>
                  <span style={{ color:priorityColor[t.priority], fontSize:11, fontWeight:600 }}>{t.priority}</span>
                </div>
                <div style={{ color:"#475569", fontSize:11 }}>Submitted {t.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #f59e0b33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <FloatingCube color="#f59e0b"/>
          <div style={{ color:"#f59e0b", fontSize:13, fontWeight:700, marginTop:8 }}>Support Center</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>Ticket Stats</div>
          {[["Total","3"],["Open","2"],["Resolved","1"],["Avg Response","4h"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────

function ProfilePage({ toast }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name:"Rohan Sharma", email:"rohan@elevateiq.com", phone:"+91 98765 43210",
    role:"Senior Full Stack Trainer", experience:"5 years", location:"Bangalore, India",
    bio:"Passionate trainer with expertise in Full Stack Web Development, React, Node.js, and Cloud Technologies. Dedicated to making complex concepts accessible.",
    skills:["React","Node.js","Python","MongoDB","DevOps","AWS"],
  });

  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0", fontSize:18, fontWeight:700, marginBottom:20 }}>Profile</div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:24, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:20 }}>
            <div style={{ width:72, height:72, background:"linear-gradient(135deg,#1d4ed8,#0891b2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:800, color:"#fff", flexShrink:0 }}>R</div>
            <div style={{ flex:1 }}>
              <div style={{ color:"#f1f5f9", fontSize:20, fontWeight:700 }}>{profile.name}</div>
              <div style={{ color:"#64748b", fontSize:14, marginTop:2 }}>{profile.role}</div>
              <div style={{ display:"flex", gap:12, marginTop:8 }}>
                <span style={{ background:"#16a34a22", color:"#4ade80", fontSize:11, padding:"2px 10px", borderRadius:20 }}>Active Trainer</span>
                <span style={{ background:"#1d4ed822", color:"#60a5fa", fontSize:11, padding:"2px 10px", borderRadius:20 }}>{profile.experience}</span>
              </div>
            </div>
            <button onClick={() => { setEditing(!editing); if (editing) toast("Profile saved!"); }}
              style={{ background:editing?"#16a34a":"#1e293b", color:editing?"#fff":"#94a3b8", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
              {editing ? <><Check size={14}/> Save</> : <><Edit size={14}/> Edit</>}
            </button>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[["Email","email"],["Phone","phone"],["Location","location"],["Experience","experience"]].map(([l,k]) => (
              <div key={k}>
                <div style={{ color:"#64748b", fontSize:12, marginBottom:4 }}>{l}</div>
                {editing
                  ? <input value={profile[k]} onChange={e => setProfile(p => ({ ...p, [k]:e.target.value }))} style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box" }}/>
                  : <div style={{ color:"#e2e8f0", fontSize:13 }}>{profile[k]}</div>
                }
              </div>
            ))}
          </div>

          <div style={{ marginTop:16 }}>
            <div style={{ color:"#64748b", fontSize:12, marginBottom:4 }}>Bio</div>
            {editing
              ? <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio:e.target.value }))} rows={3} style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"8px 10px", fontSize:13, boxSizing:"border-box", resize:"vertical" }}/>
              : <div style={{ color:"#e2e8f0", fontSize:13, lineHeight:1.6 }}>{profile.bio}</div>
            }
          </div>

          <div style={{ marginTop:16 }}>
            <div style={{ color:"#64748b", fontSize:12, marginBottom:8 }}>Skills</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {profile.skills.map(s => (
                <span key={s} style={{ background:"#22d3ee22", color:"#22d3ee", border:"1px solid #22d3ee33", fontSize:12, padding:"3px 12px", borderRadius:20 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {[["Batches Taught","18",Users,"#22d3ee"],["Students Trained","342",Award,"#a78bfa"],["Avg Rating","4.8★",Star,"#fbbf24"],["Sessions Done","156",Video,"#22c55e"]].map(([l,v,Icon,c]) => (
            <div key={l} style={{ background:"#0f172a", border:`1px solid ${c}33`, borderRadius:14, padding:"16px 18px", textAlign:"center" }}>
              <div style={{ background:c+"22", width:40, height:40, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
                <Icon size={18} color={c}/>
              </div>
              <div style={{ color:"#f1f5f9", fontSize:22, fontWeight:700 }}>{v}</div>
              <div style={{ color:"#64748b", fontSize:12, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width:220, flexShrink:0 }}>
        <div style={{ background:"#0f172a", border:"1px solid #a78bfa33", borderRadius:16, padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <HexSpinner color="#a78bfa"/>
          <div style={{ color:"#a78bfa", fontSize:13, fontWeight:700, marginTop:8 }}>Trainer Profile</div>
        </div>
        <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:16, marginTop:16 }}>
          <div style={{ color:"#94a3b8", fontSize:12, marginBottom:10 }}>Account</div>
          {[["Member Since","Jan 2023"],["Plan","Pro Trainer"],["Status","Active"],["2FA","Enabled"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{v}</span>
            </div>
          ))}
          <button onClick={() => toast("Password reset email sent")} style={{ width:"100%", background:"#1e293b", color:"#94a3b8", border:"none", borderRadius:8, padding:"8px 0", fontSize:12, cursor:"pointer", marginTop:8 }}>Change Password</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage]         = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toasts, add: toast, remove } = useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pages = {
    dashboard:   <DashboardPage   toast={toast}/>,
    batches:     <BatchesPage     toast={toast}/>,
    schedule:    <SchedulePage    toast={toast}/>,
    assignments: <AssignmentsPage toast={toast}/>,
    tests:       <TestsPage       toast={toast}/>,
    performance: <PerformancePage toast={toast}/>,
    attendance:  <AttendancePage  toast={toast}/>,
    resources:   <ResourcesPage   toast={toast}/>,
    leave:       <LeavePage       toast={toast}/>,
    ai:          <AIPage          toast={toast}/>,
    tickets:     <TicketsPage     toast={toast}/>,
    profile:     <ProfilePage     toast={toast}/>,
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#020917", fontFamily:"'Inter',system-ui,sans-serif", color:"#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:#0f172a;}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px;}
        select option{background:#1e293b;color:#e2e8f0;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
        input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
      `}</style>

      {/* Sidebar */}
      <div style={{ width:sidebarOpen?240:64, flexShrink:0, background:"#0a1120", borderRight:"1px solid #1e293b", display:"flex", flexDirection:"column", transition:"width 0.2s ease", overflow:"hidden" }}>
        <div style={{ padding:"16px 14px", borderBottom:"1px solid #1e293b", display:"flex", alignItems:"center", gap:10, minHeight:64 }}>
          <div style={{ width:36, height:36, background:"linear-gradient(135deg,#1d4ed8,#0891b2)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#fff", flexShrink:0 }}>T</div>
          {sidebarOpen && <div style={{ color:"#f1f5f9", fontWeight:700, fontSize:15 }}>ElevateIQ</div>}
          <button onClick={() => setSidebarOpen(p => !p)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#64748b", cursor:"pointer", padding:4, flexShrink:0 }}><Menu size={18}/></button>
        </div>

        <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"9px 10px", borderRadius:10, border:"none", background:page===n.id?"#1d4ed822":"transparent", color:page===n.id?"#60a5fa":"#64748b", cursor:"pointer", marginBottom:2, whiteSpace:"nowrap", textAlign:"left", transition:"all 0.15s" }}>
              <n.icon size={18} style={{ flexShrink:0 }}/>
              {sidebarOpen && <span style={{ fontSize:13, fontWeight:page===n.id?600:400 }}>{n.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding:"12px 8px", borderTop:"1px solid #1e293b" }}>
          <button onClick={handleLogout}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"9px 10px", borderRadius:10, border:"none", background:"transparent", color:"#64748b", cursor:"pointer" }}>
            <LogOut size={18} style={{ flexShrink:0 }}/>
            {sidebarOpen && <span style={{ fontSize:13 }}>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>
        {/* Topbar */}
        <div style={{ height:64, background:"#0a1120", borderBottom:"1px solid #1e293b", display:"flex", alignItems:"center", padding:"0 24px", gap:14, flexShrink:0 }}>
          <div style={{ flex:1, color:"#e2e8f0", fontWeight:600, fontSize:15 }}>
            {NAV.find(n => n.id===page)?.label}
          </div>
          <div style={{ display:"flex", alignItems:"center", background:"#1e293b", borderRadius:10, padding:"7px 14px", gap:8, flex:"0 0 220px" }}>
            <Search size={14} color="#64748b"/>
            <input placeholder="Search..." style={{ background:"none", border:"none", color:"#e2e8f0", fontSize:13, outline:"none", width:"100%" }}/>
          </div>
          <button onClick={() => toast("No new notifications")} style={{ background:"#1e293b", border:"none", borderRadius:10, padding:"8px 10px", cursor:"pointer", position:"relative" }}>
            <Bell size={16} color="#94a3b8"/>
            <span style={{ position:"absolute", top:6, right:6, width:6, height:6, background:"#ef4444", borderRadius:"50%", display:"block" }}/>
          </button>
          <div style={{ width:34, height:34, background:"linear-gradient(135deg,#1d4ed8,#0891b2)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer" }} onClick={() => setPage("profile")}>R</div>
        </div>

        {/* Page content */}
        <div style={{ flex:1, overflowY:"auto", padding:24 }}>
          {pages[page]}
        </div>
      </div>

      <Toast toasts={toasts} remove={remove}/>
    </div>
  );
}