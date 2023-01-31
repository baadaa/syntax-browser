import * as React from 'react';
import styled from 'styled-components';
import { Props } from '@/types';
import { Work_Sans } from '@next/font/google';

const ws = Work_Sans({ subsets: ['latin'] });

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
  @media screen and (max-width: 1300px) {
    justify-content: flex-start;
    main {
      max-width: 70rem;
      margin-left: 10rem;
    }
  }
  @media screen and (max-width: 1140px) {
    flex-direction: column;
    align-items: center;
    main {
      margin-left: 0;
      margin-top: 2rem;
    }
  }
`;

export const Layout: React.FC<Props> = ({ children }) => (
  <LayoutStyles className={ws.className}>{children}</LayoutStyles>
);
