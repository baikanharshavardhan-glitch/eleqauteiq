import { useState, useEffect } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking...");
  const [color, setColor]   = useState("#f59e0b");
  const [time, setTime]     = useState("");
  const [apis, setApis]     = useState([
    { name: "Health Check",   url: "/api/health",            status: "checking" },
    { name: "Auth - Login",   url: "/api/auth/login",        status: "checking" },
    { name: "Courses",        url: "/api/courses",           status: "checking" },
    { name: "Announcements",  url: "/api/announcements",     status: "checking" },
  ]);

  useEffect(() => {
    checkBackend();
    checkAllApis();
  }, []);

  const checkBackend = async () => {
    try {
      const res  = await fetch("https://eleqauteiq-backend.vercel.app/api/health");
      const data = await res.json();
      if (data.status === "ok") {
        setStatus("✅ Backend Connected!");
        setColor("#22c55e");
        setTime(new Date(data.time).toLocaleTimeString());
      }
    } catch {
      setStatus("❌ Backend NOT Connected!");
      setColor("#ef4444");
    }
  };

  const checkAllApis = async () => {
    const results = await Promise.all(
      apis.map(async (api) => {
        try {
          const res = await fetch(`ttps://eleqauteiq-backend.vercel.app${api.url}`);
          // Any response means server is reachable
          return { ...api, status: res.status < 500 ? "reachable" : "error" };
        } catch {
          return { ...api, status: "unreachable" };
        }
      })
    );
    setApis(results);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#020917",
      display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        background: "#0f172a", border: "1px solid #1e293b",
        borderRadius: 20, padding: 40, width: 480
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔌</div>
          <div style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 700 }}>
            Backend Status
          </div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
            ElevateIQ API Connection Check
          </div>
        </div>

        {/* Main Status */}
        <div style={{
          background: color + "22", border: `1px solid ${color}55`,
          borderRadius: 14, padding: 20, textAlign: "center", marginBottom: 24
        }}>
          <div style={{ color, fontSize: 20, fontWeight: 700 }}>{status}</div>
          {time && (
            <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>
              Server responded at {time}
            </div>
          )}
          <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>
            URL: https://eleqauteiq-backend.vercel.app
          </div>
        </div>

        {/* API Checks */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
            API Endpoints
          </div>
          {apis.map((api, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "10px 14px",
              background: "#1e293b", borderRadius: 10, marginBottom: 8
            }}>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 13 }}>{api.name}</div>
                <div style={{ color: "#475569", fontSize: 11 }}>{api.url}</div>
              </div>
              <span style={{
                background:
                  api.status === "reachable"   ? "#16a34a22" :
                  api.status === "unreachable" ? "#7f1d1d22" : "#78350f22",
                color:
                  api.status === "reachable"   ? "#4ade80" :
                  api.status === "unreachable" ? "#f87171" : "#fbbf24",
                padding: "4px 12px", borderRadius: 20, fontSize: 12
              }}>
                {api.status === "reachable"   ? "✅ Reachable" :
                 api.status === "unreachable" ? "❌ Unreachable" : "⏳ Checking..."}
              </span>
            </div>
          ))}
        </div>

        {/* Recheck Button */}
        <button
          onClick={() => { checkBackend(); checkAllApis(); }}
          style={{
            width: "100%", background: "linear-gradient(135deg,#16a34a,#0891b2)",
            color: "#fff", border: "none", borderRadius: 10,
            padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}
        >
          🔄 Recheck Connection
        </button>

      </div>
    </div>
  );
}