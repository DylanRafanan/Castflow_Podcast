"use client";

import { useState } from "react";
import { Copy, RefreshCw, Check, Shield } from "lucide-react";
import styles from "./settings.module.css";

export default function SettingsPage() {
  const [userName, setUserName] = useState("Editor Account");
  const [userEmail, setUserEmail] = useState("editor@castflow.studio");
  const [apiToken, setApiToken] = useState("cf_live_9a2b8e3d4c1f0e2d3b4a5e6f");
  const [autoSync, setAutoSync] = useState(true);
  const [enhancements, setEnhancements] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCopying, setIsCopying] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleCopyToken = () => {
    if (isCopying) return;
    navigator.clipboard.writeText(apiToken);
    setIsCopying(true);
    triggerToast("API Token copied to clipboard!");
    
    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  };

  const handleRegenerateToken = () => {
    if (confirm("Are you sure you want to regenerate this API key? Old key integration setups will stop working.")) {
      const chars = "abcdef0123456789";
      let newHash = "";
      for (let i = 0; i < 24; i++) {
        newHash += chars[Math.floor(Math.random() * chars.length)];
      }
      setApiToken(`cf_live_${newHash}`);
      triggerToast("New API Token successfully generated!");
    }
  };

  const handleSaveSettings = () => {
    triggerToast("Settings saved successfully!");
  };

  return (
    <div className={styles.container}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--status-green)",
          borderRadius: "8px",
          padding: "16px 20px",
          boxShadow: "var(--shadow-lg), 0 0 20px rgba(16, 185, 129, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 1000,
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}>
          <Check size={18} color="var(--status-green)" />
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>
            {toastMessage}
          </span>
        </div>
      )}

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Editor Profile</h3>
          <p className={styles.panelDesc}>Configure your personal workspace and API configurations.</p>
        </div>

        {/* Profile Details */}
        <div className={styles.formGroup}>
          <label className={styles.fieldLabel}>Profile Name</label>
          <input
            type="text"
            className={styles.textInput}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.fieldLabel}>Email Address</label>
          <input
            type="email"
            className={styles.textInput}
            disabled
            value={userEmail}
          />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Account email is managed by your organization administrator.
          </span>
        </div>

        {/* API Credentials */}
        <div className={styles.formGroup}>
          <label className={styles.fieldLabel}>API Connection Token</label>
          <div className={styles.tokenWrapper}>
            <div className={styles.tokenBox}>{apiToken}</div>
            <button 
              onClick={handleCopyToken} 
              className={styles.iconBtn}
              title="Copy to Clipboard"
            >
              {isCopying ? <Check size={16} color="var(--status-green)" /> : <Copy size={16} />}
            </button>
            <button 
              onClick={handleRegenerateToken} 
              className={styles.btnRegen}
              title="Regenerate Key"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* Settings List Options */}
        <div className={styles.settingsList}>
          <div className={styles.fieldLabel} style={{ marginBottom: "-4px" }}>System Preferences</div>
          
          {/* Toggle 1 */}
          <div className={styles.toggleRow}>
            <div className={styles.toggleMeta}>
              <span className={styles.toggleTitle}>Auto-Sync Ingestions</span>
              <span className={styles.toggleDesc}>
                Automatically pull new metadata drafts from registered RSS podcast feeds.
              </span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          {/* Toggle 2 */}
          <div className={styles.toggleRow}>
            <div className={styles.toggleMeta}>
              <span className={styles.toggleTitle}>Audio Enhancement Layer</span>
              <span className={styles.toggleDesc}>
                Pre-process uploaded files for ambient noise removal and normalization.
              </span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={enhancements}
                onChange={(e) => setEnhancements(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>
        </div>

        {/* Footer Save Row */}
        <div className={styles.footerRow}>
          <button 
            onClick={handleSaveSettings} 
            className={styles.btnSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
