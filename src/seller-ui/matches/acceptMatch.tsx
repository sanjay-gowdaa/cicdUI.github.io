import React, { useState } from 'react';
import { Checkbox, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TradeSummary from './tradeSummary';
import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';
import { saveTimeStamp, transactionAction } from '../../store/sellerReducer/actions';
import { RootState } from '../../store/rootReducer';
import { sendOTP } from '../../store/registrationReducer/actions';
import { MatchRequirementModel, TransactionAction } from '../../buyer-seller-commons/types';
import { parseIDfromHash } from '../../app-components/utils';

const { Text, Title } = Typography;

const AcceptMatch = (props: {cropDetails: MatchRequirementModel}) => {
    const { cropDetails } = props;
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.loginUser);
    const [viewAcceptAgreement, setViewAcceptAgreement] = useState(false);
    const [otp, setOtp] = useState("");
    const [agreementNumber, setAgreementNumber] = useState(1);
    const [isAgreed, setAgreed] = useState(false);
    const {pk = ''} = cropDetails;

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
                footer = {[
                    <PrimaryBtn
                        onClick={() => {
                            console.log("otp", otp);
                            //Dispatch method which confirms the otp.
                            // timeStamp to be stored in SellerStateModel
                            dispatch(saveTimeStamp);
                            setViewAcceptAgreement(!viewAcceptAgreement);
                            dispatch(transactionAction(parseIDfromHash(pk), TransactionAction.accept));
                            //Download pdf of the Purchase Agreement
                        }}
                        content="Agree"
                    />
                ]}
            >
                <Text style={{float:"right"}}>Application no: {agreementNumber}</Text>
                <TradeSummary cropDetails={cropDetails} />
                <Checkbox
                    className="custom-checkbox"
                    onChange={(event: any) => {
                        if (event.target.checked) {
                            dispatch(sendOTP(`91${userState.username}`))
                            setAgreed(true);
                        } else {
                            setAgreed(false);
                        }
                    }}
                >
                    I have read the
                    <a href="/agreement" target="_blank" style={{padding: "0.2em"}}>
                        Purchaser Agreement
                    </a>
                    and agree to digitally sign the same using OTP.
                </Checkbox>
                { isAgreed && 
                    <>
                        <Text>Please enter the Digital OTP recieved</Text>
                        <InputOtp setInput={setOtp} />
                    </>
                }
            </Modal>
        </>
    );
};

export default AcceptMatch;
