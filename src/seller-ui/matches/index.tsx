import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';

import ViewCropDetails from './viewCropDetails';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';

import { RootState } from '../../store/rootReducer';
import { initialEmptyCropDetail } from '../../buyer-seller-commons/constants';
import { getAllSellerMatches, transactionAction } from '../../store/sellerReducer/actions';
import { parseIDfromHash } from '../../app-components/utils';
import { MatchRequirementModel, TransactionAction } from '../../buyer-seller-commons/types';

const { Title } = Typography;

const MatchedSection = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] =
        useState(initialEmptyCropDetail as MatchRequirementModel);
    const [reloadClicked, setReloadClicked] = useState(0);
    const dispatch = useDispatch();
    const sellerState = useSelector((state: RootState) => state.seller);

    const rejectMatch = (matchRecord: MatchRequirementModel) => {
        const { pk = '' } = matchRecord;
        dispatch(
            transactionAction(
                parseIDfromHash(pk),
                TransactionAction.reject,
                matchRecord
            )
        );
    };

    const componentCallBacks: componentCallBacksModel = {
        showCropDetailsModal: setOpenDetailsModal,
        populateCropDetails: setSelectedCropDetails,
        rejectMatch
    };

    useEffect(() => {
        dispatch(getAllSellerMatches());
    }, [reloadClicked]);

    return (
        <div id="seller-ui-matches">
            <Title level={2}>My Matches</Title>
            <ReloadOutlined
                className={reloadClicked === 5 ? `display-none` : `on-reload-matches`}
                onClick={() => setReloadClicked(reloadClicked + 1)}
            />
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
