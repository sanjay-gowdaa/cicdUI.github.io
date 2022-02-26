import React, { useState } from 'react';
import { Card, Col, Image, Modal, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import firstImage from "../static/assets/Path 37.png";

import Connect from '../static/assets/connection.svg';
import Direct from '../static/assets/transmission.svg';
import BestPrize from '../static/assets/best.svg';
import LiveInfo from '../static/assets/agronomy.svg';
import Mission from '../static/assets/mission.svg';
import Handshake from '../static/assets/handshake.svg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Link, Text, Title } = Typography;

const Aim = () => {
    const [viewVideo, setVideo] = useState(false);
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    return (
        <div id='aim'>
            <div className='aim-wrapper'>
                <div className='lastContent'>
                    <div>
                        <div>What is VikasBandhu?</div>
                        <p>VikasBandhu is a technology enabled agriculture free e-market place for a willing buyer and seller to make informed decisions.  It is aimed to help the buyers and sellers (Farmer self-help groups) to connect, engage and transact for win-win relationships</p>
                    </div>
                    <div className='videoContent'>
                        <iframe className='videoContent' width="600" height="300" src="https://www.youtube.com/embed/p4CZAGgJ-wM">
                        </iframe>
                    </div>
                </div>
                <div className='aimHead'>
                    <p>Why VikasBandhu?</p>
                </div>
                <div className='aimSecondHead'>
                    <p>At present, sellers and buyers face many issues while trading</p>
                </div>
                <div className='seller-buyer-tag'>
                    <p><span>Sellers</span> (Farmer community, FPOs & Societies, Mills, Storage units/ Agents)</p>
                    <p><span>Buyers</span> (Whole, Food Industries, Processors, Institutions)</p>
                </div>
                <div className='seller-buyer-advantage'>
                    <div>
                        <div className='seller-buyer-points'>
                            <div>01</div>
                            <p>Majority of farmers are tenant farmers, i.e they farm on land owned by others and pay rent to the owner.</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>02</div>
                            <p>They don’t have reliable source to guide them to make right decision while selling the produce.</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>03</div>
                            <p>Sellers don’t get a fair price for their produce.</p>
                        </div>

                    </div>
                    <div>
                        <div className='seller-buyer-points'>
                            <div>04</div>
                            <p>Limited capabilites to process their produce.</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>05</div>
                            <p>Less to no information on current market.</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>06</div>
                            <p>And other issues such as very limited reach, time constraints to sell, limited financial resource</p>
                        </div>

                    </div>
                    <div>
                        <div className='seller-buyer-points'>
                            <div>01</div>
                            <p>Many middle men in the supply chain.</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>02</div>
                            <p>Lack of quality options to find right seller.</p>
                        </div>
                        <div className='seller-buyer-points'>
                            <div>03</div>
                            <p>Unstructured agri ecosystem</p>
                        </div>

                    </div>
                </div>

                <p className='manyMore'>and many more...</p>
                <hr className='solid'></hr>
                <p className='seventhBox'>To address the above issues, at VikasBandhu, we are building an ecosystem to ensure</p>
                <div className='eigthBox'>
                    <div className='insideBox'>
                        <div className='firstBoxes'>
                            <div>
                                <img src={firstImage}></img>
                                <p>Best Match</p>
                            </div>
                            <p>Connecting right sellers and buyers</p>
                        </div>
                        <div className='firstBoxes'>
                            <div>
                                <img src={firstImage}></img>
                                <p>Direct Trade</p>
                            </div>
                            <p>Direct selling and buying of agricultural produce</p>
                        </div>
                        <div className='firstBoxes'>
                            <div>
                                <img src={firstImage}></img>
                                <p>Best Price</p>
                            </div>
                            <p>Ensuring best price for both buyer and seller</p>
                        </div>
                        <div className='firstBoxes'>
                            <div>
                                <img src={firstImage}></img>
                                <p>Online Transaction</p>
                            </div>
                            <p>100% digital transactions with full clarity</p>
                        </div>
                    </div>
                    <div className='insideBox'>
                        <div className='firstBoxes'>
                            <div>
                                <img src={firstImage}></img>
                                <p>Live Info</p>
                            </div>
                            <p>Providing live information on pricing for study</p>
                        </div>
                        <div className='firstBoxes'>
                            <div>
                                <img src={firstImage}></img>
                                <p>Door - to - Door</p>
                            </div>
                            <p>Facilitate a Door-to-door solution of logistics</p>
                        </div>
                    </div>
                </div>
                <p className='ninethBox'>in addition, we </p>
                <div className='tenthBox'>
                    <div>
                        <p className='firstheading'>Provide Expert Help</p>
                        <p>Help from local agro experts to help during trade</p>
                    </div>
                    <div>
                        <p className='firstheading'>Provide Local Employment</p>
                        <p>Boost rural economy by providing local employment.</p>
                    </div>
                    <div>
                        <p className='firstheading'>Work with Government</p>
                        <p>Partnering with Government's vision</p>
                    </div>
                </div>
                <div className='divider'>
                    <hr className='solid'>
                    </hr>
                    <div className='wimage'></div>
                    <hr className='solid'>
                    </hr>
                </div>
            </div>
            {/* SINCE THIS IS AN EXTENDED POC I HAVE COMMENTED THE OLD CODE!!! */}
            {/* <Modal
                visible={viewVideo}
                onCancel={() => setVideo(!viewVideo)}
                width={'95%'}
                className='about-us-video-modal'
                maskClosable={true}
                footer={null}
            >
                <iframe
                    title='about-us-video'
                    width='95%'
                    height='100%'
                    src='https://www.youtube.com/embed/p4CZAGgJ-wM?playlist=p4CZAGgJ-wM&loop=1&autoplay=1&mute=1'
                    allowFullScreen
                />
            </Modal>
            <Title className={`col-green ${customStyles.aimTitle}`}>{t('aim_page.title')}</Title>
            <img className='handshake-image' src={Handshake} alt='handshake' />
            <div className='aim-card-view'>
                <Row className='aim-card-row'>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Connect} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <div className='text'>
                                <Text className='col-white card-text'>{t('aim_page.aim_card_1')}</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Direct} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_2')}</Text>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={LiveInfo} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_3')}</Text>
                        </Card>
                    </Col>
                </Row>
                <Row className='aim-card-row mobile-display-none'>
                    <Col span={8} className='card-col'>
                        <Card className={`aim-card-two ${customStyles.aimCard}`}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={BestPrize} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_4')}</Text>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={customStyles.aimCard}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Connect} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <div className='text'>
                                <Text className='col-white card-text'>{t('aim_page.aim_card_5')}</Text>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} className='card-col'>
                        <Card className={`aim-card-two ${customStyles.aimCard}`}>
                            <div className='hex1'></div>
                            <div className='hex2'>
                                <Image className='icon-inside-hex' src={Mission} preview={false} />
                            </div>
                            <div className='hex3'></div>
                            <Text className='col-white card-text'>{t('aim_page.aim_card_6')}</Text>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Text className={customStyles.aimVideoLink}>{t('aim_page.video_link')} &nbsp;
                <Link onClick={() => setVideo(true)} style={{ textDecoration: 'underline' }}>
                    {t('aim_page.link_name')}
                </Link>
                .
            </Text> */}
        </div>
    );
};

export default Aim;
