import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { coinDataUtils } from '@utils/utils';
import EnhancedTable from '@components/common/CoinTable';
import { fetchCoinActions, startInit } from '@redux/reducers/websocketReducer';

export const DsbContWrapper = styled.div``;

const DsbCoinList = (): JSX.Element => {
  const dispatch = useDispatch();
  const coinValue = useSelector((state: RootState) => state.coin);
  const [coinData, setCoinData] = useState(coinValue);
  useEffect(() => {
    dispatch(fetchCoinActions.request());
    dispatch(startInit());
  }, []);
  useEffect(() => {
    if (coinValue?.coinList.length) {
      setCoinData(coinDataUtils.convertData(coinValue));
    }
  }, [coinValue?.coinList]);
  return <EnhancedTable coindata={coinData.length ? coinData : []} />;
};
export default DsbCoinList;
