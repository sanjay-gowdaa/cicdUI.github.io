import React, { useEffect, useState } from 'react';
import { Button, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ViewCropDetails from './viewCropDetails';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';

import { RootState } from '../../store/rootReducer';
import { getProduceList, rejectMatches } from '../../store/buyerReducer/actions';
import { initialEmptyCropDetail } from '../../buyer-seller-commons/constants';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import Refresh from '../../static/assets/refresh.png';

const { Text, Title } = Typography;

const processFullfillmentData = (allMatchesList: Array<any>) => {
    let allFullfilments: any = [];
    allMatchesList.map((buyerMatchEntry) => {
        const [currentBuyerMatchEntryPair]: Array<any> = Object.entries(buyerMatchEntry);
        const buyerMatchesData: Array<any> = currentBuyerMatchEntryPair[1];
        const matchesLength = buyerMatchesData.length;
        const genericData = buyerMatchesData[matchesLength - 1];
        for (let i = 0; i < (matchesLength - 1); i++) {
            const fulfilmentData = { ...buyerMatchesData[i], ...genericData };
            allFullfilments.push(fulfilmentData)
        }
    });
    return allFullfilments;
};

const MatchedSection = () => {
    const dispatch = useDispatch();
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] = useState(initialEmptyCropDetail);
    const [processedMatches, setProcessedMatches] = useState([]);
    const [reloadClicked, setReloadClicked] = useState(0);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const rejectTheMatch = (curMatchRecord: MatchRequirementModel) => {
        const { buyer_id, buyer_crop_id, seller_id,
            seller_crop_id, matched_quantity } = curMatchRecord;
        dispatch(
            rejectMatches({
                buyer_id, buyer_crop_id, seller_id,
                seller_crop_id, matched_quantity
            })
        );
    };

    const componentCallBacks: componentCallBacksModel = {
        showCropDetailsModal: setOpenDetailsModal,
        populateCropDetails: setSelectedCropDetails,
        rejectMatch: rejectTheMatch
    };

    useEffect(() => {
        const processedData = processFullfillmentData(buyerState.matchesList)
        setProcessedMatches(processedData);
    }, [buyerState.matchesList]);

    useEffect(() => {
        if (reloadClicked === 5) {
            setTimeout(() => {
                setReloadClicked(0);
            }, 500000);
        }
    }, [reloadClicked]);

    return (
        <div id="buyer-ui-matches">
            <Title level={2}>My Matches</Title>
            <Button
                type="link"
                disabled={reloadClicked === 5}
                style={{ float: 'right' }}
                onClick={() => {
                    setReloadClicked(reloadClicked + 1);
                    dispatch(getProduceList());
                }}
            >
                <Text style={{ color: '#4285F4' }}>Refresh &nbsp;</Text>
                <img src={Refresh} alt="refresh" />
            </Button>
            <Table
                loading={buyerState.isMatchesFetching}
                className="margin-t-1em"
                columns={matchesColumns(componentCallBacks)}
                dataSource={processedMatches}
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
