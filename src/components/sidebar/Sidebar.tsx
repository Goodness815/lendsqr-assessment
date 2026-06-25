import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, UserCheck, CreditCard, GitBranch,
  PiggyBank, FileText, UserX, AlertTriangle, Building2, Package,
  Wallet, DollarSign, ArrowLeftRight, Briefcase, UserCog,
  Receipt, BarChart2, Settings, Tag, ClipboardList, MessageSquare,
  LogOut, ChevronDown, Sliders,
} from "lucide-react";
import s from "./Sidebar.module.scss";

interface SidebarProps { open: boolean; onClose: () => void; }

const NAV = [
  {
    items: [
      { label: "Dashboard",      icon: <LayoutDashboard size={16} />, href: "/dashboard" },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users",           icon: <Users size={16} />,          href: "/users" },
      { label: "Guarantors",      icon: <UserCheck size={16} />,      href: "/guarantors" },
      { label: "Loans",           icon: <CreditCard size={16} />,     href: "/loans" },
      { label: "Decision Models", icon: <GitBranch size={16} />,      href: "/decision-models" },
      { label: "Savings",         icon: <PiggyBank size={16} />,      href: "/savings" },
      { label: "Loan Requests",   icon: <FileText size={16} />,       href: "/loan-requests" },
      { label: "Whitelist",       icon: <UserX size={16} />,          href: "/whitelist" },
      { label: "Karma",           icon: <AlertTriangle size={16} />,  href: "/karma" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { label: "Organization",      icon: <Building2 size={16} />,        href: "/organization" },
      { label: "Loan Products",     icon: <Package size={16} />,          href: "/loan-products" },
      { label: "Savings Products",  icon: <Wallet size={16} />,           href: "/savings-products" },
      { label: "Fees and Charges",  icon: <DollarSign size={16} />,       href: "/fees-charges" },
      { label: "Transactions",      icon: <ArrowLeftRight size={16} />,   href: "/transactions" },
      { label: "Services",          icon: <Briefcase size={16} />,        href: "/services" },
      { label: "Service Account",   icon: <UserCog size={16} />,          href: "/service-account" },
      { label: "Settlements",       icon: <Receipt size={16} />,          href: "/settlements" },
      { label: "Reports",           icon: <BarChart2 size={16} />,        href: "/reports" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Preferences",       icon: <Settings size={16} />,         href: "/preferences" },
      { label: "Fees and Pricing",  icon: <Tag size={16} />,              href: "/fees-pricing" },
      { label: "Audit Logs",        icon: <ClipboardList size={16} />,    href: "/audit-logs" },
      { label: "Systems Messages",  icon: <MessageSquare size={16} />,    href: "/system-messages" },
    ],
  },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      {open && <div className={s.overlay} onClick={onClose} />}

      <aside className={`${s.sidebar} ${open ? s.open : ""}`}>
        <div className={s.inner}>
          <button className={s.switchOrg} data-testid="button-switch-org">
            <Sliders size={16} />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </button>

          <nav className={s.nav}>
            {NAV.map((section, si) => (
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
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className={s.footer}>
            <button
              className={s.logout}
              data-testid="button-logout"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "/";
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
            <p className={s.version}>v1.2.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
