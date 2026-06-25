import s from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`${s.card} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
