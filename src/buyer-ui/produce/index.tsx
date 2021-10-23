import React, { useEffect, useState } from 'react';
import { Modal, Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { produceColumns } from './produceTable.model';
import AddProduce from './AddProduce';
import './crops.scss';

import { RootState } from '../../store/rootReducer';
import { deleteSelectedProduce, editProduce, getProduceList } from '../../store/buyerReducer/actions';
import { ProduceModel } from '../../store/buyerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';
import PrimaryBtn from '../../app-components/primaryBtn';
import { routesMap } from '../../constants';
import { EditableCell, EditableRow } from './AddProduce/customTableComponent';

const { Text, Title } = Typography;

const getCropId = (cropID: string) => {
    return parseIDfromHash(cropID);
};

const ProduceSection = (props: any) => {
    const { history } = props;
    const buyerState = useSelector((state: RootState) => state.buyer);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [currentCropId, setCurrentCropId] = useState('');
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as ProduceModel);
    const [modalVisible, setModalVisible] = useState(false);
    const { masterProduceList } = buyerState;
    const isApproved = (loginState.kyc_flag === "approved");
    const is_Active = (loginState?.is_active === "Add Requirement Blocked");

    useEffect(() => {
        dispatch(getProduceList());
    }, []);

    const deleteProduce = (produceId: string) => {
        const actualProduceId = parseIDfromHash(produceId);
        dispatch(deleteSelectedProduce(actualProduceId));
    };

    const prepareForEditProduce = (produceData: ProduceModel) => {
        const { sk } = produceData;
        const actualCropID = getCropId(sk || '');
        setIsEdit(true);
        setCurrentCropId(actualCropID);
    };

    const updateCropDetails = (updatedCropData: ProduceModel) => {
        const { sk, pk } = updatedCropData;
        const actualCropID = getCropId(sk || '');
        console.log("actualCropId", actualCropID);
        console.log("updatedCropDetails", updatedCropData);
        dispatch(editProduce({ ...updatedCropData, is_delete: "no", sk, pk }));
    };

    const showKycRequiredModal = () => {
        Modal.info({
            className: "kyc-required-modal",
            content:
                <>
                    <Text>Please update your KYC information to add requirements</Text><br />
                    <Text>Profile &gt; KYC Information</Text>
                </>
            ,
            okText: 'Update Now',
            closable: true,
            onOk: () => history.push(routesMap.profile),
        });
    };

    return (
        <div className="crops-container">
            <Title level={2}>My Requirements</Title>
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
                content="Add Requirements"
            />
            <AddProduce
                currentProduceRecord={currentProduceRecord}
                isEdit={isEdit}
                masterProduceList={masterProduceList}
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
                columns={produceColumns({ deleteProduce, prepareForEditProduce, updateCropDetails, setIsEdit, isEdit, currentCropId }) as any}
                dataSource={buyerState.produceList}
            />
        </div>
    );
};

export default ProduceSection;
