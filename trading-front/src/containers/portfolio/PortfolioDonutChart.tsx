import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { getPortfolioActions } from '@redux/reducers/portfolioReducer';

const PortfolioDonutChart = () => {
  const [states, setStates] = useState<any>({
    options: {
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          width: '100%',
        },
        pie: {
          size: 200,
          customScale: 0.8,
          donut: {
            size: '40%',
          },
        },
      },
      labels: [],
    },
    seriesItems: [],
  });
  const { options, seriesItems } = states;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolioActions.request());
  }, []);

  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.portfolio,
  );

  const labelsD: any = [];
  const seriesD: any = [];

  useEffect(() => {
    labelsD.push('현금');
    if (!Object.values(portfolioItems)[0]) {
      seriesD.push(0);
    } else {
      seriesD.push(Object.values(portfolioItems)[0]);
    }
    if (portfolioItems.tokenAsset) {
      portfolioItems.tokenAsset.forEach((e: any) => {
        const value: any = Object.values(e)[0];
        if (value.quantity) {
          labelsD.push(Object.keys(e));
          seriesD.push(value.quantity);
        }
      });
      setStates({
        ...states,
        seriesItems: seriesD,
        options: {
          labels: labelsD,
        },
      });
    }
  }, [portfolioItems]);

  return (
    <div>
      <Chart options={options} series={seriesItems} type="donut" />
    </div>
  );
};
export default PortfolioDonutChart;
