import React from 'react';
import { Card, Space, Typography } from 'antd';
import { Trans, useTranslation } from 'react-i18next';

import Nagappa from '../static/assets/nagappa.png';
import Suma from '../static/assets/suma.png';
import Sadananda from '../static/assets/sadananda.png';
import SatishChandra from '../static/assets/SatishChandra.jpg';
import Ganesh from '../static/assets/Ganesh.png';
import Guruprasad from '../static/assets/Guruprasad.jpg';

const { Paragraph, Text, Title } = Typography;

const Team = () => {
    const { t } = useTranslation('common');

    return (
        <div id='team'>
            <Title className='col-green team-title' level={2}>{t('our_team.title')}</Title>
            <Space direction='vertical' className='management-team'>
                <Title className='col-green margin-none team-sub-title' level={3}>
                    {t('our_team.founders.title')}
                </Title>
                <Card>
                    <Space direction='horizontal'>
                        <img src={Sadananda} alt='Sadananda' />
                        <Space direction='vertical' size={0}>
                            <Title level={4} className='margin-zero'>{t('our_team.founders.name.1')}</Title>
                            <Title level={5} className='margin-zero col-orange'>
                                <Trans
                                    i18nKey='our_team.founders.designation.1'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                            </Title>
                            <Text className='col-orange'>{t('our_team.founders.subDesignation.1')}</Text>
                            <Paragraph style={{ textAlign: 'justify' }}>
                                <Trans
                                    i18nKey='our_team.founders.description.1'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                            </Paragraph>
                        </Space>
                    </Space>
                </Card>
                <Card>
                    <Space direction='horizontal'>
                        <Space direction='vertical' style={{ textAlign: 'right' }} size={0}>
                            <Title level={4} className='margin-zero'>{t('our_team.founders.name.2')}</Title>
                            <Title level={5} className='margin-zero col-orange'>
                                <Trans
                                    i18nKey='our_team.founders.designation.2'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                            </Title>
                            <Text className='col-orange'>{t('our_team.founders.subDesignation.2')}</Text>
                            <Paragraph style={{ textAlign: 'justify' }}>{t('our_team.founders.description.2')}</Paragraph>
                        </Space>
                        <img src={Nagappa} alt='Nagappa' />
                    </Space>
                </Card>
                <Card>
                    <Space direction='horizontal'>
                        <img
                            className='box-shadow'
                            src={Suma}
                            style={{ borderRadius: '15rem', width: '10rem', margin: '2rem' }}
                            alt='Suma'
                        />
                        <Space direction='vertical' size={0}>
                            <Title level={4} className='margin-zero'>{t('our_team.founders.name.3')}</Title>
                            <Title level={5} className='col-orange'>
                                <Trans
                                    i18nKey='our_team.founders.designation.3'
                                    components={{ italic: <i />, bold: <strong /> }}
                                />
                            </Title>
                            <Paragraph style={{ textAlign: 'justify' }}>{t('our_team.founders.description.3')}</Paragraph>
                        </Space>
                    </Space>
                </Card>
            </Space>
            <div className='advisors-team'>
                <Title className='col-green margin-none team-sub-title' level={3}>{t('our_team.advisors.title')}</Title>
                <Space direction='vertical'>
                    <Card>
                        <Space direction='horizontal' style={{ textAlign: 'right' }}>
                            <Space direction='vertical'>
                                <Title level={4} className='margin-zero'>{t('our_team.advisors.name.1')}</Title>
                                <Title level={5} className='margin-zero col-orange'>
                                    {t('our_team.advisors.designation.1')}
                                </Title>
                                <Paragraph style={{ textAlign: 'justify' }}>{t('our_team.advisors.description.1')}</Paragraph>
                            </Space>
                            <img
                                src={SatishChandra}
                                className='box-shadow'
                                style={{ width: '10rem', borderRadius: '15rem', margin: '1.5rem' }}
                                alt='SatishChandra'
                            />
                        </Space>
                    </Card>
                    <Card>
                        <Space direction='horizontal'>
                            <img
                                src={Ganesh}
                                className='box-shadow'
                                style={{ width: '10rem', borderRadius: '15rem', margin: '1.5rem' }}
                                alt='Ganesh'
                            />
                            <Space direction='vertical'>
                                <Title level={4} className='margin-zero'>{t('our_team.advisors.name.2')}</Title>
                                <Title level={5} className='margin-zero col-orange'>
                                    {t('our_team.advisors.designation.2')}
                                </Title>
                                <Paragraph style={{ textAlign: 'justify' }}>{t('our_team.advisors.description.2')}</Paragraph>
                            </Space>
                        </Space>
                    </Card>
                    <Card>
                        <Space direction='horizontal' style={{ textAlign: 'right' }}>
                            <Space direction='vertical'>
                                <Title level={4} className='margin-zero'>{t('our_team.advisors.name.3')}</Title>
                                <Title level={5} className='margin-zero col-orange'>
                                    {t('our_team.advisors.designation.3')}
                                </Title>
                                <Paragraph style={{ textAlign: 'justify' }}>{t('our_team.advisors.description.3')}</Paragraph>
                            </Space>
                            <img
                                src={Guruprasad}
                                className='box-shadow'
                                style={{ width: '10rem', borderRadius: '15rem', margin: '1.5rem' }}
                                alt='Guruprasad KV'
                            />
                        </Space>
                    </Card>
                </Space>
            </div>
        </div>
    );
};

export default Team;
