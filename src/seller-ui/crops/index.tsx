import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { WarningFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './crops.scss';
import { cropColumns } from './cropsTable.model';
import { EditableCell, EditableRow } from './AddCrop/customTableComponents';
import AddCropModal from './AddCrop';

import { RootState } from '../../store/rootReducer';
import { deleteSelectedCrop, getAllCropsList, sellerIntentToSell, updateCropData } from '../../store/sellerReducer/actions';
import { CropApiModel, SellerStateModel } from '../../store/sellerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';
import PrimaryBtn from '../../app-components/primaryBtn';
import { routesMap } from '../../constants';

const { Text, Title } = Typography;

const getCropId = (cropID: string) => {
    return parseIDfromHash(cropID);
};

const CropsSection = (props: any) => {
    const { history } = props;
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
        const { sk } = cropData;
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
        const { sk } = updatedCropData;
        const actualCropID = getCropId(sk || '');
        const { intent_to_sell } = updatedCropData;
        if (intent_to_sell.toLowerCase() === 'yes') {
            dispatch(sellerIntentToSell(updatedCropData, actualCropID, isPriceUpdated))
        } else {
            dispatch(updateCropData({ ...updatedCropData, is_delete: "no" }));
        }
    };

    const showKycRequiredModal = () => {
        Modal.info({
            className: "kyc-required-modal",
            content:
                <>
                    <Text>Please update your KYC information to add produce</Text><br />
                    <Text>Profile &gt; KYC Information</Text>
                </>
            ,
            okText: 'Update Now',
            closable: true,
            onOk: () => history.push(routesMap.profile),
        });
    };

    return (
        <div className="crops-container" id="seller-ui-crops">
            <Title level={2}>My Produce</Title>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => {
                    if (isApproved) {
                        setIsEdit(false);
                        setModalVisible(true);
                    } else {
                        showKycRequiredModal();
                    }
                }}
                content="Add Produce"
            />
            {!isApproved &&
                <Space className="kyc-pending-message" direction="horizontal" >
                    <WarningFilled className="warning-icon" />
                    <Title level={5} className="kyc-pending-text">KYC Pending.</Title>
                    <Link to={routesMap.profile} className="update-text">Update Now</Link>
                </Space>
            }
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
                columns={cropColumns({ deleteCrop, prepareForEditCrop, updateCropDetails, setIsEdit, isEdit, currentCropId }) as any}
                dataSource={sellerState.cropsList}
            />
        </div>
    );
};

export default CropsSection;
