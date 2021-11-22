import React, { useEffect, useState } from 'react';
import { Alert, Checkbox, Col, Modal, Row, Space, Statistic, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import TradeSumary from './tradeSummary';

import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';
import { sendOTP, resendOTP } from '../../store/registrationReducer/actions';
import { RootState } from '../../store/rootReducer';
import {
    connectMatch,
    saveTimeStamp,
    checkSellerConnectedStatus,
    getMatchesForBuyerCrops,
    confirmOTP,
    resetOTPFields,
    // byPassOTP,
    setSellerCropIdOnConnect,
    setSellerIdOnConnect,
    setBuyerIdOnConnect,
    setBuyerCropIdOnConnect
} from '../../store/buyerReducer/actions';
import { UserStateModel } from '../../store/loginReducer/types';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { BuyerStateModel } from '../../store/buyerReducer/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { checkIfUnique } from '../../buyer-seller-commons/constants';

const { Text, Title } = Typography;
const { Countdown } = Statistic;

const getTransactionDataStructure = (cropDetails: MatchRequirementModel) => {
    const {
        fulfillment_flag, produce, matched_quantity, seller_crop_id, seller_id, seller_quantity,
        seller_final_price, seller_price, location, seller_facilitation_cost, seller_transportation_cost,
        seller_price_per_quintal, buyer_id, buyer_crop_id, buyer_location, buyer_facilitation_cost,
        buyer_transportation_cost, buyer_final_price, buyer_actual_quantity, buyer_price_per_quintal
    } = cropDetails;

    const transactionEntry = {
        transaction_type: fulfillment_flag,
        matched_quantity,
        produce,
        grade: "111",
        buyer: [{
            buyer_id,
            buyer_location,
            buyer_quantity: buyer_actual_quantity,
            buyer_price: 0,
            buyer_final_price,
            buyer_transportation_cost,
            buyer_facilitation_cost,
            buyer_crop_id,
            buyer_price_per_quintal
        }],
        seller: [{
            seller_id,
            seller_location: location,
            seller_quantity,
            seller_price,
            seller_transportation_cost,
            seller_facilitation_cost,
            seller_final_price,
            seller_crop_id,
            seller_price_per_quintal
        }]
    };

    return transactionEntry;
};

const displayMatchSuccessModal = () => {
    return Modal.success({
        className: 'match-success-modal',
        icon: '',
        centered: true,
        title: <CheckCircleFilled className='match-success-icon' />,
        content: (
            <>
                <Title className='text-align-center' level={5}>
                    Request has been sent to seller
                </Title>
                <Title className='text-align-center' level={5}>
                    You will be notified from Vikasbandhu once the seller accepts/ rejects
                </Title>
            </>),
        okText: 'Done',
        okButtonProps: { type: 'default' }
    });
};

const displayConcurrentMatchError = () => {
    return Modal.error({
        className: 'match-success-modal',
        icon: '',
        centered: true,
        title: <ExclamationCircleFilled className='match-error-icon' />,
        content: (
            <>
                <p className='modal-info-text'>
                    This request has timed out and is no longer valid.
                </p>
                <p className='modal-info-text' >
                    Vikasbandhu will search for a new seller
                </p>
            </>),
        okText: 'Ok',
        okButtonProps: { type: 'text' }
    });
};

const ConnectMatch = ({ cropDetails }: { cropDetails: MatchRequirementModel }) => {
    const dispatch = useDispatch();
    const userState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const buyerState: BuyerStateModel = useSelector((state: RootState) => state.buyer);
    const { produceList, otpError } = buyerState;
    const agreementNumber = `PA_${userState.username}_${maskData(parseIDfromHash(cropDetails.seller_id))}`;// Temp

    const [viewConnectAgreement, setConnectAgreement] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpTimer, setOtpTimer] = useState(0);
    const [resend, showResend] = useState(false);
    const [otpResent, setOtpResent] = useState(false);
    const [isAgreed, setAgreed] = useState(false);

    useEffect(() => {
        const isUnique = checkIfUnique(cropDetails, otpError);

        if (otpError.verified && isUnique) {
            const transactionEntry = getTransactionDataStructure(cropDetails);
            const { seller_crop_id, seller_id } = cropDetails;
            (dispatch(checkSellerConnectedStatus(seller_id, seller_crop_id)) as any)
                .then((data: { isBuyerConnected: string }) => {
                    const { isBuyerConnected } = data
                    if (isBuyerConnected === 'no') {
                        /* HACK: To avoid using store variable to show popup */
                        (dispatch(connectMatch(transactionEntry)) as any).then((data: any) => {
                            displayMatchSuccessModal()
                        })
                    } else {
                        displayConcurrentMatchError()
                        dispatch(getMatchesForBuyerCrops(produceList));
                    }
                })
            dispatch(resetOTPFields());
            resetAllFields();
            setConnectAgreement(!viewConnectAgreement);
        }
    }, [otpError.verified]);

    const resetAllFields = () => {
        setOtp("");
        setAgreed(false);
        setOtpResent(false);
        setOtpTimer(0);
        showResend(false);
    };

    const retryOtpSend = () => {
        setOtpResent(true);
        dispatch(resendOTP());
    };

    const onAcceptConnect = () => {
        dispatch(saveTimeStamp);
        dispatch(confirmOTP(userState.username, otp));
        // dispatch(byPassOTP(otp));
        dispatch(setSellerCropIdOnConnect(cropDetails.seller_crop_id));
        dispatch(setSellerIdOnConnect(cropDetails.seller_id));
        dispatch(setBuyerIdOnConnect(cropDetails.buyer_id));
        dispatch(setBuyerCropIdOnConnect(cropDetails.buyer_crop_id));
    };

    return (
        <>
            <PrimaryBtn
                className="vikas-btn-radius connect-button"
                onClick={() => setConnectAgreement(true)}
                content="Connect"
            />
            <Modal
                visible={viewConnectAgreement}
                title={<Title level={3}>Agreement To Buy</Title>}
                onCancel={() => setConnectAgreement(!viewConnectAgreement)}
                footer={null}
            >
                <Text style={{ float: "right" }}>Application no: {agreementNumber}</Text>
                <TradeSumary cropDetails={cropDetails} />
                <Checkbox
                    className="custom-checkbox"
                    checked={isAgreed}
                    onChange={(event: any) => {
                        if (event.target.checked) {
                            dispatch(sendOTP(`91${userState.username}`));
                            setAgreed(true);
                            setOtpTimer(Date.now() + 1000 * 60);
                        } else {
                            setAgreed(false);
                        }
                    }}
                >
                    I have read the
                    <a href="/agreement" target="_blank" style={{ padding: "0.2em" }}>
                        Purchase Agreement
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
                                        <PrimaryBtn className="add-margin-bottom" onClick={retryOtpSend} content="Resend OTP" />
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
                                        onClick={onAcceptConnect}
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

export default ConnectMatch;
