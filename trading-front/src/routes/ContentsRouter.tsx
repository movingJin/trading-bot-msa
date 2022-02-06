import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import CoinMarket from './normalRoute/CoinMarket';
import Portfolio from './normalRoute/Portfolio';
import Simulation from './normalRoute/Simulation';
import TradingBot from './normalRoute/TradingBot';
import Main from './normalRoute/Main';

function ContentsRouter(): JSX.Element {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Main} />
      <Route path={`${path}/coin-market`} component={CoinMarket} />
      <Route path={`${path}/trading-bot`} exact component={TradingBot} />
      <Route path={`${path}/simulation`} exact component={Simulation} />
      <Route path={`${path}/portfolio`} exact component={Portfolio} />
      <Redirect from="*" to={`${path}/dashboard`} />
    </Switch>
  );
}
export default ContentsRouter;
