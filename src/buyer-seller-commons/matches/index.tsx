import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { WarningOutlined } from '@ant-design/icons';

import ViewCropDetails from './viewCropDetails';

import { initialEmptyCropDetail } from '../constants';
import { MatchRequirementModel, TransactionAction } from '../types';
import { rejectMatchesCount } from '../actions';

import { RootState } from '../../store/rootReducer';
import { getProduceList, rejectMatches } from '../../store/buyerReducer/actions';
import { getAllSellerMatches, transactionAction } from '../../store/sellerReducer/actions';
import Refresh from '../../static/assets/refresh.png';
import { parseIDfromHash } from '../../app-components/utils';
import { matchesSellerColumns } from '../../seller-ui/matches/matchesTable.model';
import { matchesBuyerColumns } from '../../buyer-ui/matches/matchesTable.model';

const { Text, Title } = Typography;

export interface componentCallBacksModel {
    showCropDetailsModal: any;
    populateCropDetails: any;
    rejectMatch: any;
};

const Matches = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] =
        useState(initialEmptyCropDetail as MatchRequirementModel);
    const [reloadClicked, setReloadClicked] = useState(0);
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { is_buyer } = loginState;
    const userState = useSelector((state: RootState) => is_buyer ? state.buyer : state.seller);

    useEffect(() => {
        !is_buyer && dispatch(getAllSellerMatches());
    }, []);

    useEffect(() => {
        if (reloadClicked === 5) {
            setTimeout(() => {
                setReloadClicked(0);
            }, 500000);
        }
    }, [reloadClicked]);

    const rejectBuyerMatch = (curMatchRecord: MatchRequirementModel) => {
        const { buyer_id, buyer_crop_id, seller_id,
            seller_crop_id, matched_quantity } = curMatchRecord;
        const user_id = buyer_id.substring(5);
        const crop_id = buyer_crop_id.substring(11);
        const rejectCountData = { user_id, crop_id, user: 'buyer' };
        const { rejectCount } = userState;

        dispatch(rejectMatchesCount(rejectCountData))

        if (rejectCount === 3 || rejectCount === 5) {
            Modal.confirm({
                title: '',
                icon: <WarningOutlined />,
                content: rejectCount === 3 ? 'You are rejecting the match for the 3rd time, If you wish to continue, your matches will be blocked, and you will not be getting any new matches.'
                    : 'You are rejecting the match for the 5th time, If you wish to continue, you are not able to add any requirements for next 7 days, your account will be blocked',
                okText: 'Reject',
                onOk() {
                    dispatch(
                        rejectMatches({
                            buyer_id, buyer_crop_id, seller_id,
                            seller_crop_id, matched_quantity
                        })
                    );
                },
                cancelText: 'Cancel',
                onCancel() { }
            })
        } else {
            dispatch(
                rejectMatches({
                    buyer_id, buyer_crop_id, seller_id,
                    seller_crop_id, matched_quantity
                })
            );
        }
    };

    const rejectSellerMatch = (matchRecord: MatchRequirementModel) => {
        const { pk = '', seller_crop_id } = matchRecord;
        const user_id = loginState.username;
        const crop_id = seller_crop_id.substring(12);
        const rejectCountData = { user_id, crop_id, user: 'seller' };

        dispatch(rejectMatchesCount(rejectCountData))
        const { rejectCount } = userState;
        if (rejectCount === 3) {
            Modal.confirm({
                title: '',
                icon: <WarningOutlined />,
                content: 'You are rejecting the match for the 3rd time, If you wish to continue, your matches will be blocked, and you will not be getting any new matches you are not able to add any requirements for next 7 days, your account will be blocked',
                okText: 'Reject',
                onOk() {
                    dispatch(
                        transactionAction(
                            parseIDfromHash(pk),
                            TransactionAction.reject,
                            matchRecord
                        )
                    );
                },
                cancelText: 'Cancel',
                onCancel() { }
            })
        } else {
            dispatch(
                transactionAction(
                    parseIDfromHash(pk),
                    TransactionAction.reject,
                    matchRecord
                )
            );
        }
    };

    const componentCallBacks: componentCallBacksModel = {
        showCropDetailsModal: setOpenDetailsModal,
        populateCropDetails: setSelectedCropDetails,
        rejectMatch: is_buyer ? rejectBuyerMatch : rejectSellerMatch
    };

    return (
        <div id='matches'>
            <Title level={2}>My Matches</Title>
            <Button
                type='link'
                disabled={reloadClicked === 5}
                style={{ float: 'right' }}
                className='refresh-button'
                onClick={() => {
                    setReloadClicked(reloadClicked + 1);
                    is_buyer ?
                        dispatch(getProduceList()) :
                        dispatch(getAllSellerMatches());
                }}
            >
                <Text style={{ color: '#4285F4' }}>Refresh &nbsp;</Text>
                <img src={Refresh} alt='refresh' />
            </Button>
            <Table
                loading={userState.isMatchesFetching}
                className='margin-t-1em matches-table'
                columns={
                    is_buyer ?
                        matchesBuyerColumns(componentCallBacks) :
                        matchesSellerColumns(componentCallBacks)
                }
                dataSource={userState.matchesList}
            />
            <ViewCropDetails
                cropDetails={selectedCropDetails}
                openDetailsModal={openDetailsModal}
                setOpenDetailsModal={setOpenDetailsModal}
            />
        </div>
    );
};

export default Matches;
