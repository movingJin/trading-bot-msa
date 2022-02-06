import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { ReactVirtualizedTable } from '@components/common/ReactVirtualizedTable';
import Box from '@mui/material/Box';
import { TimeLine } from '@containers/CoinMarket/TimeLineContainer';
import { CommonInputContainer } from '@containers/common/InputContainer';
import { useDispatch } from 'react-redux';
import { coinListActions } from '@redux/reducers/coinReducer';
import styled from 'styled-components';

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  overflow: auto;
`;
interface Data {
  name: string;
  currentPrice: string;
  rateOfChange: string;
  money: string;
  id: number;
}
interface stateProps {
  coinContent: Data[];
  filterCoinContent: Data[];
  keyword: string;
}
type Sample = [string, string, string, string];

const sample: readonly Sample[] = [
  ['비트코인', '55,000,000', '+2.5%', '151.445'],
  ['이클', '55,000,000', '+2.5%', '151.445'],
  ['도지코인', '55,000,000', '+2.5%', '151.445'],
  ['비트토렌트', '55,000,000', '+2.5%', '151.445'],
  ['페이코인', '55,000,000', '+2.5%', '151.445'],
];

function createData(
  id: number,
  name: string,
  currentPrice: string,
  rateOfChange: string,
  money: string,
): Data {
  return { id, name, currentPrice, rateOfChange, money };
}

const rows: Data[] = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const CoinMarket = () => {
  const [states, setStates] = useState<any>({
    coinContent: [],
    filterCoinContent: [],
    keyword: '',
  });
  const { coinContent, filterCoinContent, keyword } = states;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(coinListActions.request('asc'));
    setStates({
      ...states,
      coinContent: rows,
      filterCoinContent: rows,
    });
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStates({
      ...states,
      keyword: e.target.value,
    });
  };
  const handleKeyPress = () => {
    if (keyword) {
      setStates({
        ...states,
        filterCoinContent: coinContent.filter((data: Data) => {
          return data.name.includes(keyword);
        }),
      });
    } else {
      setStates({
        ...states,
        filterCoinContent: coinContent,
      });
    }
  };
  return (
    <MainWapper>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ width: 300, margin: '3rem 30rem 0rem 0rem' }}>
              <h1>Coin market</h1>
            </Box>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                margin: '0rem 0rem 1rem 0rem',
              }}
            >
              <CommonInputContainer
                placeholder="search"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </Box>

            <ReactVirtualizedTable
              rows={filterCoinContent}
              tableHeight={500}
              tableWidth="100%"
            />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: 300, margin: '3rem 30rem 0rem 0rem' }}>
              <h1>실시간 타임라인</h1>
            </Box>
            <TimeLine />
          </Grid>
        </Grid>
      </Container>
    </MainWapper>
  );
};
export default CoinMarket;
