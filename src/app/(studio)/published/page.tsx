"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ArrowUpDown, 
  Edit3, 
  Eye, 
  MoreHorizontal, 
  Check, 
  Music,
  Play
} from "lucide-react";
import { useAudio } from "src/context/AudioContext";
import styles from "./published.module.css";

interface PublishedEpisode {
  id: string;
  title: string;
  host: string;
  showName: string;
  duration: string;
  durationSeconds: number;
  category: string;
  publishedDate: string;
  gradient: string;
}

export default function PublishedPage() {
  const router = useRouter();
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Published Episodes List
  const publishedEpisodes: PublishedEpisode[] = [
    {
      id: "pub-1",
      title: "The Neural Frontier: AI in 2024",
      host: "Marcus Sterling",
      showName: "Tech Frontiers Network",
      duration: "45 mins",
      durationSeconds: 2700,
      category: "Technology",
      publishedDate: "Oct 24, 2023",
      gradient: "linear-gradient(135deg, #78716C 0%, #44403C 100%)",
    },
    {
      id: "pub-2",
      title: "Sonic Landscapes & Reverb",
      host: "Elena Vance",
      showName: "Acoustic Spaces",
      duration: "62 mins",
      durationSeconds: 3720,
      category: "Music Theory",
      publishedDate: "Oct 22, 2023",
      gradient: "linear-gradient(135deg, #A855F7 0%, #6B21A8 100%)",
    },
    {
      id: "pub-3",
      title: "Digital Minimalism Today",
      host: "David Chen",
      showName: "The Simple Living Podcast",
      duration: "38 mins",
      durationSeconds: 2280,
      category: "Lifestyle",
      publishedDate: "Oct 20, 2023",
      gradient: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
    },
    {
      id: "pub-4",
      title: "Scale-up Strategies",
      host: "Sarah Jenkins",
      showName: "Founder Chronicles",
      duration: "51 mins",
      durationSeconds: 3060,
      category: "Business",
      publishedDate: "Oct 18, 2023",
      gradient: "linear-gradient(135deg, #0F766E 0%, #115E59 100%)",
    },
  ];

  const handleCardClick = (ep: PublishedEpisode) => {
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent playing audio
    router.push("/content-editor");
  };

  // Filter and Search logic
  const filteredEpisodes = publishedEpisodes.filter((ep) => {
    const matchesSearch = 
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.showName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      categoryFilter === "All" || ep.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      {/* Search and Filters Bar */}
      <section className={styles.searchBarRow}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search published episodes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <select 
            className={styles.selectInput}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">Category: All</option>
            <option value="Technology">Technology</option>
            <option value="Music Theory">Music Theory</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>

          <button className={styles.sortBtn}>
            <ArrowUpDown size={14} />
            <span>Sort: Newest</span>
          </button>
        </div>
      </section>

      {/* Grid listing */}
      <section className={styles.grid}>
        {filteredEpisodes.map((ep) => {
          const isCurrentPlaying = currentTrack?.id === ep.id && isPlaying;
          return (
            <div 
              key={ep.id} 
              className={styles.card}
              onClick={() => handleCardClick(ep)}
              title="Click to Play"
            >
              {/* Artwork */}
              <div 
                className={styles.artworkWrapper}
                style={{ background: ep.gradient }}
              >
                <div className={styles.gradientOverlay}>
                  <div className={styles.badgeRow}>
                    <span className={styles.categoryBadge}>{ep.category}</span>
                    <span className={styles.durationBadge}>{ep.duration}</span>
                  </div>
                </div>

                {isCurrentPlaying && (
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "var(--brand-blue)",
                    color: "#fff",
                    padding: "4px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 10px rgba(0, 98, 255, 0.5)"
                  }}>
                    <Play size={12} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Title & Host info */}
              <div className={styles.cardContent}>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.cardTitle}>{ep.title}</h3>
                  <span className={styles.hostName}>{ep.host}</span>
                </div>

                {/* Footer Controls */}
                <div className={styles.cardFooter}>
                  <button 
                    onClick={handleEditClick} 
                    className={styles.actionBtn} 
                    title="Edit Metadata"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCardClick(ep); }}
                    className={styles.actionBtn} 
                    title="Play Episode"
                    style={{ color: isCurrentPlaying ? "var(--brand-blue)" : "inherit" }}
                  >
                    <Eye size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className={styles.actionBtn} 
                    title="Options"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
