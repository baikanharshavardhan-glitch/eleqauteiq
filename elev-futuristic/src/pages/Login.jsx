import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// ── MOCK ACCOUNTS ─────────────────────────────────────────────────────
const MOCK_USERS = [
  { email: "admin@elevateiq.com",    password: "Admin@123",    role: "admin",    name: "Admin User"    },
  { email: "employee@elevateiq.com", password: "Employee@123", role: "employee", name: "Employee User" },
  { email: "trainer@elevateiq.com",  password: "Trainer@123",  role: "trainer",  name: "Trainer User"  },
  { email: "student@elevateiq.com",  password: "Student@123",  role: "student",  name: "Student User"  },
];

// ── SET THIS TO false WHEN YOUR DB IS READY ───────────────────────────
const DEMO_MODE = true;

function ThreeBackground() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth, H = mount.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 6;
    const blueShades = [0x1d4ed8, 0x2563eb, 0x3b82f6, 0x60a5fa, 0x93c5fd, 0x0ea5e9];
    const meshes = [];
    const geoFactories = [
      () => new THREE.IcosahedronGeometry(0.45, 0),
      () => new THREE.OctahedronGeometry(0.45),
      () => new THREE.TetrahedronGeometry(0.45),
      () => new THREE.TorusGeometry(0.35, 0.12, 6, 18),
      () => new THREE.IcosahedronGeometry(0.25, 1),
    ];
    for (let i = 0; i < 18; i++) {
      const geo = geoFactories[i % geoFactories.length]();
      const mat = new THREE.MeshBasicMaterial({ color: blueShades[i % blueShades.length], wireframe: true, transparent: true, opacity: 0.15 + Math.random() * 0.25 });
      const m = new THREE.Mesh(geo, mat);
      m.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 3);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      m.userData = { rx: (Math.random() - 0.5) * 0.008, ry: (Math.random() - 0.5) * 0.012, rz: (Math.random() - 0.5) * 0.005, fy: m.position.y, fs: 0.2 + Math.random() * 0.4, fa: 0.08 + Math.random() * 0.15 };
      scene.add(m); meshes.push(m);
    }
    const pCount = 300, pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) { pPos[i*3]=(Math.random()-0.5)*22; pPos[i*3+1]=(Math.random()-0.5)*16; pPos[i*3+2]=(Math.random()-0.5)*12-6; }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.025, transparent: true, opacity: 0.5 }));
    scene.add(particles);
    let t = 0, animId;
    const animate = () => {
      animId = requestAnimationFrame(animate); t += 0.01;
      meshes.forEach(m => { m.rotation.x += m.userData.rx; m.rotation.y += m.userData.ry; m.rotation.z += m.userData.rz; m.position.y = m.userData.fy + Math.sin(t * m.userData.fs) * m.userData.fa; });
      particles.rotation.y += 0.0003; particles.rotation.x += 0.0001;
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => { const w=mount.clientWidth,h=mount.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); };
  }, []);
  return <div ref={mountRef} style={{ position:"absolute", inset:0, zIndex:0 }} />;
}

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState(null);
  const navigate = useNavigate();

  // ── FIX: explicit route map — edit paths here if your routes differ ──
  const ROLE_ROUTES = {
    admin:    "/admin",
    trainer:  "/trainer",
    student:  "/student",
    employee: "/employee",
  };

  const redirectByRole = (role) => {
    const path = ROLE_ROUTES[role];
    if (path) {
      navigate(path, { replace: true });
    } else {
      console.warn("Unknown role:", role, "→ falling back to /home");
      navigate("/home", { replace: true });
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return setStatus({ ok: false, msg: "Please enter email and password." });
    setLoading(true);
    setStatus(null);

    // ── DEMO MODE ─────────────────────────────────────────────────────
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600));
      const mockUser = MOCK_USERS.find(
        u => u.email === email.trim().toLowerCase() && u.password === password
      );
      if (mockUser) {
        localStorage.setItem("token", "mock-token-" + mockUser.role);
        localStorage.setItem("user", JSON.stringify({
          id: 1,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
        }));
        setStatus({ ok: true, msg: `✓ Welcome, ${mockUser.name}!` });
        setTimeout(() => redirectByRole(mockUser.role), 600);
      } else {
        setStatus({ ok: false, msg: "Invalid credentials. Check email & password." });
      }
      setLoading(false);
      return;
    }

    // ── REAL MODE (when DB is ready) ──────────────────────────────────
    try {
      const res = await fetch("https://eleqauteiq-backend.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user",  JSON.stringify(data.data.user));
        setStatus({ ok: true, msg: `✓ Welcome, ${data.data.user.name}!` });
        setTimeout(() => redirectByRole(data.data.user.role), 600);
      } else {
        setStatus({ ok: false, msg: data.message || "Invalid credentials." });
      }
    } catch {
      setStatus({ ok: false, msg: "Cannot connect to server." });
    }
    setLoading(false);
  };

  const inputStyle = (name) => ({
    width: "100%", padding: "11px 14px",
    background: "rgba(10,25,60,0.6)",
    border: `1px solid ${focused === name ? "rgba(96,165,250,0.5)" : "rgba(59,130,246,0.2)"}`,
    boxShadow: focused === name ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
    borderRadius: "10px", color: "#E2EEFF", fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #2C4878; }
      `}</style>
      <div style={{ position:"relative", minHeight:"100vh", background:"#020917", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans', sans-serif", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"rgba(37,99,235,0.1)", filter:"blur(80px)", top:-100, left:-80, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"rgba(96,165,250,0.07)", filter:"blur(80px)", bottom:-80, right:-60, pointerEvents:"none" }} />
        <ThreeBackground />
        <div style={{ position:"relative", zIndex:2, width:400, padding:"36px 32px", background:"rgba(6,18,44,0.65)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:24, boxShadow:"0 0 60px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

          {/* Brand */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#1D4ED8,#60A5FA)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", boxShadow:"0 0 20px rgba(37,99,235,0.5)" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontSize:22, fontWeight:700, color:"#F0F6FF", letterSpacing:-0.3 }}>ElevateIQ</div>
            <div style={{ fontSize:11, color:"#4E7BCC", marginTop:3, letterSpacing:"0.5px", textTransform:"uppercase" }}>Sign in to continue</div>
          </div>

          {/* Demo hint */}
          <div style={{ marginBottom:16, padding:"8px 12px", background:"rgba(37,99,235,0.08)", border:"1px solid rgba(59,130,246,0.15)", borderRadius:8, fontSize:11, color:"#4E7BCC", lineHeight:1.6 }}>
            <strong style={{ color:"#60A5FA" }}>Demo credentials:</strong><br />
            admin@elevateiq.com / Admin@123<br />
            trainer@elevateiq.com / Trainer@123<br />
            student@elevateiq.com / Student@123<br />
            employee@elevateiq.com / Employee@123
          </div>

          {/* Email */}
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:500, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:6 }}>Email</label>
            <input type="email" placeholder="you@elevateiq.com" value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              style={inputStyle("email")} />
          </div>

          {/* Password */}
          <div style={{ marginBottom:6 }}>
            <label style={{ display:"block", fontSize:11, fontWeight:500, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:6 }}>Password</label>
            <input type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={inputStyle("password")} />
          </div>

          <div style={{ textAlign:"right", marginBottom:4 }}>
            <span style={{ fontSize:11, color:"#4E7BCC", cursor:"pointer" }}>Forgot password?</span>
          </div>

          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", padding:"13px", marginTop:10, background:"linear-gradient(135deg,#1D4ED8 0%,#2563EB 60%,#3B82F6 100%)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:500, fontFamily:"'DM Sans', sans-serif", cursor:loading?"not-allowed":"pointer", letterSpacing:"0.3px", boxShadow:"0 4px 20px rgba(37,99,235,0.35)", opacity:loading?0.7:1, transition:"opacity 0.15s" }}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>

          {status && (
            <div style={{ marginTop:12, fontSize:13, textAlign:"center", color:status.ok?"#34D399":"#F87171" }}>
              {status.msg}
            </div>
          )}
        </div>
      </div>
    </>
  );
}