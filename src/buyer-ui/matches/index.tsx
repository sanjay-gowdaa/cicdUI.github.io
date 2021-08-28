import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';

import ViewCropDetails from './viewCropDetails';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';

import { RootState } from '../../store/rootReducer';
import { getProduceList, rejectMatches } from '../../store/buyerReducer/actions';
import { initialEmptyCropDetail } from '../../buyer-seller-commons/constants';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';

const { Title } = Typography;

const processFullfillmentData = (allMatchesList: Array<any>) => {
    let allFullfilments: any = [];
    allMatchesList.map((buyerMatchEntry) => {
        const [currentBuyerMatchEntryPair]: Array<any> = Object.entries(buyerMatchEntry);
        const buyerMatchesData: Array<any> = currentBuyerMatchEntryPair[1];
        const matchesLength = buyerMatchesData.length;
        const genericData = buyerMatchesData[matchesLength-1];
        for(let i=0; i < (matchesLength-1); i++) {
            const fulfilmentData = {...buyerMatchesData[i], ...genericData};
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
            rejectMatches({buyer_id, buyer_crop_id, seller_id,
                seller_crop_id, matched_quantity})
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
        if(reloadClicked !==0)
            dispatch(getProduceList());
    }, [reloadClicked]);

    return (
        <div id="buyer-ui-matches">
            <Title level={2}>My Matches</Title>
            <ReloadOutlined
                className={reloadClicked === 5 ? `display-none` : `on-reload-matches`}
                onClick={() => setReloadClicked(reloadClicked + 1)}
            />
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
