import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Calendar, DollarSign, BarChart2,
  Bot, Ticket, User, Bell, Send, Menu, Search, CheckCircle,
  Clock, ChevronRight, X, AlertCircle, Zap, Download,
  FileText, TrendingUp, Award, Target, Activity, Plus,
  Edit, Check, Upload, MessageSquare, Star, LogOut
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

function OrbitalScene({ color = "#22d3ee" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    canvas.width = 320; canvas.height = 320;
    const cx = 160, cy = 160;
    const particles = Array.from({ length: 40 }, (_, i) => ({
      angle: (i / 40) * Math.PI * 2, r: 60 + Math.random() * 60,
      speed: 0.003 + Math.random() * 0.005, size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.7,
    }));
    function draw() {
      ctx.clearRect(0, 0, 320, 320);
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
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      g.addColorStop(0, color + "cc"); g.addColorStop(1, color + "00");
      ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      t += 0.01; frame = requestAnimationFrame(draw);
    }
    draw(); return () => cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function FloatingCube({ color = "#f59e0b" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    canvas.width = 320; canvas.height = 320;
    const cx = 160, cy = 160;
    function project([x, y, z]) { const s = 300 / (300 + z); return [cx + x * s, cy + y * s]; }
    function rotY(pts, a) { return pts.map(([x,y,z]) => [x*Math.cos(a)+z*Math.sin(a),y,-x*Math.sin(a)+z*Math.cos(a)]); }
    function rotX(pts, a) { return pts.map(([x,y,z]) => [x,y*Math.cos(a)-z*Math.sin(a),y*Math.sin(a)+z*Math.cos(a)]); }
    const base = [[-60,-60,-60],[60,-60,-60],[60,60,-60],[-60,60,-60],[-60,-60,60],[60,-60,60],[60,60,60],[-60,60,60]];
    const faces = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
    function draw() {
      ctx.clearRect(0, 0, 320, 320);
      let pts = rotY(rotX(base, t * 0.7), t);
      const fl = Math.sin(t * 1.5) * 15;
      pts = pts.map(([x,y,z]) => [x, y + fl, z]);
      faces.forEach((face, i) => {
        const p = face.map(idx => project(pts[idx]));
        ctx.beginPath(); ctx.moveTo(...p[0]); p.slice(1).forEach(pt => ctx.lineTo(...pt)); ctx.closePath();
        ctx.fillStyle = color + Math.floor((0.1 + i * 0.05) * 255).toString(16).padStart(2,"0");
        ctx.fill(); ctx.strokeStyle = color + "99"; ctx.lineWidth = 1.5; ctx.stroke();
      });
      t += 0.012; frame = requestAnimationFrame(draw);
    }
    draw(); return () => cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function HexSpinner({ color = "#a78bfa" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    canvas.width = 320; canvas.height = 320;
    const cx = 160, cy = 160;
    function hex(r, rot) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) { const a = (i/6)*Math.PI*2+rot; i===0?ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a)):ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a)); }
      ctx.closePath();
    }
    function draw() {
      ctx.clearRect(0,0,320,320);
      [100,75,50,25].forEach((r,i) => {
        hex(r, t*(i%2===0?1:-1)*0.5);
        ctx.strokeStyle=color+["ff","bb","77","44"][i]; ctx.lineWidth=2; ctx.stroke();
        if(i===0){ctx.fillStyle=color+"11";ctx.fill();}
      });
      for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2+t;ctx.beginPath();ctx.arc(cx+100*Math.cos(a),cy+100*Math.sin(a),4,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
      t+=0.015; frame=requestAnimationFrame(draw);
    }
    draw(); return ()=>cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function TrophyScene() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame, t = 0;
    canvas.width = 320; canvas.height = 320;
    const cx = 160, cy = 160;
    function draw() {
      ctx.clearRect(0,0,320,320);
      const bob = Math.sin(t*1.2)*8;
      const g = ctx.createRadialGradient(cx,cy+bob,10,cx,cy+bob,70);
      g.addColorStop(0,"#fbbf2444"); g.addColorStop(1,"transparent");
      ctx.beginPath(); ctx.arc(cx,cy+bob,70,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx-35,cy-40+bob); ctx.quadraticCurveTo(cx-55,cy-10+bob,cx-30,cy+10+bob);
      ctx.lineTo(cx-15,cy+20+bob); ctx.lineTo(cx+15,cy+20+bob); ctx.lineTo(cx+30,cy+10+bob);
      ctx.quadraticCurveTo(cx+55,cy-10+bob,cx+35,cy-40+bob); ctx.closePath();
      ctx.fillStyle="#fbbf24cc"; ctx.fill(); ctx.strokeStyle="#f59e0b"; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.rect(cx-8,cy+20+bob,16,20); ctx.fillStyle="#f59e0b"; ctx.fill();
      ctx.beginPath(); ctx.rect(cx-25,cy+40+bob,50,8); ctx.fillStyle="#f59e0b"; ctx.fill();
      for(let i=0;i<5;i++){const a=(i/5)*Math.PI*2+t;ctx.beginPath();ctx.arc(cx+80*Math.cos(a),cy+bob*0.3+80*Math.sin(a)*0.5,2,0,Math.PI*2);ctx.fillStyle="#fbbf24";ctx.fill();}
      t+=0.02; frame=requestAnimationFrame(draw);
    }
    draw(); return ()=>cancelAnimationFrame(frame);
  },[]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function Toast({ toasts, remove }) {
  return (
    <div style={{ position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background:t.type==="error"?"#7f1d1d":t.type==="warn"?"#78350f":"#052e16", border:`1px solid ${t.type==="error"?"#ef4444":t.type==="warn"?"#f59e0b":"#22c55e"}`, color:"#f1f5f9",padding:"12px 18px",borderRadius:10,fontSize:13,display:"flex",alignItems:"center",gap:10,minWidth:260,boxShadow:"0 8px 32px #0008",animation:"slideIn 0.3s ease" }}>
          {t.type==="error"?<AlertCircle size={16} color="#ef4444"/>:<CheckCircle size={16} color="#22c55e"/>}
          {t.msg}
          <X size={14} style={{ marginLeft:"auto",cursor:"pointer",opacity:0.6 }} onClick={()=>remove(t.id)} />
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts,setToasts]=useState([]);
  const add=(msg,type="success")=>{const id=Date.now();setToasts(p=>[...p,{id,msg,type}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3500);};
  const remove=id=>setToasts(p=>p.filter(t=>t.id!==id));
  return {toasts,add,remove};
}

const NAV = [
  { id:"dashboard", label:"Dashboard", icon:LayoutDashboard },
  { id:"attendance", label:"Attendance & Leave", icon:Calendar },
  { id:"payroll", label:"Payroll & Salary", icon:DollarSign },
  { id:"performance", label:"Performance", icon:BarChart2 },
  { id:"ai", label:"AI Assistant", icon:Bot },
  { id:"tickets", label:"Tickets", icon:Ticket },
  { id:"profile", label:"Profile", icon:User },
];

function DashboardPage({ toast }) {
  const stats = [
    { label:"Courses Enrolled", value:5, icon:BookOpen, color:"#22d3ee", delta:"2 in progress" },
    { label:"Attendance Rate", value:"91%", icon:Calendar, color:"#22c55e", delta:"This month" },
    { label:"Performance Score", value:"84/100", icon:TrendingUp, color:"#a78bfa", delta:"+6 pts" },
    { label:"Pending Tasks", value:3, icon:Target, color:"#f59e0b", delta:"Due this week" },
  ];
  const activityData = [
    {day:"Mon",hours:6},{day:"Tue",hours:7.5},{day:"Wed",hours:5},{day:"Thu",hours:8},
    {day:"Fri",hours:6.5},{day:"Sat",hours:2},{day:"Sun",hours:0},
  ];
  const announcements = [
    { title:"Q2 Appraisal Cycle Open", time:"2 hours ago", type:"important" },
    { title:"New React Advanced Course Added", time:"Yesterday", type:"info" },
    { title:"Leave Policy Update — FY 2025-26", time:"3 days ago", type:"info" },
    { title:"Team Offsite — June 20th", time:"5 days ago", type:"event" },
  ];
  const tasks = [
    { title:"Complete React Module 4", due:"Jun 5", done:false },
    { title:"Submit self-assessment form", due:"Jun 7", done:false },
    { title:"Attend DevOps webinar", due:"Jun 6", done:true },
  ];
  const [tasksDone, setTasksDone] = useState(tasks.map(t => t.done));
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ background:"linear-gradient(135deg,#0a1628,#0f2a1a)", border:"1px solid #16a34a33", borderRadius:16, padding:"22px 28px", marginBottom:24, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute",right:0,top:0,width:200,height:"100%",background:"radial-gradient(ellipse at right,#16a34a22,transparent)" }} />
          <div style={{ fontSize:21, fontWeight:700, color:"#f1f5f9", marginBottom:6 }}>Good morning, Ananya! 👋</div>
          <div style={{ color:"#94a3b8", fontSize:14 }}>You have 3 pending tasks and 1 class today. Stay on track!</div>
          <div style={{ marginTop:16, display:"flex", gap:12 }}>
            <button onClick={()=>toast("Opening today schedule")} style={{ background:"#16a34a",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer" }}>View Schedule</button>
            <button onClick={()=>toast("Courses opened")} style={{ background:"transparent",color:"#4ade80",border:"1px solid #16a34a",borderRadius:8,padding:"8px 18px",fontSize:13,cursor:"pointer" }}>My Courses</button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:"#0f172a",border:`1px solid ${s.color}33`,borderRadius:14,padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ color:"#64748b", fontSize:12, marginBottom:6 }}>{s.label}</div>
                  <div style={{ color:"#f1f5f9", fontSize:24, fontWeight:700 }}>{s.value}</div>
                </div>
                <div style={{ background:s.color+"22", padding:10, borderRadius:10 }}><s.icon size={18} color={s.color} /></div>
              </div>
              <div style={{ color:"#94a3b8", fontSize:11, marginTop:8 }}>{s.delta}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Work Hours This Week</div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize:11 }} />
                <YAxis stroke="#475569" tick={{ fontSize:11 }} />
                <Tooltip contentStyle={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:8 }} />
                <Area type="monotone" dataKey="hours" stroke="#22d3ee" strokeWidth={2} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Tasks</div>
            {tasks.map((t, i) => (
              <div key={i} onClick={()=>{const n=[...tasksDone];n[i]=!n[i];setTasksDone(n);toast(n[i]?"Task completed!":"Task reopened");}} style={{ display:"flex",gap:10,alignItems:"center",padding:"8px 0",borderBottom:i<tasks.length-1?"1px solid #1e293b":"none",cursor:"pointer" }}>
                <div style={{ width:18,height:18,borderRadius:5,border:`2px solid ${tasksDone[i]?"#22c55e":"#334155"}`,background:tasksDone[i]?"#22c55e22":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  {tasksDone[i] && <Check size={10} color="#22c55e" />}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ color:tasksDone[i]?"#475569":"#e2e8f0",fontSize:12,textDecoration:tasksDone[i]?"line-through":"none" }}>{t.title}</div>
                  <div style={{ color:"#64748b",fontSize:10 }}>Due {t.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
          <div style={{ color:"#e2e8f0", fontWeight:600, marginBottom:14 }}>Announcements</div>
          {announcements.map((a, i) => (
            <div key={i} style={{ display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:i<announcements.length-1?"1px solid #1e293b":"none" }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:a.type==="important"?"#ef4444":a.type==="event"?"#a78bfa":"#22d3ee",flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ color:"#e2e8f0",fontSize:13 }}>{a.title}</div>
                <div style={{ color:"#64748b",fontSize:11 }}>{a.time}</div>
              </div>
              <ChevronRight size={14} color="#475569" />
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22d3ee33",borderRadius:16,padding:20,marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <OrbitalScene color="#22d3ee" />
          <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginTop:8 }}>Employee Hub</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16 }}>
          <div style={{ color:"#94a3b8",fontSize:12,marginBottom:10 }}>Quick Links</div>
          {["Apply for Leave","Download Payslip","View Courses","Raise Ticket"].map(a=>(
            <button key={a} onClick={()=>toast(`${a} opened`)} style={{ width:"100%",background:"#1e293b",color:"#cbd5e1",border:"none",borderRadius:8,padding:"8px 12px",fontSize:12,cursor:"pointer",marginBottom:8,textAlign:"left" }}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage({ toast }) {
  const courses = [
    { title:"React Advanced Patterns", progress:72, instructor:"Rohan S.", duration:"18h", status:"In Progress", color:"#22d3ee" },
    { title:"Node.js Microservices", progress:100, instructor:"Priya M.", duration:"12h", status:"Completed", color:"#22c55e" },
    { title:"AWS Cloud Practitioner", progress:35, instructor:"Arjun K.", duration:"24h", status:"In Progress", color:"#f59e0b" },
    { title:"Docker & Kubernetes", progress:0, instructor:"Sneha R.", duration:"16h", status:"Not Started", color:"#a78bfa" },
    { title:"System Design Fundamentals", progress:58, instructor:"Vikram T.", duration:"20h", status:"In Progress", color:"#f87171" },
  ];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>My Courses</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>
          {courses.map((c,i) => (
            <div key={i} style={{ background:"#0f172a",border:`1px solid ${c.color}33`,borderRadius:14,padding:20 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#e2e8f0",fontWeight:700,fontSize:14,marginBottom:4 }}>{c.title}</div>
                  <div style={{ color:"#64748b",fontSize:12 }}>by {c.instructor} · {c.duration}</div>
                </div>
                <span style={{ background:c.color+"22",color:c.color,fontSize:10,padding:"3px 10px",borderRadius:20,height:"fit-content",whiteSpace:"nowrap",marginLeft:8 }}>{c.status}</span>
              </div>
              <div style={{ background:"#1e293b",borderRadius:999,height:6,marginBottom:6 }}>
                <div style={{ width:`${c.progress}%`,background:c.color,borderRadius:999,height:"100%",transition:"width 0.5s" }} />
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ color:"#94a3b8",fontSize:12 }}>{c.progress}% complete</span>
                <div style={{ display:"flex",gap:8 }}>
                  {c.status !== "Completed" && c.status !== "Not Started" && <button onClick={()=>toast(`Resuming ${c.title}`)} style={{ background:c.color,color:"#000",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer" }}>Continue</button>}
                  {c.status === "Completed" && <button onClick={()=>toast("Certificate downloaded!")} style={{ background:"#16a34a22",color:"#4ade80",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer" }}>Certificate</button>}
                  {c.status === "Not Started" && <button onClick={()=>toast(`${c.title} started!`)} style={{ background:c.color+"22",color:c.color,border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer" }}>Start</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #f59e0b33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <FloatingCube color="#f59e0b" />
          <div style={{ color:"#f59e0b",fontSize:13,fontWeight:700,marginTop:8 }}>Learning Cube</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginTop:16 }}>
          {[["Enrolled","5"],["Completed","1"],["In Progress","3"],["Hours Learned","42h"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage({ toast }) {
  const [tab, setTab] = useState("attendance");
  const [leaveForm, setLeaveForm] = useState({ type:"Casual Leave", from:"", to:"", reason:"" });
  const [leaves, setLeaves] = useState([
    { type:"Sick Leave", from:"2025-05-10", to:"2025-05-11", days:2, status:"Approved" },
    { type:"Casual Leave", from:"2025-04-18", to:"2025-04-18", days:1, status:"Approved" },
    { type:"Annual Leave", from:"2025-06-20", to:"2025-06-25", days:5, status:"Pending" },
  ]);
  const calData = Array.from({length:30},(_,i)=>({
    day:i+1, status: Math.random()>0.15 ? (Math.random()>0.9?"leave":"present") : "absent"
  }));
  const applyLeave = () => {
    if(!leaveForm.from||!leaveForm.to||!leaveForm.reason){toast("Fill all fields","warn");return;}
    setLeaves(p=>[{...leaveForm,days:1,status:"Pending"},...p]);
    setLeaveForm({type:"Casual Leave",from:"",to:"",reason:""});
    toast("Leave application submitted!");
  };
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex",gap:10,marginBottom:20 }}>
          {["attendance","leave","history"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ background:tab===t?"#16a34a":"#1e293b",color:tab===t?"#fff":"#94a3b8",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:tab===t?600:400,cursor:"pointer",textTransform:"capitalize" }}>
              {t==="attendance"?"Attendance":t==="leave"?"Apply Leave":"Leave History"}
            </button>
          ))}
        </div>
        {tab==="attendance" && (
          <div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20 }}>
              {[["Present Days","22","#22c55e"],["Absent Days","2","#ef4444"],["Leave Days","3","#f59e0b"],["Attendance %","91%","#22d3ee"]].map(([k,v,c])=>(
                <div key={k} style={{ background:"#0f172a",border:`1px solid ${c}33`,borderRadius:12,padding:16,textAlign:"center" }}>
                  <div style={{ color:c,fontSize:22,fontWeight:700 }}>{v}</div>
                  <div style={{ color:"#64748b",fontSize:12,marginTop:4 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
              <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>June 2025 — Attendance Calendar</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6 }}>
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
                  <div key={d} style={{ color:"#475569",fontSize:10,textAlign:"center",paddingBottom:4 }}>{d}</div>
                ))}
                {calData.map((d,i)=>(
                  <div key={i} style={{ aspectRatio:"1",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,background:d.status==="present"?"#16a34a22":d.status==="leave"?"#f59e0b22":"#7f1d1d22",color:d.status==="present"?"#4ade80":d.status==="leave"?"#fbbf24":"#f87171",border:`1px solid ${d.status==="present"?"#16a34a44":d.status==="leave"?"#f59e0b44":"#ef444444"}` }}>
                    {d.day}
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",gap:16,marginTop:14 }}>
                {[["Present","#4ade80"],["Absent","#f87171"],["Leave","#fbbf24"]].map(([l,c])=>(
                  <div key={l} style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <div style={{ width:10,height:10,borderRadius:3,background:c }} />
                    <span style={{ color:"#94a3b8",fontSize:11 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==="leave" && (
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20,maxWidth:500 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:16 }}>Apply for Leave</div>
            <div style={{ marginBottom:12 }}>
              <div style={{ color:"#94a3b8",fontSize:12,marginBottom:4 }}>Leave Type</div>
              <select value={leaveForm.type} onChange={e=>setLeaveForm(p=>({...p,type:e.target.value}))} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,boxSizing:"border-box" }}>
                {["Casual Leave","Sick Leave","Annual Leave","Work From Home","Compensatory Off"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            {[["From Date","from","date"],["To Date","to","date"],["Reason","reason","text"]].map(([l,k,t])=>(
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ color:"#94a3b8",fontSize:12,marginBottom:4 }}>{l}</div>
                {k==="reason"?<textarea value={leaveForm[k]} onChange={e=>setLeaveForm(p=>({...p,[k]:e.target.value}))} rows={3} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,resize:"vertical",boxSizing:"border-box" }} />
                :<input type={t} value={leaveForm[k]} onChange={e=>setLeaveForm(p=>({...p,[k]:e.target.value}))} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,boxSizing:"border-box" }} />}
              </div>
            ))}
            <div style={{ marginBottom:12 }}>
              <div style={{ color:"#94a3b8",fontSize:12,marginBottom:4 }}>Upload Proof (optional)</div>
              <label style={{ display:"flex",alignItems:"center",gap:10,background:"#1e293b",border:"1px dashed #334155",borderRadius:8,padding:"10px 14px",cursor:"pointer" }}>
                <Upload size={16} color="#64748b"/>
                <span style={{ color:"#64748b",fontSize:13 }}>Click to upload document</span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e=>{if(e.target.files[0])toast(`File "${e.target.files[0].name}" attached!`);}}/>
              </label>
            </div>
            <div style={{ background:"#1e293b",borderRadius:10,padding:12,marginBottom:14 }}>
              <div style={{ color:"#94a3b8",fontSize:12,marginBottom:4 }}>Leave Balance</div>
              {[["Casual","8 days"],["Sick","5 days"],["Annual","12 days"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                  <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
                  <span style={{ color:"#22c55e",fontSize:12,fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={applyLeave} style={{ width:"100%",background:"linear-gradient(135deg,#16a34a,#0891b2)",color:"#fff",border:"none",borderRadius:10,padding:"10px 0",fontSize:14,fontWeight:600,cursor:"pointer" }}>Submit Application</button>
          </div>
        )}
        {tab==="history" && (
          <div>
            {leaves.map((l,i)=>(
              <div key={i} style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:18,marginBottom:12,display:"flex",alignItems:"center",gap:16 }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#e2e8f0",fontWeight:600 }}>{l.type}</div>
                  <div style={{ color:"#64748b",fontSize:12,marginTop:2 }}>{l.from} to {l.to} · {l.days} day{l.days>1?"s":""}</div>
                </div>
                <span style={{ background:l.status==="Approved"?"#16a34a22":l.status==="Pending"?"#f59e0b22":"#7f1d1d22",color:l.status==="Approved"?"#4ade80":l.status==="Pending"?"#fbbf24":"#f87171",padding:"4px 12px",borderRadius:20,fontSize:12 }}>{l.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22c55e33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <HexSpinner color="#22c55e" />
          <div style={{ color:"#22c55e",fontSize:13,fontWeight:700,marginTop:8 }}>Attendance Tracker</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginTop:16 }}>
          {[["This Month","91%"],["Leaves Taken","3"],["Balance Leaves","22"],["WFH Days","4"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PayrollPage({ toast }) {
  const slips = [
    { month:"May 2025", gross:"₹85,000", deductions:"₹12,400", net:"₹72,600", status:"Paid" },
    { month:"Apr 2025", gross:"₹85,000", deductions:"₹12,400", net:"₹72,600", status:"Paid" },
    { month:"Mar 2025", gross:"₹85,000", deductions:"₹11,800", net:"₹73,200", status:"Paid" },
    { month:"Feb 2025", gross:"₹85,000", deductions:"₹11,800", net:"₹73,200", status:"Paid" },
  ];
  const breakdown = [
    { label:"Basic Salary", amount:"₹42,500", type:"credit" },
    { label:"HRA", amount:"₹17,000", type:"credit" },
    { label:"Special Allowance", amount:"₹18,500", type:"credit" },
    { label:"Performance Bonus", amount:"₹7,000", type:"credit" },
    { label:"PF Deduction", amount:"-₹5,100", type:"debit" },
    { label:"Professional Tax", amount:"-₹200", type:"debit" },
    { label:"TDS", amount:"-₹7,100", type:"debit" },
  ];
  const trendData = [
    {month:"Jan",net:71200},{month:"Feb",net:73200},{month:"Mar",net:73200},
    {month:"Apr",net:72600},{month:"May",net:72600},
  ];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>Payroll & Salary</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24 }}>
          {[["Gross Salary","₹85,000","#22d3ee"],["Deductions","₹12,400","#f87171"],["Net Pay","₹72,600","#22c55e"]].map(([k,v,c])=>(
            <div key={k} style={{ background:"#0f172a",border:`1px solid ${c}33`,borderRadius:14,padding:20,textAlign:"center" }}>
              <div style={{ color:"#64748b",fontSize:12,marginBottom:8 }}>{k}</div>
              <div style={{ color:c,fontSize:28,fontWeight:700 }}>{v}</div>
              <div style={{ color:"#64748b",fontSize:11,marginTop:4 }}>May 2025</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20 }}>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>May 2025 Breakdown</div>
            {breakdown.map((b,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<breakdown.length-1?"1px solid #1e293b":"none" }}>
                <span style={{ color:"#94a3b8",fontSize:13 }}>{b.label}</span>
                <span style={{ color:b.type==="credit"?"#4ade80":"#f87171",fontSize:13,fontWeight:600 }}>{b.amount}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Net Pay Trend</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#475569" tick={{fontSize:11}} />
                <YAxis stroke="#475569" tick={{fontSize:11}} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{background:"#0f172a",border:"1px solid #1e293b"}} formatter={v=>[`₹${v.toLocaleString()}`,"Net Pay"]} />
                <Area type="monotone" dataKey="net" stroke="#22c55e" strokeWidth={2} fill="url(#payGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
          <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Salary Slips</div>
          {slips.map((s,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",gap:16,padding:"12px 0",borderBottom:i<slips.length-1?"1px solid #1e293b":"none" }}>
              <div style={{ background:"#16a34a22",padding:10,borderRadius:8 }}><FileText size={16} color="#4ade80" /></div>
              <div style={{ flex:1 }}>
                <div style={{ color:"#e2e8f0",fontWeight:600 }}>{s.month}</div>
                <div style={{ color:"#64748b",fontSize:12 }}>Gross: {s.gross} · Net: {s.net}</div>
              </div>
              <span style={{ background:"#16a34a22",color:"#4ade80",padding:"3px 10px",borderRadius:20,fontSize:12 }}>{s.status}</span>
              <button onClick={()=>toast(`${s.month} payslip downloaded`)} style={{ background:"#1e293b",color:"#60a5fa",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
                <Download size={12} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22c55e33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <TrophyScene />
          <div style={{ color:"#22c55e",fontSize:13,fontWeight:700,marginTop:8 }}>Salary Hub</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginTop:16 }}>
          {[["Annual CTC","₹10.2 LPA"],["YTD Earned","₹3.6 L"],["Tax Paid","₹35,500"],["Bonus","₹7,000"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PerformancePage({ toast }) {
  const radarData = [
    {subject:"Productivity",A:82},{subject:"Quality",A:88},{subject:"Teamwork",A:91},
    {subject:"Learning",A:76},{subject:"Punctuality",A:95},{subject:"Communication",A:78},
  ];
  const reviewData = [
    {quarter:"Q1",score:78},{quarter:"Q2",score:82},{quarter:"Q3",score:80},{quarter:"Q4 (Est)",score:86},
  ];
  const reviews = [
    { reviewer:"Manager — Sunita V.", date:"Mar 2025", score:"82/100", comment:"Ananya shows consistent improvement in deliverables. Strong in communication and team collaboration." },
    { reviewer:"Peer Review", date:"Mar 2025", score:"88/100", comment:"Always ready to help and very reliable team member. Great problem-solving skills." },
  ];
  const goals = [
    { title:"Complete AWS Certification", progress:35, due:"Aug 2025" },
    { title:"Lead a sprint independently", progress:60, due:"Jul 2025" },
    { title:"Mentor 2 junior employees", progress:80, due:"Jun 2025" },
  ];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>Performance Reviews</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20 }}>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Skills Radar</div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{fill:"#64748b",fontSize:10}} />
                <Radar dataKey="A" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Quarterly Scores</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="quarter" stroke="#475569" tick={{fontSize:11}} />
                <YAxis stroke="#475569" tick={{fontSize:11}} domain={[60,100]} />
                <Tooltip contentStyle={{background:"#0f172a",border:"1px solid #1e293b"}} />
                <Bar dataKey="score" fill="#a78bfa" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20,marginBottom:20 }}>
          <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Goals & Progress</div>
          {goals.map((g,i)=>(
            <div key={i} style={{ marginBottom:16 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                <span style={{ color:"#e2e8f0",fontSize:13 }}>{g.title}</span>
                <span style={{ color:"#64748b",fontSize:12 }}>Due {g.due}</span>
              </div>
              <div style={{ background:"#1e293b",borderRadius:999,height:6,marginBottom:4 }}>
                <div style={{ width:`${g.progress}%`,background:"linear-gradient(90deg,#a78bfa,#22d3ee)",borderRadius:999,height:"100%" }} />
              </div>
              <div style={{ color:"#94a3b8",fontSize:11,textAlign:"right" }}>{g.progress}%</div>
            </div>
          ))}
          <button onClick={()=>toast("Goal added!")} style={{ background:"#1e293b",color:"#94a3b8",border:"1px dashed #334155",borderRadius:8,padding:"8px 16px",fontSize:12,cursor:"pointer",width:"100%" }}>+ Add Goal</button>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
          <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Recent Reviews</div>
          {reviews.map((r,i)=>(
            <div key={i} style={{ background:"#1e293b",borderRadius:12,padding:16,marginBottom:12 }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                <span style={{ color:"#60a5fa",fontSize:13,fontWeight:600 }}>{r.reviewer}</span>
                <div style={{ display:"flex",gap:8 }}>
                  <span style={{ color:"#fbbf24",fontSize:12 }}>{r.score}</span>
                  <span style={{ color:"#64748b",fontSize:12 }}>{r.date}</span>
                </div>
              </div>
              <div style={{ color:"#94a3b8",fontSize:13,lineHeight:1.5 }}>{r.comment}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #a78bfa33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <TrophyScene />
          <div style={{ color:"#a78bfa",fontSize:13,fontWeight:700,marginTop:8 }}>Performance</div>
          <div style={{ color:"#94a3b8",fontSize:12,marginTop:4 }}>Score: 84/100</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginTop:16 }}>
          {[["Current Rating","4.2/5"],["Rank","#12 / 80"],["Goals Done","3/5"],["Appraisal","Jul 2025"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIPage({ toast }) {
  const [msgs,setMsgs]=useState([{role:"assistant",text:"Hi Ananya! I am your AI work assistant. Ask me anything about your tasks, courses, HR policies, career growth, or anything work-related!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=async()=>{
    if(!input.trim()||loading)return;
    const userMsg=input.trim();setInput("");
    setMsgs(p=>[...p,{role:"user",text:userMsg}]);setLoading(true);
    try{
      const token=localStorage.getItem("token");
      const res=await fetch("http://localhost:5000/api/ai/chat",{method:"POST",headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({message:userMsg})});
      const data=await res.json();
      setMsgs(p=>[...p,{role:"assistant",text:data.data?.reply||data.message||"Sorry, try again."}]);
    }catch{setMsgs(p=>[...p,{role:"assistant",text:"Connection error. Please try again."}]);}
    setLoading(false);
  };
  const prompts=["What courses should I take for AWS?","How do I apply for leave?","Tips to improve my performance score","Summarize my Q2 goals"];
  return (
    <div style={{ display:"flex", gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:16 }}>AI Work Assistant</div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,height:420,overflowY:"auto",padding:20,marginBottom:14,display:"flex",flexDirection:"column",gap:12 }}>
          {msgs.map((m,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"75%",background:m.role==="user"?"linear-gradient(135deg,#16a34a,#0891b2)":"#1e293b",color:"#e2e8f0",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap" }}>{m.text}</div>
            </div>
          ))}
          {loading&&<div style={{ display:"flex",justifyContent:"flex-start" }}><div style={{ background:"#1e293b",color:"#64748b",padding:"10px 14px",borderRadius:"14px 14px 14px 4px",fontSize:13 }}>Thinking...</div></div>}
          <div ref={bottomRef}/>
        </div>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:12 }}>
          {prompts.map(p=><button key={p} onClick={()=>setInput(p)} style={{ background:"#1e293b",color:"#94a3b8",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer" }}>{p}</button>)}
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything..." style={{ flex:1,background:"#1e293b",border:"1px solid #334155",borderRadius:10,color:"#e2e8f0",padding:"10px 14px",fontSize:14,boxSizing:"border-box" }}/>
          <button onClick={send} disabled={loading} style={{ background:"linear-gradient(135deg,#16a34a,#0891b2)",color:"#fff",border:"none",borderRadius:10,padding:"10px 18px",cursor:"pointer" }}><Send size={18}/></button>
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22d3ee33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <OrbitalScene color="#22d3ee"/>
          <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginTop:8 }}>AI Powered</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginTop:16 }}>
          {["HR Policies","Course Advice","Career Growth","Task Help","Work Tips"].map(c=>(
            <div key={c} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7 }}>
              <Zap size={11} color="#22d3ee"/>
              <span style={{ color:"#cbd5e1",fontSize:12 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TicketsPage({ toast }) {
  const [form,setForm]=useState({subject:"",category:"IT Support",priority:"Medium",desc:""});
  const [tickets,setTickets]=useState([
    {id:"TKT-301",subject:"Laptop running slow",category:"IT Support",priority:"High",status:"Open",date:"2025-06-01"},
    {id:"TKT-289",subject:"Salary discrepancy in April",category:"Payroll",priority:"High",status:"Resolved",date:"2025-05-15"},
  ]);
  const submit=()=>{
    if(!form.subject||!form.desc){toast("Fill all fields","warn");return;}
    const id=`TKT-${300+tickets.length+1}`;
    setTickets(p=>[{...form,id,status:"Open",date:new Date().toISOString().slice(0,10)},...p]);
    setForm({subject:"",category:"IT Support",priority:"Medium",desc:""});
    toast(`Ticket ${id} raised!`);
  };
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>Support Tickets</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Raise a Ticket</div>
            {[["Subject","subject","text"],["Description","desc","textarea"]].map(([l,k,t])=>(
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ color:"#94a3b8",fontSize:12,marginBottom:4 }}>{l}</div>
                {t==="textarea"?<textarea value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} rows={4} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,resize:"vertical",boxSizing:"border-box" }}/>
                :<input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,boxSizing:"border-box" }}/>}
              </div>
            ))}
            {[["Category","category",["IT Support","Payroll","HR","Facilities","Access"]],["Priority","priority",["Low","Medium","High"]]].map(([l,k,opts])=>(
              <div key={k} style={{ marginBottom:12 }}>
                <div style={{ color:"#94a3b8",fontSize:12,marginBottom:4 }}>{l}</div>
                <select value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,boxSizing:"border-box" }}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={submit} style={{ width:"100%",background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",color:"#fff",border:"none",borderRadius:10,padding:"10px 0",fontSize:14,fontWeight:600,cursor:"pointer" }}>Raise Ticket</button>
          </div>
          <div>
            {tickets.map((t,i)=>(
              <div key={i} style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:18,marginBottom:14 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                  <span style={{ color:"#60a5fa",fontSize:12,fontWeight:600 }}>{t.id}</span>
                  <span style={{ background:t.status==="Open"?"#f59e0b22":"#16a34a22",color:t.status==="Open"?"#f59e0b":"#4ade80",fontSize:11,padding:"2px 8px",borderRadius:6 }}>{t.status}</span>
                </div>
                <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:4 }}>{t.subject}</div>
                <div style={{ color:"#64748b",fontSize:12 }}>{t.category} · {t.priority} · {t.date}</div>
                {t.status==="Open"&&<button onClick={()=>{setTickets(p=>p.map((x,j)=>j===i?{...x,status:"Resolved"}:x));toast(`${t.id} resolved`);}} style={{ marginTop:10,background:"#16a34a22",color:"#4ade80",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer" }}>Mark Resolved</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #a78bfa33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <HexSpinner color="#a78bfa"/>
          <div style={{ color:"#a78bfa",fontSize:13,fontWeight:700,marginTop:8 }}>Support Center</div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ toast }) {
  const [editing,setEditing]=useState(false);
  const [profile,setProfile]=useState({name:"Ananya Sharma",email:"ananya@elevateiq.com",phone:"+91 98765 43210",department:"Engineering",designation:"Senior Developer",empId:"EMP-2047",joined:"Jan 2022",manager:"Sunita Verma"});
  const [skills,setSkills]=useState(["React","TypeScript","Node.js","AWS","GraphQL"]);
  const [newSkill,setNewSkill]=useState("");
  const save=()=>{setEditing(false);toast("Profile updated!");};
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>My Profile</div>
        <div style={{ background:"linear-gradient(135deg,#0a1628,#0f1a2e)",border:"1px solid #16a34a33",borderRadius:16,padding:24,marginBottom:20,display:"flex",gap:20,alignItems:"center" }}>
          <div style={{ width:72,height:72,background:"linear-gradient(135deg,#16a34a,#0891b2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:"#fff",flexShrink:0 }}>A</div>
          <div style={{ flex:1 }}>
            {editing?<input value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))} style={{ background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"6px 10px",fontSize:18,fontWeight:700,width:"100%",boxSizing:"border-box" }}/>
            :<div style={{ color:"#f1f5f9",fontSize:20,fontWeight:700 }}>{profile.name}</div>}
            <div style={{ color:"#4ade80",fontSize:13,marginTop:4 }}>{profile.designation} · {profile.department}</div>
            <div style={{ color:"#94a3b8",fontSize:12,marginTop:2 }}>{profile.empId} · Joined {profile.joined}</div>
          </div>
          <button onClick={()=>editing?save():setEditing(true)} style={{ background:editing?"#16a34a":"#1d4ed8",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
            {editing?<><Check size={14}/>Save</>:<><Edit size={14}/>Edit</>}
          </button>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16,marginBottom:20 }}>
          {[["Email","email"],["Phone","phone"],["Manager","manager"],["Employee ID","empId"]].map(([l,k])=>(
            <div key={k} style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,padding:16 }}>
              <div style={{ color:"#64748b",fontSize:12,marginBottom:4 }}>{l}</div>
              {editing?<input value={profile[k]} onChange={e=>setProfile(p=>({...p,[k]:e.target.value}))} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"6px 10px",fontSize:13,boxSizing:"border-box" }}/>
              :<div style={{ color:"#e2e8f0",fontSize:13 }}>{profile[k]}</div>}
            </div>
          ))}
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
          <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:12 }}>Skills</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:12 }}>
            {skills.map(s=>(
              <span key={s} style={{ background:"#16a34a22",color:"#4ade80",border:"1px solid #16a34a44",borderRadius:20,padding:"4px 12px",fontSize:12,display:"flex",alignItems:"center",gap:6 }}>
                {s}{editing&&<X size={10} style={{ cursor:"pointer" }} onClick={()=>setSkills(p=>p.filter(x=>x!==s))}/>}
              </span>
            ))}
          </div>
          {editing&&<div style={{ display:"flex",gap:8 }}>
            <input value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="Add skill..." style={{ flex:1,background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"7px 10px",fontSize:13,boxSizing:"border-box" }}/>
            <button onClick={()=>{if(newSkill){setSkills(p=>[...p,newSkill]);setNewSkill("");}}} style={{ background:"#16a34a",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,cursor:"pointer" }}>Add</button>
          </div>}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22c55e33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <FloatingCube color="#22c55e"/>
          <div style={{ color:"#22c55e",fontSize:13,fontWeight:700,marginTop:8 }}>My Profile</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16,marginTop:16 }}>
          {[["Team","Engineering"],["Experience","3.5 yrs"],["Projects","12"],["Certifications","2"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EmployeeDashboard() {
  const [page,setPage]=useState("dashboard");
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const {toasts,add:toast,remove}=useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitials = (user.name || "U").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const pageMap={
    dashboard:<DashboardPage toast={toast}/>,
    attendance:<AttendancePage toast={toast}/>,
    payroll:<PayrollPage toast={toast}/>,
    performance:<PerformancePage toast={toast}/>,
    ai:<AIPage toast={toast}/>,
    tickets:<TicketsPage toast={toast}/>,
    profile:<ProfilePage toast={toast}/>,
  };

  return (
    <div style={{ display:"flex",minHeight:"100vh",background:"#020917",fontFamily:"Inter,system-ui,sans-serif",color:"#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#0f172a;}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:99px;}
        input[type=date]::-webkit-calendar-picker-indicator,input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
        @keyframes slideIn{from{transform:translateX(20px);opacity:0;}to{transform:translateX(0);opacity:1;}}
      `}</style>

      <div style={{ width:sidebarOpen?220:64,flexShrink:0,background:"#030712",borderRight:"1px solid #0f172a",transition:"width 0.25s ease",overflow:"hidden",display:"flex",flexDirection:"column" }}>
        <div style={{ padding:"20px 16px",borderBottom:"1px solid #0f172a",display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:34,height:34,background:"linear-gradient(135deg,#16a34a,#0891b2)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff",flexShrink:0 }}>E</div>
          {sidebarOpen&&<div><div style={{ color:"#f1f5f9",fontWeight:700,fontSize:15,whiteSpace:"nowrap" }}>ElevateIQ</div><div style={{ color:"#64748b",fontSize:11 }}>Employee Portal</div></div>}
        </div>
        <nav style={{ flex:1,padding:"12px 8px",overflowY:"auto" }}>
          {NAV.map(({id,label,icon:Icon})=>{
            const active=page===id;
            return <div key={id} onClick={()=>setPage(id)} style={{ display:"flex",alignItems:"center",gap:12,padding:"9px 10px",borderRadius:10,marginBottom:3,cursor:"pointer",background:active?"#16a34a22":"transparent",color:active?"#4ade80":"#64748b",borderLeft:active?"2px solid #16a34a":"2px solid transparent" }}
              onMouseEnter={e=>{if(!active)e.currentTarget.style.background="#1e293b";}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}>
              <Icon size={18} style={{ flexShrink:0 }}/>
              {sidebarOpen&&<span style={{ fontSize:13,fontWeight:active?600:400,whiteSpace:"nowrap" }}>{label}</span>}
            </div>;
          })}
        </nav>
        {sidebarOpen&&<div style={{ padding:16,borderTop:"1px solid #0f172a" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10 }}>
            <div style={{ width:30,height:30,background:"linear-gradient(135deg,#16a34a,#0891b2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700 }}>{userInitials}</div>
            <div><div style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{user.name||"Employee"}</div><div style={{ color:"#64748b",fontSize:10 }}>Employee</div></div>
          </div>
          <button onClick={handleLogout} style={{ width:"100%",marginTop:8,background:"#7f1d1d22",color:"#f87171",border:"1px solid #ef444433",borderRadius:8,padding:"7px 12px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,justifyContent:"center" }}>
            <LogOut size={13}/>Sign Out
          </button>
        </div>}
        {!sidebarOpen&&<div style={{ padding:"8px",borderTop:"1px solid #0f172a" }}>
          <button onClick={handleLogout} style={{ width:"100%",background:"#7f1d1d22",color:"#f87171",border:"1px solid #ef444433",borderRadius:8,padding:"8px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <LogOut size={14}/>
          </button>
        </div>}
      </div>

      <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
        <div style={{ background:"#030712",borderBottom:"1px solid #0f172a",padding:"0 24px",height:56,display:"flex",alignItems:"center",gap:16,flexShrink:0 }}>
          <button onClick={()=>setSidebarOpen(p=>!p)} style={{ background:"none",border:"none",color:"#64748b",cursor:"pointer",padding:4 }}><Menu size={20}/></button>
          <div style={{ color:"#e2e8f0",fontWeight:600,fontSize:15 }}>{NAV.find(n=>n.id===page)?.label||"Dashboard"}</div>
          <div style={{ flex:1 }}/>
          <div style={{ display:"flex",alignItems:"center",background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"6px 12px",gap:8,width:200 }}>
            <Search size={14} color="#64748b"/>
            <input placeholder="Search..." style={{ background:"none",border:"none",color:"#94a3b8",fontSize:12,outline:"none",width:"100%" }}/>
          </div>
          <div style={{ position:"relative",cursor:"pointer" }} onClick={()=>toast("No new notifications")}>
            <Bell size={18} color="#64748b"/>
            <div style={{ position:"absolute",top:-3,right:-3,width:8,height:8,background:"#ef4444",borderRadius:"50%" }}/>
          </div>
          <div style={{ width:32,height:32,background:"linear-gradient(135deg,#16a34a,#0891b2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer" }}>A</div>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:24 }}>
          {pageMap[page]}
        </div>
      </div>

      <Toast toasts={toasts} remove={remove}/>
    </div>
  );
}