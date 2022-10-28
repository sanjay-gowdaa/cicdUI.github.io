import React, { useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import PriceDiscovery from '../static/assets/Rectangle 234.png';
import BestMatch from '../static/assets/Rectangle 235.png';
import DirectTrade from '../static/assets/Rectangle 236.png';
import BestPrice from '../static/assets/Rectangle 237.png';
import FarmToDoor from '../static/assets/Rectangle 238.png';
import FarmerAsService from '../static/assets/Rectangle 239.png';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';
import { LandingDivider } from '../app-components/landingDivider';
import line21 from '../static/assets/Line 21.png';

const { Text, Title } = Typography;

const Aim = () => {
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    return (
        <>
            <div id="aim">
                <div className="aim-wrapper">
                    <Row justify="center" className="aimFirstRow">
                        <Col  md={12} className="aim-Whatis">
                            <Title className="aim-header">{t('aim_page.text1')}</Title>
                            <p>{t('aim_page.text2')}</p>
                        </Col>
                        <Col  md={12} className="videoContent">
                            <iframe
                                className="videoContent"
                                width="400"
                                height="300"
                                border-radius="10%"
                                style={{ marginLeft: '50px' }}
                                src="https://www.youtube.com/embed/p4CZAGgJ-wM"
                            />
                        </Col>
                    </Row>
                    {/* <LandingDivider className="divider" /> */}
                    <Title className="why-vikasBandhu">{t('aim_page.text3')}</Title>
                    <Text className="at-present-text">{t('aim_page.text4')}</Text>
                    {/* <Row className='seller-buyer-advantage'>
                    <Col span={6} xs={24} md={8}>
                    <div className='headText'><p className='span-text'>{t('aim_page.text5')}</p><p>{t('aim_page.text6')}</p></div>
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
                    <div className='headText'><p className='span-text'>{t('aim_page.text7')}</p><p>{t('aim_page.text8')}</p></div>
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
                    </Row> */}

                    <div className="ExistingMarketPlaces">
                        <Row className="firstBox">
                            <Text className="firstBoxHeading">Existing Market Places </Text>
                            <Text className="subHead">
                                Per MARKET RESEARCH , No Dedicated Post Harvest (Agri Output)
                                Marketplaces available today.
                            </Text>
                        </Row>
                        <Row className="secondBox">
                            <Col xs={24} md={4} xl={4} span={4} className='existingPicture'>
                                <img
                                    style={{ width: '88px', height: '88px' }}
                                    src={PriceDiscovery}
                                    alt="PriceDiscovery"
                                />
                            </Col>
                            <Col xs={24} md={20} xl={20} span={20} className="insidePara">
                                <Row className="insideRows">
                                    <Col  span={4} className="points">
                                        <div style={{ background: 'rgba(255, 62, 62, 0.1)'}}>01</div>
                                    </Col>
                                    <Col  span={20}>
                                        <p>
                                            The existing Market places uses Bid or Manual connect
                                            method between Sellers and Farmers
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="insideRows">
                                    <Col span={4} className="points">
                                        <div style={{ background: 'rgba(255, 62, 62, 0.1)'}}>02</div>
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            They have a poor connection to transaction ratio 2%.
                                            None of them have tried to solve this core issue.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="insideRows">
                                    <Col span={4} className="points">
                                        <div style={{ background: 'rgba(255, 62, 62, 0.1)'}}>03</div>
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            They proceed with a Horizontal spread covering Agri
                                            Inputs, Mechanization and Equipment and Agri Output.
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className="BuyerSellerRow">
                        <Row className="BuyerSellerAdvantage">
                            <Col className="sellerBox inside">
                                <Row className="headText">
                                    <p className="span-text">{t('aim_page.text5')}</p>
                                    <p>{t('aim_page.text6')}</p>
                                </Row>
                                <Row className="CImage">
                                    <img
                                        src={PriceDiscovery}
                                        alt="PriceDiscovery"
                                    />
                                </Row>
                                <Row className="pointsSection">
                                    <Row className="sellerBuyerPoints">
                                        <Col span={4}>
                                            <div style={{ background: `rgb(247, 104, 43,0.1)` }}>
                                                01
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <p>
                                                Majority of farmers are tenant farmers, i.e they
                                                farm on land owned by others and pay rent to the
                                                owner.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="sellerBuyerPoints">
                                        <Col span={4}>
                                            <div style={{ background: `rgb(247, 104, 43,0.1)` }}>
                                                02
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <p>
                                                They don’t have reliable source to guide them to
                                                make right decision while selling the produce.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="sellerBuyerPoints">
                                        <Col span={4}>
                                            <div style={{ background: `rgb(247, 104, 43,0.1)` }}>
                                                03
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <p>Sellers don’t get a fair price for their produce.</p>
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                            <Col className="buyerBox inside">
                                <Row className="headText">
                                    <p className="span-text">{t('aim_page.text7')}</p>
                                    <p>{t('aim_page.text8')}</p>
                                </Row>
                                <Row className="CImage">
                                    <img
                                        src={PriceDiscovery}
                                        alt="PriceDiscovery"
                                    />
                                </Row>
                                <Row className="pointsSection">
                                    <Row className="sellerBuyerPoints">
                                        <Col span={4}>
                                            <div
                                                style={{
                                                    background: `rgb(245, 163, 26, 0.1)`,
                                                    color: '#F5A31A',
                                                }}
                                            >
                                                01
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <p>
                                                Many middle men in the supply chain.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="sellerBuyerPoints">
                                        <Col span={4}>
                                            <div
                                                style={{
                                                    background: `rgb(245, 163, 26, 0.1)`,
                                                    color: '#F5A31A',
                                                }}
                                            >
                                                02
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <p>
                                                Lack of quality options to find right seller.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="sellerBuyerPoints">
                                        <Col span={4}>
                                            <div
                                                style={{
                                                    background: `rgb(245, 163, 26, 0.1)`,
                                                    color: '#F5A31A',
                                                }}
                                            >
                                                03
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <p>Unstructured agri ecosystem</p>
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    <div className="line21">
                        <img src={line21}></img>
                    </div>
                    <Text className = 'addressText'>To address the above issues</Text>
                    <Row className = 'adressAboveIsusse'>
                        <Text className = 'addressBriefText '>
                            We have developed a platform called
                            <span>“VikasBandhu”</span>. VikasBandhu is a technology enabled agriculture emarket
                            place with an end-to-end solution helping the farming community to make
                            informed decisions enabled by Farmer as a Service (FAAS) drivers.
                        </Text>
                    </Row>
                    <LandingDivider className="pageDivider" />
                    {/* <p className='manyMore'>{t('aim_page.text18')}</p>
                    <hr className='solid'></hr> */}
                    {/* <p className="seventhBox">{t('aim_page.text19')}</p>

                    {/* /** This should be visible only in desktop/ tab */}
                    {/* <Row className="advantageBadges">
                        <Col span={6} xs={0} md={6}>
                            <img src={PriceDiscovery} alt="PriceDiscovery" />
                        </Col>
                        <Col span={6} xs={0} md={6}>
                            <img src={BestMatch} alt="BestMatch" />
                        </Col>
                        <Col span={6} xs={0} md={6}>
                            <img src={DirectTrade} alt="DirectTrade" />
                        </Col>
                        <Col span={6} xs={0} md={6}>
                            <img src={BestPrice} alt="BestPrice" />
                        </Col>
                    </Row> */}
                    {/* <Row justify="space-between" className="advantageBadges-1">
                        <Col span={12} xs={0} md={12}>
                            <img src={FarmToDoor} alt="FarmToDoor" />
                        </Col>
                        <Col span={12} xs={0} md={12}>
                            <img src={FarmerAsService} alt="FarmerAsService" />
                        </Col>
                    </Row> */}
                    {/* <Row className="advantageBadges">
                        <Col span={6} xs={12} md={0}>
                            <img src={PriceDiscovery} alt="PriceDiscovery" />
                        </Col>
                        <Col span={6} xs={12} md={0}>
                            <img src={BestMatch} alt="BestMatch" />
                        </Col>
                        <Col span={6} xs={12} md={0}>
                            <img src={DirectTrade} alt="DirectTrade" />
                        </Col>
                        <Col span={6} xs={12} md={0}>
                            <img src={BestPrice} alt="BestPrice" />
                        </Col>
                        <Col span={6} xs={12} md={0}>
                            <img src={FarmToDoor} alt="FarmToDoor" />
                        </Col>
                        <Col span={6} xs={12} md={0}>
                            <img src={FarmerAsService} alt="FarmerAsService" />
                        </Col>
                    </Row> */}
                    {/* <p className="ninethBox">{t('aim_page.text20')}</p>
                    <Row className="tenthBox">
                        <Col span={8} xs={12} md={8}>
                            <p className="firstheading">{t('aim_page.text21')}</p>
                            <p>{t('aim_page.text22')}</p>
                        </Col>
                        <Col span={8} xs={12} md={8}>
                            <p className="firstheading">{t('aim_page.text23')}</p>
                            <p>{t('aim_page.text24')}</p>
                        </Col>
                        <Col span={8} xs={12} md={8}>
                            <p className="firstheading">{t('aim_page.text25')}</p>
                            <p>{t('aim_page.text26')}</p>
                        </Col>
                    </Row>  */}
                    
                </div>
            </div>
        </>
    );
};

export default Aim;
