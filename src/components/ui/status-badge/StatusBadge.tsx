import type { UserStatus } from "../../../types/user";
import s from "./StatusBadge.module.scss";

interface StatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`${s.badge} ${s[status]} ${className}`}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
