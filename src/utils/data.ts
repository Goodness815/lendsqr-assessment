import {
 Users, UserCheck, CreditCard, GitBranch,
    PiggyBank, FileText, UserX, AlertTriangle, Building2, Package,
    Wallet, DollarSign, ArrowLeftRight, Briefcase, UserCog,
    Receipt, BarChart2, Settings, Tag, ClipboardList,
    HomeIcon
} from "lucide-react";

export const NAV_LINKS = [
    {
        items: [
            { label: "Dashboard", icon: HomeIcon, href: "/dashboard" },
        ],
    },
    {
        title: "CUSTOMERS",
        items: [
            { label: "Users", icon: Users, href: "/users" },
            { label: "Guarantors", icon: UserCheck, href: "/guarantors" },
            { label: "Loans", icon: CreditCard, href: "/loans" },
            { label: "Decision Models", icon: GitBranch, href: "/decision-models" },
            { label: "Savings", icon: PiggyBank, href: "/savings" },
            { label: "Loan Requests", icon: FileText, href: "/loan-requests" },
            { label: "Whitelist", icon: UserX, href: "/whitelist" },
            { label: "Karma", icon: AlertTriangle, href: "/karma" },
        ],
    },
    {
        title: "BUSINESSES",
        items: [
            { label: "Organization", icon: Building2, href: "/organization" },
            { label: "Loan Products", icon: Package, href: "/loan-products" },
            { label: "Savings Products", icon: Wallet, href: "/savings-products" },
            { label: "Fees and Charges", icon: DollarSign, href: "/fees-charges" },
            { label: "Transactions", icon: ArrowLeftRight, href: "/transactions" },
            { label: "Services", icon: Briefcase, href: "/services" },
            { label: "Service Account", icon: UserCog, href: "/service-account" },
            { label: "Settlements", icon: Receipt, href: "/settlements" },
            { label: "Reports", icon: BarChart2, href: "/reports" },
        ],
    },
    {
        title: "SETTINGS",
        items: [
            { label: "Preferences", icon: Settings, href: "/preferences" },
            { label: "Fees and Pricing", icon: Tag, href: "/fees-pricing" },
            { label: "Audit Logs", icon: ClipboardList, href: "/audit-logs" },
        ],
    },
];