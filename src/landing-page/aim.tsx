import React, { useState } from 'react';
import {Col,Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import PriceDiscovery from '../static/assets/Rectangle 234.png';
import BestMatch from '../static/assets/Rectangle 235.png';
import DirectTrade from '../static/assets/Rectangle 236.png';
import BestPrice from '../static/assets/Rectangle 237.png';
import FarmToDoor from '../static/assets/Rectangle 238.png';
import FarmerAsService from '../static/assets/Rectangle 239.png';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';
import { LandingDivider } from '../app-components/landingDivider';

const {Text, Title } = Typography;

const Aim = () => {
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    return (
        <>
        <div id='aim'>
            <div className='aim-wrapper'>
                <Row justify='center' className='aimFirstRow'>
                    <Col xs={24} md={12} className='aim-Whatis'>
                        <Title className='aim-header' level={2}>{t('aim_page.text1')}</Title>
                        <p>{t('aim_page.text2')}</p>
                    </Col>
                    <Col xs={24} md={12} className='videoContent'>
                        <iframe
                            className='videoContent'
                            width="400"
                            height="300"
                            border-radius="10%"
                            style={{ marginLeft:'50px'}} 
                            src="https://www.youtube.com/embed/p4CZAGgJ-wM"
                        />
                    </Col>
                </Row>
                <Title level={2}>{t('aim_page.text3')}</Title>
                <Text className='at-present-text'>{t('aim_page.text4')}</Text>
                <Row className='seller-buyer-advantage'>
                    <Col span={6} xs={24} md={8}>
                    <p className='headText'><span>{t('aim_page.text5')}</span> {t('aim_page.text6')}</p>
                        <div className='seller-buyer-points'>
                            <div>01</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text9')}</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>02</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text10')}</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>03</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text11')}</p>
                        </div>

                    </Col>
                    <Col className='midSec-seller' span={6} xs={24} md={8}>
                        <div className='seller-buyer-points'>
                            <div>04</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text12')}</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>05</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text13')}</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>06</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text14')}</p>
                        </div>

                    </Col>
                    <Col span={8} xs={24} md={8}>
                    <p className='headText2'><span>{t('aim_page.text7')}</span> {t('aim_page.text8')}</p>
                        <div className='seller-buyer-points'>
                            <div style={{background:'#F5A31A'}}>01</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text15')}</p>
                        </div>
                        <div  className='seller-buyer-points'>
                            <div style={{background:'#F5A31A'}}>02</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text16')}</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div style={{background:'#F5A31A'}}>03</div>
                            <p className={`${customStyles.aimSellerBuyerPoints}`}>{t('aim_page.text17')}</p>
                        </div>

                    </Col>
                </Row>

                <p className='manyMore'>{t('aim_page.text18')}</p>
                <hr className='solid'></hr>
                <p className='seventhBox'>{t('aim_page.text19')}</p>

                {/* /** This should be visible only in desktop/ tab */ }
                <Row className='advantageBadges'>
                    <Col span={6} xs={0} md={6}><img src={PriceDiscovery} alt='PriceDiscovery'/></Col>
                    <Col span={6} xs={0} md={6}><img src={BestMatch} alt='BestMatch'/></Col>
                    <Col span={6} xs={0} md={6}><img src={DirectTrade} alt='DirectTrade'/></Col>
                    <Col span={6} xs={0} md={6}><img src={BestPrice} alt='BestPrice'/></Col>
                </Row>
                <Row justify='space-between' className='advantageBadges-1'>
                    <Col span={12} xs={0} md={12}><img src={FarmToDoor} alt='FarmToDoor'/></Col>
                    <Col span={12} xs={0} md={12}><img src={FarmerAsService} alt='FarmerAsService'/></Col>
                </Row>
                <Row className='advantageBadges'>
                    <Col span={6} xs={12} md={0}><img src={PriceDiscovery} alt='PriceDiscovery'/></Col>
                    <Col span={6} xs={12} md={0}><img src={BestMatch} alt='BestMatch'/></Col>
                    <Col span={6} xs={12} md={0}><img src={DirectTrade} alt='DirectTrade'/></Col>
                    <Col span={6} xs={12} md={0}><img src={BestPrice} alt='BestPrice'/></Col>
                    <Col span={6} xs={12} md={0}><img src={FarmToDoor} alt='FarmToDoor'/></Col>
                    <Col span={6} xs={12} md={0}><img src={FarmerAsService} alt='FarmerAsService'/></Col>
                </Row>
                <p className='ninethBox'>{t('aim_page.text20')}</p>
                <Row className='tenthBox'>
                    <Col span={8} xs={12} md={8}>
                        <p className='firstheading'>{t('aim_page.text21')}</p>
                        <p>{t('aim_page.text22')}</p>
                    </Col>
                    <Col span={8} xs={12} md={8}>
                        <p className='firstheading'>{t('aim_page.text23')}</p>
                        <p>{t('aim_page.text24')}</p>
                    </Col>
                    <Col span={8} xs={12} md={8}>
                        <p className='firstheading'>{t('aim_page.text25')}</p>
                        <p>{t('aim_page.text26')}</p>
                    </Col>
                </Row>
                <LandingDivider className='pageDivider'/>
    </div>
    </div>
    </>
    );
};

export default Aim;
