import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { UserStateModel } from '../store/loginReducer/types';

const GuardedRoute = ({ Component, ...rest }: any) => {
    const loginStore: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const {accessToken} = loginStore;

    return(
        <Route 
            {...rest} 
            render={
                (props) => ( true || accessToken ? <Component {...props} /> : <Redirect to='/' />)
            } 
        />
    )
}

export default GuardedRoute;