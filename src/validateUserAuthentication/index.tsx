import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import { getAccessTokenAndFetchUserDetails } from '../store/loginReducer/actions';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ValidateUserAuthentication = (props: any) => {
    const {history} = props
    const dispatch = useDispatch();
    let query = useQuery();

    useEffect(() => {
        const accessCode = query.get("code") || '';
        dispatch(getAccessTokenAndFetchUserDetails(accessCode))
    }, [])
    
    return (
        <Spin>
            <Alert
                className='text-align-center'
                banner
                message="Please wait while we are validating the user"
                description="Please wait while we are validating the user."
                type="info"
            />
        </Spin>
    )
}

export default ValidateUserAuthentication;