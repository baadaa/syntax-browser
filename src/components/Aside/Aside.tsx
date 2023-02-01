import * as React from 'react';
import css from './Aside.module.scss';
import { DevNotes } from './DevNotes';
import { Props } from '@/types';

export const Aside: React.FC<Props> = ({ children }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [showingDevNote, setShowingDevNote] = React.useState(false);
  return (
    <aside className={css.aside} data-active={isActive}>
      <button
        className={css.info}
        data-showing={showingDevNote}
        onClick={() => setShowingDevNote(!showingDevNote)}
      >
        {showingDevNote ? '×' : '?'}
      </button>
      <DevNotes isActive={showingDevNote} />
      <h1>
        Syntax Podcast: <span>The Missing Browser</span>
      </h1>
      <button
        className={css.toggleFilters}
        onClick={() => setIsActive(!isActive)}
      >
        Filter &amp; Search
      </button>
      <div className={css.set}>{children}</div>
    </aside>
  );
};
