import * as React from 'react';
import css from './DevNotes.module.scss';

type AboutProp = {
  isActive: boolean;
};
export const DevNotes: React.FC<AboutProp> = ({ isActive }) => (
  <div className={css.devnote} data-showing={isActive}>
    <p>
      Built by{' '}
      <a href="https://bald.design" target="_blank" rel="noreferrer">
        <strong>B</strong>
      </a>{' '}
      with TypeScript and Next.js to browse{' '}
      <a href="https://syntax.fm" target="_blank" rel="noreferrer noopener">
        Syntax
      </a>{' '}
      content more easily.
    </p>
    <p>
      All rights are reserved for original content creators{' '}
      <a href="https://levelup.video" target="_blank" rel="noreferrer noopener">
        Scott Tolinski
      </a>{' '}
      and{' '}
      <a href="https://wesbos.com" target="_blank" rel="noreferrer noopener">
        Wes Bos
      </a>{' '}
    </p>
  </div>
);
