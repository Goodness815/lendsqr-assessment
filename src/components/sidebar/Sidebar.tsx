import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import briefcaseIcon from "../../assets/icons/briefcase.svg";
import { NAV_LINKS } from "../../utils/sidebar-data";
import { useAuth } from "../../hooks/useAuth";
import s from "./Sidebar.module.scss";

type SidebarProps = { open: boolean; onClose: () => void; }



export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      {open && <div className={s.overlay} onClick={onClose} />}

      <aside className={`${s.sidebar} ${open ? s.open : ""}`}>
        <div className={s.inner}>
          <button className={s.switchOrg} data-testid="button-switch-org">
            <img src={briefcaseIcon} alt="" className={s.icon} />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </button>

          <nav className={s.nav}>
            {NAV_LINKS.map((section, si) => (
              <div key={si} className={s.section}>
                {section.title && (
                  <p className={s.sectionTitle}>{section.title}</p>
                )}
                {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={onClose}
                      className={`${s.navItem} ${isActive(item.href) ? s.active : ""}`}
                    >
                      <img src={item.icon} alt="" className={s.icon} />
                      {item.label}
                    </Link>
                  ))}
              </div>
            ))}
          </nav>

          <div className={s.footer}>
            <button className={s.logout} onClick={logout}>
              <LogOut size={16} /> Logout
            </button>
            <p className={s.version}>v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
