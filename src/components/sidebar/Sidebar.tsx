import { Link, useLocation } from "react-router-dom";
import { ChevronDown, BriefcaseBusiness } from "lucide-react";
import { NAV_LINKS } from "../../utils/data";
import s from "./Sidebar.module.scss";

type SidebarProps = { open: boolean; onClose: () => void; }



export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      {open && <div className={s.overlay} onClick={onClose} />}

      <aside className={`${s.sidebar} ${open ? s.open : ""}`}>
        <div className={s.inner}>
          <button className={s.switchOrg} data-testid="button-switch-org">
            <BriefcaseBusiness size={16} />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </button>

          <nav className={s.nav}>
            {NAV_LINKS.map((section, si) => (
              <div key={si} className={s.section}>
                {section.title && (
                  <p className={s.sectionTitle}>{section.title}</p>
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={onClose}
                      className={`${s.navItem} ${isActive(item.href) ? s.active : ""}`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

        </div>
      </aside>
    </>
  );
}
