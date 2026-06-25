import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, Menu, X, LogOut } from "lucide-react";
import logo from "../../assets/images/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import s from "./Topbar.module.scss";

type TopbarProps = { sidebarOpen: boolean; onToggle: () => void; }

export default function Topbar({ sidebarOpen, onToggle }: TopbarProps) {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={s.topbar}>
      <div className={s.left}>
        <img src={logo} alt="Lendsqr" className={s.logo} />
      </div>

      <div className={s.search}>
        <input type="text" placeholder="Search for anything" data-testid="input-topbar-search" />
        <button data-testid="button-topbar-search" aria-label="Search">
          <Search size={16} />
        </button>
      </div>

      <div className={s.right}>
        <a href="#" className={s.docsLink}>Docs</a>

        <button className={s.bell} data-testid="button-notifications" aria-label="Notifications">
          <Bell size={22} />
          <span className={s.dot} />
        </button>

        <div className={s.userMenuWrap} ref={dropdownRef}>
          <button 
            className={s.userBtn} 
            data-testid="button-user-menu"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className={s.avatar}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <span className={s.name}>Goodness Sewo</span>
            <ChevronDown size={16} className={s.chevron} />
          </button>

          {dropdownOpen && (
            <div className={s.dropdownMenu}>
              <button className={s.dropdownItem} onClick={logout} data-testid="button-logout">
                <LogOut size={16} /> Logout
              </button>
              <div className={s.version}>v1.0.0</div>
            </div>
          )}
        </div>
        <button
          className={s.hamburger}
          onClick={onToggle}
          data-testid="button-sidebar-toggle"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
