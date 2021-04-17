import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';
import ViewCropDetails from './viewCropDetails';
import { initialEmptyCropDetail } from '../../buyer-seller-commons/constants';
import { getAllSellerMatches } from '../../store/sellerReducer/actions';

const { Title } = Typography;

const MatchedSection = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] = useState(initialEmptyCropDetail);
    const dispatch = useDispatch();
    const sellerState = useSelector((state: RootState) => state.seller);
    const componentCallBacks: componentCallBacksModel = {
        showCropDetailsModal: setOpenDetailsModal,
        populateCropDetails: setSelectedCropDetails,
    };
    
    useEffect(() => {
        dispatch(getAllSellerMatches())
    }, [])

    return (
        <div id="seller-ui-matches">
            <Title level={2}>My Matches</Title>
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
