import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyElevateIQ from "../components/WhyElevateIQ";
import CourseGalaxy from "../components/CourseGalaxy";
import LearningExperience from "../components/LearningExperience";
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";

function Landing() {
  return (
    <div>
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="courses">
        <CourseGalaxy />
      </div>

      <div id="services">
        <WhyElevateIQ />
      </div>

      <LearningExperience />

      {/* Student Reviews Section */}
      <div id="reviews">
        <Testimonials />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
}

export default Landing;