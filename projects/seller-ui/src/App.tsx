import React from 'react';
import './App.scss';
import CropsSection from './crops';
import DashboardSection from './dashboard';
import Header from './header';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import { Divider } from 'antd';
import 'antd/dist/antd.css'; 

function App(props: any) {
  const {history} = props;
  return (
    <div className="seller-ui-app">
      <Header history={history} />
      <div className="seller-ui-dashboard">
        <DashboardSection />
        <Divider />
        <CropsSection />
        <Divider />
        <MatchedSection />
        <Divider />
        <TransactionSection />
        <Divider />
        <ReviewsSection />
      </div>
    </div>
  );
}

export default App;
