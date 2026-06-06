"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, ShieldAlert, Cpu } from "lucide-react";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect straight to dashboard
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcoded account credentials check
    setTimeout(() => {
      if (email === "editor@castflow.studio" && password === "password123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        router.push("/dashboard");
      } else {
        setError("Invalid email address or password. Please use the testing credentials provided.");
        setLoading(false);
      }
    }, 600); // Small delay for realistic feel
  };

  return (
    <div className={styles.container}>
      <div className={styles.glowBg} />

      {/* Brand Header */}
      <div className={styles.brandWrapper}>
        <h1 className={styles.logoTitle}>CastFlow</h1>
        <span className={styles.logoSubtitle}>Editorial Studio</span>
      </div>

      {/* Login Card */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Editor Login</h2>
        <p className={styles.cardDesc}>
          Access your production workspace and active sessions.
        </p>

        {error && (
          <div className={styles.errorBanner}>
            <ShieldAlert size={16} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Editor Email</label>
            <div className={styles.inputWrapper}>
              <span className={styles.prefix}>@</span>
              <input
                type="email"
                required
                className={styles.inputWithPrefix}
                placeholder="editor@castflow.studio"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Password input field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIconLeft}>
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                className={styles.inputWithIcons}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Link href="#" className={styles.forgotLink}>
            Forgot Password?
          </Link>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Verifying..." : "Enter Dashboard"}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className={styles.cardFooter}>
          <div className={styles.footerNode}>
            <span className={styles.footerNodeDot} />
            <span>SSO Enabled</span>
          </div>
          <span>•</span>
          <div className={styles.footerNode}>
            <Cpu size={12} />
            <span>v2.4.0-build</span>
          </div>
        </div>
      </div>

      {/* System status metrics below card */}
      <div className={styles.systemStatus}>
        <div className={styles.statusItem}>
          <span className={styles.statusDotPulse} />
          <span>Studio-Alpha: Operational</span>
        </div>
        <span>•</span>
        <span>Uptime: 99.98%</span>
        <span>•</span>
        <span>Active Nodes: 14</span>
      </div>

      {/* Footer links */}
      <footer className={styles.pageFooter}>
        <p className={styles.copyright}>© 2026 CastFlow. Technical excellence in audio.</p>
        <div className={styles.footerLinks}>
          <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
          <Link href="#" className={styles.footerLink}>Terms of Service</Link>
          <Link href="#" className={styles.footerLink}>Support</Link>
          <Link href="#" className={styles.footerLink}>Admin Portal</Link>
        </div>
      </footer>
    </div>
  );
}
