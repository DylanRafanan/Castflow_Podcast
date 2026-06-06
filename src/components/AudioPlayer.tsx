"use client";

import { usePathname } from "next/navigation";
import { useAudio } from "src/context/AudioContext";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  X, 
  RotateCcw, 
  Shuffle, 
  Maximize2 
} from "lucide-react";
import { useState } from "react";
import styles from "./components.module.css";

export default function AudioPlayer() {
  const pathname = usePathname();
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    togglePlay, 
    seek, 
    pauseTrack 
  } = useAudio();
  
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  if (!currentTrack) return null;

  const isPublishedPage = pathname === "/published";

  // Helper to format time (e.g. 75 -> "01:15")
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const progressPercentage = (currentTime / currentTrack.durationSeconds) * 100;

  // Toggle play/pause
  const handlePlayPause = () => {
    togglePlay();
  };

  // Mute volume
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  if (isPublishedPage) {
    // Render the premium full-width player for the Published Content Browser
    return (
      <div className={styles.fullWidthPlayer}>
        {/* Info Column */}
        <div className={styles.playerInfo}>
          <div className={styles.playerArtwork}>
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title} 
              className={styles.playerArtworkImg} 
            />
          </div>
          <div className={styles.playerDetails}>
            <span className={styles.playerTitle}>{currentTrack.title}</span>
            <span className={styles.playerShow}>{currentTrack.host}</span>
          </div>
        </div>

        {/* Playback Controls & Scrubber Column */}
        <div className={styles.playerMainControls}>
          <div className={styles.playerButtonsRow}>
            <button 
              className={`${styles.controlBtn} ${isShuffle ? styles.activeControl : ""}`} 
              onClick={() => setIsShuffle(!isShuffle)}
              title="Shuffle"
              style={{ color: isShuffle ? "var(--brand-blue)" : "inherit" }}
            >
              <Shuffle size={16} />
            </button>
            <button className={styles.controlBtn} title="Skip Back 10s" onClick={() => seek(currentTime - 10)}>
              <SkipBack size={18} />
            </button>
            <button 
              onClick={handlePlayPause} 
              className={styles.controlBtn} 
              title={isPlaying ? "Pause" : "Play"}
              style={{ 
                backgroundColor: "var(--text-main)", 
                color: "var(--bg-main)", 
                padding: "10px",
                borderRadius: "50%"
              }}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: "2px" }} />}
            </button>
            <button className={styles.controlBtn} title="Skip Forward 10s" onClick={() => seek(currentTime + 10)}>
              <SkipForward size={18} />
            </button>
            <button 
              className={`${styles.controlBtn} ${isRepeat ? styles.activeControl : ""}`} 
              onClick={() => setIsRepeat(!isRepeat)}
              title="Repeat"
              style={{ color: isRepeat ? "var(--brand-blue)" : "inherit" }}
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className={styles.playerTimeline}>
            <span className={styles.timeLabel}>{formatTime(currentTime)}</span>
            <div className={styles.scrubberWrapper}>
              <input
                type="range"
                min="0"
                max={currentTrack.durationSeconds}
                value={currentTime}
                onChange={handleScrubChange}
                className={styles.scrubberInput}
                style={{
                  background: `linear-gradient(to right, var(--brand-blue) 0%, var(--brand-blue) ${progressPercentage}%, var(--border-subtle) ${progressPercentage}%, var(--border-subtle) 100%)`
                }}
              />
            </div>
            <span className={styles.timeLabel}>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Audio Extra Controls */}
        <div className={styles.playerExtraControls}>
          <div className={styles.volumeWrapper}>
            <button className={styles.controlBtn} onClick={handleMuteToggle}>
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={styles.volumeInput}
            />
          </div>
          <button className={styles.controlBtn} title="Expand Player">
            <Maximize2 size={16} />
          </button>
          <button className={styles.controlBtn} onClick={pauseTrack} title="Close Player">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Render the floating capsule layout for other pages (like the Queue page)
  return (
    <div className={styles.floatingPlayer}>
      <div className={styles.floatingPlayerBody}>
        {/* Info Area */}
        <div className={styles.playerInfo} style={{ flexGrow: 1, maxWidth: "60%" }}>
          <div className={styles.playerArtwork}>
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title} 
              className={styles.playerArtworkImg} 
            />
          </div>
          <div className={styles.playerDetails}>
            <span className={styles.playerTitle} style={{ fontSize: "0.825rem" }}>{currentTrack.title}</span>
            <span className={styles.playerShow} style={{ fontSize: "0.7rem" }}>{currentTrack.showName}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className={styles.floatingPlayerControls}>
          {isPlaying && (
            <div className={styles.visualizerBars}>
              <span className={styles.waveBar} />
              <span className={styles.waveBar} />
              <span className={styles.waveBar} />
              <span className={styles.waveBar} />
            </div>
          )}
          
          <button 
            onClick={handlePlayPause} 
            className={styles.controlBtn} 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: "1px" }} />}
          </button>

          <button onClick={pauseTrack} className={styles.floatingCloseBtn}>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Tiny timeline progress bar */}
      <div className={styles.floatingTimeline}>
        <div 
          className={styles.floatingTimelineProgress} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
