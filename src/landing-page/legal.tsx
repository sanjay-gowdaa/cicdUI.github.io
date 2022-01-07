import React from 'react';
import { Button, Image, Tabs, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Accept from '../static/assets/Accept.svg';
import { routesMap } from '../constants';

const { Paragraph, Title } = Typography;
const { TabPane } = Tabs;
const { terms } = routesMap;

const Legal = () => {
    const { t } = useTranslation('common');

    return (
        <div id='legal'>
            <Title className='col-white legal-title' level={2}>
                {t('legal_page.title')}
            </Title>
            <Image className='accept-image' src={Accept} preview={false} />
            <Tabs className='legal-tab' defaultActiveKey='1' type='card'>
                <TabPane
                    className='tnc-tab'
                    tab={t('landing_page.actions.terms_and_conditions')}
                    key='1'
                >
                    <Paragraph>
                        <ul>
                            <li>
                                Vikasbandhu is the trademark owned by SamparkBindhu Solutions
                                Private Limited('<b>SamparkBindhu</b>'). All back-end support
                                for the application has been created and managed by SamparkBindhu
                                Solutions Private Limited and Vikasbandhu is the user interface
                                ('aslo hearin after referred as <b>Platform</b>').
                            </li>
                            <li>
                                Platform is only a facilitator between the users who are selling
                                agriculture produce crops grown on agricultural land and (<b>Seller[s]</b>)
                                and users interested in purchasing such agriculture produce (<b>Buyer[s]</b>),
                                to help strike a mutually agreeable deal and has no role in trading or
                                warehousing and is not the authority on the quality of the agriculture
                                produce available on the platform.
                            </li>
                            <li>
                                By accessing and registering with the platform, the users confirm that the
                                Users are in agreement with and bound by the terms of service contained in
                                the Terms and Conditions outlined below. These terms apply to the entire website,
                                mobile application, and any mail exchange that may happen during course of
                                business between the Users and the Platform.
                            </li>
                            <li>
                                By using the Platform, the Users are accepting these terms and conditions in full
                                and shall be legally bound to said terms and conditions, so the User should read
                                them carefully. Access to and use of Platform depends soely on the acceptance
                                of the Terms and Conditions.
                            </li>
                        </ul>
                    </Paragraph>
                    <Button className='read-more-button vikas-btn-radius'>
                        <Link to={terms} target='_blank'>{t('landing_page.actions.read_more')}</Link>
                    </Button>
                </TabPane>
                <TabPane
                    className='privacy-tab'
                    tab={t('landing_page.actions.privacy_policy')}
                    key='2'
                >
                    <Paragraph>
                        <ul>
                            <li>
                                SamparkBindhu Solutions Private Limited (“<b>SamparkBindhu</b>/<b>Company</b>”) is a company
                                registered under the Companies Act, 2013, bearing CIN U72900KA2020PTC137512 and having its
                                registered office at #617, 'Shivam', Royal Park Residency, J P Nagar 9th Phase, Bengaluru
                                Bangalore, Karnataka - 560062, India
                            </li>
                            <li>
                                This Privacy Policy (“<b>Policy</b>”) sets forth the reasonable security practices and procedures
                                adopted by SamparkBindhu and shall apply to the use and disclosure and sharing of sensitive
                                personal data or information (“<b>Personal Identifiable Information</b>” or “<b>PII</b>”) provided by the
                                registered users of the website <b>[●]</b> (“<b>Website</b>”), which is owned and operated by SamparkBindhu.
                                This policy is equally applicable on the visitors to the Website. The Policy outlines the
                                various measures undertaken by SamparkBindhu to provide Users with a convenient and safe
                                online/ experience, while  maintaining and safeguarding the  confidentiality, integrity,
                                and security of Users PII, during storage and transmission through the World Wide Web. This
                                Policy explains how SamparkBindhu protects PII provided by Users through the Website and how
                                SamparkBindhu store and use that information, to deliver the services on the Website.
                            </li>
                            <li>
                                Please read this Policy carefully, it is subject to change at any time and is advised that Users
                                review this Policy periodically. Any change to this Policy will become effective as soon as it is
                                posted or linked to the revised Policy on the Website.
                            </li>
                        </ul>
                    </Paragraph>
                    <Button className='read-more-button vikas-btn-radius'>
                        <Link to={terms} target='_blank'>{t('landing_page.actions.read_more')}</Link>
                    </Button>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Legal;
