import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isEmpty } from 'lodash';

const GuardedRoute = ({ Component, ...rest }: any) => {
    const accessToken = (window as any).userToken ? (window as any).userToken : null;
    !isEmpty(accessToken) && localStorage.setItem("token", accessToken);

    return (
        <Route
            {...rest}
            render={
                (props) => (accessToken || localStorage.getItem("token") ?
                    <Component {...props} /> : <Redirect to='/' />
                )
            }
        />
    );
};

export default GuardedRoute;
