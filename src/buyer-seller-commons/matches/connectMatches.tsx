import React, { useEffect, useState } from 'react';
import { Alert, Checkbox, Col, Modal, Row, Space, Statistic, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import TradeSummary from './tradeSummary';

import { MatchRequirementModel, TransactionAction } from '../types';
import { byPassOTP, confirmOTP, resetOTPFields } from '../actions';
import { checkIfUnique } from '../constants';

import { UserStateModel } from '../../store/loginReducer/types';
import { RootState } from '../../store/rootReducer';
import { resendOTP, sendOTP } from '../../store/registrationReducer/actions';
import PrimaryBtn from '../../app-components/primaryBtn';
import { maskData, parseIDfromHash } from '../../app-components/utils';
import InputOtp from '../../app-components/inputOtp';
import {
    checkSellerConnectedStatus,
    connectMatch,
    getMatchesForBuyerCrops,
    setBuyerCropIdOnConnect,
    setBuyerIdOnConnect,
    setSellerCropIdOnConnect,
    setSellerIdOnConnect
} from '../../store/buyerReducer/actions';
import {
    setBuyerCropIdOnAccept,
    setBuyerIdOnAccept,
    setSellerCropIdOnAccept,
    setSellerIdOnAccept,
    transactionAction
} from '../../store/sellerReducer/actions';
import { displayConcurrentMatchError, displayMatchSuccessModal, getTransactionDataStructure } from '../../buyer-ui/matches/matchesTable.model';

const { Text, Title } = Typography;
const { Countdown } = Statistic;

const ConnectMatches = ({ cropDetails }: { cropDetails: MatchRequirementModel }) => {
    const dispatch = useDispatch();
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const { is_buyer, username } = loginState;
    const userState = useSelector((state: RootState) => is_buyer ? state.buyer : state.seller);
    const { otpError, produceList } = userState;
    const [viewAgreement, setViewAgreement] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpTimer, setOtpTimer] = useState(0);
    const [resend, showResend] = useState(false);
    const [otpResent, setOtpResent] = useState(false);
    const [isAgreed, setAgreed] = useState(false);
    const { pk = '' } = cropDetails;

    useEffect(() => {
        const isUnique = checkIfUnique(cropDetails, otpError);
        if (otpError.verified && isUnique) {
            if (is_buyer) {
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
            } else {
                dispatch(
                    transactionAction(
                        parseIDfromHash(pk),
                        TransactionAction.accept,
                        cropDetails
                    )
                );
            }
            dispatch(resetOTPFields());
            resetAllFields();
            setViewAgreement(!viewAgreement);
        }
    }, [otpError.verified]);

    const retryOtpSend = () => {
        setOtpResent(true);
        dispatch(resendOTP());
    };

    const resetAllFields = () => {
        setOtp('');
        setAgreed(false);
        setOtpResent(false);
        setOtpTimer(0);
        showResend(false);
    };

    const onAgree = () => {
        // dispatch(confirmOTP(username, otp));
        dispatch(byPassOTP(otp));
        if (is_buyer) {
            dispatch(setSellerCropIdOnConnect(cropDetails.seller_crop_id));
            dispatch(setSellerIdOnConnect(cropDetails.seller_id));
            dispatch(setBuyerIdOnConnect(cropDetails.buyer_id));
            dispatch(setBuyerCropIdOnConnect(cropDetails.buyer_crop_id));
        } else {
            dispatch(setSellerCropIdOnAccept(cropDetails.seller_crop_id));
            dispatch(setSellerIdOnAccept(cropDetails.seller_id));
            dispatch(setBuyerIdOnAccept(cropDetails.buyer_id));
            dispatch(setBuyerCropIdOnAccept(cropDetails.buyer_crop_id));
        }
    };

    return (
        <React.Fragment>
            <PrimaryBtn
                className='vikas-btn-radius connect-button'
                onClick={() => setViewAgreement(true)}
                content={is_buyer ? 'Connect' : 'Accept'}
            />
            <Modal
                visible={viewAgreement}
                title={<Title level={3}>Agreement To {is_buyer ? <>Buy</> : <>Sell</>}</Title>}
                onCancel={() => setViewAgreement(!viewAgreement)}
                footer={null}
                
            >
                <TradeSummary cropDetails={cropDetails} />
                <Checkbox
                    className='custom-checkbox'
                    checked={isAgreed}
                    onChange={(event: any) => {
                        if (event.target.checked) {
                            dispatch(sendOTP(`91${username}`))
                            setAgreed(true);
                            setOtpTimer(Date.now() + 1000 * 60);
                        } else {
                            setAgreed(false);
                        }
                    }}
                >
                    I have read the
                    <a href='/agreement' target='_blank' style={{ padding: '0.2em' }}>
                        Purchaser Agreement
                    </a>
                    and agree to digitally sign the same using OTP.
                </Checkbox>
                {isAgreed &&
                    <>
                        <Row justify='center'>
                            <Col>
                                <Text>Please enter 4 digit OTP number sent to your phone number +91-{maskData(username)}</Text>
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
                                        <Text className='custom-color-change'> Resend Code in </Text>
                                        <Countdown
                                            className='custom-color-change'
                                            value={otpTimer} format='mm:ss'
                                            onFinish={() => showResend(true)}
                                        />
                                    </> :
                                    (!otpResent ?
                                        <PrimaryBtn
                                            className='add-margin-bottom resent-otp'
                                            onClick={retryOtpSend}
                                            content='Resend OTP'
                                        />
                                        : null
                                    )
                                }
                            </Space>
                        </Row>
                        {otpError.showError &&
                            <Row className='margin-t-1em'>
                                <Col span='24'>
                                    <Alert message={otpError.errorMg} type='error' showIcon />
                                </Col>
                            </Row>
                        }
                        <Row justify='center' className='margin-t-1em'>
                            <Col>
                                <Space>
                                    <PrimaryBtn
                                        className='verify-otp-and-agree'
                                        disabled={otp.length !== 4}
                                        onClick={onAgree}
                                        content='Verify OTP & Agree'
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </>
                }
            </Modal>
        </React.Fragment>
    );
};

export default ConnectMatches;
