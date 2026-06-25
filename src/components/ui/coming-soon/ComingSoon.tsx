import { useLocation } from 'react-router-dom';
import s from './ComingSoon.module.scss';

type ComingSoonProps = {
  title?: string;
}

export function ComingSoon({ title }: ComingSoonProps = {}) {
  const location = useLocation();

  // Format page name from URL slug
  const pageName = location.pathname
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Page";

  return (
    <div className={s.wrap}>
      <div className={s.icon} aria-hidden="true">🚧</div>
      <h1 className={s.title}>{title || pageName}</h1>
      <p className={s.message}>This section is coming soon.</p>
      <p className={s.sub}>We're working on it — check back later.</p>
    </div>
  );
}
