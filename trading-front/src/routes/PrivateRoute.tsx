import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute = ({ isAuthenticated, ...rest }: PrivateRouteProps): JSX.Element => {
  if (isAuthenticated) {
    return <Route {...rest} />;
  }
  return <Redirect to={{ pathname: '/login' }} />;
};

export default PrivateRoute;
