import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

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
    ];
    for (let i = 0; i < 18; i++) {
      const geo = geoFactories[i % geoFactories.length]();
      const mat = new THREE.MeshBasicMaterial({ color: blueShades[i % blueShades.length], wireframe: true, transparent: true, opacity: 0.15 + Math.random() * 0.25 });
      const m = new THREE.Mesh(geo, mat);
      m.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6 - 3);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      m.userData = { rx:(Math.random()-0.5)*0.008, ry:(Math.random()-0.5)*0.012, rz:(Math.random()-0.5)*0.005, fy:m.position.y, fs:0.2+Math.random()*0.4, fa:0.08+Math.random()*0.15 };
      scene.add(m); meshes.push(m);
    }
    const pCount = 300, pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) { pPos[i*3]=(Math.random()-0.5)*22; pPos[i*3+1]=(Math.random()-0.5)*16; pPos[i*3+2]=(Math.random()-0.5)*12-6; }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color:0x60a5fa, size:0.025, transparent:true, opacity:0.5 }));
    scene.add(particles);
    let t = 0, animId;
    const animate = () => {
      animId = requestAnimationFrame(animate); t += 0.01;
      meshes.forEach(m => { m.rotation.x+=m.userData.rx; m.rotation.y+=m.userData.ry; m.rotation.z+=m.userData.rz; m.position.y=m.userData.fy+Math.sin(t*m.userData.fs)*m.userData.fa; });
      particles.rotation.y += 0.0003; particles.rotation.x += 0.0001;
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => { const w=mount.clientWidth,h=mount.clientHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); renderer.dispose(); };
  }, []);
  return <div ref={mountRef} style={{ position:"absolute", inset:0, zIndex:0 }} />;
}

export default function Signup() {
  const [form, setForm]       = useState({ name:"", email:"", password:"", confirm:"" });
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm)
      return setStatus({ ok:false, msg:"Please fill in all required fields." });
    if (form.password !== form.confirm)
      return setStatus({ ok:false, msg:"Passwords do not match." });
    if (form.password.length < 6)
      return setStatus({ ok:false, msg:"Password must be at least 6 characters." });

    setLoading(true); setStatus(null);
    try {
      const res  = await fetch("http://eleqauteiq-backend.vercel.app/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:     form.name,
          email:    form.email,
          password: form.password,
          role:     "user", // always user — no dashboard access
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user",  JSON.stringify(data.data.user));
        setStatus({ ok:true, msg:`✓ Account created! Welcome, ${data.data.user.name}!` });
        setTimeout(() => navigate("/home"), 800); // goes to UserHome, not a dashboard
      } else {
        setStatus({ ok:false, msg: data.message || "Registration failed." });
      }
    } catch {
      setStatus({ ok:false, msg:"Cannot connect to server. Please try again." });
    }
    setLoading(false);
  };

  const inputStyle = (name) => ({
    width:"100%", padding:"10px 14px",
    background:"rgba(10,25,60,0.6)",
    border:`1px solid ${focused===name ? "rgba(96,165,250,0.5)" : "rgba(59,130,246,0.2)"}`,
    boxShadow: focused===name ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
    borderRadius:"10px", color:"#E2EEFF", fontSize:"14px",
    fontFamily:"'DM Sans', sans-serif", outline:"none",
    transition:"border-color 0.2s, box-shadow 0.2s", boxSizing:"border-box",
  });

  const fields = [
    { key:"name",    label:"Full Name *",       type:"text",     placeholder:"John Doe" },
    { key:"email",   label:"Email *",            type:"email",    placeholder:"you@elevateiq.com" },
    { key:"password",label:"Password *",         type:"password", placeholder:"Min. 6 characters" },
    { key:"confirm", label:"Confirm Password *", type:"password", placeholder:"Re-enter password" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        input::placeholder { color:#2C4878; }
      `}</style>
      <div style={{ position:"relative", minHeight:"100vh", background:"#020917", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans', sans-serif", overflow:"hidden", padding:"24px 0" }}>
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"rgba(37,99,235,0.1)", filter:"blur(80px)", top:-100, left:-80, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"rgba(96,165,250,0.07)", filter:"blur(80px)", bottom:-80, right:-60, pointerEvents:"none" }} />
        <ThreeBackground />

        <div style={{ position:"relative", zIndex:2, width:420, padding:"36px 32px", background:"rgba(6,18,44,0.65)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:24, boxShadow:"0 0 60px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

          {/* Brand */}
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,#1D4ED8,#60A5FA)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", boxShadow:"0 0 20px rgba(37,99,235,0.5)" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontSize:22, fontWeight:700, color:"#F0F6FF", letterSpacing:-0.3 }}>ElevateIQ</div>
            <div style={{ fontSize:11, color:"#4E7BCC", marginTop:3, letterSpacing:"0.5px", textTransform:"uppercase" }}>Create your account</div>
          </div>

          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:500, color:"#6B9BD2", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:5 }}>{label}</label>
              <input type={type} placeholder={placeholder} value={form[key]}
                onChange={set(key)}
                onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                onKeyDown={e => e.key==="Enter" && handleSignup()}
                style={inputStyle(key)} />
            </div>
          ))}

          <button onClick={handleSignup} disabled={loading}
            style={{ width:"100%", padding:"13px", marginTop:4, background:"linear-gradient(135deg,#1D4ED8 0%,#2563EB 60%,#3B82F6 100%)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:500, fontFamily:"'DM Sans', sans-serif", cursor:loading?"not-allowed":"pointer", letterSpacing:"0.3px", boxShadow:"0 4px 20px rgba(37,99,235,0.35)", opacity:loading?0.7:1, transition:"opacity 0.15s" }}
            onMouseEnter={e => { if(!loading) e.currentTarget.style.opacity="0.9"; }}
            onMouseLeave={e => { if(!loading) e.currentTarget.style.opacity="1"; }}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>

          {status && (
            <div style={{ marginTop:12, fontSize:13, textAlign:"center", color:status.ok?"#34D399":"#F87171" }}>
              {status.msg}
            </div>
          )}

          <div style={{ marginTop:20, textAlign:"center", fontSize:12, color:"#4E7BCC" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}
              style={{ color:"#60A5FA", cursor:"pointer", fontWeight:500 }}
              onMouseEnter={e => e.target.style.textDecoration="underline"}
              onMouseLeave={e => e.target.style.textDecoration="none"}>
              Sign in
            </span>
          </div>
        </div>
      </div>
    </>
  );
}