import React from 'react';
import Header from './header'
import { Typography, Row, Col, Button } from 'antd';
import './App.scss';
import './static/styles/antd.css'

const { Title, Paragraph, Text, Link } = Typography;

const App = (props: any) => {
  console.log(props);
  const {history} = props;
  return (
    <div className='app-container'>
      <Header history={history} showActions={true} />
      <div className='main-content'>
        
            <Typography className='main-content-banner'>
              <Title>Value Proposition</Title>
              <Paragraph>
                In the process of internal desktop applications development, many different design specs and
                implementations would be involved, which might cause designers and developers difficulties and
                duplication and reduce the efficiency of development.
              </Paragraph>
              <Button className='vikas-btn-radius' size='large' type="primary">Register</Button>
            </Typography>

      </div>
    </div>
  );
}

export default App;
