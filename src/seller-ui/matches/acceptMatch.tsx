import React, { useState } from 'react';
import { Modal, Typography } from 'antd';

import TradeSummary from './tradeSummary';
import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';

const { Title } = Typography;

const AcceptMatch = (props: any) => {
    const { cropDetails } = props;
    const [viewAcceptAgreement, setViewAcceptAgreement] = useState(false);
    const [otp, setOtp] = useState("");

    return (
        <>
            <PrimaryBtn
                className="vikas-btn-radius"
                onClick={() => setViewAcceptAgreement(true)}
                content="Accept"
            />
            <Modal 
                visible={viewAcceptAgreement}
                title={<Title level={3}>Agreement To Sell</Title>}
                onCancel={() => setViewAcceptAgreement(!viewAcceptAgreement)}
            >
                <TradeSummary cropDetails={cropDetails} />
                <InputOtp setInput={setOtp} />
            </Modal>
        </>
    );
};

export default AcceptMatch;
