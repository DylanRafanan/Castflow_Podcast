"use client";

import { useState } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  ArrowLeft, 
  ArrowRight,
  RefreshCw,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Check
} from "lucide-react";
import styles from "./episodes.module.css";

interface Episode {
  id: string;
  title: string;
  podcast: string;
  duration: string;
  datePublished: string;
  status: "Published" | "Hidden";
  isVisible: boolean;
  gradient: string;
}

export default function EpisodesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcastFilter, setPodcastFilter] = useState("All");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Synced");

  // Episodes List State
  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: "EP-1049-A",
      title: "The Future of Generative Audio AI",
      podcast: "Tech Frontiers",
      duration: "42:15",
      datePublished: "Oct 24, 2023",
      status: "Published",
      isVisible: true,
      gradient: "linear-gradient(135deg, #FF3366 0%, #FF6633 100%)",
    },
    {
      id: "EP-1042-B",
      title: "Finding Focus in a Digital World",
      podcast: "The Minimalist Path",
      duration: "28:40",
      datePublished: "Oct 21, 2023",
      status: "Published",
      isVisible: true,
      gradient: "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
    },
    {
      id: "EP-0931-C",
      title: "The Art of the Silent Interview",
      podcast: "Creative Echoes",
      duration: "35:08",
      datePublished: "Oct 15, 2023",
      status: "Hidden",
      isVisible: false,
      gradient: "linear-gradient(135deg, #3CA55C 0%, #B5AC49 100%)",
    },
    {
      id: "EP-0912-D",
      title: "Decentralized Everything: A deep dive",
      podcast: "Tech Frontiers",
      duration: "55:22",
      datePublished: "Oct 12, 2023",
      status: "Published",
      isVisible: true,
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    },
  ]);

  // Toggle switch trigger
  const handleToggleVisibility = (id: string) => {
    setEpisodes(episodes.map((ep) => {
      if (ep.id === id) {
        const nextVisible = !ep.isVisible;
        return {
          ...ep,
          isVisible: nextVisible,
          status: nextVisible ? "Published" : "Hidden",
        };
      }
      return ep;
    }));
    
    // Set sync status to pending
    setSyncStatus("Pending Sync");
  };

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatus("Syncing...");
    
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus("Synced");
    }, 1500);
  };

  // Filter episodes list
  const filteredEpisodes = episodes.filter((ep) => {
    const matchesSearch = 
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.podcast.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesPodcast = 
      podcastFilter === "All" || ep.podcast === podcastFilter;
      
    return matchesSearch && matchesPodcast;
  });

  return (
    <div className={styles.container}>
      {/* Search and Filters */}
      <section className={styles.filtersBar}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by episode title, guest, or keyword..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className={styles.selectInput}
          value={podcastFilter}
          onChange={(e) => setPodcastFilter(e.target.value)}
        >
          <option value="All">All Podcasts</option>
          <option value="Tech Frontiers">Tech Frontiers</option>
          <option value="The Minimalist Path">The Minimalist Path</option>
          <option value="Creative Echoes">Creative Echoes</option>
        </select>

        <button className={styles.btnFilter}>
          <SlidersHorizontal size={14} />
          <span>Filters</span>
        </button>
      </section>

      {/* Episodes Table Container */}
      <section className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Episode Title</th>
              <th>Podcast</th>
              <th>Duration</th>
              <th>Date Published</th>
              <th>Status</th>
              <th>Visible</th>
            </tr>
          </thead>
          <tbody>
            {filteredEpisodes.map((ep) => (
              <tr key={ep.id}>
                {/* Title & ID Column */}
                <td>
                  <div className={styles.episodeCol}>
                    <div 
                      className={styles.thumbnail}
                      style={{ background: ep.gradient }}
                    />
                    <div className={styles.titleWrapper}>
                      <span className={styles.epTitle}>{ep.title}</span>
                      <span className={styles.epId}>ID: {ep.id}</span>
                    </div>
                  </div>
                </td>

                {/* Podcast Show Column */}
                <td>{ep.podcast}</td>

                {/* Duration Column */}
                <td className={styles.durationCol}>{ep.duration}</td>

                {/* Date Published */}
                <td className={styles.dateCol}>{ep.datePublished}</td>

                {/* Status badge */}
                <td>
                  <span className={`badge ${ep.status === "Published" ? "badge-green" : "badge-muted"}`}>
                    {ep.status}
                  </span>
                </td>

                {/* Visibility switch */}
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={ep.isVisible}
                      onChange={() => handleToggleVisibility(ep.id)}
                    />
                    <span className="slider" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table Pagination Footer */}
        <div className={styles.tableFooter}>
          <div className={styles.rowsPerPage}>
            <span>Rows per page:</span>
            <select className={styles.rowsSelect}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span>1-10 of 124 episodes</span>
          </div>

          <div className={styles.pagination}>
            <button className={styles.pageBtn} title="First Page"><ChevronLeft size={16} /><ChevronLeft size={16} style={{ marginLeft: "-10px" }} /></button>
            <button className={styles.pageBtn} title="Previous Page"><ChevronLeft size={16} /></button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span style={{ color: "var(--text-muted)", padding: "0 4px" }}>...</span>
            <button className={styles.pageBtn}>13</button>
            <button className={styles.pageBtn} title="Next Page"><ChevronRight size={16} /></button>
            <button className={styles.pageBtn} title="Last Page"><ChevronRight size={16} /><ChevronRight size={16} style={{ marginLeft: "-10px" }} /></button>
          </div>
        </div>
      </section>

      {/* Editing Mode bottom status bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <div className={styles.statusIconWrapper}>
            <Cpu size={16} className={isSyncing ? "animate-spin" : ""} />
          </div>
          <div className={styles.statusMeta}>
            <span className={styles.statusLabel}>Editing Mode</span>
            <span className={styles.statusDesc}>Draft: Ep 186 - Spatial Computing</span>
          </div>
        </div>

        <div className={styles.statusRight}>
          <span className={styles.statusTime}>
            {syncStatus === "Synced" && "Auto-saved 2 mins ago"}
            {syncStatus === "Pending Sync" && "Unsaved local changes"}
            {syncStatus === "Syncing..." && "Syncing updates..."}
          </span>
          <button 
            onClick={handleSync} 
            className={styles.syncBtn}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : syncStatus === "Synced" ? (
              <Check size={14} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />
            ) : null}
            <span style={{ verticalAlign: "middle" }}>
              {syncStatus === "Synced" ? "Synced" : syncStatus === "Syncing..." ? "Syncing" : "Sync Changes"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
