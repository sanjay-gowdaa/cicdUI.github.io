import React, { useState } from 'react';
import { Breadcrumb, Button, Divider, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import PrimaryBtn from '../app-components/primaryBtn';
import MobileRegisterModal from '../app-components/mobileRegisterModal';
import { contactUs } from '../constants';

const MobileDrawer = () => {
    const { t } = useTranslation('common');
    const [visible, setVisible] = useState(false);
    const [openMobileRegModel, setMobileRegModal] = useState(false);

    return (
        <div className="mobile-visible">
            <Button type="text" className="col-green" onClick={() => setVisible(true)}>
                <MenuOutlined style={{ fontSize: '1.5rem' }} />
            </Button>
            <Drawer
                width={'68vw'}
                placement="right"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                <PrimaryBtn
                    className="drawer-register-button"
                    content="Register"
                    onClick={() => {
                        setVisible(false);
                        setMobileRegModal(!openMobileRegModel);
                    }}
                />
                <Breadcrumb className="mobile-header-breadcrumb" separator=" ">
                    <Breadcrumb.Item href="#home" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.home')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#aim" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.aim')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#ecosystem" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.ecosystem')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#commodities" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.commodities')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#team" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.team')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#legal" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.legal')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#contactUs" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.contact_us')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#updates" onClick={() => setVisible(false)}>
                        {t('landing_page.header.breadcrumb.updates')}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Divider className="margin-zero" />
                <div className="contact-details">
                    <p>{contactUs.phoneNumber}</p>
                    <p>{contactUs.emailId}</p>
                </div>
            </Drawer>
            <MobileRegisterModal showModal={openMobileRegModel} setModal={setMobileRegModal} />
        </div>
    );
};

export default MobileDrawer;
