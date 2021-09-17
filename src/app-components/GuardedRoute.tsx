import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ Component, ...rest }: any) => {
    const accessToken = (window as any).userToken ? (window as any).userToken : null;
    return(
        <Route 
            {...rest} 
            render={
                (props) => ( accessToken ? <Component {...props} /> : <Redirect to='/' />)
            } 
        />
    )
}

export default GuardedRoute;