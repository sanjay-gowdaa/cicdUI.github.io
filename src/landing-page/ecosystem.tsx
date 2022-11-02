import React, { useRef, useState } from 'react';
import { Typography, Row, Col, Carousel, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import SmallDivider from '../static/assets/Line 24.png';
import KycImage from '../static/assets/kyc 1.png';
import DashboardImage from '../static/assets/monitor 1.png';
import ProduceImage from '../static/assets/wheat 1.png';
import BarCImage from '../static/assets/bar-chart 1.png';
import HelpImage from '../static/assets/help 1.png';
import Inumber1 from '../static/assets/Ellipse 26.png';
import Inumber2 from '../static/assets/Ellipse 26 (1).png';
import Inumber3 from '../static/assets/Ellipse 26 (2).png';
import Inumber4 from '../static/assets/Ellipse 26 (3).png';
import IScreen1 from '../static/assets/Rectangle 224.png';
import IScreen2 from '../static/assets/Rectangle 225.png';
import IScreen3 from '../static/assets/Rectangle 226.png';
import IScreen4 from '../static/assets/Rectangle 227.png';
import farmToDoor from '../static/assets/Group 247.png';
import priceDiscovery from '../static/assets/agronomy.png';
import bestMatch from '../static/assets/connection.png';
import best from '../static/assets/best.png';
import GreenVerticalLine from '../static/assets/Rectangle 229.png';
import firstImage from '../static/assets/Rectangle 238.png';
import secondImage from '../static/assets/Rectangle 234.png';
import thirdImage from '../static/assets/Rectangle 235.png';
import fourthImage from '../static/assets/Rectangle 239.png';

import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';
import { LandingDivider } from '../app-components/landingDivider';

const { Text } = Typography;

const Ecosystem = () => {
    const [isShow, setIsShow]: any = useState(false);
    const [data, setData]: any = useState();
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;
    const ref = useRef<null | HTMLDivElement>(null);

    const ecoSystemData = [
        {
            key: 1,
            imageSrc: `${KycImage}`,
            text1: `${t('ecosystem_page.text2')}`,
            text2: `${t('ecosystem_page.text3')}`,
        },
        {
            key: 2,
            imageSrc: `${DashboardImage}`,
            text1: `${t('ecosystem_page.text4')}`,
            text2: `${t('ecosystem_page.text5')}`,
        },
        {
            key: 3,
            imageSrc: `${ProduceImage}`,
            text1: `${t('ecosystem_page.text6')}`,
            text2: `${t('ecosystem_page.text7')}`,
        },
        {
            key: 4,
            imageSrc: `${BarCImage}`,
            text1: `${t('ecosystem_page.text8')}`,
            text2: `${t('ecosystem_page.text9')}`,
        },
        {
            key: 5,
            imageSrc: `${HelpImage}`,
            text1: `${t('ecosystem_page.text10')}`,
            text2: `${t('ecosystem_page.text11')}`,
        },
    ];

    const showData = () => {
        if (data == 'firstClick') {
            return (
                <>
                    <img src={firstImage} className="OnHoverImage"></img>
                    <p className="OnHoverPara">
                        We have a Full Mile Solution covering Logisitcs, Transit Insurance
                        and,Digital payments options to ensure solutions at the door step.
                    </p>
                </>
            );
        }
        if (data === 'secondClick') {
            return (
                <>
                    <img src={secondImage} className="OnHoverImage"></img>
                    <p className="OnHoverPara">
                        Provides real time price indices for Agri produce with prior trends. Data
                        collected from both Government and Private Sources- common needed reference
                        for Farmers or SHGs to determine local prices for their produce post
                        harvest- as an independent reliable source at a Mandi level. Discovery is
                        the first step to make informed decisions - driven by Big Data.
                    </p>
                </>
            );
        }
        if (data === 'thirdClick') {
            return (
                <>
                    <img src={thirdImage} className="OnHoverImage"></img>
                    <p className="OnHoverPara">
                        The existing solutions for connecting the Producers/Buyers is via Bidding or
                        a Manual connect. It is not optimized which results in a poor
                        connection-transaction ratio which is less than 5%. This is one of the
                        reasons the market places today work at a broad view covering Agri Inputs
                        and Farm machinery renting as well - with a slogan we also Sell. Our focus
                        is to go vertical and address this complex issue. Our proprietary AUTO RANK
                        algorithm ensures a DIRECT connection between the buyer and seller based on
                        multiple parameters enabling a better price realization at first attempt.
                    </p>
                </>
            );
        }
        if (data === 'fourthClick') {
            return (
                <>
                    <img src={fourthImage} className="OnHoverImage"></img>
                    <p className="OnHoverPara">
                        Voice Enabled Solutions - Voice enabled commerce will help the rural
                        producers to transact without the need of the conventional User Interface .
                        This will help the local/rural Producers/consumers who may not be conversant
                        with the Rich/Heavy UI based application interface. Sell /Hold Decisions -
                        It allows Futuristic Prediction to help us provide HOLD/SELL decisions to
                        producers ( driven by Big Data ,AI).The Hold decisions to gain benefit are
                        enabled as a full solution with means to store in warehouses (using Block
                        chain).
                    </p>
                </>
            );
        }
    };

    const setIntoPosition = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    };

    return (
        <div id="ecosystem">
            <div className="ecosystem-wrapper">
                <Text className={`Solution ${customStyles.ecosystemTitle}`}>Solution</Text>
                <div className="technologyDiffereniator">
                    <Text className="headinginfirstsec">
                        Technology Differentiaters of VikasBandhu
                    </Text>
                    <div className="technologyBoxes">
                        <Tooltip placement="right" title="click to know more">
                            <div
                                className="firstBox"
                                onClick={() => {
                                    setData('firstClick');
                                    setIsShow(true);
                                    setIntoPosition();
                                }}
                            >
                                <div className="topImage">
                                    <img src={farmToDoor} />
                                </div>
                                <Text className="inner-text">Farm - to - Door</Text>
                                <ul>
                                    <li>Could First Approach</li>
                                    <li>SAAS - Agri Marketplace</li>
                                    <li>100% DIgital Payments</li>
                                    <li>Transport + Logisticts covered</li>
                                </ul>
                            </div>
                        </Tooltip>
                        <Tooltip placement="right" title="click to know more">
                            <div
                                className="secondBox"
                                onClick={() => {
                                    setData('secondClick');
                                    setIsShow(true);
                                    setIntoPosition();
                                }}
                            >
                                <div className="topImage">
                                    <img src={priceDiscovery} />
                                </div>
                                <Text className="inner-text">Price Discovery</Text>
                                <ul>
                                    <li>
                                        Provides the price reference enabled with Trends and
                                        Predictions
                                    </li>
                                    <li>Driven by Big Data and AI</li>
                                    <li>Enables Sell, Hold decisions</li>
                                </ul>
                            </div>
                        </Tooltip>
                        <Tooltip placement="right" title="click to know more">
                            <div
                                className="thirdBox"
                                onClick={() => {
                                    setData('thirdClick');
                                    setIsShow(true);
                                    setIntoPosition();
                                }}
                            >
                                <div className="topImage">
                                    <img src={bestMatch} />
                                </div>
                                <Text className="inner-text">Best Match</Text>
                                <ul>
                                    <li>Proprietary Rank Algorithm</li>
                                    <li>
                                        Smart System connects right seller with buyer automatically
                                    </li>
                                    <li>Enables a Better Coonection to Transaction Ration</li>
                                </ul>
                            </div>
                        </Tooltip>
                        <Tooltip placement="right" title="click to know more">
                            <div
                                className="fourthBox"
                                onClick={() => {
                                    setData('fourthClick');
                                    setIsShow(true);
                                    setIntoPosition();
                                }}
                            >
                                <div className="topImage">
                                    <img src={best} />
                                </div>
                                <Text className="inner-text">Informed Decisions (FAAS)</Text>
                                <ul>
                                    <li>Price Prediction</li>
                                    <li>Cost Analysis</li>
                                    <li>Credility of buyers/ crops</li>
                                    <li>External linkages enabled by blockchain</li>
                                    <li>Voice Enabled Solutions</li>
                                </ul>
                            </div>
                        </Tooltip>
                    </div>
                    <Row className="Phone-view">
                        <Col span={24} xs={24} md={0}>
                            <Carousel autoplay dots={false} fade>
                                <div>
                                    <div
                                        className="firstBox"
                                        onClick={() => {
                                            setData('firstClick');
                                            setIsShow(true);
                                        }}
                                    >
                                        <div className="topImage">
                                            <img src={farmToDoor} />
                                        </div>
                                        <Text className="inner-text">Farm - to - Door</Text>
                                        <ul>
                                            <li>Could First Approach</li>
                                            <li>SAAS - Agri Marketplace</li>
                                            <li>100% DIgital Payments</li>
                                            <li>Transport + Logisticts covered</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="secondBox"
                                        onClick={() => {
                                            setData('secondClick');
                                            setIsShow(true);
                                        }}
                                    >
                                        <div className="topImage">
                                            <img src={priceDiscovery} />
                                        </div>
                                        <Text className="inner-text">Price Discovery</Text>
                                        <ul>
                                            <li>
                                                Provides the price reference enabled with Trends and
                                                Predictions
                                            </li>
                                            <li>Driven by Big Data and AI</li>
                                            <li>Enables Sell, Hold decisions</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="thirdBox"
                                        onClick={() => {
                                            setData('thirdClick');
                                            setIsShow(true);
                                        }}
                                    >
                                        <div className="topImage">
                                            <img src={bestMatch} />
                                        </div>
                                        <Text className="inner-text">Best Match</Text>
                                        <ul>
                                            <li>Proprietary Rank Algorithm</li>
                                            <li>
                                                Smart System connects right seller with buyer
                                                automatically
                                            </li>
                                            <li>
                                                Enables a Better Coonection to Transaction Ration
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="fourthBox"
                                        onClick={() => {
                                            setData('fourthClick');
                                            setIsShow(true);
                                        }}
                                    >
                                        <div className="topImage">
                                            <img src={best} />
                                        </div>
                                        <Text className="inner-text">
                                            Informed Decisions (FAAS)
                                        </Text>
                                        <ul>
                                            <li>Price Prediction</li>
                                            <li>Cost Analysis</li>
                                            <li>Credility of buyers/ crops</li>
                                            <li>External linkages enabled by blockchain</li>
                                            <li>Voice Enabled Solutions</li>
                                        </ul>
                                    </div>
                                </div>
                            </Carousel>
                        </Col>
                    </Row>
                    <div className="OnhoverDisplay">
                        <div ref={ref} className="OnHoverContentBox">
                            {isShow ? (
                                showData()
                            ) : (
                                <>
                                    <img src={firstImage} className="OnHoverImage"></img>
                                    <p className="OnHoverPara">
                                        We have a Full Mile Solution covering Logisitcs, Transit
                                        Insurance and,Digital payments options to ensure solutions
                                        at the door step.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div id="howVikasbandhuworks" className="howVikasbandhuworks">
                    <Text className={`firstHead ${customStyles.ecosystemTitle}`}>
                        {t('ecosystem_page.firstHead')}
                    </Text>
                    {/* this is only for md */}
                    <div className="container-Phone">
                        <div className="iPhoneContainer">
                            <img className="phoneScreen" src={IScreen1} alt="" />
                            <div>
                                <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                <p>{t('ecosystem_page.text12')}</p>
                            </div>
                        </div>
                        <div className="iPhoneContainer">
                            <img className="phoneScreen" src={IScreen2} alt="" />
                            <div>
                                <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                <p>{t('ecosystem_page.text13')}</p>
                            </div>
                        </div>
                        <div className="iPhoneContainer">
                            <img className="phoneScreen" src={IScreen3} alt="" />
                            <div>
                                <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                <p>{t('ecosystem_page.text14')}</p>
                            </div>
                        </div>
                        <div className="iPhoneContainer">
                            <img className="phoneScreen" src={IScreen4} alt="" />
                            <div>
                                <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                <p>{t('ecosystem_page.text15')}</p>
                            </div>
                        </div>
                    </div>
                    <Row className="iphone-screen-mobile">
                        <Col span={24} xs={24} md={0}>
                            <Carousel autoplay dots={false}>
                                <div>
                                    <img src={Inumber1} alt="" />
                                    <img className="phoneScreen" src={IScreen1} alt="" />
                                    <div>
                                        <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                        <p>{t('ecosystem_page.text12')}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={Inumber2} alt="" />
                                    <img className="phoneScreen" src={IScreen2} alt="" />
                                    <div>
                                        <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                        <p>{t('ecosystem_page.text13')}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={Inumber3} alt="" />
                                    <img className="phoneScreen" src={IScreen3} alt="" />
                                    <div>
                                        <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                        <p>{t('ecosystem_page.text14')}</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={Inumber4} alt="" />
                                    <img className="phoneScreen" src={IScreen4} alt="" />
                                    <div>
                                        <img src={GreenVerticalLine} alt="GreenVerticalLine" />
                                        <p>{t('ecosystem_page.text15')}</p>
                                    </div>
                                </div>
                            </Carousel>
                        </Col>
                    </Row>
                    <img className="smallDivider" src={SmallDivider} alt="smallDivider" />
                    <p className="keyFeatures">{t('ecosystem_page.text1')}</p>
                    <div className="lastContent-ecosystem">
                        <div className="lastContentWeb">
                            {ecoSystemData.map((item: any) => {
                                return (
                                    <div className="lastContentBadges">
                                        <div>
                                            <img src={item.imageSrc} alt="image" />
                                        </div>
                                        <p className="insideText">{item.text1}</p>
                                        <p className="outerText">{item.text2}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <Col span={24} xs={24} md={0}>
                            <Carousel autoplay dots={false} fade>
                                <div>
                                    <div className="lastContentBadges">
                                        <div>
                                            <img src={KycImage} alt="image" />
                                        </div>
                                        <p className="insideText">{t('ecosystem_page.text2')}</p>
                                        <p className="outerText">{t('ecosystem_page.text3')}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="lastContentBadges">
                                        <div>
                                            <img src={DashboardImage} alt="image" />
                                        </div>
                                        <p className="insideText">{t('ecosystem_page.text4')}</p>
                                        <p className="outerText">{t('ecosystem_page.text5')}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="lastContentBadges">
                                        <div>
                                            <img src={ProduceImage} alt="image" />
                                        </div>
                                        <p className="insideText">{t('ecosystem_page.text6')}</p>
                                        <p className="outerText">{t('ecosystem_page.text7')}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="lastContentBadges">
                                        <div>
                                            <img src={BarCImage} alt="image" />
                                        </div>
                                        <p className="insideText">{t('ecosystem_page.text8')}</p>
                                        <p className="outerText">{t('ecosystem_page.text9')}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="lastContentBadges">
                                        <div>
                                            <img src={HelpImage} alt="image" />
                                        </div>
                                        <p className="insideText">{t('ecosystem_page.text10')}</p>
                                        <p className="outerText">{t('ecosystem_page.text11')}</p>
                                    </div>
                                </div>
                            </Carousel>
                        </Col>
                    </div>
                </div>
                <div id="BestPracticesContainer" className="BestPracticesContainer">
                    <Text className="BestPracticesText">Best Solution Practises</Text>
                    <div className=" theInsideBest">
                        <Text>
                            It is a Cloud first based application running on AWS (Amazon Web
                            Services)
                        </Text>
                        <ul>
                            <li>
                                Driven by Market research for 6 months and UX design to ensure that
                                the application was optimized and easy to use
                            </li>
                            <li>
                                Front End UI application development is enabled by the latest
                                frameworks (React /Redux)
                            </li>
                            <li>
                                Backend is enabled with microservices/serverless framework powered
                                by Node Js/Python
                            </li>
                            <li>
                                Test Automation driven by Selenium (for Browser ) and Appium ( for
                                Android)
                            </li>
                        </ul>
                    </div>
                    <Text className="inAdditionText">in addition, we</Text>
                    <div className="inAdditionContent">
                        <div className="inAdditionWeb">
                            <div className="insideContainer">
                                <div>
                                    <Text className="insideText">Provide Expert Help</Text>
                                    <p className="insidePara">
                                        Help from local agro experts to help during trade
                                    </p>
                                </div>
                            </div>
                            <div className="insideContainer">
                                <div>
                                    <Text className="insideText">Provide Local Employment</Text>
                                    <p className="insidePara">
                                        Boost rural economy by providing local employment.
                                    </p>
                                </div>
                            </div>
                            <div className="insideContainer">
                                <div>
                                    <Text className="insideText">Work with Government</Text>
                                    <p className="insidePara">
                                        Partnering with Government's vision
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="inAdditionPhone">
                            <Col span={24} xs={24} md={0}>
                                <Carousel autoplay dots={false}>
                                    <div>
                                        <div className="insideContainer">
                                            <div>
                                                <Text className="insideText">
                                                    Provide Expert Help
                                                </Text>
                                                <p className="insidePara">
                                                    Help from local agro experts to help during
                                                    trade
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="insideContainer">
                                            <div>
                                                <Text className="insideText">
                                                    Provide Local Employment
                                                </Text>
                                                <p className="insidePara">
                                                    Boost rural economy by providing local
                                                    employment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="insideContainer">
                                            <div>
                                                <Text className="insideText">
                                                    Work with Government
                                                </Text>
                                                <p className="insidePara">
                                                    Partnering with Government's vision
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel>
                            </Col>
                        </div>
                    </div>
                </div>
                <LandingDivider className="pageDivider" />
            </div>
        </div>
    );
};

export default Ecosystem;
