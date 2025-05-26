import React, { useState, useEffect } from "react";
import HeroSection from "./AuthenticatedHero";
import UnauthenticatedHeroSection from "./UnauthenticatedHero";

const MainHero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsAuthenticated(!!storedToken); // Set to true if token exists, false otherwise
  }, []);

  return (
    <div className="relative top-[-0.2in]">
      {isAuthenticated ? <HeroSection /> : <UnauthenticatedHeroSection />}
    </div>
  );
};

export default MainHero;
