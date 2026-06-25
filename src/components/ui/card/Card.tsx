import type { ReactNode } from "react";
import s from './Card.module.scss';

export type CardProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`${s.card} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
