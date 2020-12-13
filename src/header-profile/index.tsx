import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { Typography } from 'antd';
import { UserStateModel } from '../store/loginReducer/types';

const { Title } = Typography;

const UserHeader = () => {
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);

    return (
      <div className='display-flex-row align-center'>
          <Title level={4} className='margin-unset'>{loginState.name}</Title>
          {/* <p className='margin-unset'>Seller Id: {loginState.userId}</p> */}
      </div>

    )
  }

  export default UserHeader;