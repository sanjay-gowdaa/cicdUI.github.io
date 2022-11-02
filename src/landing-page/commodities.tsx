import React from 'react';
import { Carousel, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import StapleCrops from '../static/assets/Rectangle 97.png';
import Pulses from '../static/assets/Rectangle 98.png';
import CashCrops from '../static/assets/Rectangle 99.png';
import Spices from '../static/assets/Rectangle 100.png';
import OilSeeds from '../static/assets/Rectangle 101.png';
import { LandingDivider } from '../app-components/landingDivider';

const { Paragraph, Title } = Typography;

const Commodities = () => {
    const { t } = useTranslation('common');

    return (
        <div id="commodities">
            <div className="commodities-wrapper">
                <Title className="commoditiesTitle">{t('commodities_page.title')}</Title>
                <Paragraph className="commoditiesParagraph">
                    {t('commodities_page.paragraph')}
                </Paragraph>
                <div className="CropImages_sec">
                    <div className="CropImagesWeb">
                        <div>
                            <img src={StapleCrops} alt="StapleCrops" />
                            <p>{t('commodities_page.commodities_name.1')}</p>
                        </div>
                        <div>
                            <img src={Pulses} alt="Pulses" />
                            <p>{t('commodities_page.commodities_name.2')}</p>
                        </div>
                        <div>
                            <img src={CashCrops} alt="CashCrops" />
                            <p>{t('commodities_page.commodities_name.3')}</p>
                        </div>
                        <div>
                            <img src={Spices} alt="Spices" />
                            <p>{t('commodities_page.commodities_name.4')}</p>
                        </div>
                        <div>
                            <img src={OilSeeds} alt="OilSeeds" />
                            <p>{t('commodities_page.commodities_name.5')}</p>
                        </div>
                    </div>
                    <Col span={24} xs={24} md={0}>
                        <Carousel autoplay dots={true} fade>
                            <div>
                                <div>
                                    <img src={StapleCrops} alt="StapleCrops" />
                                    <p>{t('commodities_page.commodities_name.1')}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Pulses} alt="Pulses" />
                                    <p>{t('commodities_page.commodities_name.2')}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={CashCrops} alt="CashCrops" />
                                    <p>{t('commodities_page.commodities_name.3')}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={Spices} alt="Spices" />
                                    <p>{t('commodities_page.commodities_name.4')}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src={OilSeeds} alt="OilSeeds" />
                                    <p>{t('commodities_page.commodities_name.5')}</p>
                                </div>
                            </div>
                        </Carousel>
                    </Col>
                </div>
                <LandingDivider className="pageDivider" />
            </div>
        </div>
    );
};

export default Commodities;
