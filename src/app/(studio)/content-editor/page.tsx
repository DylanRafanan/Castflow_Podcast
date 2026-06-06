"use client";

import { useState } from "react";
import { 
  Check, 
  Trash2, 
  Plus, 
  Send, 
  Settings, 
  Music, 
  X, 
  Folder 
} from "lucide-react";
import styles from "./editor.module.css";

export default function ContentEditorPage() {
  // Field States
  const [displayTitle, setDisplayTitle] = useState(
    "The Neural Soundscape: AI's Impact on Digital Audio"
  );
  const [summary, setSummary] = useState(
    "Explore the convergence of artificial intelligence and high-fidelity audio. This episode details how neural processing is redefining spatial audio and creating more immersive, personalized listening experiences for audiophiles worldwide."
  );
  const [tags, setTags] = useState(["AUDIO", "AI", "FUTURE"]);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState("Technology & Innovation");
  const [featured, setFeatured] = useState(true);
  const [collections, setCollections] = useState(["Season 4"]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "info">("success");

  // Initial defaults for Discard/Reset functionality
  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard your changes? This will revert fields to default.")) {
      setDisplayTitle("The Neural Soundscape: AI's Impact on Digital Audio");
      setSummary(
        "Explore the convergence of artificial intelligence and high-fidelity audio. This episode details how neural processing is redefining spatial audio and creating more immersive, personalized listening experiences for audiophiles worldwide."
      );
      setTags(["AUDIO", "AI", "FUTURE"]);
      setCategory("Technology & Innovation");
      setFeatured(true);
      setCollections(["Season 4"]);
      triggerToast("Draft discarded and reset to defaults", "info");
    }
  };

  const handleAddTag = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanTag = tagInput.trim().toUpperCase();
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handlePublish = () => {
    triggerToast("Episode successfully published to networks!", "success");
  };

  const handleSaveDraft = () => {
    triggerToast("Changes saved successfully as draft.", "success");
  };

  return (
    <div className={styles.container}>
      {/* Dynamic Success Notification Toast */}
      {toastMessage && (
        <div className={styles.toast} style={{ borderColor: toastType === "info" ? "var(--brand-blue)" : "var(--status-green)" }}>
          {toastType === "info" ? (
            <Settings size={18} color="var(--brand-blue)" className="animate-spin" />
          ) : (
            <Check size={18} color="var(--status-green)" />
          )}
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>
            {toastMessage}
          </span>
        </div>
      )}

      <div className={styles.editorLayout}>
        {/* Left Column: Metadata Source */}
        <section className={styles.column}>
          <div className={styles.colHeader}>
            <span className={styles.colLabel}>Metadata Source</span>
          </div>

          <div className={styles.metadataCard}>
            {/* Visual simulated artwork */}
            <div className={styles.artworkContainer}>
              <Music size={32} style={{ opacity: 0.2, marginBottom: "8px" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Microphone Feed Input</span>
              <div className={styles.artworkLabel}>RSS ID: 89312</div>
            </div>

            <div className={styles.metaTextGroup}>
              <div className={styles.feedLabel}>Original RSS Title</div>
              <h3 className={styles.metaTitle}>The Neural Soundscape: Evolution of Digital Audio</h3>
            </div>

            <div className={styles.metaTextGroup}>
              <div className={styles.feedLabel}>Source Feed URL</div>
              <span className={styles.feedSource}>
                http://feeds.network.fm/feed/tech/audio-evolution.xml
              </span>
            </div>

            <div className={styles.rawDescWrapper}>
              <span className={styles.rawDescTitle}>Raw Ingested Description</span>
              <div className={styles.rawDescBox}>
                Episode description: From the session at AudioTech 2024. Discusses the impact of modern compression algorithms and AI-driven spatial audio on listener retention. Guest: Dr. Amy Adams. Includes technical details regarding 24-bit/48kHz processing chains and listener neuro-response mapping.
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Enrichment Layer */}
        <section className={styles.column}>
          <div className={styles.colHeader}>
            <span className={styles.colLabel}>Enrichment Layer</span>
            <div className={styles.autosaveBadge}>
              <span className={styles.autosaveDot} />
              <span>Auto-saving...</span>
            </div>
          </div>

          <div className={styles.refinePanel}>
            {/* Display Title Input */}
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Display Title</label>
              <input
                type="text"
                className={styles.textInput}
                value={displayTitle}
                onChange={(e) => setDisplayTitle(e.target.value)}
              />
            </div>

            {/* Editorial Summary Input */}
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Editorial Summary</label>
              <textarea
                className={styles.textArea}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            {/* Tag Management */}
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Search Tags</label>
              <div className={styles.tagsWrapper}>
                {tags.map((tag, idx) => (
                  <span key={idx} className={styles.tagPill}>
                    <span>{tag}</span>
                    <X
                      size={12}
                      className={styles.tagDelete}
                      onClick={() => handleRemoveTag(idx)}
                    />
                  </span>
                ))}
                
                {/* Add Tag inline form */}
                <form onSubmit={handleAddTag} className={styles.addTagWrapper}>
                  <input
                    type="text"
                    placeholder="NEW TAG..."
                    className={styles.addTagInput}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <button type="submit" className={styles.btnCircleAdd}>
                    <Plus size={12} />
                  </button>
                </form>
              </div>
            </div>

            {/* Form row (Category + Collections selector) */}
            <div className={styles.formRow}>
              {/* Category selector */}
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>Category</label>
                <select
                  className={styles.selectInput}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Technology & Innovation">Technology & Innovation</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Science & Nature">Science & Nature</option>
                  <option value="Business & Finance">Business & Finance</option>
                </select>
              </div>

              {/* Collections tagger */}
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>Collections</label>
                <div className={styles.collectionsWrapper}>
                  {collections.map((col, i) => (
                    <span key={i} className={styles.collectionCapsule}>
                      <Folder size={12} />
                      <span>{col}</span>
                    </span>
                  ))}
                  <button 
                    onClick={() => {
                      const newCol = prompt("Enter Collection Name to add:");
                      if (newCol) setCollections([...collections, newCol]);
                    }}
                    className={styles.btnAddCollection}
                  >
                    <Plus size={12} />
                    <span>Add to Collection</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Switch */}
            <div className={styles.toggleRow}>
              <div className={styles.toggleMeta}>
                <span className={styles.toggleTitle}>Featured Episode</span>
                <span className={styles.toggleDesc}>Showcase on the network homepage main feed</span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            {/* Action Bar Footer */}
            <div className={styles.actionsBar}>
              <button 
                type="button" 
                onClick={handleDiscard} 
                className={styles.btnDiscard}
              >
                Discard Draft
              </button>

              <div className={styles.rightActions}>
                <button 
                  type="button" 
                  onClick={handleSaveDraft} 
                  className={styles.btnSaveDraft}
                >
                  Save as Draft
                </button>
                <button 
                  type="button" 
                  onClick={handlePublish} 
                  className={styles.btnPublish}
                >
                  <Send size={16} />
                  <span>Publish Now</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
