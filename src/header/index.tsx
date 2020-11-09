import React, {useState} from 'react';
import Login from '../login-ui/login';
import Register from '../login-ui/register'
import { Popover, Button, Image } from 'antd';
import Logo from '../static/assets/logo.jpg';
import './header.scss'

const HeaderActions = ({history}: {history: any}) => {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false)
  return (
    <div className='display-flex-row align-center'>
      <Popover
        content={<Register history={history} />}
        title={<h2>Register</h2>}
        trigger="click"
        visible={signUpPopupVisible}
        onVisibleChange={() => setSignUpPopupVisible(!signUpPopupVisible)}
      >
        <Button className='margin-l-r-1em vikas-btn-radius wid150' type="primary" size="large">Register</Button>
      </Popover>
      <Popover
        content={<Login history={history} />}
        title={<h2>Login</h2>}
        trigger="click"
        visible={loginPopupVisible}
        onVisibleChange={() => setLoginPopupVisible(!loginPopupVisible)}
      >
        <Button className='vikas-btn-radius wid150' size="large">Login</Button>
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
      {showActions ? <HeaderActions history={history} /> : null}
    </div>
  )
}

export default Header;
