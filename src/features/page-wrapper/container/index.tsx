import { ReactNode } from 'react';
import s from './container.module.css';

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className={s.root}>{children}</div>;
};
