import React from 'react';
import styled from 'styled-components';
import { newsProps } from '@containers/CoinMarket/TimeLineContainer';

const Line = styled.div`
  width: 1rem;
  height: 10rem;
  float: left;
  position: absolute;
  z-index: 0;
  text-align: center;
  border-right: 1px solid #aaa;
  line-height: 0.1em;
  margin: 0rem 0rem 0rem 2rem;
  /* background-color: #acacac; */
`;
const TimeSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  position: absolute;
  text-align: center;
  line-height: 0.1em;
  z-index: 2;
  margin: 3rem 0rem 0rem 0.4rem;
  background-color: #868eda;
`;
const TimeWrapper = styled.div`
  position: relative;
  display: flex;
  height: 5rem;
  .content {
    margin: 3.5rem 0rem 0rem 8rem;
    float: right;
  }
`;
const TimeLineComponent: React.FC<newsProps> = ({ time, content }) => {
  //   const classes = useStyles();
  return (
    <TimeWrapper>
      <Line />
      <TimeSquare>{time}</TimeSquare>
      <div className="content">{content}</div>
    </TimeWrapper>
  );
};

export default TimeLineComponent;
