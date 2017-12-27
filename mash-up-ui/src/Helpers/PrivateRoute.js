import React, { Component } from 'react';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Redirect } from 'react-router';
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={props => (
        isAuthenticated
        ? (
            <Component {...props} />
        )
        : (<Redirect to={{ pathname: '/', state: { from: props.location} }} />)
        )}
    />
);
export default PrivateRoute;
