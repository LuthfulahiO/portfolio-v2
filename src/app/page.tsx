"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import PortfolioIntro from "@/components/PortfolioIntro";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Calculate total animation time: (morphTime + cooldownTime) * number of texts
    const totalAnimationTime = (1.5 + 0.5) * 5 * 1000; // Convert to milliseconds

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return <PortfolioIntro />;
}
