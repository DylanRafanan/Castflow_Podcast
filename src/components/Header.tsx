"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, HelpCircle, User, Settings, LogOut } from "lucide-react";
import styles from "./components.module.css";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close profile menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/review-queue":
        return "Podcast Queue";
      case "/content-editor":
        return "Podcast Editor";
      case "/collections":
        return "Collections";
      case "/episodes":
        return "Episodes";
      case "/published":
        return "Published";
      case "/ai-highlights":
        return "AI Highlights";
      case "/settings":
        return "Settings";
      default:
        return "Studio Panel";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.replace("/login");
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.headerTitle}>{getPageTitle()}</h2>

      <div className={styles.headerControls}>
        <button className={styles.controlBtn} title="Notifications">
          <Bell size={18} />
        </button>
        <button className={styles.controlBtn} title="Help Center">
          <HelpCircle size={18} />
        </button>

        <div className={styles.avatarWrapper} ref={menuRef}>
          <button 
            className={styles.avatar} 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="User Profile"
          >
            {/* Simple initials fallback or avatar */}
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>ED</span>
          </button>

          {showProfileMenu && (
            <div className={styles.profileMenu}>
              <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-subtle)", marginBottom: "4px" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-main)" }}>Editor Account</p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis" }}>
                  editor@castflow.studio
                </p>
              </div>
              <button 
                onClick={() => { setShowProfileMenu(false); router.push("/settings"); }} 
                className={styles.menuItem}
              >
                <Settings size={14} />
                <span>Account Settings</span>
              </button>
              <button 
                onClick={handleLogout} 
                className={styles.menuItem}
                style={{ color: "var(--status-red)" }}
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
