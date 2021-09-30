import React, { useState, useEffect } from 'react';
import { Button, Table, Typography,Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { WarningOutlined } from '@ant-design/icons';
import ViewCropDetails from './viewCropDetails';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';

import { RootState } from '../../store/rootReducer';
import { initialEmptyCropDetail } from '../../buyer-seller-commons/constants';
import { getAllSellerMatches, transactionAction, rejectMatchesCount } from '../../store/sellerReducer/actions';
import { parseIDfromHash } from '../../app-components/utils';
import { MatchRequirementModel, TransactionAction } from '../../buyer-seller-commons/types';
import Refresh from '../../static/assets/refresh.png';

const { Text, Title } = Typography;

const MatchedSection = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] =
        useState(initialEmptyCropDetail as MatchRequirementModel);
    const [reloadClicked, setReloadClicked] = useState(0);
    const dispatch = useDispatch();
    const sellerState = useSelector((state: RootState) => state.seller);

    const rejectMatch = (matchRecord: MatchRequirementModel) => {
        const { pk = '', seller_id, seller_crop_id } = matchRecord;
        const user_id = seller_id.substring(5);
        const crop_id = seller_crop_id.substring(12);
        
        const rejectCountData = {user_id, crop_id, user:'seller'}

        dispatch( rejectMatchesCount(rejectCountData))
        const { rejectCount } = sellerState; 
        console.log("rejectCount", rejectCount);
        console.log(rejectCount === 3)
        if(rejectCount === 3){
            
            Modal.confirm({
                title: '',
                icon: <WarningOutlined/>,
                content: 'You are rejecting the match for the 3rd time, If you wish to continue, your matches will be blocked, and you will not be getting any new matches you are not able to add any requirements for next 7 days, your account will be blocked',
                okText: 'Reject',
                onOk() {dispatch(
                        transactionAction(
                            parseIDfromHash(pk),
                            TransactionAction.reject,
                            matchRecord
                        )
                );},
                cancelText: 'Cancel',
                onCancel() { },
                
            
            })
            //RejectAlert(rejectCount, curMatchRecord)
        }
        else{
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
        rejectMatch
    };

    useEffect(() => {
        if (reloadClicked === 5) {
            setTimeout(() => {
                setReloadClicked(0);
            }, 500000);
        }
    }, [reloadClicked]);

    return (
        <div id="seller-ui-matches">
            <Title level={2}>My Matches</Title>
            <Button
                type="link"
                disabled={reloadClicked === 5}
                style={{ float: 'right' }}
                onClick={() => {
                    setReloadClicked(reloadClicked + 1);
                    dispatch(getAllSellerMatches());
                }}
            >
                <Text style={{ color: '#4285F4' }}>Refresh &nbsp;</Text>
                <img src={Refresh} alt="refresh" />
            </Button>
            <Table
                className="margin-t-1em"
                columns={matchesColumns(componentCallBacks)}
                dataSource={sellerState.matchesList}
            />
            <ViewCropDetails
                cropDetails={selectedCropDetails}
                openDetailsModal={openDetailsModal}
                setOpenDetailsModal={setOpenDetailsModal}
            />
        </div>
    );
};

export default MatchedSection;
