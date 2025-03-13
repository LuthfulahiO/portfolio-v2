"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import PortfolioIntro from "@/components/PortfolioIntro";

export default function AIPortfolio() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Calculate total animation time: (morphTime + cooldownTime) * number of texts
    const totalAnimationTime = (1.5 + 0.5) * 5 * 1000; // Convert to milliseconds

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipAnimation = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return <Loader onSkip={handleSkipAnimation} />;
  }

  return <PortfolioIntro />;
}
