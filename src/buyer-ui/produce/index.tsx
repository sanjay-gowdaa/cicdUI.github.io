import React, { useEffect, useState } from 'react';
import { Table, Typography, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { produceColumns } from './produceTable.model';
import AddProduce from './AddProduce';
import './crops.scss';

import { RootState } from '../../store/rootReducer';
import { deleteSelectedProduce, getProduceList } from '../../store/buyerReducer/actions';
import { ProduceModel } from '../../store/buyerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';
import PrimaryBtn from '../../app-components/primaryBtn';

const { Title } = Typography;

const CropsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as ProduceModel);
    const [modalVisible, setModalVisible] = useState(false);
    const {masterProduceList} = buyerState;
    const isApproved = (loginState.kyc_flag === "approved");

    useEffect(() => {
        dispatch(getProduceList());
    }, []);

    const deleteProduce = (produceId: string) => {
        const actualProduceId = parseIDfromHash(produceId);
        dispatch(deleteSelectedProduce(actualProduceId));
    };

    const prepareForEditProduce = (produceData: ProduceModel) => {
        setIsEdit(true);
        setCurrentProduceRecord(produceData);
        setModalVisible(!modalVisible);
    };

    return (
        <div className="crops-container">
            <Title level={2}>My Requirements</Title>
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
                    content="Add Requirements"
                />
            </Tooltip>
            <AddProduce
                currentProduceRecord={currentProduceRecord}
                isEdit={isEdit}
                masterProduceList={masterProduceList}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
            <Table
                className="margin-t-1em"
                columns={produceColumns({deleteProduce, prepareForEditProduce})}
                dataSource={buyerState.produceList}
            />
        </div>
    );
};

export default CropsSection;
