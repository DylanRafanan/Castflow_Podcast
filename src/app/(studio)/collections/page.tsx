"use client";

import { useState } from "react";
import { 
  FolderPlus, 
  Edit2, 
  Trash2, 
  X, 
  Grid, 
  List 
} from "lucide-react";
import styles from "./collections.module.css";

interface CollectionItem {
  id: string;
  title: string;
  description: string;
  episodeCount: number;
  updatedTime: string;
  gradient: string;
}

export default function CollectionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colName, setColName] = useState("");
  const [colDesc, setColDesc] = useState("");
  
  // Localized collections state
  const [collections, setCollections] = useState<CollectionItem[]>([
    {
      id: "col-1",
      title: "Tech Frontiers",
      description: "Latest insights on AI, quantum computing, and future technology trends.",
      episodeCount: 16,
      updatedTime: "UPDATED 2H AGO",
      gradient: "linear-gradient(135deg, #FF3366 0%, #FF6633 100%)",
    },
    {
      id: "col-2",
      title: "Midnight Mystery",
      description: "Deep dives into historical cold cases, forensics, and unsolved audio stories.",
      episodeCount: 10,
      updatedTime: "UPDATED 1D AGO",
      gradient: "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
    },
    {
      id: "col-3",
      title: "Mindful Mornings",
      description: "Start your day with simple guided meditation, breathing techniques, and acoustic vibes.",
      episodeCount: 42,
      updatedTime: "UPDATED 3D AGO",
      gradient: "linear-gradient(135deg, #3CA55C 0%, #B5AC49 100%)",
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      setCollections(collections.filter((col) => col.id !== id));
    }
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colName.trim()) return;

    // List of gorgeous random neon gradients for newly created collections
    const gradients = [
      "linear-gradient(135deg, #da22ff 0%, #9114ff 100%)",
      "linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)",
      "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
      "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newCol: CollectionItem = {
      id: `col-${Date.now()}`,
      title: colName,
      description: colDesc || "No description provided.",
      episodeCount: 0,
      updatedTime: "UPDATED JUST NOW",
      gradient: randomGradient,
    };

    setCollections([...collections, newCol]);
    setColName("");
    setColDesc("");
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Subheader summary stats */}
      <section className={styles.subHeaderRow}>
        <span className={styles.subTitle}>
          Your Library • Manage {collections.length} custom podcast collections and playlists.
        </span>
      </section>

      {/* Grid listing */}
      <section className={styles.grid}>
        {collections.map((col) => (
          <div key={col.id} className={styles.card}>
            {/* Visual simulated gradient card top */}
            <div 
              className={styles.artwork}
              style={{ background: col.gradient }}
            >
              <div className={styles.badgeEpisodes}>{col.episodeCount} Episodes</div>
              <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.15)" }} />
            </div>

            <div className={styles.cardDetails}>
              <h3 className={styles.cardTitle}>{col.title}</h3>
              <p className={styles.cardDesc}>{col.description}</p>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.updatedTime}>{col.updatedTime}</span>
              <div className={styles.cardActions}>
                <button className={styles.iconBtn} title="Edit Collection">
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(col.id)} 
                  className={`${styles.iconBtn} ${styles.deleteBtn}`}
                  title="Delete Collection"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Dotted "Add Collection" grid item trigger */}
        <div 
          onClick={() => setIsModalOpen(true)} 
          className={styles.addCard}
        >
          <div className={styles.addIconWrapper}>
            <FolderPlus size={22} />
          </div>
          <h4 className={styles.addTitle}>Add Collection</h4>
          <p className={styles.addDesc}>Create a new thematic folder</p>
        </div>
      </section>

      {/* Create Collection Dialog Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Create New Collection</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className={styles.modalClose}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>Collection Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science & Nature Favorites"
                  className={styles.textInput}
                  value={colName}
                  onChange={(e) => setColName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>Description</label>
                <textarea
                  placeholder="Briefly describe what podcasts belong here..."
                  className={styles.textArea}
                  value={colDesc}
                  onChange={(e) => setColDesc(e.target.value)}
                />
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className={styles.btnCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.btnCreate}
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
