import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import ContentWrapper from '@components/common/ContentWrapper';
import PortfolioInfoCard from '@containers/portfolio/PortfolioInfoCard';
import { PortfolioListCard } from '@containers/portfolio/PortfolioListCard';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import {
  getItemsActions,
  getPortfolioActions,
} from '@redux/reducers/portfolioReducer';

const Portfolio = () => {
  const [states, setStates] = useState<any>({
    orderList: [],
  });

  const { orderList } = states;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsActions.request());
  }, []);
  let cardItems: any = useSelector(
    (state: RootState) => state.portfolio.items.data,
  );

  useEffect(() => {
    if (!cardItems) cardItems = [];
    setStates({
      ...states,
      orderList: cardItems,
    });
  }, [cardItems]);

  return (
    <ContentWrapper title="포트폴리오" padding="2rem 200px 2rem 200px">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <PortfolioDonutChart />
          </Grid>
          <Grid item xs={4}>
            <PortfolioListCard rows={orderList} />
          </Grid>
        </Grid>
      </Container>
    </ContentWrapper>
  );
};
export default Portfolio;
