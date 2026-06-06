"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus, ArrowRight, Play } from "lucide-react";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    {
      title: "Pending Reviews",
      value: "12",
      trend: "-4%",
      trendType: "down", // down is positive/negative depending on metric, here it means reviews decreased
      desc: "from last week",
    },
    {
      title: "Drafts",
      value: "24",
      trend: "0%",
      trendType: "neutral",
      desc: "no change",
    },
    {
      title: "Published Items",
      value: "1,402",
      trend: "+12%",
      trendType: "up",
      desc: "growth month-over-month",
    },
  ];

  const pendingEpisodes = [
    {
      id: "ep-42",
      title: "The Quantum Frontier: Episode 42",
      host: "Dr. Elena Vance",
      duration: "45:12",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    },
    {
      id: "ep-32",
      title: "Digital Renaissance: Web3 Unleashed",
      host: "Marcus Sterling",
      duration: "32:05",
      gradient: "linear-gradient(135deg, #311042 0%, #701a75 100%)",
    },
    {
      id: "ep-58",
      title: "Urban Echoes: The Architecture of Sound",
      host: "Sarah Chen",
      duration: "58:20",
      gradient: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
    },
  ];

  const activities = [
    {
      id: 1,
      type: "blue",
      text: "Published <strong>Deep Space Explorers</strong> by Julian Pierce",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "purple",
      text: "Reviewed <strong>Market Pulse Weekly</strong> by Elena Rodriguez",
      time: "45 mins ago",
    },
    {
      id: 3,
      type: "green",
      text: "Draft created: <strong>Synth Beats Live</strong> by System Automator",
      time: "2 hours ago",
    },
    {
      id: 4,
      type: "red",
      text: "Rejected Test Episode <strong>#001</strong> by Admin Panel",
      time: "4 hours ago",
    },
  ];

  return (
    <div className={styles.dashboardGrid}>
      {/* Stat Cards Row */}
      <section className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>{stat.title}</span>
            </div>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>{stat.value}</span>
              <span 
                className={`${styles.trendBadge} ${
                  stat.trendType === "up" 
                    ? styles.trendUp 
                    : stat.trendType === "down" 
                    ? styles.trendDown 
                    : styles.trendNeutral
                }`}
              >
                {stat.trendType === "up" && <ArrowUpRight size={14} />}
                {stat.trendType === "down" && <ArrowDownRight size={14} />}
                {stat.trendType === "neutral" && <Minus size={14} />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Panel Content split into Column row */}
      <div className={styles.contentRow}>
        {/* Left Column: Pending Review Queue */}
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Pending Review Queue</h3>
            <Link href="/review-queue" className={styles.viewAllLink}>
              View All
            </Link>
          </div>

          <div className={styles.queueList}>
            {pendingEpisodes.map((episode) => (
              <div key={episode.id} className={styles.queueCard}>
                <div className={styles.queueItemInfo}>
                  <div 
                    className={styles.queueItemArtwork}
                    style={{ background: episode.gradient }}
                  >
                    <Play size={16} color="#ffffff" style={{ opacity: 0.6 }} />
                  </div>
                  <div className={styles.queueItemDetails}>
                    <h4 className={styles.queueItemTitle}>{episode.title}</h4>
                    <span className={styles.queueItemSub}>
                      Host: {episode.host} • Duration: {episode.duration}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push("/content-editor")} 
                  className={styles.reviewBtn}
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Recent Activity timeline */}
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Recent Activity</h3>
          </div>

          <div className={styles.activityTimeline}>
            {activities.map((act) => (
              <div key={act.id} className={styles.activityItem}>
                <span 
                  className={
                    act.type === "blue" 
                      ? styles.activityDotBlue 
                      : act.type === "purple" 
                      ? styles.activityDotPurple 
                      : act.type === "green" 
                      ? styles.activityDotGreen 
                      : styles.activityDotRed
                  } 
                />
                <p 
                  className={styles.activityText} 
                  dangerouslySetInnerHTML={{ __html: act.text }} 
                />
                <span className={styles.activityTime}>{act.time}</span>
              </div>
            ))}
          </div>

          <button className={styles.loadMoreBtn}>
            Load More Activity
          </button>
        </section>
      </div>
    </div>
  );
}
