import React, { useState } from 'react';
import { Typography, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { componentCallBacksModel, matchesColumns } from './matchesTable.model';
import ViewCropDetails from './viewCropDetails';

const { Title } = Typography;
const initialEmptyCropDetail = {
    cropName: '',
    subCategory: '',
    cropGrade: '',
    quantity: 0,
    pricePerQnt: 0,
    apmcRate: 0,
    apmcRateChange: { difference: 0, increase: true },
    intentToSell: false,
    termsAndConditions: '',
    buyerId: '',
    quantityRequired: 0,
    location: '',
};

const MatchedSection = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedCropDetails, setSelectedCropDetails] = useState(initialEmptyCropDetail);
    const buyerState = useSelector((state: RootState) => state.buyer);
    const componentCallBacks: componentCallBacksModel = {
        showCropDetailsModal: setOpenDetailsModal,
        populateCropDetails: setSelectedCropDetails,
    };
    return (
        <div>
            <Title level={2}>My Matches</Title>
            <Table
                className="margin-t-1em"
                columns={matchesColumns(componentCallBacks)}
                dataSource={buyerState.matchesList}
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
