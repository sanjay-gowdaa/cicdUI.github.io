import React from 'react'
import { Typography, Row, Col } from 'antd';
import './dashboard.scss'

const { Title } = Typography;

const DashboardSection = () => {
    return (
        <div className='seller-dashboard-container'>
            <Title level={2}>My Dashboard</Title>
            <Title level={3} type='secondary' >My Local Information</Title>
            <Row gutter={{ xs: 0, sm: 0, md: 32}}>
                <Col  md={8} sm={24} xs={24} >
                    <div className='dashboard-tile'>
                        Weather/Area Info
                    </div>
                </Col>
                <Col md={8} sm={24} xs={24} >
                    <div className='dashboard-tile'>
                        Crop Info
                    </div>
                </Col>
                <Col md={8} sm={24} xs={24} >
                    <div className='dashboard-tile'>
                        Events
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardSection;