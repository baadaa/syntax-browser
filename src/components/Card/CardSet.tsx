import * as React from 'react';
import { EpisodeCard, SickPickCard, YearlySection, NoMatch } from './Card';
import { FetchDataSet, ShowsByYear, PickType } from '@/types';
import css from './Card.module.scss';

type EpisodeProps = {
  browseBy: FetchDataSet;
  yearRange: Array<number>;
  filteredList: ShowsByYear;
};
export const EpisodeCards: React.FC<EpisodeProps> = ({
  browseBy,
  yearRange,
  filteredList,
}) => {
  return (
    <section className="shows" data-active={browseBy === 'shows'}>
      {yearRange.map((year) => {
        const yearlyList = filteredList[year];
        return (
          <YearlySection key={year} id={`year-${year}`}>
            <h2>{year}</h2>
            <div className="cards">
              {yearlyList &&
                yearlyList.map((show, i) => {
                  const { number, title, date, slug, html, category } = show;
                  return (
                    <EpisodeCard
                      key={i}
                      number={number}
                      title={title}
                      date={date}
                      slug={slug}
                      html={html}
                      category={category}
                    />
                  );
                })}
            </div>
            {!yearlyList && <NoMatch />}
          </YearlySection>
        );
      })}
    </section>
  );
};

type SickPickProps = {
  browseBy: FetchDataSet;
  pickList: Array<PickType>;
};
export const SickPickCards: React.FC<SickPickProps> = ({
  browseBy,
  pickList,
}) => {
  return (
    <section
      className={`picks ${css.year}`}
      data-active={browseBy === 'sick picks'}
      data-picks="true"
    >
      <h2>
        Sick <br />
        Picks
      </h2>
      <div>
        {pickList.map((pick) => {
          const { id, html } = pick;
          return <SickPickCard key={id} id={id} html={html} />;
        })}
      </div>
    </section>
  );
};
