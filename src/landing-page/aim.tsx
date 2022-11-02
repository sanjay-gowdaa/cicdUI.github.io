import React from 'react';
import { Carousel, Col, Row, Typography } from 'antd';

import { useTranslation } from 'react-i18next';

import PriceDiscovery from '../static/assets/Rectangle 234.png';
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
                        <Col md={12} className="aim-Whatis">
                            <Title className="aim-header">{t('aim_page.text1')}</Title>
                            <p>{t('aim_page.text2')}</p>
                        </Col>
                        <Col md={12} className="videoContent">
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

                    <div className="ExistingMarketPlaces">
                        <Row className="firstBox">
                            <Text className="firstBoxHeading">Existing Market Places </Text>
                            <Text className="subHead">
                                Per MARKET RESEARCH , No Dedicated Post Harvest (Agri Output)
                                Marketplaces available today.
                            </Text>
                        </Row>
                        <Row className="secondBox">
                            <Col xs={24} md={4} xl={4} span={4} className="existingPicture">
                                <img
                                    style={{ width: '88px', height: '88px' }}
                                    src={PriceDiscovery}
                                    alt="PriceDiscovery"
                                />
                            </Col>
                            <Col xs={24} md={20} xl={20} span={20} className="insidePara">
                                <Row className="insideRows">
                                    <Col span={4} className="points">
                                        <div style={{ background: 'rgba(255, 62, 62, 0.1)' }}>
                                            01
                                        </div>
                                    </Col>
                                    <Col span={20}>
                                        <p>
                                            The existing Market places uses Bid or Manual connect
                                            method between Sellers and Farmers
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="insideRows">
                                    <Col span={4} className="points">
                                        <div style={{ background: 'rgba(255, 62, 62, 0.1)' }}>
                                            02
                                        </div>
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
                                        <div style={{ background: 'rgba(255, 62, 62, 0.1)' }}>
                                            03
                                        </div>
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
                        <div className="mdScreen">
                            <Row className="BuyerSellerAdvantage">
                                <Col className="sellerBox inside">
                                    <Row className="headText">
                                        <p className="span-text">{t('aim_page.text5')}</p>
                                        <p>{t('aim_page.text6')}</p>
                                    </Row>
                                    <Row className="CImage">
                                        <img src={PriceDiscovery} alt="PriceDiscovery" />
                                    </Row>
                                    <Row className="pointsSection">
                                        <Row className="sellerBuyerPoints">
                                            <Col span={4}>
                                                <div
                                                    style={{ background: `rgb(247, 104, 43,0.1)` }}
                                                >
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
                                                <div
                                                    style={{ background: `rgb(247, 104, 43,0.1)` }}
                                                >
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
                                                <div
                                                    style={{ background: `rgb(247, 104, 43,0.1)` }}
                                                >
                                                    03
                                                </div>
                                            </Col>
                                            <Col span={20}>
                                                <p>
                                                    Sellers don’t get a fair price for their
                                                    produce.
                                                </p>
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
                                        <img src={PriceDiscovery} alt="PriceDiscovery" />
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
                                                <p>Many middle men in the supply chain.</p>
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
                                                <p>Lack of quality options to find right seller.</p>
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
                        <div className="mobileBuyerSellerRow">
                            <Col span={24} xs={24} sm={24} md={0}>
                                <Row className="BuyerSellerAdvantage">
                                    <Carousel autoplay dots={true}>
                                        <div>
                                            <div className="sellerBox inside">
                                                <Row className="headText">
                                                    <p className="span-text">
                                                        {t('aim_page.text5')}
                                                    </p>
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
                                                            <div
                                                                style={{
                                                                    background: `rgb(247, 104, 43,0.1)`,
                                                                    color:'#F6682B'
                                                                }}
                                                            >
                                                                01
                                                            </div>
                                                        </Col>
                                                        <Col span={20}>
                                                            <p>
                                                                <b>M</b>ajority of farmers are tenant
                                                                farmers, i.e they farm on land owned
                                                                by others and pay rent to the owner.
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="sellerBuyerPoints">
                                                        <Col span={4}>
                                                            <div
                                                                style={{
                                                                    background: `rgb(247, 104, 43,0.1)`,
                                                                    color:'#F6682B'
                                                                }}
                                                            >
                                                                02
                                                            </div>
                                                        </Col>
                                                        <Col span={20}>
                                                            <p>
                                                                <b>T</b>hey don’t have reliable source to
                                                                guide them to make right decision
                                                                while selling the produce.
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className="sellerBuyerPoints">
                                                        <Col span={4}>
                                                            <div
                                                                style={{
                                                                    background: `rgb(247, 104, 43,0.1)`,
                                                                    color:'#F6682B'
                                                                }}
                                                            >
                                                                03
                                                            </div>
                                                        </Col>
                                                        <Col span={20}>
                                                            <p>
                                                                <b>S</b>ellers don’t get a fair price for
                                                                their produce.
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </Row>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="buyerBox inside">
                                                <Row className="headText">
                                                    <p className="span-text">
                                                        {t('aim_page.text7')}
                                                    </p>
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
                                                                <b>M</b>any middle men in the supply chain.
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
                                                                <b>L</b>ack of quality options to find
                                                                right seller.
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
                                                            <p><b>U</b>nstructured agri ecosystem</p>
                                                        </Col>
                                                    </Row>
                                                </Row>
                                            </div>
                                        </div>
                                    </Carousel>
                                </Row>
                            </Col>
                        </div>
                    </div>

                    <div className="line21">
                        <img src={line21}></img>
                    </div>
                    <Text className="addressText">To address the above issues</Text>
                    <Row className="adressAboveIsusse">
                        <Text className="addressBriefText ">
                            We have developed a platform called
                            <span>“VikasBandhu”</span>. VikasBandhu is a technology enabled
                            agriculture emarket place with an end-to-end solution helping the
                            farming community to make informed decisions enabled by Farmer as a
                            Service (FAAS) drivers.
                        </Text>
                    </Row>
                    <LandingDivider className="pageDivider" />
                </div>
            </div>
        </>
    );
};

export default Aim;
