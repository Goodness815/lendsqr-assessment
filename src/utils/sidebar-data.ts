import homeIcon from "../assets/icons/homeIcon.svg";
import usersIcon from "../assets/icons/userFriendsIcon.svg";
import guarantorsIcon from "../assets/icons/usersIcon.svg";
import sackIcon from "../assets/icons/sackIcon.svg";
import handshakeIcon from "../assets/icons/handshakeIcon.svg";
import piggyBankIcon from "../assets/icons/piggyBankIcon.svg";
import loanRequestsIcon from "../assets/icons/borrowersHandIcon.svg";
import whitelistIcon from "../assets/icons/userCheckIcon.svg";
import karmaIcon from "../assets/icons/userTimesIcon.svg";
import organizationIcon from "../assets/icons/briefcase.svg";
import loanProductsIcon from "../assets/icons/borrowersHandIcon.svg";
import savingsProductsIcon from "../assets/icons/bankIcon.svg";
import feesChargesIcon from "../assets/icons/coinsSolidIcon.svg";
import transactionsIcon from "../assets/icons/transactionIcon.svg";
import servicesIcon from "../assets/icons/galaxyIcon.svg";
import serviceAccountIcon from "../assets/icons/userCogIcon.svg";
import settlementsIcon from "../assets/icons/scrollIcon.svg";
import reportsIcon from "../assets/icons/chartBarIcon.svg";
import preferencesIcon from "../assets/icons/slidersIcon.svg";
import feesPricingIcon from "../assets/icons/badgePercentIcon.svg";
import auditLogsIcon from "../assets/icons/clipboardListIcon.svg";


export const NAV_LINKS = [
  {
    items: [
      { label: "Dashboard", icon: homeIcon, href: "/dashboard" },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users", icon: usersIcon, href: "/users" },
      { label: "Guarantors", icon: guarantorsIcon, href: "/guarantors" },
      { label: "Loans", icon: sackIcon, href: "/loans" },
      { label: "Decision Models", icon: handshakeIcon, href: "/decision-models" },
      { label: "Savings", icon: piggyBankIcon, href: "/savings" },
      { label: "Loan Requests", icon: loanRequestsIcon, href: "/loan-requests" },
      { label: "Whitelist", icon: whitelistIcon, href: "/whitelist" },
      { label: "Karma", icon: karmaIcon, href: "/karma" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { label: "Organization", icon: organizationIcon, href: "/organization" },
      { label: "Loan Products", icon: loanProductsIcon, href: "/loan-products" },
      { label: "Savings Products", icon: savingsProductsIcon, href: "/savings-products" },
      { label: "Fees and Charges", icon: feesChargesIcon, href: "/fees-charges" },
      { label: "Transactions", icon: transactionsIcon, href: "/transactions" },
      { label: "Services", icon: servicesIcon, href: "/services" },
      { label: "Service Account", icon: serviceAccountIcon, href: "/service-account" },
      { label: "Settlements", icon: settlementsIcon, href: "/settlements" },
      { label: "Reports", icon: reportsIcon, href: "/reports" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Preferences", icon: preferencesIcon, href: "/preferences" },
      { label: "Fees and Pricing", icon: feesPricingIcon, href: "/fees-pricing" },
      { label: "Audit Logs", icon: auditLogsIcon, href: "/audit-logs" },
    ],
  },
];


