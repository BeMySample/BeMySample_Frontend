import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Hero from "../components/LandingPage/Hero";
import WhyBeMySample from "../components/LandingPage/WhyBeMySample";
import Packages from "../components/LandingPage/Packages";
import Footer from "../components/LandingPage/Footer";
import CaseStudy from "../components/LandingPage/CaseStudy";

const LandingPage = () => {
  const storedLanguage = localStorage.getItem("language") || "id";
  const [language, setLanguage] = useState(storedLanguage);

  return (
    <div>
      <Hero language={language} />
      <WhyBeMySample language={language} />
      <CaseStudy language={language} />
      <Packages language={language} />
      <Footer language={language} />

      <Helmet>
        <title>BeMySample: Reliability at Reach</title>
      </Helmet>
    </div>
  );
};

export default LandingPage;
