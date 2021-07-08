import React, { useState } from 'react';
import { Checkbox, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import TradeSumary from './tradeSummary';
import PrimaryBtn from '../../app-components/primaryBtn';
import InputOtp from '../../app-components/inputOtp';
import { sendOTP } from '../../store/registrationReducer/actions';
import { RootState } from '../../store/rootReducer';
import {
    connectMatch,
    saveTimeStamp,
    checkSellerConnectedStatus,
    getMatchesForBuyerCrops
} from '../../store/buyerReducer/actions';
import { UserStateModel } from '../../store/loginReducer/types';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { BuyerStateModel } from '../../store/buyerReducer/types';

const { Text, Title } = Typography;

const getTransactionDataStructure = (cropDetails: MatchRequirementModel) => {
    const {
        fulfillment_flag, produce, matched_quantity,
        seller_crop_id, seller_id, seller_quantity, seller_final_price, seller_price, location, seller_facilitation_cost, seller_transportation_cost, seller_price_per_quintal,
        buyer_id, buyer_crop_id, buyer_location, buyer_facilitation_cost, buyer_transportation_cost, buyer_final_price, buyer_actual_quantity, buyer_price_per_quintal} = cropDetails;
    const transactionEntry = {
        transaction_type: fulfillment_flag,
        matched_quantity,
        produce,
        grade: "111",
        buyer: [
          {
            buyer_id,
            buyer_location,
            buyer_quantity: buyer_actual_quantity,
            buyer_price: 0,
            buyer_final_price,
            buyer_transportation_cost,
            buyer_facilitation_cost,
            buyer_crop_id,
            buyer_price_per_quintal
          }
        ],
        seller: [
          {
            seller_id,
            seller_location: location,
            seller_quantity,
            seller_price,
            seller_transportation_cost,
            seller_facilitation_cost,
            seller_final_price,
            seller_crop_id,
            seller_price_per_quintal
          }
        ]
      }
      return transactionEntry;
}

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
        okButtonProps: {type: 'default'}
    });
}

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
        okButtonProps: {type: 'text'}
    });
}

const ConnectMatch = ({cropDetails}: {cropDetails: MatchRequirementModel}) => {
    const dispatch = useDispatch();
    const userState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const buyerState: BuyerStateModel = useSelector((state: RootState) => state.buyer);
    const { produceList } = buyerState;
    const agreementNumber = `PA_${userState.username}_${cropDetails.seller_id}`;// Temp
    const [viewConnectAgreement, setConnectAgreement] = useState(false);
    const [otp, setOtp] = useState("");
    const [isAgreed, setAgreed] = useState(false); 

    const onAcceptConnect = () => {
        dispatch(saveTimeStamp);
        setConnectAgreement(!viewConnectAgreement);
        const transactionEntry = getTransactionDataStructure(cropDetails);
        const {seller_crop_id, seller_id} = cropDetails;
        (dispatch(checkSellerConnectedStatus(seller_id, seller_crop_id)) as any)
        .then((data: {isBuyerConnected: string}) => {
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
    }

    return (
        <>
            <PrimaryBtn
                className="vikas-btn-radius"
                onClick={() => setConnectAgreement(true)}
                content="Connect"
            />
            <Modal
                visible={viewConnectAgreement}
                title={<Title level={3}>Agreement To Buy</Title>}
                onCancel={() => setConnectAgreement(!viewConnectAgreement)}
                footer={[
                    <PrimaryBtn onClick={onAcceptConnect} content="Agree"/>
                ]}
            >
                <Text style={{float: "right"}}>Application no: {agreementNumber}</Text>
                <TradeSumary cropDetails={cropDetails} />
                <Checkbox
                    className="custom-checkbox"
                    onChange={(event: any) => {
                        if (event.target.checked) {
                            dispatch(sendOTP(`91${userState.username}`));
                            setAgreed(true);
                        } else {
                            setAgreed(false);
                        }
                    }}
                >
                    I have read the
                    <a href="/agreement" target="_blank" style={{padding: "0.2em"}}>
                        Purchase Agreement
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

export default ConnectMatch;
