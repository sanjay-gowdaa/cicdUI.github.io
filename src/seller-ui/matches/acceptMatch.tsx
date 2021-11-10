import React, { useEffect, useState } from 'react';
import { Alert, Checkbox, Col, Modal, Row, Space, Statistic, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TradeSummary from './tradeSummary';

import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';
import {
    byPassOTP,
    // confirmOTP,
    resetOTPFields,
    saveTimeStamp,
    setBuyerCropIdOnConnect,
    setBuyerIdOnConnect,
    setSellerCropIdOnConnect,
    setSellerIdOnConnect,
    transactionAction
} from '../../store/sellerReducer/actions';
import { RootState } from '../../store/rootReducer';
import { resendOTP, sendOTP } from '../../store/registrationReducer/actions';
import { MatchRequirementModel, TransactionAction } from '../../buyer-seller-commons/types';
import { maskData, parseIDfromHash } from '../../app-components/utils';
import { SellerStateModel } from '../../store/sellerReducer/types';
import { checkIfUnique } from '../../buyer-seller-commons/constants';

const { Text, Title } = Typography;
const { Countdown } = Statistic;

const AcceptMatch = (props: { cropDetails: MatchRequirementModel }) => {
    const { cropDetails } = props;
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.loginUser);
    const sellerState: SellerStateModel = useSelector((state: RootState) => state.seller);
    const { otpError } = sellerState;
    const agreementNumber = `PA_${userState.username}_${maskData(parseIDfromHash(cropDetails.buyer_id))}`;// Temp

    const [viewAcceptAgreement, setViewAcceptAgreement] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpTimer, setOtpTimer] = useState(0);
    const [resend, showResend] = useState(false);
    const [otpResent, setOtpResent] = useState(false);
    const [isAgreed, setAgreed] = useState(false);
    const { pk = '' } = cropDetails;

    const retryOtpSend = () => {
        setOtpResent(true);
        dispatch(resendOTP());
    };

    useEffect(() => {
        const isUnique = checkIfUnique(cropDetails, otpError);
        if (otpError.verified && isUnique) {
            dispatch(
                transactionAction(
                    parseIDfromHash(pk),
                    TransactionAction.accept,
                    cropDetails
                )
            );
            dispatch(resetOTPFields());
            setViewAcceptAgreement(!viewAcceptAgreement);
        }
    }, [otpError.verified]);

    const onAccept = () => {
        dispatch(saveTimeStamp);
        // dispatch(confirmOTP(userState.username, otp));
        dispatch(byPassOTP(otp));
        dispatch(setSellerCropIdOnConnect(cropDetails.seller_crop_id));
        dispatch(setSellerIdOnConnect(cropDetails.seller_id));
        dispatch(setBuyerIdOnConnect(cropDetails.buyer_id));
        dispatch(setBuyerCropIdOnConnect(cropDetails.buyer_crop_id));
    };

    return (
        <>
            <PrimaryBtn
                className="vikas-btn-radius accept-button"
                onClick={() => setViewAcceptAgreement(true)}
                content="Accept"
            />
            <Modal
                visible={viewAcceptAgreement}
                title={<Title level={3}>Agreement To Sell</Title>}
                onCancel={() => setViewAcceptAgreement(!viewAcceptAgreement)}
                footer={null}
            >
                <Text style={{ float: "right" }}>Application no: {agreementNumber}</Text>
                <TradeSummary cropDetails={cropDetails} />
                <Checkbox
                    className="custom-checkbox"
                    onChange={(event: any) => {
                        if (event.target.checked) {
                            dispatch(sendOTP(`91${userState.username}`))
                            setAgreed(true);
                            setOtpTimer(Date.now() + 1000 * 60);
                        } else {
                            setAgreed(false);
                        }
                    }}
                >
                    I have read the
                    <a href="/agreement" target="_blank" style={{ padding: "0.2em" }}>
                        Purchaser Agreement
                    </a>
                    and agree to digitally sign the same using OTP.
                </Checkbox>
                {isAgreed &&
                    <>
                        <Row justify="center">
                            <Col>
                                <Text>Please enter 4 digit OTP number sent to your phone number +91-{maskData(userState.username)}</Text>
                            </Col>
                            <Col>
                                <InputOtp setInput={setOtp} />
                            </Col>
                        </Row>
                        <Row>
                            <Space>
                                <Text>Didn't receive OTP?</Text>
                                {!resend ?
                                    <>
                                        <Text className="custom-color-change"> Resend Code in </Text>
                                        <Countdown
                                            className="custom-color-change"
                                            value={otpTimer} format="mm:ss"
                                            onFinish={() => showResend(true)}
                                        />
                                    </> :
                                    (!otpResent ?
                                        <PrimaryBtn
                                            className="add-margin-bottom resent-otp"
                                            onClick={retryOtpSend}
                                            content="Resend OTP"
                                        />
                                        : null
                                    )
                                }
                            </Space>
                        </Row>
                        {otpError.showError &&
                            <Row className="margin-t-1em">
                                <Col span="24">
                                    <Alert message={otpError.errorMg} type="error" showIcon />
                                </Col>
                            </Row>
                        }
                        <Row justify="center" className="margin-t-1em">
                            <Col>
                                <Space>
                                    <PrimaryBtn
                                        className="verify-otp-and-agree"
                                        disabled={otp.length !== 4}
                                        onClick={onAccept}
                                        content="Verify OTP & Agree"
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </>
                }
            </Modal>
        </>
    );
};

export default AcceptMatch;
