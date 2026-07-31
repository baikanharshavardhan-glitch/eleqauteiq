import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, Calendar, DollarSign, BarChart2,
  Bell, Menu, Search, X, AlertCircle, Download,
  Activity, CheckCircle,
  LogIn, LogOut, Clock, Eye, User, Phone, Mail, Hash,
  ChevronDown, Shield, BookOpen, Settings,
  UserCheck, UserX, Plus, ArrowLeft, CreditCard, Building2,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

const DEPARTMENTS = ["Engineering", "Design", "DevOps", "QA", "Product", "HR", "Finance", "Marketing", "Sales"];
const COURSES = [
  "React Advanced", "Node.js Microservices", "AWS Cloud", "Docker & K8s",
  "System Design", "Python ML", "Data Structures & Algorithms",
  "Full Stack Development", "TypeScript Mastery", "GraphQL APIs",
];
const BATCHES = ["B-10", "B-11", "B-12", "B-13", "B-14"];

const INITIAL_EMPLOYEES = [
  { id:"EMP-2047", name:"Ananya Sharma",  dob:"1995-03-12", phone:"+91 98765 43210", email:"ananya@elevateiq.com",  dept:"Engineering", role:"Senior Developer",  status:"Active",   avatar:"A",
    bank:{ account:"4521 8876 0012 3344", ifsc:"HDFC0001234", bank:"HDFC Bank", branch:"Koramangala, Bangalore" },
    pay:{ basic:55000, hra:22000, ta:5000, medical:2000, pf:6600, tax:3800, other:1200 }
  },
  { id:"EMP-2031", name:"Rohan Mehta",    dob:"1992-07-25", phone:"+91 91234 56789", email:"rohan@elevateiq.com",    dept:"Engineering", role:"Tech Lead",         status:"Active",   avatar:"R",
    bank:{ account:"6712 3345 9988 1100", ifsc:"ICIC0002345", bank:"ICICI Bank", branch:"Whitefield, Bangalore" },
    pay:{ basic:75000, hra:30000, ta:6000, medical:2500, pf:9000, tax:7500, other:2000 }
  },
  { id:"EMP-2019", name:"Priya Nair",     dob:"1997-11-08", phone:"+91 99887 65432", email:"priya@elevateiq.com",    dept:"Design",      role:"UI/UX Designer",    status:"Active",   avatar:"P",
    bank:{ account:"1234 5678 9012 3456", ifsc:"SBIN0003456", bank:"State Bank of India", branch:"MG Road, Bangalore" },
    pay:{ basic:50000, hra:20000, ta:4500, medical:2000, pf:6000, tax:3200, other:800 }
  },
  { id:"EMP-2055", name:"Arjun Kumar",    dob:"1993-05-19", phone:"+91 88776 54321", email:"arjun@elevateiq.com",    dept:"DevOps",      role:"DevOps Engineer",   status:"Active",   avatar:"A",
    bank:{ account:"9988 7766 5544 3322", ifsc:"AXIS0004567", bank:"Axis Bank", branch:"Electronic City, Bangalore" },
    pay:{ basic:60000, hra:24000, ta:5500, medical:2000, pf:7200, tax:5000, other:1300 }
  },
  { id:"EMP-2060", name:"Sneha Reddy",    dob:"1998-09-02", phone:"+91 77665 43210", email:"sneha@elevateiq.com",    dept:"QA",          role:"QA Engineer",       status:"On Leave", avatar:"S",
    bank:{ account:"2233 4455 6677 8899", ifsc:"PUNB0005678", bank:"Punjab National Bank", branch:"HSR Layout, Bangalore" },
    pay:{ basic:45000, hra:18000, ta:4000, medical:2000, pf:5400, tax:2400, other:600 }
  },
  { id:"EMP-2071", name:"Vikram Tiwari",  dob:"1990-12-30", phone:"+91 66554 32109", email:"vikram@elevateiq.com",   dept:"Product",     role:"Product Manager",   status:"Active",   avatar:"V",
    bank:{ account:"5544 3322 1100 9988", ifsc:"KOTAK0006789", bank:"Kotak Mahindra Bank", branch:"Indiranagar, Bangalore" },
    pay:{ basic:80000, hra:32000, ta:7000, medical:3000, pf:9600, tax:9500, other:2500 }
  },
  { id:"EMP-2082", name:"Kavya Pillai",   dob:"1996-04-14", phone:"+91 55443 21098", email:"kavya@elevateiq.com",    dept:"HR",          role:"HR Manager",        status:"Active",   avatar:"K",
    bank:{ account:"7766 8899 0011 2233", ifsc:"HDFC0007890", bank:"HDFC Bank", branch:"JP Nagar, Bangalore" },
    pay:{ basic:58000, hra:23200, ta:5000, medical:2000, pf:6960, tax:4800, other:1040 }
  },
  { id:"EMP-2091", name:"Aditya Singh",   dob:"1994-08-22", phone:"+91 44332 10987", email:"aditya@elevateiq.com",   dept:"Finance",     role:"Finance Analyst",   status:"Inactive", avatar:"A",
    bank:{ account:"3344 5566 7788 9900", ifsc:"ICIC0008901", bank:"ICICI Bank", branch:"Bellandur, Bangalore" },
    pay:{ basic:52000, hra:20800, ta:4500, medical:2000, pf:6240, tax:3600, other:860 }
  },
];

const INITIAL_STUDENTS = [
  { id:"STU-1001", name:"Meera Joshi",   dob:"2001-06-15", phone:"+91 98111 22333", email:"meera@student.com",   course:"React Advanced",       batch:"B-12", status:"Active",    avatar:"M" },
  { id:"STU-1002", name:"Kiran Patel",   dob:"2000-11-03", phone:"+91 97222 33444", email:"kiran@student.com",   course:"Node.js Microservices", batch:"B-11", status:"Active",    avatar:"K" },
  { id:"STU-1003", name:"Divya Rao",     dob:"2002-02-28", phone:"+91 96333 44555", email:"divya@student.com",   course:"AWS Cloud",            batch:"B-12", status:"Active",    avatar:"D" },
  { id:"STU-1004", name:"Rahul Gupta",   dob:"1999-09-10", phone:"+91 95444 55666", email:"rahul@student.com",   course:"Docker & K8s",         batch:"B-10", status:"Completed", avatar:"R" },
  { id:"STU-1005", name:"Pooja Verma",   dob:"2001-04-22", phone:"+91 94555 66777", email:"pooja@student.com",   course:"System Design",        batch:"B-12", status:"Active",    avatar:"P" },
  { id:"STU-1006", name:"Nikhil Das",    dob:"2000-07-17", phone:"+91 93666 77888", email:"nikhil@student.com",  course:"React Advanced",       batch:"B-11", status:"Dropped",   avatar:"N" },
];

const generateSeedLogs = (employees) => {
  const logs = [];
  const today = new Date();
  employees.forEach(emp => {
    for (let d = 1; d < 8; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - d);
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      const dateStr = date.toISOString().slice(0, 10);
      const loginH = 8 + Math.floor(Math.random() * 2);
      const loginM = Math.floor(Math.random() * 59);
      const logoutH = 17 + Math.floor(Math.random() * 2);
      const logoutM = Math.floor(Math.random() * 59);
      const loginTime  = `${String(loginH).padStart(2,"0")}:${String(loginM).padStart(2,"0")}`;
      const logoutTime = `${String(logoutH).padStart(2,"0")}:${String(logoutM).padStart(2,"0")}`;
      logs.push({
        id: `${emp.id}-${dateStr}`,
        empId: emp.id, empName: emp.name, dept: emp.dept,
        phone: emp.phone, email: emp.email,
        date: dateStr, loginTime, logoutTime,
        status: loginH >= 10 ? "Late" : "On Time",
      });
    }
  });
  return logs.sort((a, b) => b.date.localeCompare(a.date));
};

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
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + rot;
        i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
                : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    }
    function draw() {
      ctx.clearRect(0, 0, 320, 320);
      [100, 75, 50, 25].forEach((r, i) => {
        hex(r, t * (i % 2 === 0 ? 1 : -1) * 0.5);
        ctx.strokeStyle = color + ["ff","bb","77","44"][i];
        ctx.lineWidth = 2; ctx.stroke();
        if (i === 0) { ctx.fillStyle = color + "11"; ctx.fill(); }
      });
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t;
        ctx.beginPath(); ctx.arc(cx + 100 * Math.cos(a), cy + 100 * Math.sin(a), 4, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
      }
      t += 0.015; frame = requestAnimationFrame(draw);
    }
    draw(); return () => cancelAnimationFrame(frame);
  }, [color]);
  return <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />;
}

function Toast({ toasts, remove }) {
  return (
    <div style={{ position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background:t.type==="error"?"#7f1d1d":t.type==="warn"?"#78350f":"#052e16",border:`1px solid ${t.type==="error"?"#ef4444":t.type==="warn"?"#f59e0b":"#22c55e"}`,color:"#f1f5f9",padding:"12px 18px",borderRadius:10,fontSize:13,display:"flex",alignItems:"center",gap:10,minWidth:260,boxShadow:"0 8px 32px #0008",animation:"slideIn 0.3s ease" }}>
          {t.type==="error"?<AlertCircle size={16} color="#ef4444"/>:<CheckCircle size={16} color="#22c55e"/>}
          {t.msg}
          <X size={14} style={{ marginLeft:"auto",cursor:"pointer",opacity:0.6 }} onClick={()=>remove(t.id)}/>
        </div>
      ))}
    </div>
  );
}
function useToast() {
  const [toasts,setToasts]=useState([]);
  const add=(msg,type="success")=>{const id=Date.now();setToasts(p=>[...p,{id,msg,type}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3500);};
  const remove=id=>setToasts(p=>p.filter(t=>t.id!==id));
  return{toasts,add,remove};
}

const NAV = [
  { id:"dashboard",  label:"Dashboard",    icon:LayoutDashboard },
  { id:"search",     label:"Search People", icon:Search },
  { id:"employees",  label:"Employees",     icon:Users },
  { id:"students",   label:"Students",      icon:BookOpen },
  { id:"attendance", label:"Attendance",    icon:Calendar },
  { id:"payroll",    label:"Payroll",       icon:DollarSign },
  { id:"reports",    label:"Reports",       icon:BarChart2 },
  { id:"settings",   label:"Settings",      icon:Settings },
];

function Avatar({ letter, size = 36 }) {
  const colors = { A:"#16a34a",R:"#0891b2",P:"#a78bfa",S:"#f59e0b",V:"#f87171",K:"#22d3ee",M:"#ec4899",D:"#84cc16",N:"#f97316" };
  const bg = colors[letter] || "#475569";
  return (
    <div style={{ width:size,height:size,background:`linear-gradient(135deg,${bg},${bg}99)`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:size*0.38,fontWeight:700,flexShrink:0 }}>{letter}</div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Active:    { bg:"#16a34a22", color:"#4ade80" },
    "On Leave":{ bg:"#f59e0b22", color:"#fbbf24" },
    Inactive:  { bg:"#7f1d1d22", color:"#f87171" },
    Completed: { bg:"#0891b222", color:"#22d3ee"  },
    Dropped:   { bg:"#7f1d1d22", color:"#f87171" },
    Paid:      { bg:"#16a34a22", color:"#4ade80" },
  };
  const s = map[status] || { bg:"#1e293b", color:"#94a3b8" };
  return <span style={{ background:s.bg,color:s.color,fontSize:11,padding:"2px 10px",borderRadius:20,display:"inline-block",fontWeight:600 }}>{status}</span>;
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div style={{ background:"#1e293b",borderRadius:10,padding:"12px 14px",display:"flex",gap:12,alignItems:"center" }}>
      <div style={{ background:"#16a34a22",padding:8,borderRadius:8,flexShrink:0 }}><Icon size={14} color="#4ade80"/></div>
      <div>
        <div style={{ color:"#64748b",fontSize:11 }}>{label}</div>
        <div style={{ color:"#e2e8f0",fontSize:13,fontWeight:600 }}>{value}</div>
      </div>
    </div>
  );
}

function DetailModal({ person, type, attendanceLogs, onClose }) {
  if (!person) return null;
  const logs = type === "employee"
    ? attendanceLogs.filter(l => l.empId === person.id).slice(0, 12)
    : [];
  const fmt = v => `₹${Number(v).toLocaleString("en-IN")}`;
  const gross = person.pay ? person.pay.basic + person.pay.hra + person.pay.ta + person.pay.medical : 0;
  const deductions = person.pay ? person.pay.pf + person.pay.tax + person.pay.other : 0;
  const net = gross - deductions;

  return (
    <div style={{ position:"fixed",inset:0,background:"#000b",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:20,padding:32,width:620,maxHeight:"90vh",overflowY:"auto",position:"relative" }} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:"absolute",top:16,right:16,background:"#1e293b",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#94a3b8" }}><X size={16}/></button>
        <div style={{ display:"flex",gap:16,alignItems:"center",marginBottom:24 }}>
          <Avatar letter={person.avatar} size={56}/>
          <div>
            <div style={{ color:"#f1f5f9",fontSize:20,fontWeight:700 }}>{person.name}</div>
            <div style={{ color:"#4ade80",fontSize:13,marginTop:2 }}>{person.role||person.course} · {person.dept||person.batch}</div>
            <div style={{ marginTop:6 }}><StatusBadge status={person.status}/></div>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20 }}>
          <InfoRow icon={Hash}  label="ID"    value={person.id}/>
          <InfoRow icon={Mail}  label="Email" value={person.email}/>
          <InfoRow icon={Phone} label="Phone" value={person.phone}/>
          <InfoRow icon={User}  label={type==="employee"?"Department":"Batch"} value={person.dept||person.batch}/>
          {person.dob && <InfoRow icon={Calendar} label="Date of Birth" value={person.dob}/>}
        </div>
        {type === "employee" && person.bank && (
          <div style={{ marginBottom:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:10,fontSize:14,display:"flex",alignItems:"center",gap:8 }}><CreditCard size={15} color="#22d3ee"/>Bank Details</div>
            <div style={{ background:"#1e293b",borderRadius:12,padding:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              {[["Bank","bank"],["Branch","branch"],["Account No","account"],["IFSC Code","ifsc"]].map(([l,k])=>(
                <div key={k}>
                  <div style={{ color:"#64748b",fontSize:11 }}>{l}</div>
                  <div style={{ color:"#e2e8f0",fontSize:12,fontWeight:600,marginTop:2 }}>{person.bank[k]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {type === "employee" && person.pay && (
          <div style={{ marginBottom:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:10,fontSize:14,display:"flex",alignItems:"center",gap:8 }}><DollarSign size={15} color="#4ade80"/>Salary Breakdown</div>
            <div style={{ background:"#1e293b",borderRadius:12,padding:16 }}>
              <div style={{ color:"#64748b",fontSize:11,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em" }}>Earnings</div>
              {[["Basic Pay",person.pay.basic],["HRA",person.pay.hra],["Travel Allowance",person.pay.ta],["Medical Allowance",person.pay.medical]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #0f172a" }}>
                  <span style={{ color:"#94a3b8",fontSize:12 }}>{k}</span>
                  <span style={{ color:"#4ade80",fontSize:12,fontWeight:600 }}>{fmt(v)}</span>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",padding:"8px 0 4px",borderTop:"1px solid #22c55e44",marginTop:4 }}>
                <span style={{ color:"#e2e8f0",fontSize:13,fontWeight:700 }}>Gross</span>
                <span style={{ color:"#22c55e",fontSize:13,fontWeight:700 }}>{fmt(gross)}</span>
              </div>
              <div style={{ color:"#64748b",fontSize:11,marginTop:12,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em" }}>Deductions</div>
              {[["Provident Fund",person.pay.pf],["Income Tax (TDS)",person.pay.tax],["Other",person.pay.other]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #0f172a" }}>
                  <span style={{ color:"#94a3b8",fontSize:12 }}>{k}</span>
                  <span style={{ color:"#f87171",fontSize:12,fontWeight:600 }}>- {fmt(v)}</span>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#16a34a22",borderRadius:8,marginTop:10,border:"1px solid #16a34a33" }}>
                <span style={{ color:"#e2e8f0",fontSize:14,fontWeight:700 }}>Net Pay</span>
                <span style={{ color:"#4ade80",fontSize:16,fontWeight:700 }}>{fmt(net)}</span>
              </div>
            </div>
          </div>
        )}
        {type === "employee" && logs.length > 0 && (
          <div>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:12,fontSize:14 }}>Recent Attendance Log</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {logs.map((l, i) => (
                <div key={i} style={{ background:"#1e293b",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ color:"#94a3b8",fontSize:12,width:88 }}>{l.date}</div>
                  <div style={{ display:"flex",gap:16,flex:1 }}>
                    <span style={{ display:"flex",alignItems:"center",gap:5,color:"#4ade80",fontSize:12 }}><LogIn size={12}/>In: {l.loginTime}</span>
                    {l.logoutTime
                      ? <span style={{ display:"flex",alignItems:"center",gap:5,color:"#f87171",fontSize:12 }}><LogOut size={12}/>Out: {l.logoutTime}</span>
                      : <span style={{ color:"#64748b",fontSize:12,fontStyle:"italic" }}>Still clocked in</span>}
                  </div>
                  <span style={{ background:l.status==="Late"?"#f59e0b22":"#16a34a22",color:l.status==="Late"?"#fbbf24":"#4ade80",fontSize:11,padding:"2px 8px",borderRadius:6 }}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddEmployeePage({ onAdd, onBack, toast }) {
  const [form, setForm] = useState({
    name:"", dob:"", phone:"", email:"", dept:"Engineering", role:"", status:"Active",
    joining_date:"", password:"", confirm_password:"",
    bank_account:"", bank_ifsc:"", bank_name:"", bank_branch:"",
    pay_basic:"", pay_hra:"", pay_ta:"", pay_medical:"", pay_pf:"", pay_tax:"",
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"10px 12px", fontSize:13, boxSizing:"border-box", outline:"none" };
  const labelStyle = { color:"#64748b", fontSize:12, display:"block", marginBottom:4 };
  const submit = () => {
    if (!form.name || !form.dob || !form.phone || !form.email || !form.role || !form.joining_date) {
      toast("Please fill in all required fields", "error"); return;
    }
    if (!form.password || form.password.length < 6) {
      toast("Password must be at least 6 characters", "error"); return;
    }
    if (form.password !== form.confirm_password) {
      toast("Passwords do not match", "error"); return;
    }
    const newId = `EMP-${2100 + Math.floor(Math.random() * 900)}`;
    const newEmp = {
      id: newId,
      name: form.name, dob: form.dob, phone: form.phone, email: form.email,
      dept: form.dept, role: form.role, status: form.status,
      avatar: form.name[0].toUpperCase(),
      bank: { account: form.bank_account || "N/A", ifsc: form.bank_ifsc || "N/A", bank: form.bank_name || "N/A", branch: form.bank_branch || "N/A" },
      pay: {
        basic: Number(form.pay_basic) || 0, hra: Number(form.pay_hra) || 0,
        ta: Number(form.pay_ta) || 0, medical: Number(form.pay_medical) || 0,
        pf: Number(form.pay_pf) || 0, tax: Number(form.pay_tax) || 0, other: 0,
      },
    };
    onAdd(newEmp);
    toast(`Employee ${form.name} added successfully!`);
    onBack();
  };
  return (
    <div style={{ maxWidth:720 }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:24 }}>
        <button onClick={onBack} style={{ background:"#1e293b",border:"none",borderRadius:8,padding:"8px 10px",cursor:"pointer",color:"#94a3b8",display:"flex" }}><ArrowLeft size={16}/></button>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700 }}>Add New Employee</div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:16 }}>
        <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><User size={14}/>Personal Information</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={labelStyle}>Full Name *</label><input style={inputStyle} placeholder="e.g. Raj Sharma" value={form.name} onChange={e=>set("name",e.target.value)}/></div>
          <div><label style={labelStyle}>Date of Birth *</label><input type="date" style={inputStyle} value={form.dob} onChange={e=>set("dob",e.target.value)}/></div>
          <div><label style={labelStyle}>Phone *</label><input style={inputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
          <div><label style={labelStyle}>Email *</label><input style={inputStyle} placeholder="name@elevateiq.com" value={form.email} onChange={e=>set("email",e.target.value)}/></div>
        </div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:16 }}>
        <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><Building2 size={14}/>Job Details</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div>
            <label style={labelStyle}>Department *</label>
            <div style={{ position:"relative" }}>
              <select style={{ ...inputStyle, appearance:"none", paddingRight:32 }} value={form.dept} onChange={e=>set("dept",e.target.value)}>
                {DEPARTMENTS.map(d=><option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
            </div>
          </div>
          <div><label style={labelStyle}>Role / Designation *</label><input style={inputStyle} placeholder="e.g. Senior Developer" value={form.role} onChange={e=>set("role",e.target.value)}/></div>
          <div>
            <label style={labelStyle}>Status</label>
            <div style={{ position:"relative" }}>
              <select style={{ ...inputStyle, appearance:"none", paddingRight:32 }} value={form.status} onChange={e=>set("status",e.target.value)}>
                {["Active","Inactive","On Leave"].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
            </div>
          </div>
          <div><label style={labelStyle}>Joining Date *</label><input type="date" style={inputStyle} value={form.joining_date} onChange={e=>set("joining_date",e.target.value)}/></div>
        </div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:16 }}>
        <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><Shield size={14}/>Account Password</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={labelStyle}>Password *</label><input type="password" style={inputStyle} placeholder="Min. 6 characters" value={form.password} onChange={e=>set("password",e.target.value)}/></div>
          <div><label style={labelStyle}>Confirm Password *</label><input type="password" style={inputStyle} placeholder="Re-enter password" value={form.confirm_password} onChange={e=>set("confirm_password",e.target.value)}/></div>
        </div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:16 }}>
        <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><CreditCard size={14}/>Bank Details</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={labelStyle}>Bank Name</label><input style={inputStyle} placeholder="HDFC Bank" value={form.bank_name} onChange={e=>set("bank_name",e.target.value)}/></div>
          <div><label style={labelStyle}>Account Number</label><input style={inputStyle} placeholder="1234 5678 9012 3456" value={form.bank_account} onChange={e=>set("bank_account",e.target.value)}/></div>
          <div><label style={labelStyle}>IFSC Code</label><input style={inputStyle} placeholder="HDFC0001234" value={form.bank_ifsc} onChange={e=>set("bank_ifsc",e.target.value)}/></div>
          <div><label style={labelStyle}>Branch</label><input style={inputStyle} placeholder="Koramangala, Bangalore" value={form.bank_branch} onChange={e=>set("bank_branch",e.target.value)}/></div>
        </div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:24 }}>
        <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><DollarSign size={14}/>Salary Details (₹/month)</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14 }}>
          {[["Basic Pay","pay_basic"],["HRA","pay_hra"],["Travel Allowance","pay_ta"],["Medical Allowance","pay_medical"],["Provident Fund","pay_pf"],["Income Tax (TDS)","pay_tax"]].map(([l,k])=>(
            <div key={k}><label style={labelStyle}>{l}</label><input type="number" style={inputStyle} placeholder="0" value={form[k]} onChange={e=>set(k,e.target.value)}/></div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex",gap:12 }}>
        <button onClick={submit} style={{ background:"linear-gradient(135deg,#16a34a,#0891b2)",color:"#fff",border:"none",borderRadius:10,padding:"11px 28px",fontSize:14,fontWeight:600,cursor:"pointer" }}>Add Employee</button>
        <button onClick={onBack} style={{ background:"#1e293b",color:"#94a3b8",border:"none",borderRadius:10,padding:"11px 24px",fontSize:14,cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

function AddStudentPage({ onAdd, onBack, toast }) {
  const [form, setForm] = useState({
    name:"", dob:"", phone:"", email:"", course:"React Advanced", batch:"B-12", status:"Active",
    password:"", confirm_password:"",
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#e2e8f0", padding:"10px 12px", fontSize:13, boxSizing:"border-box", outline:"none" };
  const labelStyle = { color:"#64748b", fontSize:12, display:"block", marginBottom:4 };
  const submit = () => {
    if (!form.name || !form.dob || !form.phone || !form.email) {
      toast("Please fill in all required fields", "error"); return;
    }
    if (!form.password || form.password.length < 6) {
      toast("Password must be at least 6 characters", "error"); return;
    }
    if (form.password !== form.confirm_password) {
      toast("Passwords do not match", "error"); return;
    }
    const newId = `STU-${1100 + Math.floor(Math.random() * 900)}`;
    onAdd({ id: newId, name: form.name, dob: form.dob, phone: form.phone, email: form.email, course: form.course, batch: form.batch, status: form.status, avatar: form.name[0].toUpperCase() });
    toast(`Student ${form.name} enrolled successfully!`);
    onBack();
  };
  return (
    <div style={{ maxWidth:580 }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:24 }}>
        <button onClick={onBack} style={{ background:"#1e293b",border:"none",borderRadius:8,padding:"8px 10px",cursor:"pointer",color:"#94a3b8",display:"flex" }}><ArrowLeft size={16}/></button>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700 }}>Enroll New Student</div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:16 }}>
        <div style={{ color:"#a78bfa",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><User size={14}/>Personal Information</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={labelStyle}>Full Name *</label><input style={inputStyle} placeholder="e.g. Meera Joshi" value={form.name} onChange={e=>set("name",e.target.value)}/></div>
          <div><label style={labelStyle}>Date of Birth *</label><input type="date" style={inputStyle} value={form.dob} onChange={e=>set("dob",e.target.value)}/></div>
          <div><label style={labelStyle}>Phone *</label><input style={inputStyle} placeholder="+91 98111 22333" value={form.phone} onChange={e=>set("phone",e.target.value)}/></div>
          <div><label style={labelStyle}>Email *</label><input style={inputStyle} placeholder="name@student.com" value={form.email} onChange={e=>set("email",e.target.value)}/></div>
        </div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:24 }}>
        <div style={{ color:"#a78bfa",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><BookOpen size={14}/>Course & Batch</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div>
            <label style={labelStyle}>Course *</label>
            <div style={{ position:"relative" }}>
              <select style={{ ...inputStyle, appearance:"none", paddingRight:32 }} value={form.course} onChange={e=>set("course",e.target.value)}>
                {COURSES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Batch</label>
            <div style={{ position:"relative" }}>
              <select style={{ ...inputStyle, appearance:"none", paddingRight:32 }} value={form.batch} onChange={e=>set("batch",e.target.value)}>
                {BATCHES.map(b=><option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <div style={{ position:"relative" }}>
              <select style={{ ...inputStyle, appearance:"none", paddingRight:32 }} value={form.status} onChange={e=>set("status",e.target.value)}>
                {["Active","Completed","Dropped"].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:24,marginBottom:24 }}>
        <div style={{ color:"#a78bfa",fontSize:13,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8 }}><Shield size={14}/>Account Password</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
          <div><label style={labelStyle}>Password *</label><input type="password" style={inputStyle} placeholder="Min. 6 characters" value={form.password} onChange={e=>set("password",e.target.value)}/></div>
          <div><label style={labelStyle}>Confirm Password *</label><input type="password" style={inputStyle} placeholder="Re-enter password" value={form.confirm_password} onChange={e=>set("confirm_password",e.target.value)}/></div>
        </div>
      </div>
      <div style={{ display:"flex",gap:12 }}>
        <button onClick={submit} style={{ background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",border:"none",borderRadius:10,padding:"11px 28px",fontSize:14,fontWeight:600,cursor:"pointer" }}>Enroll Student</button>
        <button onClick={onBack} style={{ background:"#1e293b",color:"#94a3b8",border:"none",borderRadius:10,padding:"11px 24px",fontSize:14,cursor:"pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

function SearchPage({ toast, attendanceLogs, employees, students }) {
  const [searchType, setSearchType] = useState("employee");
  const [query, setQuery]           = useState("");
  const [results, setResults]       = useState([]);
  const [searched, setSearched]     = useState(false);
  const [selected, setSelected]     = useState(null);
  const pool = searchType === "employee" ? employees : students;
  const doSearch = (q = query) => {
    const raw = q.trim().toLowerCase();
    if (!raw) { toast("Please enter a name or ID to search", "warn"); return; }
    const found = pool.filter(p =>
      p.name.toLowerCase().includes(raw) || p.id.toLowerCase().includes(raw) ||
      p.email.toLowerCase().includes(raw) || p.phone.includes(raw)
    );
    setResults(found); setSearched(true);
    if (found.length === 0) toast(`No ${searchType}s found for "${raw}"`, "warn");
    else toast(`Found ${found.length} result${found.length > 1 ? "s" : ""}`);
  };
  const clear = () => { setQuery(""); setResults([]); setSearched(false); };
  const accentColor = searchType === "employee" ? "#22d3ee" : "#a78bfa";
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>Search People</div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:16,padding:24,marginBottom:24 }}>
          <div style={{ display:"flex",gap:12,alignItems:"center" }}>
            <div style={{ position:"relative",flexShrink:0 }}>
              <select value={searchType} onChange={e=>{setSearchType(e.target.value);clear();}}
                style={{ appearance:"none",background:"#1e293b",border:`1.5px solid ${accentColor}55`,borderRadius:10,color:accentColor,padding:"11px 38px 11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",outline:"none",minWidth:140 }}>
                <option value="employee">👤 Employee</option>
                <option value="student">🎓 Student</option>
              </select>
              <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
            </div>
            <div style={{ flex:1,position:"relative",display:"flex",alignItems:"center" }}>
              <Search size={16} color="#475569" style={{ position:"absolute",left:14,pointerEvents:"none" }}/>
              <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSearch()}
                placeholder="Search by name, ID, email or phone…"
                style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:10,color:"#e2e8f0",padding:"11px 40px 11px 42px",fontSize:13,outline:"none",boxSizing:"border-box" }}/>
              {query && <button onClick={clear} style={{ position:"absolute",right:12,background:"none",border:"none",cursor:"pointer",color:"#64748b",padding:0,display:"flex" }}><X size={14}/></button>}
            </div>
            <button onClick={()=>doSearch()} style={{ background:`linear-gradient(135deg,${accentColor},${accentColor}bb)`,color:"#020917",border:"none",borderRadius:10,padding:"11px 26px",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0 }}>Search</button>
          </div>
        </div>
        {!searched && (
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:48,textAlign:"center" }}>
            <div style={{ width:64,height:64,background:"#1e293b",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}><Search size={28} color="#334155"/></div>
            <div style={{ color:"#475569",fontSize:15,marginBottom:6 }}>Search Employees or Students</div>
            <div style={{ color:"#334155",fontSize:13 }}>Use the dropdown to switch between Employee and Student, then type a name or ID.</div>
          </div>
        )}
        {searched && results.length === 0 && (
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:48,textAlign:"center" }}>
            <Search size={36} color="#334155" style={{ marginBottom:12 }}/>
            <div style={{ color:"#475569",fontSize:14 }}>No {searchType}s matched "{query}".</div>
          </div>
        )}
        {searched && results.length > 0 && (
          <div>
            <div style={{ color:"#64748b",fontSize:13,marginBottom:14 }}>
              {results.length} result{results.length>1?"s":""} for <span style={{ color:accentColor }}>"{query}"</span>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {results.map((p, i) => (
                <div key={i} onClick={()=>setSelected(p)}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=accentColor+"55"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}
                  style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20,display:"flex",alignItems:"center",gap:16,cursor:"pointer",transition:"border-color 0.2s" }}>
                  <Avatar letter={p.avatar} size={52}/>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ color:"#f1f5f9",fontWeight:700,fontSize:15 }}>{p.name}</div>
                    <div style={{ display:"flex",gap:14,marginTop:6,flexWrap:"wrap" }}>
                      <span style={{ display:"flex",alignItems:"center",gap:5,color:"#64748b",fontSize:12 }}><Hash size={11}/>{p.id}</span>
                      <span style={{ display:"flex",alignItems:"center",gap:5,color:"#64748b",fontSize:12 }}><Phone size={11}/>{p.phone}</span>
                      <span style={{ display:"flex",alignItems:"center",gap:5,color:"#64748b",fontSize:12 }}><Mail size={11}/>{p.email}</span>
                    </div>
                  </div>
                  <div style={{ textAlign:"right",flexShrink:0 }}>
                    <div style={{ color:"#94a3b8",fontSize:12 }}>{p.dept||p.batch}</div>
                    <div style={{ color:"#94a3b8",fontSize:12,marginTop:2 }}>{p.role||p.course}</div>
                    <div style={{ marginTop:6 }}><StatusBadge status={p.status}/></div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:5,color:accentColor,fontSize:12,flexShrink:0 }}><Eye size={14}/><span>View</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:`1px solid ${accentColor}33`,borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16 }}>
          {searchType === "employee" ? <OrbitalScene color="#22d3ee"/> : <HexSpinner color="#a78bfa"/>}
          <div style={{ color:accentColor,fontSize:13,fontWeight:700,marginTop:8 }}>{searchType === "employee" ? "Employee Search" : "Student Search"}</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
            <span style={{ color:"#64748b",fontSize:12 }}>Total Employees</span>
            <span style={{ color:"#22d3ee",fontSize:12,fontWeight:700 }}>{employees.length}</span>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between" }}>
            <span style={{ color:"#64748b",fontSize:12 }}>Total Students</span>
            <span style={{ color:"#a78bfa",fontSize:12,fontWeight:700 }}>{students.length}</span>
          </div>
        </div>
      </div>
      {selected && <DetailModal person={selected} type={searchType} attendanceLogs={attendanceLogs} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

function AttendancePage({ toast, employees }) {
  const [logs, setLogs]             = useState(() => generateSeedLogs(employees));
  const [tab, setTab]               = useState("live");
  const [logSearch, setLogSearch]   = useState("");
  const [filterEmp, setFilterEmp]   = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected]     = useState(null);
  const todayStr = new Date().toISOString().slice(0, 10);
  const liveStatus = employees.map(emp => {
    const todayLog = logs.find(l => l.empId === emp.id && l.date === todayStr);
    return { ...emp, loggedIn:!!todayLog&&!!todayLog.loginTime&&!todayLog.logoutTime, loginTime:todayLog?.loginTime||null, logoutTime:todayLog?.logoutTime||null, lateness:todayLog?.status||null };
  });
  const nowTime = () => { const n=new Date(); return `${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}`; };
  const clockIn = emp => {
    const time = nowTime(); const hour = new Date().getHours();
    const entry = { id:`${emp.id}-${todayStr}`, empId:emp.id, empName:emp.name, dept:emp.dept, phone:emp.phone, email:emp.email, date:todayStr, loginTime:time, logoutTime:null, status:hour>=10?"Late":"On Time" };
    setLogs(prev=>[entry,...prev.filter(l=>!(l.empId===emp.id&&l.date===todayStr))]);
    toast(`${emp.name} clocked in at ${time}`);
  };
  const clockOut = emp => {
    const time = nowTime();
    setLogs(prev=>prev.map(l=>l.empId===emp.id&&l.date===todayStr&&!l.logoutTime?{...l,logoutTime:time}:l));
    toast(`${emp.name} clocked out at ${time}`);
  };
  const filteredLogs = logs.filter(l => {
    const empMatch  = filterEmp==="All"||l.empId===filterEmp;
    const dateMatch = !filterDate||l.date===filterDate;
    const searchQ   = logSearch.trim().toLowerCase();
    const textMatch = !searchQ||l.empName.toLowerCase().includes(searchQ)||l.empId.toLowerCase().includes(searchQ)||l.email.toLowerCase().includes(searchQ)||l.phone.includes(searchQ);
    return empMatch&&dateMatch&&textMatch;
  });
  const presentNow = liveStatus.filter(e=>e.loggedIn).length;
  const notIn      = liveStatus.filter(e=>!e.loggedIn&&!e.logoutTime).length;
  const clockedOut = liveStatus.filter(e=>e.logoutTime).length;
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",gap:10,marginBottom:20 }}>
          {[["live","🟢 Live Status"],["logs","📋 Attendance Logs"],["summary","📊 Summary"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{ background:tab===t?"#16a34a":"#1e293b",color:tab===t?"#fff":"#94a3b8",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:tab===t?700:400,cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        {tab === "live" && (
          <div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20 }}>
              {[["Present Now",presentNow,"#22c55e"],["Not Clocked In",notIn,"#f59e0b"],["Clocked Out",clockedOut,"#64748b"]].map(([k,v,c])=>(
                <div key={k} style={{ background:"#0f172a",border:`1px solid ${c}33`,borderRadius:12,padding:16,textAlign:"center" }}>
                  <div style={{ color:c,fontSize:24,fontWeight:700 }}>{v}</div>
                  <div style={{ color:"#64748b",fontSize:12,marginTop:4 }}>{k}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
              <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14,fontSize:14 }}>Today — <span style={{ color:"#4ade80" }}>{todayStr}</span></div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {liveStatus.map((emp, i) => (
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"#1e293b",borderRadius:12,border:`1px solid ${emp.loggedIn?"#16a34a33":emp.logoutTime?"#33415555":"#f59e0b22"}` }}>
                    <Avatar letter={emp.avatar} size={38}/>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ color:"#e2e8f0",fontWeight:600,fontSize:13 }}>{emp.name}</div>
                      <div style={{ color:"#64748b",fontSize:11,marginTop:2 }}>{emp.id} · {emp.dept}</div>
                    </div>
                    <div style={{ display:"flex",flexDirection:"column",gap:4,minWidth:130,alignItems:"flex-end" }}>
                      {emp.loginTime && <span style={{ display:"flex",alignItems:"center",gap:5,color:"#4ade80",fontSize:12 }}><LogIn size={12}/>In: {emp.loginTime}</span>}
                      {emp.logoutTime && <span style={{ display:"flex",alignItems:"center",gap:5,color:"#f87171",fontSize:12 }}><LogOut size={12}/>Out: {emp.logoutTime}</span>}
                      {!emp.loginTime && !emp.logoutTime && <span style={{ color:"#f59e0b",fontSize:12 }}>Not checked in yet</span>}
                      {emp.lateness && <span style={{ background:emp.lateness==="Late"?"#f59e0b22":"#16a34a22",color:emp.lateness==="Late"?"#fbbf24":"#4ade80",fontSize:10,padding:"1px 7px",borderRadius:5 }}>{emp.lateness}</span>}
                    </div>
                    <div style={{ display:"flex",gap:8,flexShrink:0 }}>
                      {!emp.loggedIn&&!emp.logoutTime&&<button onClick={()=>clockIn(emp)} style={{ background:"#16a34a22",color:"#4ade80",border:"1px solid #16a34a44",borderRadius:8,padding:"7px 13px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontWeight:600 }}><LogIn size={12}/>Clock In</button>}
                      {emp.loggedIn&&!emp.logoutTime&&<button onClick={()=>clockOut(emp)} style={{ background:"#7f1d1d22",color:"#f87171",border:"1px solid #ef444444",borderRadius:8,padding:"7px 13px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontWeight:600 }}><LogOut size={12}/>Clock Out</button>}
                      {emp.logoutTime&&<span style={{ color:"#475569",fontSize:12,padding:"7px 0" }}>✓ Done</span>}
                      <button onClick={()=>setSelected(emp)} style={{ background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:8,padding:"7px 10px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center" }}><Eye size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "logs" && (
          <div>
            <div style={{ display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center" }}>
              <div style={{ position:"relative",flex:1,minWidth:180 }}>
                <Search size={14} color="#475569" style={{ position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <input value={logSearch} onChange={e=>setLogSearch(e.target.value)} placeholder="Search name, ID…"
                  style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"9px 12px 9px 32px",fontSize:13,outline:"none",boxSizing:"border-box" }}/>
              </div>
              <select value={filterEmp} onChange={e=>setFilterEmp(e.target.value)} style={{ background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"9px 12px",fontSize:13,cursor:"pointer" }}>
                <option value="All">All Employees</option>
                {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
              <input type="date" value={filterDate} onChange={e=>setFilterDate(e.target.value)} style={{ background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"9px 12px",fontSize:13 }}/>
              {(filterEmp!=="All"||filterDate||logSearch)&&<button onClick={()=>{setFilterEmp("All");setFilterDate("");setLogSearch("");}} style={{ background:"#1e293b",color:"#94a3b8",border:"none",borderRadius:8,padding:"9px 12px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5 }}><X size={12}/>Clear</button>}
              <span style={{ color:"#64748b",fontSize:12,marginLeft:"auto" }}>{filteredLogs.length} records</span>
            </div>
            <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,overflow:"hidden" }}>
              <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 90px 90px 90px 70px",background:"#1e293b",padding:"10px 18px",gap:8 }}>
                {["Employee","ID","Department","Date","Clock In","Clock Out","Status"].map(h=>(
                  <div key={h} style={{ color:"#64748b",fontSize:11,fontWeight:600,textTransform:"uppercase" }}>{h}</div>
                ))}
              </div>
              <div style={{ maxHeight:460,overflowY:"auto" }}>
                {filteredLogs.length===0?<div style={{ padding:40,textAlign:"center",color:"#475569" }}>No records found.</div>
                  :filteredLogs.slice(0,80).map((l,i)=>(
                  <div key={i} onClick={()=>{const emp=employees.find(e=>e.id===l.empId);if(emp)setSelected(emp);}}
                    onMouseEnter={e=>e.currentTarget.style.background="#1e293b55"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                    style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 90px 90px 90px 70px",padding:"12px 18px",borderBottom:"1px solid #1e293b22",alignItems:"center",gap:8,cursor:"pointer" }}>
                    <div><div style={{ color:"#e2e8f0",fontSize:13,fontWeight:500 }}>{l.empName}</div><div style={{ color:"#475569",fontSize:11,marginTop:1 }}>{l.email}</div></div>
                    <div style={{ color:"#64748b",fontSize:12 }}>{l.empId}</div>
                    <div style={{ color:"#64748b",fontSize:12 }}>{l.dept}</div>
                    <div style={{ color:"#94a3b8",fontSize:12 }}>{l.date}</div>
                    <div style={{ color:"#4ade80",fontSize:12,display:"flex",alignItems:"center",gap:4 }}><LogIn size={11}/>{l.loginTime}</div>
                    <div style={{ color:l.logoutTime?"#f87171":"#64748b",fontSize:12,display:"flex",alignItems:"center",gap:4 }}>{l.logoutTime?<><LogOut size={11}/>{l.logoutTime}</>:<span style={{ fontStyle:"italic" }}>—</span>}</div>
                    <span style={{ background:l.status==="Late"?"#f59e0b22":"#16a34a22",color:l.status==="Late"?"#fbbf24":"#4ade80",fontSize:11,padding:"2px 8px",borderRadius:6,textAlign:"center" }}>{l.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "summary" && (
          <div>
            {employees.map((emp, i) => {
              const empLogs=logs.filter(l=>l.empId===emp.id);
              const presentDays=empLogs.length; const lateDays=empLogs.filter(l=>l.status==="Late").length;
              const pct=Math.min(100,Math.round(presentDays/5*100));
              const todayLog=logs.find(l=>l.empId===emp.id&&l.date===todayStr);
              return (
                <div key={i} onClick={()=>setSelected(emp)}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#22d3ee33"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}
                  style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:18,marginBottom:10,cursor:"pointer",display:"flex",gap:14,alignItems:"center",transition:"border-color 0.2s" }}>
                  <Avatar letter={emp.avatar} size={42}/>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ color:"#e2e8f0",fontWeight:600 }}>{emp.name}</div>
                    <div style={{ display:"flex",gap:12,marginTop:3,flexWrap:"wrap" }}>
                      <span style={{ color:"#64748b",fontSize:11 }}>{emp.id}</span>
                      <span style={{ color:"#64748b",fontSize:11 }}>{emp.dept}</span>
                    </div>
                    <div style={{ marginTop:8,background:"#1e293b",borderRadius:4,height:4,overflow:"hidden",width:"100%",maxWidth:200 }}>
                      <div style={{ width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#22d3ee,#4ade80)",borderRadius:4 }}/>
                    </div>
                  </div>
                  {[["Days Present",presentDays,"#22c55e"],["Late Days",lateDays,"#f59e0b"],["Attendance %",`${pct}%`,"#22d3ee"]].map(([k,v,c])=>(
                    <div key={k} style={{ textAlign:"center",minWidth:72 }}>
                      <div style={{ color:c,fontSize:16,fontWeight:700 }}>{v}</div>
                      <div style={{ color:"#64748b",fontSize:11,marginTop:2 }}>{k}</div>
                    </div>
                  ))}
                  <div style={{ textAlign:"center",minWidth:80 }}>
                    {todayLog?.loginTime&&!todayLog?.logoutTime&&<span style={{ color:"#4ade80",fontSize:12 }}>In office</span>}
                    {todayLog?.logoutTime&&<span style={{ color:"#94a3b8",fontSize:12 }}>Clocked out</span>}
                    {!todayLog&&<span style={{ color:"#f59e0b",fontSize:12 }}>Absent today</span>}
                  </div>
                  <Eye size={14} color="#475569"/>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22c55e33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16 }}>
          <OrbitalScene color="#22c55e"/>
          <div style={{ color:"#22c55e",fontSize:13,fontWeight:700,marginTop:8 }}>Attendance</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16 }}>
          <div style={{ color:"#94a3b8",fontSize:12,marginBottom:10,fontWeight:600 }}>Today — {todayStr}</div>
          {[["Total Employees",employees.length,"#e2e8f0"],["Present Now",presentNow,"#22c55e"],["Not Clocked In",notIn,"#f59e0b"],["Clocked Out",clockedOut,"#64748b"],["Total Log Entries",logs.length,"#22d3ee"]].map(([k,v,c])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:c,fontSize:12,fontWeight:700 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {selected&&<DetailModal person={selected} type="employee" attendanceLogs={logs} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

function DashboardPage({ employees, students }) {
  const activeEmp = employees.filter(e=>e.status==="Active").length;
  const activeStu = students.filter(s=>s.status==="Active").length;
  const statsData = [
    { label:"Total Employees", value:employees.length, icon:Users,     color:"#22d3ee", delta:`${activeEmp} active` },
    { label:"Total Students",  value:students.length,  icon:BookOpen,  color:"#a78bfa", delta:`${activeStu} active` },
    { label:"Present Today",   value:6,                icon:UserCheck, color:"#22c55e", delta:"75% attendance" },
    { label:"On Leave",        value:2,                icon:UserX,     color:"#f59e0b", delta:"1 pending approval" },
  ];
  const weekData = [
    {day:"Mon",emp:7,stu:5},{day:"Tue",emp:8,stu:6},{day:"Wed",emp:6,stu:4},
    {day:"Thu",emp:8,stu:6},{day:"Fri",emp:7,stu:5},{day:"Sat",emp:2,stu:1},
  ];
  const deptData = employees.reduce((acc, e) => {
    const found=acc.find(a=>a.name===e.dept);
    found?found.count++:acc.push({name:e.dept,count:1});
    return acc;
  }, []);
  const PIE_COLORS = ["#22d3ee","#a78bfa","#22c55e","#f59e0b","#f87171","#60a5fa","#84cc16","#f97316"];
  const activity = [
    {text:"Ananya Sharma clocked in",time:"09:02 AM",type:"login"},
    {text:"Rohan Mehta clocked in",time:"09:15 AM",type:"login"},
    {text:"Meera Joshi enrolled in React Adv.",time:"10:30 AM",type:"enroll"},
    {text:"Sneha Reddy applied for leave",time:"11:00 AM",type:"leave"},
    {text:"Vikram Tiwari clocked out",time:"06:05 PM",type:"logout"},
  ];
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ background:"linear-gradient(135deg,#0a1628,#0d1f3c)",border:"1px solid #1d4ed833",borderRadius:16,padding:"22px 28px",marginBottom:24,position:"relative",overflow:"hidden" }}>
          <div style={{ position:"absolute",right:0,top:0,width:200,height:"100%",background:"radial-gradient(ellipse at right,#1d4ed822,transparent)" }}/>
          <div style={{ fontSize:21,fontWeight:700,color:"#f1f5f9",marginBottom:6 }}>Admin Control Center 🛡️</div>
          <div style={{ color:"#94a3b8",fontSize:14 }}>Welcome back! Here's an overview of ElevateIQ today.</div>
          <div style={{ marginTop:16,display:"flex",gap:12 }}>
            <div style={{ background:"#1d4ed822",border:"1px solid #1d4ed844",borderRadius:8,padding:"6px 14px",fontSize:12,color:"#60a5fa" }}>
              {new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </div>
            <div style={{ background:"#16a34a22",border:"1px solid #16a34a44",borderRadius:8,padding:"6px 14px",fontSize:12,color:"#4ade80" }}>System Healthy</div>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24 }}>
          {statsData.map(s=>(
            <div key={s.label} style={{ background:"#0f172a",border:`1px solid ${s.color}33`,borderRadius:14,padding:"18px 20px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div>
                  <div style={{ color:"#64748b",fontSize:12,marginBottom:6 }}>{s.label}</div>
                  <div style={{ color:"#f1f5f9",fontSize:24,fontWeight:700 }}>{s.value}</div>
                </div>
                <div style={{ background:s.color+"22",padding:10,borderRadius:10 }}><s.icon size={18} color={s.color}/></div>
              </div>
              <div style={{ color:"#94a3b8",fontSize:11,marginTop:8 }}>{s.delta}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:20,marginBottom:20 }}>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Weekly Attendance</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                <XAxis dataKey="day" stroke="#475569" tick={{fontSize:11}}/>
                <YAxis stroke="#475569" tick={{fontSize:11}}/>
                <Tooltip contentStyle={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8}}/>
                <Bar dataKey="emp" fill="#22d3ee" radius={[4,4,0,0]} name="Employees"/>
                <Bar dataKey="stu" fill="#a78bfa" radius={[4,4,0,0]} name="Students"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
            <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Dept Distribution</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={deptData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                  {deptData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
                </Pie>
                <Tooltip contentStyle={{background:"#0f172a",border:"1px solid #1e293b"}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
          <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Recent Activity</div>
          {activity.map((a,i)=>(
            <div key={i} style={{ display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:i<activity.length-1?"1px solid #1e293b":"none" }}>
              <div style={{ width:32,height:32,borderRadius:8,background:a.type==="login"?"#16a34a22":a.type==="logout"?"#f8717122":a.type==="leave"?"#f59e0b22":"#a78bfa22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                {a.type==="login"?<LogIn size={14} color="#4ade80"/>:a.type==="logout"?<LogOut size={14} color="#f87171"/>:a.type==="leave"?<Clock size={14} color="#fbbf24"/>:<BookOpen size={14} color="#a78bfa"/>}
              </div>
              <div style={{ flex:1,color:"#e2e8f0",fontSize:13 }}>{a.text}</div>
              <div style={{ color:"#64748b",fontSize:12 }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22d3ee33",borderRadius:16,padding:20,marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <OrbitalScene color="#22d3ee"/>
          <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginTop:8 }}>Admin Hub</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16 }}>
          <div style={{ color:"#94a3b8",fontSize:12,marginBottom:10,fontWeight:600 }}>Quick Stats</div>
          {[["Active Employees",activeEmp],["Active Students",activeStu],["Courses Running",COURSES.length],["Pending Leaves","1"],["Open Tickets","3"]].map(([k,v])=>(
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

function EmployeesPage({ employees, setPage, attendanceLogs }) {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState("All");
  const depts    = ["All", ...new Set(employees.map(e=>e.dept))];
  const filtered = filter==="All" ? employees : employees.filter(e=>e.dept===filter);
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10 }}>
          <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700 }}>All Employees</div>
          <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
            {depts.map(d=>(
              <button key={d} onClick={()=>setFilter(d)} style={{ background:filter===d?"#1d4ed8":"#1e293b",color:filter===d?"#fff":"#94a3b8",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer" }}>{d}</button>
            ))}
            <button onClick={()=>{
              downloadExcel(
                filtered.map(e=>[e.id,e.name,e.dob||"",e.phone,e.email,e.dept,e.role,e.status,e.bank?.bank||"",e.bank?.account||"",e.bank?.ifsc||"",e.bank?.branch||""]),
                ["Emp ID","Full Name","Date of Birth","Phone","Email","Department","Role","Status","Bank Name","Account No","IFSC Code","Branch"],
                `Employees_${filter}_${new Date().toISOString().slice(0,10)}.csv`
              );
            }} style={{ background:"#1e293b",color:"#22d3ee",border:"1px solid #22d3ee33",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
              <Download size={13}/>Export Excel
            </button>
            <button onClick={()=>setPage("add_employee")} style={{ background:"linear-gradient(135deg,#16a34a,#0891b2)",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
              <Plus size={14}/>Add New Employee
            </button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14 }}>
          {filtered.map((emp,i)=>(
            <div key={i} onClick={()=>setSelected(emp)}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#22d3ee33"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}
              style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20,cursor:"pointer",transition:"border-color 0.2s" }}>
              <div style={{ display:"flex",gap:14,alignItems:"center",marginBottom:14 }}>
                <Avatar letter={emp.avatar} size={44}/>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#f1f5f9",fontWeight:700 }}>{emp.name}</div>
                  <div style={{ color:"#64748b",fontSize:12,marginTop:2 }}>{emp.role}</div>
                </div>
                <StatusBadge status={emp.status}/>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Hash size={12} color="#475569"/><span style={{ color:"#64748b",fontSize:12 }}>{emp.id}</span></div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Phone size={12} color="#475569"/><span style={{ color:"#64748b",fontSize:12 }}>{emp.phone}</span></div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Mail size={12} color="#475569"/><span style={{ color:"#64748b",fontSize:12 }}>{emp.email}</span></div>
              </div>
              <div style={{ marginTop:12,paddingTop:12,borderTop:"1px solid #1e293b",display:"flex",justifyContent:"space-between" }}>
                <span style={{ color:"#94a3b8",fontSize:12 }}>{emp.dept}</span>
                <span style={{ color:"#22d3ee",fontSize:12,display:"flex",alignItems:"center",gap:4 }}><Eye size={12}/>View Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #22d3ee33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16 }}>
          <OrbitalScene color="#22d3ee"/>
          <div style={{ color:"#22d3ee",fontSize:13,fontWeight:700,marginTop:8 }}>Team Overview</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16 }}>
          {[["Total",employees.length],["Active",employees.filter(e=>e.status==="Active").length],["On Leave",employees.filter(e=>e.status==="On Leave").length],["Inactive",employees.filter(e=>e.status==="Inactive").length]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {selected&&<DetailModal person={selected} type="employee" attendanceLogs={attendanceLogs} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

function StudentsPage({ students, setPage }) {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState("All");
  const batches  = ["All", ...new Set(students.map(s=>s.batch))];
  const filtered = filter==="All" ? students : students.filter(s=>s.batch===filter);
  return (
    <div style={{ display:"flex",gap:24 }}>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10 }}>
          <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700 }}>All Students</div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            {batches.map(b=>(
              <button key={b} onClick={()=>setFilter(b)} style={{ background:filter===b?"#7c3aed":"#1e293b",color:filter===b?"#fff":"#94a3b8",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer" }}>{b}</button>
            ))}
            <button onClick={()=>{
              downloadExcel(
                filtered.map(s=>[s.id,s.name,s.dob||"",s.phone,s.email,s.course,s.batch,s.status]),
                ["Student ID","Full Name","Date of Birth","Phone","Email","Course","Batch","Status"],
                `Students_${filter}_${new Date().toISOString().slice(0,10)}.csv`
              );
            }} style={{ background:"#1e293b",color:"#a78bfa",border:"1px solid #a78bfa33",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
              <Download size={13}/>Export Excel
            </button>
            <button onClick={()=>setPage("add_student")} style={{ background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
              <Plus size={14}/>Enroll Student
            </button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14 }}>
          {filtered.map((stu,i)=>(
            <div key={i} onClick={()=>setSelected(stu)}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#a78bfa33"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}
              style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20,cursor:"pointer",transition:"border-color 0.2s" }}>
              <div style={{ display:"flex",gap:14,alignItems:"center",marginBottom:14 }}>
                <Avatar letter={stu.avatar} size={44}/>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#f1f5f9",fontWeight:700 }}>{stu.name}</div>
                  <div style={{ color:"#64748b",fontSize:12,marginTop:2 }}>{stu.course}</div>
                </div>
                <StatusBadge status={stu.status}/>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Hash size={12} color="#475569"/><span style={{ color:"#64748b",fontSize:12 }}>{stu.id}</span></div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Phone size={12} color="#475569"/><span style={{ color:"#64748b",fontSize:12 }}>{stu.phone}</span></div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Mail size={12} color="#475569"/><span style={{ color:"#64748b",fontSize:12 }}>{stu.email}</span></div>
              </div>
              <div style={{ marginTop:12,paddingTop:12,borderTop:"1px solid #1e293b",display:"flex",justifyContent:"space-between" }}>
                <span style={{ color:"#94a3b8",fontSize:12 }}>Batch {stu.batch}</span>
                <span style={{ color:"#a78bfa",fontSize:12,display:"flex",alignItems:"center",gap:4 }}><Eye size={12}/>View Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width:220,flexShrink:0 }}>
        <div style={{ background:"#0f172a",border:"1px solid #a78bfa33",borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16 }}>
          <HexSpinner color="#a78bfa"/>
          <div style={{ color:"#a78bfa",fontSize:13,fontWeight:700,marginTop:8 }}>Students</div>
        </div>
        <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:16 }}>
          {[["Total",students.length],["Active",students.filter(s=>s.status==="Active").length],["Completed",students.filter(s=>s.status==="Completed").length],["Dropped",students.filter(s=>s.status==="Dropped").length]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <span style={{ color:"#64748b",fontSize:12 }}>{k}</span>
              <span style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      {selected&&<DetailModal person={selected} type="student" attendanceLogs={[]} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXCEL DOWNLOAD UTILITY (no external lib — pure CSV with .xlsx extension)
// ═══════════════════════════════════════════════════════════════
function downloadExcel(rows, headers, filename) {
  // Build a real tab-separated values blob that Excel opens natively
  const escape = v => {
    const s = String(v ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.map(escape).join(","), ...rows.map(r => r.map(escape).join(","))];
  const csv = "\uFEFF" + lines.join("\r\n"); // BOM for Excel UTF-8
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// PAGE: PAYROLL — with month selector
// ═══════════════════════════════════════════════════════════════
function PayrollPage({ toast, employees }) {
  const [selected, setSelected] = useState(null);

  const now = new Date();
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return {
      label: d.toLocaleString("en-IN", { month: "long", year: "numeric" }),
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    };
  });
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);
  const currentMonthLabel = months.find(m => m.value === selectedMonth)?.label || "";

  const fmt = v => `₹${Number(v).toLocaleString("en-IN")}`;

  const payData = employees.map(e => {
    const p = e.pay || { basic:50000, hra:20000, ta:4500, medical:2000, pf:6000, tax:3200, other:800 };
    const gross = p.basic + p.hra + p.ta + p.medical;
    const deductions = p.pf + p.tax + p.other;
    return { ...e, pay:p, gross, deductions, net:gross-deductions };
  });

  const totalPayroll = payData.reduce((s,e) => s + e.net, 0);

  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12 }}>
        <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700 }}>Payroll Overview</div>
        <div style={{ position:"relative" }}>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            style={{ appearance:"none",background:"#1e293b",border:"1px solid #334155",borderRadius:10,color:"#e2e8f0",padding:"9px 36px 9px 14px",fontSize:13,fontWeight:600,cursor:"pointer",outline:"none" }}
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <ChevronDown size={14} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"#64748b",pointerEvents:"none" }}/>
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24 }}>
        {[
          ["Total Net Payroll", fmt(totalPayroll), "#22c55e"],
          ["Employees", `${employees.length}/${employees.length}`, "#22d3ee"],
          ["Payroll Month", currentMonthLabel, "#f59e0b"],
        ].map(([k,v,c])=>(
          <div key={k} style={{ background:"#0f172a",border:`1px solid ${c}33`,borderRadius:14,padding:20,textAlign:"center" }}>
            <div style={{ color:c,fontSize:22,fontWeight:700 }}>{v}</div>
            <div style={{ color:"#64748b",fontSize:12,marginTop:4 }}>{k}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,overflow:"hidden" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 80px 80px",background:"#1e293b",padding:"10px 20px",gap:8 }}>
          {["Employee","Basic","HRA","TA+Med","Gross","Deductions","Net Pay","Action"].map(h=>(
            <div key={h} style={{ color:"#64748b",fontSize:11,fontWeight:600,textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
        {payData.map((e,i)=>(
          <div key={i}
            onMouseEnter={ev=>ev.currentTarget.style.background="#1e293b33"}
            onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}
            style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 80px 80px",padding:"14px 20px",borderBottom:i<payData.length-1?"1px solid #1e293b":"none",alignItems:"center",gap:8 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <Avatar letter={e.avatar} size={34}/>
              <div>
                <div style={{ color:"#e2e8f0",fontWeight:600,fontSize:13 }}>{e.name}</div>
                <div style={{ color:"#64748b",fontSize:11 }}>{e.id} · {e.dept}</div>
              </div>
            </div>
            <div style={{ color:"#94a3b8",fontSize:12 }}>{fmt(e.pay.basic)}</div>
            <div style={{ color:"#94a3b8",fontSize:12 }}>{fmt(e.pay.hra)}</div>
            <div style={{ color:"#94a3b8",fontSize:12 }}>{fmt(e.pay.ta+e.pay.medical)}</div>
            <div style={{ color:"#22d3ee",fontSize:12,fontWeight:600 }}>{fmt(e.gross)}</div>
            <div style={{ color:"#f87171",fontSize:12 }}>- {fmt(e.deductions)}</div>
            <div style={{ color:"#4ade80",fontSize:13,fontWeight:700 }}>{fmt(e.net)}</div>
            <div style={{ display:"flex",gap:6 }}>
              <button onClick={()=>setSelected(e)} style={{ background:"#1e293b",color:"#22d3ee",border:"none",borderRadius:7,padding:"6px 8px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}><Eye size={11}/>View</button>
              <button onClick={()=>{
                downloadExcel(
                  [[e.id,e.name,e.dept,e.role,currentMonthLabel,e.pay.basic,e.pay.hra,e.pay.ta,e.pay.medical,e.gross,e.pay.pf,e.pay.tax,e.pay.other,e.deductions,e.net,"Paid"]],
                  ["Emp ID","Name","Department","Role","Month","Basic","HRA","Travel Allow","Medical Allow","Gross Earnings","PF","Income Tax","Other Deductions","Total Deductions","Net Pay","Status"],
                  `Payslip_${e.name.replace(/\s+/g,"_")}_${currentMonthLabel.replace(/\s+/g,"_")}.csv`
                );
                toast(`Payslip downloaded for ${e.name} — ${currentMonthLabel}`);
              }} style={{ background:"#1e293b",color:"#60a5fa",border:"none",borderRadius:7,padding:"6px 8px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center" }}><Download size={11}/></button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ position:"fixed",inset:0,background:"#000b",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }} onClick={()=>setSelected(null)}>
          <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:20,padding:32,width:520,maxHeight:"88vh",overflowY:"auto",position:"relative" }} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setSelected(null)} style={{ position:"absolute",top:16,right:16,background:"#1e293b",border:"none",borderRadius:8,padding:6,cursor:"pointer",color:"#94a3b8" }}><X size={16}/></button>
            <div style={{ display:"flex",gap:16,alignItems:"center",marginBottom:24 }}>
              <Avatar letter={selected.avatar} size={52}/>
              <div>
                <div style={{ color:"#f1f5f9",fontSize:18,fontWeight:700 }}>{selected.name}</div>
                <div style={{ color:"#4ade80",fontSize:13 }}>{selected.role} · {selected.dept}</div>
                <div style={{ color:"#64748b",fontSize:12,marginTop:2 }}>{selected.id}</div>
              </div>
            </div>
            {selected.bank && (
              <div style={{ background:"#1e293b",borderRadius:12,padding:16,marginBottom:16 }}>
                <div style={{ color:"#22d3ee",fontSize:12,fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",gap:6 }}><CreditCard size={13}/>Bank Details</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  {[["Bank",selected.bank.bank],["Branch",selected.bank.branch],["Account No",selected.bank.account],["IFSC",selected.bank.ifsc]].map(([l,v])=>(
                    <div key={l}><div style={{ color:"#64748b",fontSize:11 }}>{l}</div><div style={{ color:"#e2e8f0",fontSize:12,fontWeight:600,marginTop:1 }}>{v}</div></div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ background:"#1e293b",borderRadius:12,padding:16 }}>
              <div style={{ color:"#4ade80",fontSize:12,fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",gap:6 }}><DollarSign size={13}/>Salary Slip — {currentMonthLabel}</div>
              <div style={{ color:"#64748b",fontSize:11,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em" }}>Earnings</div>
              {[["Basic Pay",selected.pay.basic],["HRA",selected.pay.hra],["Travel Allowance",selected.pay.ta],["Medical Allowance",selected.pay.medical]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #0f172a" }}>
                  <span style={{ color:"#94a3b8",fontSize:12 }}>{k}</span>
                  <span style={{ color:"#4ade80",fontSize:12,fontWeight:600 }}>{fmt(v)}</span>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:"1px solid #22c55e44",marginTop:4 }}>
                <span style={{ color:"#e2e8f0",fontWeight:700 }}>Gross Earnings</span>
                <span style={{ color:"#22c55e",fontWeight:700 }}>{fmt(selected.gross)}</span>
              </div>
              <div style={{ color:"#64748b",fontSize:11,marginTop:12,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em" }}>Deductions</div>
              {[["Provident Fund (12%)",selected.pay.pf],["Income Tax (TDS)",selected.pay.tax],["Other Deductions",selected.pay.other]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #0f172a" }}>
                  <span style={{ color:"#94a3b8",fontSize:12 }}>{k}</span>
                  <span style={{ color:"#f87171",fontSize:12,fontWeight:600 }}>- {fmt(v)}</span>
                </div>
              ))}
              <div style={{ display:"flex",justifyContent:"space-between",padding:"12px",background:"#16a34a22",borderRadius:10,marginTop:12,border:"1px solid #16a34a44" }}>
                <span style={{ color:"#e2e8f0",fontSize:15,fontWeight:700 }}>Net Pay</span>
                <span style={{ color:"#4ade80",fontSize:18,fontWeight:700 }}>{fmt(selected.net)}</span>
              </div>
            </div>
            <button onClick={()=>{
              downloadExcel(
                [[selected.id,selected.name,selected.dept,selected.role,currentMonthLabel,selected.pay.basic,selected.pay.hra,selected.pay.ta,selected.pay.medical,selected.gross,selected.pay.pf,selected.pay.tax,selected.pay.other,selected.deductions,selected.net,"Paid"]],
                ["Emp ID","Name","Department","Role","Month","Basic","HRA","Travel Allow","Medical Allow","Gross Earnings","PF","Income Tax","Other Deductions","Total Deductions","Net Pay","Status"],
                `Payslip_${selected.name.replace(/\s+/g,"_")}_${currentMonthLabel.replace(/\s+/g,"_")}.csv`
              );
              toast(`Payslip downloaded for ${selected.name} — ${currentMonthLabel}`);
            }} style={{ marginTop:16,background:"linear-gradient(135deg,#16a34a,#0891b2)",color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8,width:"100%",justifyContent:"center" }}>
              <Download size={14}/>Download Payslip — {currentMonthLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportsPage() {
  const monthly = [
    {m:"Jan",att:88,perf:82},{m:"Feb",att:91,perf:84},{m:"Mar",att:85,perf:80},
    {m:"Apr",att:93,perf:87},{m:"May",att:89,perf:85},{m:"Jun",att:91,perf:86},
  ];
  return (
    <div>
      <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>Reports & Analytics</div>
      <div style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:14,padding:20 }}>
        <div style={{ color:"#e2e8f0",fontWeight:600,marginBottom:14 }}>Attendance & Performance Trend</div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/><stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
            <XAxis dataKey="m" stroke="#475569" tick={{fontSize:11}}/>
            <YAxis stroke="#475569" tick={{fontSize:11}} domain={[70,100]}/>
            <Tooltip contentStyle={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8}}/>
            <Area type="monotone" dataKey="att"  stroke="#22d3ee" fill="url(#g1)" name="Attendance %"/>
            <Area type="monotone" dataKey="perf" stroke="#a78bfa" fill="url(#g2)" name="Performance %"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SettingsPage({ toast }) {
  return (
    <div style={{ maxWidth:520 }}>
      <div style={{ color:"#e2e8f0",fontSize:18,fontWeight:700,marginBottom:20 }}>Settings</div>
      {[["Company Name","ElevateIQ"],["Admin Email","admin@elevateiq.com"],["Timezone","Asia/Kolkata (IST)"],["Working Hours","9:00 AM – 6:00 PM"]].map(([k,v])=>(
        <div key={k} style={{ background:"#0f172a",border:"1px solid #1e293b",borderRadius:12,padding:16,marginBottom:12 }}>
          <div style={{ color:"#64748b",fontSize:12,marginBottom:6 }}>{k}</div>
          <input defaultValue={v} style={{ width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"8px 10px",fontSize:13,boxSizing:"border-box" }}/>
        </div>
      ))}
      <button onClick={()=>toast("Settings saved!")} style={{ background:"linear-gradient(135deg,#16a34a,#0891b2)",color:"#fff",border:"none",borderRadius:10,padding:"10px 24px",fontSize:14,fontWeight:600,cursor:"pointer" }}>Save Changes</button>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email,    setEmail]    = useState("admin@elevateiq.com");
  const [password, setPassword] = useState("admin123");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    if (email !== "admin@elevateiq.com" || password !== "admin123") { setError("Invalid credentials. Try admin@elevateiq.com / admin123"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  };
  const inputStyle = { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#e2e8f0", padding:"12px 14px", fontSize:14, boxSizing:"border-box", outline:"none" };
  return (
    <div style={{ minHeight:"100vh", background:"#020917", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,system-ui,sans-serif" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;}"}</style>
      <div style={{ width:"100%", maxWidth:420, padding:24 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:56, height:56, background:"linear-gradient(135deg,#1d4ed8,#7c3aed)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, color:"#fff", margin:"0 auto 16px" }}>E</div>
          <div style={{ color:"#f1f5f9", fontSize:24, fontWeight:700 }}>ElevateIQ</div>
          <div style={{ color:"#64748b", fontSize:14, marginTop:4 }}>Admin Panel — Sign In</div>
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
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle} placeholder="admin@elevateiq.com" onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={{ color:"#64748b", fontSize:12, display:"block", marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", background:"linear-gradient(135deg,#1d4ed8,#7c3aed)", color:"#fff", border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:loading?"wait":"pointer", opacity:loading?0.7:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {loading ? "Signing in…" : <><LogIn size={16}/>Sign In to Dashboard</>}
          </button>
          <div style={{ marginTop:16, padding:"10px 14px", background:"#1e293b", borderRadius:8 }}>
            <div style={{ color:"#64748b", fontSize:11, marginBottom:4 }}>Demo credentials:</div>
            <div style={{ color:"#94a3b8", fontSize:12 }}>Email: admin@elevateiq.com</div>
            <div style={{ color:"#94a3b8", fontSize:12 }}>Password: admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [loggedIn,   setLoggedIn]   = useState(false);
  const [page,       setPage]       = useState("dashboard");
  const [sidebarOpen,setSidebarOpen] = useState(true);
  const [employees,  setEmployees]  = useState(INITIAL_EMPLOYEES);
  const [students,   setStudents]   = useState(INITIAL_STUDENTS);
  const [attendanceLogs]            = useState(() => generateSeedLogs(INITIAL_EMPLOYEES));
  const { toasts, add: toast, remove } = useToast();

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  const addEmployee = (emp) => setEmployees(prev => [emp, ...prev]);
  const addStudent  = (stu) => setStudents(prev => [stu, ...prev]);
  const goBack = () => setPage(page === "add_employee" ? "employees" : "students");

  const renderPage = () => {
    switch(page) {
      case "dashboard":    return <DashboardPage employees={employees} students={students}/>;
      case "search":       return <SearchPage toast={toast} attendanceLogs={attendanceLogs} employees={employees} students={students}/>;
      case "employees":    return <EmployeesPage employees={employees} setPage={setPage} attendanceLogs={attendanceLogs}/>;
      case "students":     return <StudentsPage students={students} setPage={setPage}/>;
      case "attendance":   return <AttendancePage toast={toast} employees={employees}/>;
      case "payroll":      return <PayrollPage toast={toast} employees={employees}/>;
      case "reports":      return <ReportsPage/>;
      case "settings":     return <SettingsPage toast={toast}/>;
      case "add_employee": return <AddEmployeePage onAdd={addEmployee} onBack={goBack} toast={toast}/>;
      case "add_student":  return <AddStudentPage onAdd={addStudent} onBack={goBack} toast={toast}/>;
      default:             return <DashboardPage employees={employees} students={students}/>;
    }
  };

  const activeNavId = ["add_employee","add_student"].includes(page)
    ? (page === "add_employee" ? "employees" : "students")
    : page;

  return (
    <div style={{ display:"flex",minHeight:"100vh",background:"#020917",fontFamily:"Inter,system-ui,sans-serif",color:"#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#0f172a;}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:99px;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.5);}
        select option{background:#1e293b;}
        @keyframes slideIn{from{transform:translateX(20px);opacity:0;}to{transform:translateX(0);opacity:1;}}
      `}</style>

      <div style={{ width:sidebarOpen?228:64,flexShrink:0,background:"#030712",borderRight:"1px solid #0f172a",transition:"width 0.25s ease",overflow:"hidden",display:"flex",flexDirection:"column" }}>
        <div style={{ padding:"20px 16px",borderBottom:"1px solid #0f172a",display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ width:34,height:34,background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff",flexShrink:0 }}>E</div>
          {sidebarOpen && (
            <div>
              <div style={{ color:"#f1f5f9",fontWeight:700,fontSize:15,whiteSpace:"nowrap" }}>ElevateIQ</div>
              <div style={{ color:"#64748b",fontSize:11 }}>Admin Panel</div>
            </div>
          )}
        </div>
        <nav style={{ flex:1,padding:"12px 8px",overflowY:"auto" }}>
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = activeNavId === id;
            return (
              <div key={id} onClick={()=>setPage(id)}
                onMouseEnter={e=>{if(!active)e.currentTarget.style.background="#1e293b";}}
                onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}
                style={{ display:"flex",alignItems:"center",gap:12,padding:"9px 10px",borderRadius:10,marginBottom:3,cursor:"pointer",background:active?"#1d4ed822":"transparent",color:active?"#60a5fa":"#64748b",borderLeft:active?"2px solid #1d4ed8":"2px solid transparent",transition:"background 0.15s" }}>
                <Icon size={18} style={{ flexShrink:0 }}/>
                {sidebarOpen&&<span style={{ fontSize:13,fontWeight:active?600:400,whiteSpace:"nowrap" }}>{label}</span>}
              </div>
            );
          })}
        </nav>
        <div style={{ padding:sidebarOpen?"16px":"8px 16px",borderTop:"1px solid #0f172a" }}>
          {sidebarOpen ? (
            <div style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10,background:"#1e293b22",marginBottom:10 }}>
              <div style={{ width:30,height:30,background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700 }}>AD</div>
              <div style={{ flex:1 }}>
                <div style={{ color:"#e2e8f0",fontSize:12,fontWeight:600 }}>Admin</div>
                <div style={{ color:"#64748b",fontSize:10 }}>Super Admin</div>
              </div>
            </div>
          ) : null}
          <button onClick={()=>{ setLoggedIn(false); setPage("dashboard"); }}
            style={{ width:"100%",background:"#7f1d1d22",color:"#f87171",border:"1px solid #ef444433",borderRadius:8,padding:sidebarOpen?"8px 12px":"8px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:8,justifyContent:sidebarOpen?"flex-start":"center" }}>
            <LogOut size={14}/>{sidebarOpen&&"Logout"}
          </button>
        </div>
      </div>

      <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
        <div style={{ background:"#030712",borderBottom:"1px solid #0f172a",padding:"0 24px",height:56,display:"flex",alignItems:"center",gap:16,flexShrink:0 }}>
          <button onClick={()=>setSidebarOpen(p=>!p)} style={{ background:"none",border:"none",color:"#64748b",cursor:"pointer",padding:4,display:"flex" }}><Menu size={20}/></button>
          <div style={{ color:"#e2e8f0",fontWeight:600,fontSize:15 }}>
            {page === "add_employee" ? "Add New Employee" : page === "add_student" ? "Enroll New Student" : NAV.find(n=>n.id===page)?.label || "Dashboard"}
          </div>
          <div style={{ flex:1 }}/>
          <div onClick={()=>setPage("search")} style={{ display:"flex",alignItems:"center",background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"6px 14px",gap:8,width:230,cursor:"pointer" }}>
            <Search size={14} color="#64748b"/>
            <span style={{ color:"#475569",fontSize:12 }}>Search employees & students…</span>
          </div>
          <div style={{ position:"relative",cursor:"pointer" }}>
            <Bell size={18} color="#64748b"/>
            <div style={{ position:"absolute",top:-3,right:-3,width:8,height:8,background:"#ef4444",borderRadius:"50%" }}/>
          </div>
          <button onClick={()=>{ setLoggedIn(false); setPage("dashboard"); }}
            style={{ background:"#7f1d1d22",color:"#f87171",border:"1px solid #ef444433",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
            <LogOut size={13}/>Logout
          </button>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:24 }}>
          {renderPage()}
        </div>
      </div>

      <Toast toasts={toasts} remove={remove}/>
    </div>
  );
}