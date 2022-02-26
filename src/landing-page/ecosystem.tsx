import React from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import "./landingPage.css";
import line24 from '../static/assets/Line 24.png';
import kycImage from '../static/assets/kyc 1.png';
import dashboardImage from '../static/assets/monitor 1.png';
import produceImage from '../static/assets/wheat 1.png';
import barCImage from '../static/assets/bar-chart 1.png';
import helpImage from '../static/assets/help 1.png';

import Tractor from '../static/assets/tractor.svg';
import Network from '../static/assets/network.svg';
import Rupee from '../static/assets/rupee.svg';
import Sync from '../static/assets/sync.svg';
import Lorry from '../static/assets/lorry.svg';
import SocialCare from '../static/assets/social-care.svg';
import Nature from '../static/assets/nature.svg';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const { Text, Title } = Typography;

const Ecosystem = () => {
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    return (
        <div id='ecosystem'>
            <div className='ecosystem-wrapper'>
                <p className='firstHead'>How VikasBandhu work?</p>
                <div className='android-phone-section'>
                    <div className='Android-sec'>
                        <div>
                            <img></img>
                        </div>
                        <div className='Phone-sec'>
                            <div className='fsec'>
                                <div className='notificationLight'>
                                    <div></div>
                                </div>
                                <div className='speaker'></div>
                                <div className='camera'></div>
                            </div>
                            <div className='midsec'>
                                <div className='screen1'>

                                </div>
                            </div>
                            <div className='lastsec'>
                                <div className='rectangle'></div>
                                <div className='circle'></div>
                                <div className='triangle'></div>
                            </div>
                        </div>
                        {/* <div className='numCircle'>01</div> */}
                        {/* <div className='phoneSection-1'>
                    </div>
                    <div className='phone-text'>
                        <div></div>
                        <p>Seller and Buyers register with VikasBandhu by providing basic information and documents</p>
                    </div> */}
                    </div>
                    <div className='Android-sec'>
                        <div>
                            <img></img>
                        </div>
                        <div className='Phone-sec'>
                        <div className='fsec'>
                                <div className='notificationLight'>
                                    <div></div>
                                </div>
                                <div className='speaker'></div>
                                <div className='camera'></div>
                            </div>
                            <div className='midsec'>
                                <div className='screen2'></div>
                            </div>
                            <div className='lastsec'>
                                <div className='rectangle'></div>
                                <div className='circle'></div>
                                <div className='triangle'></div>
                            </div>
                        </div>
                        {/* <div className='numCircle'>02</div> */}
                        {/* <div className='phoneSection-2'>
                    </div>
                    <div className='phone-text'>
                        <div></div>
                        <p>After verification, the can add produce to sell or requirement to buy</p>
                    </div> */}
                    </div>
                    <div className='Android-sec'>
                        <div>
                            <img></img>
                        </div>
                        <div className='Phone-sec'>
                        <div className='fsec'>
                                <div className='notificationLight'>
                                    <div></div>
                                </div>
                                <div className='speaker'></div>
                                <div className='camera'></div>
                            </div>
                            <div className='midsec'>
                                <div className='screen3'></div>
                            </div>
                            <div className='lastsec'>
                                <div className='rectangle'></div>
                                <div className='circle'></div>
                                <div className='triangle'></div>
                            </div>
                        </div>
                        {/* <div className='numCircle'>03</div> */}
                        {/* <div className='phoneSection-3'>
                    </div>
                    <div className='phone-text'>
                        <div></div>
                        <p>Get best match from our best VikasBandhu matching system powered by AI</p>
                    </div> */}
                    </div>
                    <div className='Android-sec'>
                        <div>
                            <img></img>
                        </div>
                        <div className='Phone-sec'>
                        <div className='fsec'>
                                <div className='notificationLight'>
                                    <div></div>
                                </div>
                                <div className='speaker'></div>
                                <div className='camera'></div>
                            </div>
                            <div className='midsec'>
                                <div className='screen4'></div>
                            </div>
                            <div className='lastsec'>
                                <div className='rectangle'></div>
                                <div className='circle'></div>
                                <div className='triangle'></div>
                            </div>
                        </div>
                        {/* <div className='numCircle'>04</div> */}
                        {/* <div className='phoneSection-4'>
                    </div>
                    <div className='phone-text'>
                        <div></div>
                        <p>Start your trade and track full transaction with full transparency</p>
                    </div> */}
                    </div>
                    {/* <div className='Android-sec'>
                        <div>
                            <img></img>
                        </div>
                        <div className='Phone-sec'>
                        <div className='fsec'>
                                <div className='notificationLight'>
                                    <div></div>
                                </div>
                                <div className='speaker'></div>
                                <div className='camera'></div>
                            </div>
                            <div className='midsec'>
                                <div className=''></div>
                            </div>
                            <div className='lastsec'>
                                <div className='rectangle'></div>
                                <div className='circle'></div>
                                <div className='triangle'></div>
                            </div>
                        </div> */}
                        {/* <div className='numCircle'>05</div> */}
                        {/* <div className='phoneSection-5'>
                    </div>
                    <div className='phone-text'>
                        <div></div>
                        <p>Send and recieve payment with 100% online transaction once trade is complete</p>
                    </div> */}
                    {/* </div> */}
                </div>
                <img src={line24} />
                <p className='keyFeatures'>Key featues of VikasBandhu platform</p>
                <div className='lastContent-ecosystem'>
                    <div className='lastContentBadges'>
                        <div><img src={kycImage}></img></div>
                        <p className='insideText'>Simple KYC process</p>
                        <p className='outerText'>Easy and guided KYC process to verify account</p>
                    </div>
                    <div className='lastContentBadges'>
                        <div><img src={dashboardImage}></img></div>
                        <p className='insideText'>Dashboard</p>
                        <p className='outerText'>View all your produce, matches and transaction on user friendly dashboard</p>
                    </div>
                    <div className='lastContentBadges'>
                        <div><img src={produceImage}></img></div>
                        <p className='insideText'>Produce</p>
                        <p className='outerText'>We support wide verity of produce category</p>
                    </div>
                    <div className='lastContentBadges'>
                        <div><img src={barCImage}></img></div>
                        <p className='insideText'>Pricing Guide</p>
                        <p className='outerText'>Get information of latest market price for your produce</p>
                    </div>
                    <div className='lastContentBadges'>
                        <div><img src={helpImage}></img></div>
                        <p className='insideText'>Support</p>
                        <p className='outerText'>Reachout to your local expert for any help</p>
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
            {/* <Image className='tractor-image' src={Tractor} preview={false} />
            <div className={customStyles.ecosystemContent}>
                <Title className={`col-green ${customStyles.ecosystemTitle}`} level={2}>
                    {t('ecosystem_page.title')}
                </Title>
                <Space
                    direction='vertical'
                    className={customStyles.bulletinText}
                    style={{ height: '20rem' }}
                    size='small'
                >
                    <Text>
                        <Image style={{ paddingRight: '1rem' }} src={Network} preview={false} />
                        {t('ecosystem_page.text_1')}<br />
                    </Text>
                    <Text>
                        <Image style={{ paddingRight: '1rem' }} src={Rupee} preview={false} />
                        {t('ecosystem_page.text_2')}<br />
                    </Text>
                    <Text>
                        <Image style={{ paddingRight: '1.5rem' }} src={Sync} preview={false} />
                        {t('ecosystem_page.text_3')}<br />
                    </Text>
                    <Text>
                        <Image style={{ paddingRight: '1rem' }} src={Lorry} preview={false} />
                        {t('ecosystem_page.text_4')}<br />
                    </Text>
                    <Text>
                        <Image style={{ paddingRight: '1rem' }} src={SocialCare} preview={false} />
                        {t('ecosystem_page.text_5')}
                    </Text>
                </Space>
                <img className='nature-image' src={Nature} alt='nature' />
            </div> */}
        </div>
    );
};

export default Ecosystem;
