import React from 'react';
import TimeLineComponent from '@components/CoinMarket/TimeLine';

const newsData = [
  {
    id: 1,
    time: '10:00',
    content: '비트 코인 해시레이트 회복됐지만 갈길 멀어',
  },
  {
    id: 2,
    time: '17:00',
    content: '비트 코인 3.8만 달러에~',
  },
];

export interface newsProps {
  time: string;
  content: string;
  key: number;
}
export const TimeLine = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '6rem 0rem 0rem 3rem',
      }}
    >
      {newsData.map((v) => {
        return (
          <TimeLineComponent time={v.time} content={v.content} key={v.id} />
        );
      })}
    </div>
  );
};
