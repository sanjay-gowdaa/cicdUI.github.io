import React, {useState} from 'react';
import { Popover, Button, Image, Typography  } from 'antd';
import Logo from '../static/assets/logo.jpg';
import Profile from '../static/assets/prof.png'
import './header.scss'

const { Title } = Typography;

const HeaderActions = ({history}: {history: any}) => {
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false)
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
            <Title level={4} className='margin-unset'>Naresh Gowda</Title>
            <p className='margin-unset'>Seller Id: 276327</p>
          </div>
          <Image
            src={Profile}
          />
        </div>
      </Popover>
    </div>
  )
}

const Header = (headerProps: any) => {
  const {history, showActions} = headerProps
  return (
    <div className='landing-page-header-bar'>
      <Image
        width={100}
        height={60}
        src={Logo}
      />
      <HeaderActions history={history} />
    </div>
  )
}

export default Header;
