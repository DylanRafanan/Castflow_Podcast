"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "src/components/Sidebar";
import Header from "src/components/Header";
import AudioPlayer from "src/components/AudioPlayer";
import { AudioProvider } from "src/context/AudioContext";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
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
          Authorizing Session...
        </div>
      </div>
    );
  }

  return (
    <AudioProvider>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-main)" }}>
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Right Content Area */}
        <div style={{ 
          flexGrow: 1, 
          marginLeft: "var(--sidebar-width)", 
          display: "flex", 
          flexDirection: "column",
          minHeight: "100vh",
          paddingBottom: "100px" // safety margin for overlapping player
        }}>
          <Header />
          <main style={{ flexGrow: 1, padding: "32px", display: "flex", flexDirection: "column" }}>
            {children}
          </main>
        </div>

        {/* Global Floating/Footer Player */}
        <AudioPlayer />
      </div>
    </AudioProvider>
  );
}
