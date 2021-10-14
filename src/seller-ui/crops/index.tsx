import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Typography, Tag } from 'antd';
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
    const [isActiveFlag, setIsActiveFlag] = useState("Active");
    const dispatch = useDispatch();
    const isApproved = (loginState.kyc_flag === "approved");
    const is_Active = (loginState?.is_active === "Add Produce Blocked");

    useEffect(() => {
        dispatch(getAllCropsList());
        if (loginState?.is_active != null) {
            setIsActiveFlag(loginState?.is_active);
        }
    }, [loginState]);

    const userStatus = [
        {
            flag: "Active",
            title: "Active",
            backgroundColor: "#f2f2f2",
            color: "#12805C"
        },
        {
            flag: "Active/F",
            title: "Active/F",
            backgroundColor: "yellow",
            color: "#12805C"
        },
        {
            flag: "Matches Blocked",
            title: "Matches Blocked",
            backgroundColor: "yellow",
            color: "black"
        },
        {
            flag: "Add Produce Blocked",
            title: "Add Produce Blocked",
            backgroundColor: "red",
            color: "black"
        }
    ];

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
            {userStatus.map((list) => {
                return (isActiveFlag === list.flag) ?
                    <Tag color={list.backgroundColor} style={{ color: list.color, fontSize: "large", padding: "0.5em" }} >
                        {list.title} </Tag> :
                    <Tag style={{ display: 'none' }}></Tag>
            })}
            <Title level={2}>My Produce</Title>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                disabled={is_Active}
                onClick={() => {
                    if (isApproved || is_Active) {
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
