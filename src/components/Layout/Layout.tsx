import * as React from 'react';
import styled from 'styled-components';
import { Props } from '@/types';
import { Work_Sans } from '@next/font/google';

const ws = Work_Sans({ weight: ['400', '600', '700'], subsets: ['latin'] });

const LayoutStyles = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: var(--max-width);
  main {
    max-width: 1024px;
  }
`;

export const Layout: React.FC<Props> = ({ children }) => (
  <LayoutStyles className={ws.className}>{children}</LayoutStyles>
);
