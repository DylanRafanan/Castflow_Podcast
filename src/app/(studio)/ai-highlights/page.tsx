"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Play, 
  Video, 
  Settings, 
  Check, 
  Volume2 
} from "lucide-react";
import { useAudio } from "src/context/AudioContext";
import styles from "./highlights.module.css";

interface HighlightClip {
  id: string;
  title: string;
  timeframe: string;
  durationSeconds: number;
  description: string;
}

export default function AIHighlightsPage() {
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const [model, setModel] = useState("v2-experimental");
  const [targetDuration, setTargetDuration] = useState(60);
  const [focusMetric, setFocusMetric] = useState("engagement");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [clips, setClips] = useState<HighlightClip[]>([
    {
      id: "clip-1",
      title: "Generative Audio - Pitch & Tone Shift",
      timeframe: "02:15 - 03:15 (60s)",
      durationSeconds: 60,
      description: "Subject overlap detected. High vocal modulation. Ideal for TikTok or Instagram Reels vertical share.",
    },
    {
      id: "clip-2",
      title: "The Quantum Core - Core Concept",
      timeframe: "12:40 - 13:40 (60s)",
      durationSeconds: 60,
      description: "High energetic subject retention metric. Host summarizes the thesis statement of the entire episode.",
    },
    {
      id: "clip-3",
      title: "Listener Neuro-mapping Discussion",
      timeframe: "24:10 - 25:10 (60s)",
      durationSeconds: 60,
      description: "Educational depth segment containing precise academic citations and clear question-and-answer interactions.",
    },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handlePlayClip = (clip: HighlightClip) => {
    playTrack({
      id: clip.id,
      title: clip.title,
      showName: "AI Highlight Cut",
      host: "CastFlow AI Extractor",
      duration: "1:00",
      durationSeconds: clip.durationSeconds,
      coverUrl: "",
    });
  };

  const handleExport = (clipTitle: string) => {
    triggerToast(`Exporting "${clipTitle}" to MP4 Video format... check downloads in a moment.`);
  };

  const handleRegenerate = () => {
    setIsProcessing(true);
    triggerToast("AI is analyzing podcast audio timelines...");
    
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate slight clip modifications based on values
      setClips([
        {
          id: `clip-1-${Date.now()}`,
          title: "AI Analysis: Subject Focus Shift",
          timeframe: `01:10 - 02:10 (${targetDuration}s)`,
          durationSeconds: targetDuration,
          description: `Extracted based on model ${model.toUpperCase()}. Target: ${targetDuration}s. Focus: ${focusMetric}.`,
        },
        ...clips.slice(1)
      ]);
      triggerToast("AI Highlights successfully extracted!");
    }, 2000);
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
          border: "1px solid var(--brand-blue)",
          borderRadius: "8px",
          padding: "16px 20px",
          boxShadow: "var(--shadow-lg), 0 0 20px rgba(0, 98, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 1000,
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}>
          <Sparkles size={18} color="var(--brand-blue)" className="animate-pulse" />
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-main)" }}>
            {toastMessage}
          </span>
        </div>
      )}

      <div className={styles.layout}>
        {/* Left Column: AI Model Settings */}
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>AI Model Config</h3>

          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Extracting Model</label>
            <select 
              className={styles.selectInput}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="v2-experimental">CastFlow Audio-V2 (Experimental)</option>
              <option value="v1-stable">CastFlow Audio-V1 (Stable)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.sliderRow}>
              <label className={styles.fieldLabel}>Target Duration</label>
              <span className={styles.sliderValue}>{targetDuration}s</span>
            </div>
            <input
              type="range"
              min="15"
              max="180"
              step="5"
              className={styles.rangeInput}
              value={targetDuration}
              onChange={(e) => setTargetDuration(Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Highlight Focus Metric</label>
            <select 
              className={styles.selectInput}
              value={focusMetric}
              onChange={(e) => setFocusMetric(e.target.value)}
            >
              <option value="engagement">Listener engagement peaks (Audience Retention)</option>
              <option value="transitions">Key subject transitions (Syllable Shift)</option>
              <option value="sentiment">Host sentiment highlights (Emotional Index)</option>
            </select>
          </div>

          <button 
            onClick={handleRegenerate} 
            className={styles.btnRegenerate}
            disabled={isProcessing}
          >
            <Sparkles size={16} className={isProcessing ? "animate-spin" : ""} />
            <span>{isProcessing ? "Analyzing Audio..." : "Regenerate Highlights"}</span>
          </button>
        </section>

        {/* Right Column: Generated Clips List */}
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>
            Generated Clips • {clips.length} extracted highlights found
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {clips.map((clip) => {
              const isCurrentPlaying = currentTrack?.id === clip.id && isPlaying;
              return (
                <div key={clip.id} className={styles.clipCard}>
                  <div className={styles.clipHeader}>
                    <h4 className={styles.clipTitle}>{clip.title}</h4>
                    <span className={styles.clipTime}>{clip.timeframe}</span>
                  </div>
                  
                  <p className={styles.clipDesc}>{clip.description}</p>

                  <div className={styles.clipActions}>
                    <button 
                      onClick={() => handlePlayClip(clip)} 
                      className={styles.btnPlayClip}
                      style={{ color: isCurrentPlaying ? "var(--brand-blue)" : undefined }}
                    >
                      {isCurrentPlaying ? <Volume2 size={14} /> : <Play size={14} />}
                      <span>{isCurrentPlaying ? "Playing Preview" : "Play Clip"}</span>
                    </button>

                    <button 
                      onClick={() => handleExport(clip.title)} 
                      className={styles.btnExport}
                    >
                      <Video size={14} />
                      <span>Export to Video</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
