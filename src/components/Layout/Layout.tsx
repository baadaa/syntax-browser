import * as React from 'react';
import { Props } from '@/types';
import { Work_Sans } from '@next/font/google';
import css from './Layout.module.scss';

const ws = Work_Sans({ subsets: ['latin'], display: 'swap' });

export const Layout: React.FC<Props> = ({ children }) => (
  <div className={`${ws.className} ${css.layout}`}>{children}</div>
);
