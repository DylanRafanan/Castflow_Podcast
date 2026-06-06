"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div style={{
      backgroundColor: "#0B0B0C",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#8E8E98",
      fontFamily: "var(--font-sans)"
    }}>
      <div style={{ 
        fontSize: "1.1rem", 
        fontWeight: 500,
        letterSpacing: "0.05em",
        animation: "pulse 1.5s infinite" 
      }}>
        Loading CastFlow Studio...
      </div>
    </div>
  );
}
