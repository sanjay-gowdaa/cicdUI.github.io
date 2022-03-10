import React from 'react';
import { Collapse,Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import mvp from '../static/assets/VbThree.png';
import foodExb from '../static/assets/VbTwo.jpg';
import academia from '../static/assets/VbFive.jpg';
import { useTranslation } from 'react-i18next';
import { englishStyling, isEnglish, kannadaStyling } from '../static/translations/constants';

const {Title } = Typography;

const Updates = () => {
    const { t } = useTranslation('common');
    const { Panel } = Collapse;

    return (
        <div id='updates'>
            <Title level={2}>{t('updates_page.title')}</Title>
            <Collapse accordion
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Panel id='mvp' header={t('updates_page.title1')} key='1' className="site-collapse-custom-panel">
                    <div className='card'>
                        <img src={mvp} alt='mvp'></img>
                        <p>{t('updates_page.text1')}</p>
                    </div>
                </Panel>
                <Panel id='foodExb' header={t('updates_page.title2')} key='2' className="site-collapse-custom-panel">
                    <div className='card'>
                        <img src={foodExb} alt='foodExb'></img>
                        <p>{t('updates_page.text2')}</p>
                    </div>
                </Panel>
                <Panel id='academia' header={t('updates_page.title3')} key='3' className="site-collapse-custom-panel">
                <div className='card'>
                        <img src={academia} alt='academia'></img>
                        <p>{t('updates_page.text3')}</p>
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default Updates;