"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Play, Volume2, CheckCircle2 } from "lucide-react";
import { useAudio } from "src/context/AudioContext";
import styles from "./queue.module.css";

interface EpisodeItem {
  id: string;
  title: string;
  showName: string;
  host: string;
  duration: string;
  durationSeconds: number;
  publishedDate: string;
  category: string;
  gradient: string;
  isNew: boolean;
  filterType: "unreviewed" | "flagged" | "priority";
}

export default function ReviewQueuePage() {
  const router = useRouter();
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Localized state list to support mock deletion / dismissal
  const [episodes, setEpisodes] = useState<EpisodeItem[]>([
    {
      id: "ep-442",
      title: "Synthesizing the Future of AI Models",
      showName: "Deep Tech Daily",
      host: "Deep Tech Daily",
      duration: "48:00",
      durationSeconds: 2880,
      publishedDate: "Oct 24, 2023",
      category: "Technology",
      gradient: "linear-gradient(135deg, #FF0055 0%, #7A00FF 100%)",
      isNew: true,
      filterType: "unreviewed",
    },
    {
      id: "ep-12",
      title: "The Lost Archives: Urban Architecture",
      showName: "Design Narratives",
      host: "Design Narratives",
      duration: "1:05:00",
      durationSeconds: 3900,
      publishedDate: "Oct 23, 2023",
      category: "Arts",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      isNew: false,
      filterType: "priority",
    },
    {
      id: "ep-89",
      title: "Soundwaves & Social Change",
      showName: "Cultural Beat",
      host: "Cultural Beat",
      duration: "32:00",
      durationSeconds: 1920,
      publishedDate: "Oct 22, 2023",
      category: "Society",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      isNew: false,
      filterType: "unreviewed",
    },
    {
      id: "ep-112",
      title: "Startup Chronicles: The Pivot",
      showName: "Founders Lab",
      host: "Founders Lab",
      duration: "54:00",
      durationSeconds: 3240,
      publishedDate: "Oct 21, 2023",
      category: "Business",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
      isNew: false,
      filterType: "flagged",
    },
  ]);

  const handlePlayClick = (ep: EpisodeItem) => {
    // Map to Track interface
    playTrack({
      id: ep.id,
      title: ep.title,
      showName: ep.showName,
      host: ep.host,
      duration: ep.duration,
      durationSeconds: ep.durationSeconds,
      coverUrl: "", // gradient will be simulated
    });
  };

  const handleDismiss = (id: string) => {
    // Filter out item with animation fade out simulation
    setEpisodes(episodes.filter((ep) => ep.id !== id));
  };

  // Filter & search logic
  const filteredEpisodes = episodes.filter((ep) => {
    const matchesSearch = 
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.showName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "unreviewed") return matchesSearch && ep.filterType === "unreviewed";
    if (activeFilter === "flagged") return matchesSearch && ep.filterType === "flagged";
    if (activeFilter === "priority") return matchesSearch && ep.filterType === "priority";
    
    return matchesSearch;
  });

  return (
    <div className={styles.container}>
      {/* Search and Filters action bar */}
      <section className={styles.searchFilterBar}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search queue..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <span className={styles.filterLabel}>Filter by:</span>
          <button
            onClick={() => setActiveFilter("all")}
            className={activeFilter === "all" ? styles.filterPillActive : styles.filterPill}
          >
            All Episodes
          </button>
          <button
            onClick={() => setActiveFilter("unreviewed")}
            className={activeFilter === "unreviewed" ? styles.filterPillActive : styles.filterPill}
          >
            Unreviewed
          </button>
          <button
            onClick={() => setActiveFilter("flagged")}
            className={activeFilter === "flagged" ? styles.filterPillActive : styles.filterPill}
          >
            Flagged
          </button>
          <button
            onClick={() => setActiveFilter("priority")}
            className={activeFilter === "priority" ? styles.filterPillActive : styles.filterPill}
          >
            Priority
          </button>
        </div>
      </section>

      {/* Episode list */}
      <section className={styles.queueList}>
        {filteredEpisodes.length > 0 ? (
          filteredEpisodes.map((ep) => {
            const isCurrentPlaying = currentTrack?.id === ep.id && isPlaying;
            return (
              <div key={ep.id} className={styles.card}>
                <div className={styles.cardContent}>
                  {/* Thumbnail / Artwork Play Trigger */}
                  <div 
                    className={styles.thumbnailWrapper}
                    style={{ background: ep.gradient }}
                    onClick={() => handlePlayClick(ep)}
                    title={isCurrentPlaying ? "Playing" : "Click to Play Preview"}
                  >
                    <div className={styles.thumbnailOverlay} style={{ opacity: isCurrentPlaying ? 1 : undefined }}>
                      {isCurrentPlaying ? <Volume2 size={24} className="animate-pulse" /> : <Play size={24} fill="currentColor" />}
                    </div>
                    {/* Abstract visual art */}
                    <div style={{ width: "100%", height: "100%", opacity: 0.15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Play size={28} color="#fff" />
                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.titleRow}>
                      {ep.isNew && <span className={styles.badgeArrival}>New Arrival</span>}
                      <h3 className={styles.title}>{ep.title}</h3>
                    </div>
                    <span className={styles.showInfo}>
                      {ep.showName} • Episode {ep.id.replace("ep-", "")}
                    </span>
                    <div className={styles.metadataRow}>
                      <span>{ep.duration}</span>
                      <span className={styles.metadataSeparator}>|</span>
                      <span>{ep.publishedDate}</span>
                      <span className={styles.metadataSeparator}>|</span>
                      <span style={{ color: "var(--text-secondary)" }}>{ep.category}</span>
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div className={styles.actions}>
                  <button 
                    onClick={() => router.push("/content-editor")} 
                    className={styles.btnReview}
                  >
                    Review
                  </button>
                  <button 
                    onClick={() => handleDismiss(ep.id)} 
                    className={styles.btnDismiss}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center", 
            padding: "48px",
            background: "var(--bg-card)",
            borderRadius: "12px",
            border: "1px dashed var(--border-subtle)",
            color: "var(--text-secondary)",
            gap: "12px"
          }}>
            <CheckCircle2 size={36} color="var(--status-green)" />
            <span>No episodes matching your filter or query found.</span>
          </div>
        )}
      </section>

      {/* Footer statistics */}
      <footer className={styles.footer}>
        <span>Showing {filteredEpisodes.length} of {episodes.length} items</span>
      </footer>
    </div>
  );
}
