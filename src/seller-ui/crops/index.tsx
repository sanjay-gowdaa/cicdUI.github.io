import React, { useEffect, useState } from 'react';
import { Table, Typography, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { cropColumns } from './cropsTable.model';
import './crops.scss';
import { EditableCell, EditableRow } from './AddCrop/customTableComponents';
import AddCropModal from './AddCrop';

import { RootState } from '../../store/rootReducer';
import { deleteSelectedCrop, getAllCropsList, sellerIntentToSell, updateCropData } from '../../store/sellerReducer/actions';
import { CropApiModel, SellerStateModel } from '../../store/sellerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';
import PrimaryBtn from '../../app-components/primaryBtn';

const { Title } = Typography;

const getCropId = (cropID: string) => {
    return parseIDfromHash(cropID);
};

const CropsSection = () => {
    const sellerState: SellerStateModel = useSelector((state: RootState) => state.seller);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const [isEdit, setIsEdit] = useState(false);
    const [currentCropId, setCurrentCropId] = useState('');
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as CropApiModel);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const isApproved = (loginState.kyc_flag === "approved");

    useEffect(() => {
        dispatch(getAllCropsList());
    }, []);

    const prepareForEditCrop = (cropData: CropApiModel) => {
        const {sk} = cropData;
        const actualCropID = getCropId(sk || '');
        setCurrentCropId(actualCropID)
        setIsEdit(true);
        setCurrentProduceRecord(cropData);
    };

    const deleteCrop = (cropID: string) => {
        const actualCropID = getCropId(cropID);
        dispatch(deleteSelectedCrop(actualCropID));
    };

    const updateCropDetails = (updatedCropData: CropApiModel, isPriceUpdated?: boolean) => {
        const {sk} = updatedCropData;
        const actualCropID = getCropId(sk || '');
        const {intent_to_sell} = updatedCropData;
        if(intent_to_sell.toLowerCase() === 'yes') {
            dispatch(sellerIntentToSell(updatedCropData, actualCropID, isPriceUpdated))
        } else {
            dispatch(updateCropData({...updatedCropData, is_delete: "no"}));
        }
    };

    return (
        <div className="crops-container" id="seller-ui-crops">
            <Title level={2}>My Produce</Title>
            <Tooltip
                title="Check if the KYC is approved in Profile Page"
                visible={!isApproved}
                trigger="hover"
            >
                <PrimaryBtn
                    className="add-crop-btn vikas-btn-radius"
                    onClick={() => {
                        setIsEdit(false);
                        setModalVisible(true);
                    }}
                    disabled={!isApproved}
                    content="Add Produce"
                />
            </Tooltip>
            <AddCropModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
            <Table
                className="margin-t-1em"
                components={{
                    body: {
                      row: EditableRow,
                      cell: EditableCell,
                    },
                }}
                columns={cropColumns({deleteCrop, prepareForEditCrop, updateCropDetails, setIsEdit, isEdit, currentCropId}) as any}
                dataSource={sellerState.cropsList}
            />
        </div>
    );
};

export default CropsSection;
