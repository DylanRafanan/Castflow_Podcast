"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileSearch,
  PenTool,
  FolderOpen,
  Music,
  Globe,
  Sparkles,
  Settings,
  Plus,
  HelpCircle,
  LogOut
} from "lucide-react";
import styles from "./components.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Review Queue", href: "/review-queue", icon: FileSearch },
    { name: "Content Editor", href: "/content-editor", icon: PenTool },
    { name: "Collections", href: "/collections", icon: FolderOpen },
    { name: "Episodes", href: "/episodes", icon: Music },
    { name: "Published", href: "/published", icon: Globe },
    { name: "AI Highlights", href: "/ai-highlights", icon: Sparkles },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.replace("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandName}>CastFlow</span>
        <span className={styles.brandSub}>Network Manager</span>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={isActive ? styles.navItemActive : styles.navItem}
            >
              <Icon size={18} className={styles.navIcon} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <button 
          onClick={() => router.push("/content-editor")} 
          className={styles.newPodcastBtn}
        >
          <Plus size={18} />
          <span>New Podcast</span>
        </button>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link href="#" className={styles.footerLink}>
          <HelpCircle size={16} />
          <span>Support</span>
        </Link>
        <button onClick={handleLogout} className={styles.footerLink}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
