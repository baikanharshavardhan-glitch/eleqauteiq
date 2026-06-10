import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── MOCK COURSES ──────────────────────────────────────────────────────
const COURSES = [
  {
    id: 1,
    title: "React & TypeScript Mastery",
    instructor: "Arjun Mehta",
    category: "Frontend",
    price: 2499,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 1240,
    duration: "32 hrs",
    lessons: 86,
    level: "Intermediate",
    badge: "Bestseller",
    badgeColor: "#F59E0B",
    image: "⚛️",
    bg: "linear-gradient(135deg,#1e3a8a,#1d4ed8)",
    tags: ["React", "TypeScript", "Hooks", "Redux"],
    description: "Master modern React with TypeScript — hooks, context, Redux Toolkit, and real-world project patterns.",
  },
  {
    id: 2,
    title: "Node.js Backend Engineering",
    instructor: "Priya Sharma",
    category: "Backend",
    price: 1999,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 980,
    duration: "28 hrs",
    lessons: 72,
    level: "Intermediate",
    badge: "Hot",
    badgeColor: "#EF4444",
    image: "🟢",
    bg: "linear-gradient(135deg,#064e3b,#065f46)",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    description: "Build production-grade REST APIs with Node, Express, PostgreSQL, authentication and deployment.",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Kavya Reddy",
    category: "Design",
    price: 1499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 2100,
    duration: "20 hrs",
    lessons: 54,
    level: "Beginner",
    badge: "Top Rated",
    badgeColor: "#8B5CF6",
    image: "🎨",
    bg: "linear-gradient(135deg,#4c1d95,#6d28d9)",
    tags: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    description: "Learn Figma, design principles, user research, and ship polished interfaces from scratch.",
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Rahul Gupta",
    category: "Data Science",
    price: 2999,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 1850,
    duration: "40 hrs",
    lessons: 110,
    level: "Beginner",
    badge: "New",
    badgeColor: "#10B981",
    image: "🐍",
    bg: "linear-gradient(135deg,#1e3a5f,#0369a1)",
    tags: ["Python", "Pandas", "NumPy", "ML Basics"],
    description: "Go from zero to data analyst — Python, Pandas, NumPy, visualisation and intro to machine learning.",
  },
  {
    id: 5,
    title: "DevOps & Cloud (AWS)",
    instructor: "Sanjay Nair",
    category: "DevOps",
    price: 3499,
    originalPrice: 6999,
    rating: 4.7,
    reviews: 760,
    duration: "36 hrs",
    lessons: 95,
    level: "Advanced",
    badge: "Bestseller",
    badgeColor: "#F59E0B",
    image: "☁️",
    bg: "linear-gradient(135deg,#7c2d12,#c2410c)",
    tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    description: "Deploy and scale apps on AWS using Docker, Kubernetes, GitHub Actions and Terraform.",
  },
  {
    id: 6,
    title: "Full-Stack JavaScript",
    instructor: "Meera Iyer",
    category: "Full Stack",
    price: 3999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 3200,
    duration: "60 hrs",
    lessons: 160,
    level: "Beginner",
    badge: "Most Popular",
    badgeColor: "#EC4899",
    image: "🚀",
    bg: "linear-gradient(135deg,#134e4a,#0f766e)",
    tags: ["React", "Node", "MongoDB", "Deployment"],
    description: "The complete path from zero to full-stack developer — frontend, backend, database and live deployment.",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Design", "Data Science", "DevOps", "Full Stack"];

// ── PURCHASE MODAL ────────────────────────────────────────────────────
function PurchaseModal({ course, onClose, onSuccess }) {
  const [step, setStep] = useState("confirm"); // confirm | payment | done
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number:"", expiry:"", cvv:"", name:"" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const fmtCard = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = (v) => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500)); // simulate payment
    setLoading(false);
    setStep("done");
    setTimeout(() => { onSuccess(course); onClose(); }, 2000);
  };

  const iStyle = (k) => ({
    width:"100%", padding:"10px 14px",
    background:"rgba(10,25,60,0.7)",
    border:`1px solid ${focused===k?"rgba(96,165,250,0.5)":"rgba(59,130,246,0.2)"}`,
    boxShadow: focused===k?"0 0 0 3px rgba(37,99,235,0.12)":"none",
    borderRadius:"10px", color:"#E2EEFF", fontSize:"14px",
    fontFamily:"'DM Sans',sans-serif", outline:"none",
    transition:"border-color 0.2s, box-shadow 0.2s", boxSizing:"border-box",
  });

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(2,9,23,0.8)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"100%", maxWidth:440, background:"rgba(6,18,44,0.98)", border:"1px solid rgba(96,165,250,0.25)", borderRadius:24, padding:"32px 28px", boxShadow:"0 0 80px rgba(37,99,235,0.25)", fontFamily:"'DM Sans',sans-serif" }}>

        {step === "confirm" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, color:"#F0F6FF" }}>Order summary</div>
              <button onClick={onClose} style={{ background:"none", border:"none", color:"#4E7BCC", fontSize:20, cursor:"pointer", padding:4, lineHeight:1 }}>✕</button>
            </div>

            {/* Course card */}
            <div style={{ display:"flex", gap:14, padding:"16px", background:"rgba(37,99,235,0.08)", border:"1px solid rgba(96,165,250,0.15)", borderRadius:14, marginBottom:20 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:course.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{course.image}</div>
              <div>
                <div style={{ color:"#E2EEFF", fontSize:14, fontWeight:500, lineHeight:1.4, marginBottom:4 }}>{course.title}</div>
                <div style={{ color:"#4E7BCC", fontSize:12 }}>by {course.instructor} · {course.lessons} lessons · {course.duration}</div>
              </div>
            </div>

            {/* Price breakdown */}
            <div style={{ borderTop:"1px solid rgba(96,165,250,0.1)", paddingTop:16, marginBottom:20 }}>
              {[
                ["Original price", `₹${course.originalPrice.toLocaleString()}`],
                ["Discount (50% off)", `-₹${(course.originalPrice - course.price).toLocaleString()}`, "#34D399"],
              ].map(([l,v,c]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ color:"#6B9BD2", fontSize:13 }}>{l}</span>
                  <span style={{ color: c||"#E2EEFF", fontSize:13 }}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid rgba(96,165,250,0.15)", paddingTop:12, marginTop:4 }}>
                <span style={{ color:"#F0F6FF", fontSize:15, fontWeight:500 }}>Total</span>
                <span style={{ color:"#60A5FA", fontSize:18, fontWeight:700 }}>₹{course.price.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => setStep("payment")}
              style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#1D4ED8,#3B82F6)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:500, cursor:"pointer", boxShadow:"0 4px 20px rgba(37,99,235,0.35)", fontFamily:"'DM Sans',sans-serif" }}>
              Proceed to payment →
            </button>
          </>
        )}

        {step === "payment" && (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <button onClick={() => setStep("confirm")} style={{ background:"none", border:"none", color:"#4E7BCC", fontSize:18, cursor:"pointer", padding:0, lineHeight:1 }}>←</button>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, color:"#F0F6FF" }}>Payment</div>
              <div style={{ marginLeft:"auto", color:"#60A5FA", fontSize:15, fontWeight:700 }}>₹{course.price.toLocaleString()}</div>
            </div>

            {/* Payment method tabs */}
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              {[["card","💳 Card"],["upi","📱 UPI"],["netbanking","🏦 Net Banking"]].map(([k,l]) => (
                <button key={k} onClick={() => setMethod(k)}
                  style={{ flex:1, padding:"9px 6px", background: method===k?"rgba(37,99,235,0.25)":"rgba(10,25,60,0.5)", border:`1px solid ${method===k?"rgba(96,165,250,0.5)":"rgba(59,130,246,0.2)"}`, borderRadius:10, color: method===k?"#60A5FA":"#6B9BD2", fontSize:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                  {l}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div>
                  <label style={{ display:"block", fontSize:11, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>Card number</label>
                  <input placeholder="1234 5678 9012 3456" value={card.number}
                    onChange={e => setCard(c=>({...c, number:fmtCard(e.target.value)}))}
                    onFocus={()=>setFocused("num")} onBlur={()=>setFocused(null)}
                    style={iStyle("num")} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={{ display:"block", fontSize:11, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>Expiry</label>
                    <input placeholder="MM/YY" value={card.expiry}
                      onChange={e => setCard(c=>({...c, expiry:fmtExp(e.target.value)}))}
                      onFocus={()=>setFocused("exp")} onBlur={()=>setFocused(null)}
                      style={iStyle("exp")} />
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:11, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>CVV</label>
                    <input placeholder="•••" type="password" maxLength={4} value={card.cvv}
                      onChange={e => setCard(c=>({...c, cvv:e.target.value.replace(/\D/g,"").slice(0,4)}))}
                      onFocus={()=>setFocused("cvv")} onBlur={()=>setFocused(null)}
                      style={iStyle("cvv")} />
                  </div>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:11, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>Name on card</label>
                  <input placeholder="John Doe" value={card.name}
                    onChange={e => setCard(c=>({...c, name:e.target.value}))}
                    onFocus={()=>setFocused("cname")} onBlur={()=>setFocused(null)}
                    style={iStyle("cname")} />
                </div>
              </div>
            )}

            {method === "upi" && (
              <div>
                <label style={{ display:"block", fontSize:11, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>UPI ID</label>
                <input placeholder="yourname@upi"
                  onFocus={()=>setFocused("upi")} onBlur={()=>setFocused(null)}
                  style={iStyle("upi")} />
                <div style={{ marginTop:8, fontSize:12, color:"#4E7BCC" }}>Enter your UPI ID and confirm payment in your UPI app.</div>
              </div>
            )}

            {method === "netbanking" && (
              <div>
                <label style={{ display:"block", fontSize:11, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>Select bank</label>
                <select onFocus={()=>setFocused("bank")} onBlur={()=>setFocused(null)}
                  style={{ ...iStyle("bank"), appearance:"none" }}>
                  {["SBI","HDFC","ICICI","Axis","Kotak","Yes Bank","PNB"].map(b => (
                    <option key={b} value={b} style={{ background:"#06122c" }}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            <button onClick={handlePay} disabled={loading}
              style={{ width:"100%", padding:"13px", marginTop:20, background:"linear-gradient(135deg,#1D4ED8,#3B82F6)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:500, cursor:loading?"not-allowed":"pointer", opacity:loading?0.8:1, boxShadow:"0 4px 20px rgba(37,99,235,0.35)", fontFamily:"'DM Sans',sans-serif", transition:"opacity 0.15s" }}>
              {loading ? "Processing payment…" : `Pay ₹${course.price.toLocaleString()} →`}
            </button>

            <div style={{ marginTop:12, textAlign:"center", fontSize:11, color:"#2C4878" }}>
              🔒 256-bit SSL encrypted · 100% secure checkout
            </div>
          </>
        )}

        {step === "done" && (
          <div style={{ textAlign:"center", padding:"16px 0" }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(52,211,153,0.15)", border:"1px solid rgba(52,211,153,0.4)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, color:"#F0F6FF", marginBottom:8 }}>Payment successful!</div>
            <div style={{ fontSize:13, color:"#6B9BD2", lineHeight:1.6 }}>
              You now have full access to<br />
              <span style={{ color:"#60A5FA", fontWeight:500 }}>{course.title}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── STAR RATING ───────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ color:"#F59E0B", fontSize:12, letterSpacing:1 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

// ── MAIN USER HOME ────────────────────────────────────────────────────
export default function UserHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [category, setCategory]       = useState("All");
  const [search, setSearch]           = useState("");
  const [selectedCourse, setSelected] = useState(null);
  const [purchased, setPurchased]     = useState(() => {
    try { return JSON.parse(localStorage.getItem("purchased_courses") || "[]"); } catch { return []; }
  });
  const [toast, setToast]             = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePurchaseSuccess = (course) => {
    const updated = [...purchased, course.id];
    setPurchased(updated);
    localStorage.setItem("purchased_courses", JSON.stringify(updated));
    setToast(`🎉 You now have access to "${course.title}"!`);
    setTimeout(() => setToast(null), 4000);
  };

  const filtered = COURSES.filter(c => {
    const matchCat    = category === "All" || c.category === category;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(59,130,246,0.3); border-radius:3px; }
        input::placeholder { color:#2C4878; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#020917", fontFamily:"'DM Sans',sans-serif", color:"#E2EEFF" }}>

        {/* ── NAVBAR ── */}
        <nav style={{ position:"sticky", top:0, zIndex:40, background:"rgba(2,9,23,0.85)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid rgba(96,165,250,0.1)", padding:"0 24px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#1D4ED8,#60A5FA)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:"#F0F6FF" }}>ElevateIQ</span>
            </div>

            {/* Search */}
            <div style={{ flex:1, maxWidth:360, margin:"0 24px", position:"relative" }}>
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#2C4878", fontSize:14 }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search courses, skills…"
                style={{ width:"100%", padding:"9px 14px 9px 36px", background:"rgba(10,25,60,0.6)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:10, color:"#E2EEFF", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none" }}
              />
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {purchased.length > 0 && (
                <div style={{ fontSize:12, color:"#60A5FA", background:"rgba(37,99,235,0.15)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:20, padding:"4px 12px" }}>
                  {purchased.length} course{purchased.length>1?"s":""} owned
                </div>
              )}
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#1D4ED8,#60A5FA)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>
                  {(user.name||"U")[0].toUpperCase()}
                </div>
                <span style={{ fontSize:13, color:"#6B9BD2", maxWidth:100, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name||"User"}</span>
              </div>
              <button onClick={handleLogout}
                style={{ padding:"7px 14px", background:"transparent", border:"1px solid rgba(96,165,250,0.25)", borderRadius:8, color:"#6B9BD2", fontSize:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(96,165,250,0.5)";e.currentTarget.style.color="#60A5FA";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(96,165,250,0.25)";e.currentTarget.style.color="#6B9BD2";}}>
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ background:"linear-gradient(180deg,rgba(37,99,235,0.08) 0%,transparent 100%)", borderBottom:"1px solid rgba(96,165,250,0.07)", padding:"48px 24px 40px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ fontSize:11, color:"#4E7BCC", letterSpacing:"1px", textTransform:"uppercase", marginBottom:12 }}>
              Welcome back, {user.name?.split(" ")[0] || "there"} 👋
            </div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:"#F0F6FF", lineHeight:1.2, marginBottom:12, maxWidth:560 }}>
              Level up your skills with expert-led courses
            </div>
            <div style={{ fontSize:14, color:"#6B9BD2", lineHeight:1.7, maxWidth:480 }}>
              Browse {COURSES.length} courses across frontend, backend, design and more. Lifetime access after purchase.
            </div>
          </div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div style={{ borderBottom:"1px solid rgba(96,165,250,0.08)", padding:"0 24px", overflowX:"auto" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:4, padding:"12px 0" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{ padding:"7px 16px", background: category===cat?"rgba(37,99,235,0.25)":"transparent", border:`1px solid ${category===cat?"rgba(96,165,250,0.4)":"transparent"}`, borderRadius:20, color: category===cat?"#60A5FA":"#6B9BD2", fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap", transition:"all 0.15s" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── COURSE GRID ── */}
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px 60px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0", color:"#4E7BCC" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:16, color:"#6B9BD2" }}>No courses found for "{search}"</div>
              <button onClick={() => { setSearch(""); setCategory("All"); }}
                style={{ marginTop:16, padding:"9px 20px", background:"rgba(37,99,235,0.2)", border:"1px solid rgba(96,165,250,0.3)", borderRadius:8, color:"#60A5FA", fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:20 }}>
              {filtered.map(course => {
                const owned = purchased.includes(course.id);
                return (
                  <div key={course.id}
                    style={{ background:"rgba(6,18,44,0.7)", border:"1px solid rgba(96,165,250,0.12)", borderRadius:18, overflow:"hidden", transition:"transform 0.2s, border-color 0.2s, box-shadow 0.2s", cursor:"pointer" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor="rgba(96,165,250,0.3)";e.currentTarget.style.boxShadow="0 12px 40px rgba(37,99,235,0.15)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="rgba(96,165,250,0.12)";e.currentTarget.style.boxShadow="none";}}>

                    {/* Course image / banner */}
                    <div style={{ height:130, background:course.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, position:"relative" }}>
                      {course.image}
                      <div style={{ position:"absolute", top:12, left:12, background:course.badgeColor, borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:600, color:"#fff", letterSpacing:"0.3px" }}>
                        {course.badge}
                      </div>
                      {owned && (
                        <div style={{ position:"absolute", top:12, right:12, background:"rgba(52,211,153,0.25)", border:"1px solid rgba(52,211,153,0.5)", borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:500, color:"#34D399" }}>
                          ✓ Owned
                        </div>
                      )}
                    </div>

                    <div style={{ padding:"18px 18px 20px" }}>
                      {/* Category + level */}
                      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                        <span style={{ fontSize:11, color:"#60A5FA", background:"rgba(37,99,235,0.15)", borderRadius:5, padding:"2px 8px" }}>{course.category}</span>
                        <span style={{ fontSize:11, color:"#6B9BD2", background:"rgba(30,58,138,0.2)", borderRadius:5, padding:"2px 8px" }}>{course.level}</span>
                      </div>

                      <div style={{ fontSize:15, fontWeight:500, color:"#F0F6FF", lineHeight:1.4, marginBottom:6 }}>{course.title}</div>
                      <div style={{ fontSize:12, color:"#4E7BCC", marginBottom:10 }}>by {course.instructor}</div>
                      <div style={{ fontSize:12, color:"#6B9BD2", lineHeight:1.5, marginBottom:14, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                        {course.description}
                      </div>

                      {/* Rating */}
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                        <Stars rating={course.rating} />
                        <span style={{ fontSize:12, color:"#F59E0B", fontWeight:500 }}>{course.rating}</span>
                        <span style={{ fontSize:12, color:"#4E7BCC" }}>({course.reviews.toLocaleString()})</span>
                        <span style={{ marginLeft:"auto", fontSize:12, color:"#6B9BD2" }}>{course.lessons} lessons · {course.duration}</span>
                      </div>

                      {/* Price + CTA */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div>
                          <span style={{ fontSize:18, fontWeight:700, color:"#F0F6FF" }}>₹{course.price.toLocaleString()}</span>
                          <span style={{ fontSize:12, color:"#4E7BCC", textDecoration:"line-through", marginLeft:8 }}>₹{course.originalPrice.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => !owned && setSelected(course)}
                          style={{
                            padding:"9px 18px",
                            background: owned
                              ? "rgba(52,211,153,0.15)"
                              : "linear-gradient(135deg,#1D4ED8,#3B82F6)",
                            border: owned ? "1px solid rgba(52,211,153,0.4)" : "none",
                            borderRadius:10, color: owned?"#34D399":"#fff",
                            fontSize:13, fontWeight:500, cursor: owned?"default":"pointer",
                            fontFamily:"'DM Sans',sans-serif",
                            boxShadow: owned?"none":"0 2px 12px rgba(37,99,235,0.4)",
                            transition:"opacity 0.15s",
                          }}
                          onMouseEnter={e=>{if(!owned)e.currentTarget.style.opacity="0.85";}}
                          onMouseLeave={e=>{e.currentTarget.style.opacity="1";}}>
                          {owned ? "✓ Access course" : "Buy now"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Purchase modal */}
      {selectedCourse && (
        <PurchaseModal
          course={selectedCourse}
          onClose={() => setSelected(null)}
          onSuccess={handlePurchaseSuccess}
        />
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"rgba(6,18,44,0.97)", border:"1px solid rgba(52,211,153,0.4)", borderRadius:12, padding:"14px 22px", color:"#34D399", fontSize:14, fontWeight:500, zIndex:200, boxShadow:"0 8px 32px rgba(0,0,0,0.4)", whiteSpace:"nowrap" }}>
          {toast}
        </div>
      )}
    </>
  );
}