import React from 'react';
import { Typography, Row, Col } from 'antd';
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
import GreenVerticalLine from '../static/assets/Rectangle 229.png';

import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';
import { LandingDivider } from '../app-components/landingDivider';

const { Text } = Typography;

const Ecosystem = () => {
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;

    const ecoSystemData = [
        {
            key: 1,
            imageSrc: `${KycImage}`,
            text1: `${t('ecosystem_page.text2')}`,
            text2: `${t('ecosystem_page.text3')}`
        },
        {
            key: 2,
            imageSrc: `${DashboardImage}`,
            text1: `${t('ecosystem_page.text4')}`,
            text2: `${t('ecosystem_page.text5')}`
        },
        {
            key: 3,
            imageSrc: `${ProduceImage}`,
            text1: `${t('ecosystem_page.text6')}`,
            text2: `${t('ecosystem_page.text7')}`
        },
        {
            key: 4,
            imageSrc: `${BarCImage}`,
            text1: `${t('ecosystem_page.text8')}`,
            text2: `${t('ecosystem_page.text9')}`
        },
        {
            key: 5,
            imageSrc: `${HelpImage}`,
            text1: `${t('ecosystem_page.text10')}`,
            text2: `${t('ecosystem_page.text11')}`
        }
    ];

    return (
        <div id='ecosystem'>
            <div className='ecosystem-wrapper'>
                <Text className={`firstHead ${customStyles.ecosystemTitle}`}>{t('ecosystem_page.firstHead')}</Text>
                <Row wrap>
                    <Col span={6} xs={24} md={6}>
                        <img src={Inumber1} alt='' />
                        <img className='phoneScreen' src={IScreen1} alt='' />
                        <div>
                            <img src={GreenVerticalLine} alt='GreenVerticalLine' />
                            <p>{t('ecosystem_page.text12')}</p>
                        </div>
                    </Col>
                    <Col span={6} xs={24} md={6}>
                        <img src={Inumber2} alt='' />
                        <img className='phoneScreen' src={IScreen2} alt='' />
                        <div>
                            <img src={GreenVerticalLine} alt='GreenVerticalLine' />
                            <p>{t('ecosystem_page.text13')}</p>
                        </div>
                    </Col>
                    <Col span={6} xs={24} md={6}>
                        <img src={Inumber3} alt='' />
                        <img className='phoneScreen' src={IScreen3} alt='' />
                        <div>
                            <img src={GreenVerticalLine} alt='GreenVerticalLine' />
                            <p>{t('ecosystem_page.text14')}</p>
                        </div>
                    </Col>
                    <Col span={6} xs={24} md={6}>
                        <img src={Inumber4} alt='' />
                        <img className='phoneScreen' src={IScreen4} alt='' />
                        <div>
                            <img src={GreenVerticalLine} alt='GreenVerticalLine' />
                            <p>{t('ecosystem_page.text15')}</p>
                        </div>
                    </Col >
                </Row>
                <img src={SmallDivider} alt="smallDivider" />
                <p className='keyFeatures'>{t('ecosystem_page.text1')}</p>
                <div className='lastContent-ecosystem'>
                    {ecoSystemData.map((item: any,) => {
                        return (
                            <div className='lastContentBadges'>
                                <div><img src={item.imageSrc} alt='image' /></div>
                                <p className='insideText'>{item.text1}</p>
                                <p className='outerText'>{item.text2}</p>
                            </div>
                        )
                    })}
                </div>
                <LandingDivider className='pageDivider'/>
            </div>
        </div>
    );
};

export default Ecosystem;
