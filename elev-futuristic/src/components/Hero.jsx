import ParticleBackground from "./ParticleBackground";
import AnimatedHeadline from "./AnimatedHeadline";
import HeroButtons from "./HeroButtons";
import AICore from "./AICore";
import FloatingSkills from "./FloatingSkills";
import HeroCanvas from "./HeroCanvas";
function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 80px",
        position: "relative",
        overflow: "hidden",
        background: "#030712",
      }}
    >
      {/* Particles */}
      <ParticleBackground />

      {/* Left Side */}
      <div
        style={{
          maxWidth: "700px",
          zIndex: 10,
        }}
      >
        <p
          style={{
            color: "#60A5FA",
            letterSpacing: "4px",
            marginBottom: "20px",
            fontWeight: "600",
            fontSize: "48px",
          }}
        >
          ELEVATEIQ SOFT TECH PRIVATE LIMITED
        </p>

        <AnimatedHeadline />

        <p
          style={{
            color: "#94A3B8",
            fontSize: "22px",
            marginTop: "25px",
            maxWidth: "650px",
          }}
        >
          AI Powered Learning, Workforce Development,
          Software Solutions and Career Growth Platform.
        </p>

        <HeroButtons />

        <div
          style={{
            display: "flex",
            gap: "50px",
            marginTop: "50px",
            color: "white",
            fontSize: "28px",
          }}
        >
          <div>
            <h2>5000+</h2>
            <p>Students</p>
          </div>

          <div>
            <h2>200+</h2>
            <p>Courses</p>
          </div>

          <div>
            <h2>50+</h2>
            <p>Trainers</p>
          </div>

          <div>
            <h2>95%</h2>
            <p>Success</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          position: "relative",
          width: "650px",
          height: "650px",
          zIndex: 5,
        }}
      >
        <HeroCanvas />
        <FloatingSkills />
      </div>
    </section>
  );
}

export default Hero;