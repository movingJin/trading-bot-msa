import React from 'react';
import { RootState } from '@redux/reducers';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './normalRoute/Login';
import Dashboard from './normalRoute/Dashboard';

function MainRouter(): JSX.Element {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Switch>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/main"
          isAuthenticated={isAuthenticated}
          component={Dashboard}
        />
        <Redirect path="*" to="/login" />
      </Switch>
    </Switch>
  );
}
export default MainRouter;
