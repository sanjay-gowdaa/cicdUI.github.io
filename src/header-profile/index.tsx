import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

import { Popover, Image, Typography } from 'antd';
import Profile from '../static/assets/prof.png'
import { UserDetailsModel } from '../store/loginReducer/types';

const { Title } = Typography;

const UserHeader = () => {
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false)
    const loginState: UserDetailsModel = useSelector((state: RootState) => state.loginUser);

    return (
      <div className='display-flex-row align-center'>
        <Popover
          content={<p>Content</p>}
          title={<h2>Register</h2>}
          trigger="click"
          visible={signUpPopupVisible}
          onVisibleChange={() => setSignUpPopupVisible(!signUpPopupVisible)}
        >
          <div className='display-flex-row align-center'>
            <div className='margin-l-r-1em'>
              <Title level={4} className='margin-unset'>{loginState.username}</Title>
              <p className='margin-unset'>Seller Id: {loginState.userId}</p>
            </div>
            <Image
              preview={false}
              src={Profile}
            />
          </div>
        </Popover>
      </div>
    )
  }

  export default UserHeader;