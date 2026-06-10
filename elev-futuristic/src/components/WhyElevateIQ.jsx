import { useState, useEffect, useRef } from "react";

const categories = [
  {
    id: "it",
    label: "IT Works",
    letter1: "I",
    letter2: "T",
    tagline: "Building the Digital Future",
    color: "#00c6ff",
    color2: "#7b2ff7",
    glow: "0 0 60px #00c6ff55, 0 0 120px #7b2ff733",
    services: [
      {
        name: "Web Application Development",
        icon: "🌐",
        desc: "We craft high-performance web apps using React, Next.js, Node.js and modern stacks — from MVPs to enterprise platforms.",
      },
      {
        name: "App Development",
        icon: "📱",
        desc: "Native and cross-platform mobile apps for iOS & Android using Flutter and React Native, built for speed and scale.",
      },
      {
        name: "Software Testing & QA",
        icon: "🧪",
        desc: "End-to-end testing automation, manual QA, performance testing, and CI/CD pipeline integration for bug-free releases.",
      },
      {
        name: "Big Data Engineering",
        icon: "🗄️",
        desc: "Scalable data pipelines, Spark/Hadoop architecture, data lakes and warehouses designed for enterprise-grade volumes.",
      },
      {
        name: "Data Analysis",
        icon: "📊",
        desc: "Insight-driven analytics, dashboards, predictive models, and business intelligence reporting powered by Python and BI tools.",
      },
    ],
  },
  {
    id: "nonit",
    label: "Non-IT",
    letter1: "N",
    letter2: "I",
    tagline: "Beyond Code, Beyond Limits",
    color: "#ff6b35",
    color2: "#f7c59f",
    glow: "0 0 60px #ff6b3555, 0 0 120px #f7c59f33",
    services: [
      {
        name: "Data Annotation",
        icon: "🏷️",
        desc: "High-quality labeling for ML datasets — image, text, audio & video annotation with precision and speed.",
      },
      {
        name: "AI Logging",
        icon: "🤖",
        desc: "Advanced AI model validation, output grading, and human feedback integration for RLHF workflows.",
      },
      {
        name: "AI Hand Cam",
        icon: "🖐️",
        desc: "Computer vision solutions for hand gesture recognition, tracking and real-time interaction interfaces.",
      },
      {
        name: "Audio Transcription",
        icon: "🎙️",
        desc: "Accurate speech-to-text transcription with speaker diarization, timestamps, and multilingual support.",
      },
      {
        name: "Video Transcription",
        icon: "🎬",
        desc: "Frame-accurate video captioning, subtitle generation, and content indexing at scale.",
      },
      {
        name: "Mapping & GIS",
        icon: "🗺️",
        desc: "Geospatial mapping, route optimization, and location intelligence for logistics and urban planning.",
      },
      {
        name: "2D to 3D Mapping",
        icon: "🏗️",
        desc: "Transform flat maps and blueprints into immersive 3D models for real estate, urban planning, and architecture.",
      },
      {
        name: "Zoning Solutions",
        icon: "📐",
        desc: "Land-use zoning analysis, compliance mapping, and regulatory zone visualization for government and developers.",
      },
      {
        name: "Chart Support",
        icon: "📈",
        desc: "Custom data visualization, interactive charts, and infographic design for reports and presentations.",
      },
      {
        name: "Email Marketing",
        icon: "📧",
        desc: "End-to-end email campaign design, automation, A/B testing, and analytics for maximum conversion.",
      },
    ],
  },
  {
    id: "pharma",
    label: "Pharma",
    letter1: "P",
    letter2: "H",
    tagline: "Healthcare Intelligence Solutions",
    color: "#00e676",
    color2: "#1de9b6",
    glow: "0 0 60px #00e67655, 0 0 120px #1de9b633",
    services: [
      {
        name: "Medical Billing",
        icon: "💊",
        desc: "End-to-end medical billing, claims processing, denial management, and revenue cycle optimization.",
      },
      {
        name: "Medical Coding",
        icon: "🏥",
        desc: "ICD-10, CPT and HCC coding with compliance review, audit support and coder training programs.",
      },
      {
        name: "AR Calling",
        icon: "📞",
        desc: "Accounts receivable follow-up, payer collections, and aging claim resolution to maximize reimbursements.",
      },
      {
        name: "Billing Validation",
        icon: "✅",
        desc: "Pre-submission claim scrubbing, eligibility verification, and billing accuracy audits.",
      },
      {
        name: "Doctor Consultation",
        icon: "👨‍⚕️",
        desc: "Telemedicine platform support, appointment workflows, and patient engagement digital solutions.",
      },
    ],
  },
  {
    id: "students",
    label: "Students",
    letter1: "S",
    letter2: "T",
    tagline: "Learn. Grow. Launch Your Career.",
    color: "#f7c948",
    color2: "#ff9800",
    glow: "0 0 60px #f7c94855, 0 0 120px #ff980033",
    services: [
      {
        name: "Internships",
        icon: "🎓",
        desc: "Structured internship programs with mentorship, hands-on projects and real healthcare exposure.",
      },
      {
        name: "Free & Paid Internships",
        icon: "💼",
        desc: "Flexible internship tiers — community impact programs (free) and compensated roles in active pharma projects.",
      },
      {
        name: "Industrial Workshops",
        icon: "🔬",
        desc: "Live industry workshops, expert-led training sessions, and certification programs in pharma tech.",
      },
      {
        name: "Real-Time Work",
        icon: "⚡",
        desc: "Live project assignments, real client deliverables, and industry simulation environments for learners.",
      },
      {
        name: "Certifications",
        icon: "🏆",
        desc: "Industry-recognized certificates for medical coding, billing, pharma data, and healthcare IT roles.",
      },
    ],
  },
];

function ParticleCanvas({ color, active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, color]);

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={220}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: active ? 1 : 0,
        transition: "opacity 0.6s",
        pointerEvents: "none",
      }}
    />
  );
}

function ServiceDetail({ service, color, onBack }) {
  return (
    <div
      style={{
        animation: "slideIn 0.4s cubic-bezier(0.16,1,0.3,1)",
        padding: "2rem",
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "4rem",
          marginBottom: "1rem",
          filter: `drop-shadow(0 0 20px ${color}88)`,
          animation: "floatIcon 3s ease-in-out infinite",
        }}
      >
        {service.icon}
      </div>
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        {service.name}
      </h3>
      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "1rem",
          lineHeight: 1.7,
          maxWidth: "400px",
          marginBottom: "2rem",
        }}
      >
        {service.desc}
      </p>
      <button
        onClick={onBack}
        style={{
          background: "transparent",
          border: `1px solid ${color}88`,
          color: color,
          padding: "0.6rem 1.5rem",
          borderRadius: "100px",
          cursor: "pointer",
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = color + "22";
          e.target.style.borderColor = color;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.borderColor = color + "88";
        }}
      >
        ← Back to Services
      </button>
    </div>
  );
}

function PopupModal({ cat, onClose }) {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleSelect = (svc) => {
    setAnimating(true);
    setTimeout(() => {
      setSelected(svc);
      setAnimating(false);
    }, 200);
  };

  const handleBack = () => {
    setAnimating(true);
    setTimeout(() => {
      setSelected(null);
      setAnimating(false);
    }, 200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.3s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "min(600px, 95vw)",
          maxHeight: "85vh",
          background: "rgba(10,10,20,0.97)",
          border: `1px solid ${cat.color}44`,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: cat.glow,
          display: "flex",
          flexDirection: "column",
          animation: "popIn 0.4s cubic-bezier(0.16,1,0.3,1)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 2rem 1rem",
            borderBottom: `1px solid ${cat.color}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                color: cat.color,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                margin: 0,
              }}
            >
              OUR SERVICES
            </p>
            <h2
              style={{
                color: "#fff",
                fontSize: "1.4rem",
                fontWeight: 700,
                margin: "0.2rem 0 0",
                letterSpacing: "-0.02em",
              }}
            >
              {cat.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255,255,255,0.05)")
            }
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            overflowY: "auto",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
        >
          {selected ? (
            <ServiceDetail
              service={selected}
              color={cat.color}
              onBack={handleBack}
            />
          ) : (
            <div style={{ padding: "1rem" }}>
              {cat.services.map((svc, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(svc)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    width: "100%",
                    padding: "0.9rem 1rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.25s",
                    marginBottom: "2px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = cat.color + "18";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      flexShrink: 0,
                      width: "40px",
                      textAlign: "center",
                    }}
                  >
                    {svc.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        margin: 0,
                        fontSize: "0.95rem",
                      }}
                    >
                      {svc.name}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.78rem",
                        margin: "0.15rem 0 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {svc.desc.substring(0, 60)}...
                    </p>
                  </div>
                  <span style={{ color: cat.color, opacity: 0.6, flexShrink: 0 }}>
                    →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ cat, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: "24px",
        overflow: "hidden",
        border: `1px solid ${
          hovered ? cat.color + "88" : "rgba(255,255,255,0.08)"
        }`,
        background: "rgba(255,255,255,0.03)",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered
          ? "translateY(-8px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: hovered ? cat.glow : "none",
        animation: `cardEntrance 0.6s ${
          index * 0.15
        }s both cubic-bezier(0.16,1,0.3,1)`,
        aspectRatio: "3/4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ParticleCanvas color={cat.color} active={hovered} />

      {/* Gradient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `radial-gradient(ellipse at 50% 50%, ${cat.color}18 0%, transparent 70%)`
            : "transparent",
          transition: "all 0.6s",
          pointerEvents: "none",
        }}
      />

      {/* Big letters */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "0.2rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {[cat.letter1, cat.letter2].map((letter, li) => (
          <span
            key={li}
            style={{
              fontSize: "clamp(5rem, 10vw, 8rem)",
              fontWeight: 900,
              fontFamily: "'Orbitron', 'Exo 2', monospace",
              color: "transparent",
              WebkitTextStroke: `2px ${
                hovered ? cat.color : "rgba(255,255,255,0.15)"
              }`,
              lineHeight: 1,
              transition: "all 0.5s",
              textShadow: hovered ? `0 0 40px ${cat.color}66` : "none",
              transform: hovered
                ? `translateY(${li === 0 ? "-4px" : "4px"})`
                : "none",
              display: "block",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Bottom info */}
      <div
        style={{
          marginTop: "auto",
          padding: "1.5rem",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            color: cat.color,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            margin: "0 0 0.3rem",
            fontFamily: "monospace",
          }}
        >
          {String(index + 1).padStart(2, "0")} ——
        </p>
        <h3
          style={{
            color: "#fff",
            fontSize: "1.4rem",
            fontWeight: 800,
            margin: "0 0 0.3rem",
            letterSpacing: "-0.02em",
          }}
        >
          {cat.label}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.8rem",
            margin: "0 0 1rem",
          }}
        >
          {cat.tagline}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: cat.color,
            fontSize: "0.8rem",
            fontWeight: 600,
            opacity: hovered ? 1 : 0.6,
            transition: "all 0.3s",
          }}
        >
          <span>Explore Services</span>
          <span
            style={{
              transform: hovered ? "translateX(6px)" : "none",
              transition: "transform 0.3s",
            }}
          >
            →
          </span>
        </div>

        {/* service count badge */}
        <div
          style={{
            position: "absolute",
            top: "-1rem",
            right: "1.5rem",
            background: cat.color + "22",
            border: `1px solid ${cat.color}44`,
            color: cat.color,
            borderRadius: "100px",
            padding: "0.2rem 0.7rem",
            fontSize: "0.72rem",
            fontWeight: 600,
            backdropFilter: "blur(4px)",
          }}
        >
          {cat.services.length} services
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes titleGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          background: "#050510",
          padding: "6rem 2rem",
          fontFamily: "'Inter', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        {/* Section header */}
        <div
          style={{ textAlign: "center", marginBottom: "5rem", position: "relative" }}
        >
          <p
            style={{
              color: "#7b2ff7",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              marginBottom: "1rem",
              fontFamily: "monospace",
              animation: "titleGlow 3s ease-in-out infinite",
            }}
          >
            ◆ WHAT WE OFFER ◆
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 1rem",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Our{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px #00c6ff",
                textShadow: "0 0 60px #00c6ff66",
              }}
            >
              Services
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "1rem",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Four powerful verticals. One mission — delivering excellence across
            technology, operations, healthcare, and education.
          </p>
        </div>

        {/* Cards grid — 4 columns on wide, 2 on mid, 1 on mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={i}
              onClick={() => setActivePopup(cat)}
            />
          ))}
        </div>

        {/* Popup */}
        {activePopup && (
          <PopupModal cat={activePopup} onClose={() => setActivePopup(null)} />
        )}
      </section>
    </>
  );
}