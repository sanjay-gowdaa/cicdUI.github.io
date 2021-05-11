import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { produceColumns } from './produceTable.model';
import AddProduce from './AddProduce';

import './crops.scss';
import { deleteSelectedProduce, getProduceList } from '../../store/buyerReducer/actions';
import { ProduceModel } from '../../store/buyerReducer/types';
import PrimaryBtn from '../../app-components/primaryBtn';
import { parseIDfromHash } from '../../app-components/utils';

const { Title } = Typography;

const CropsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as ProduceModel);
    const [modalVisible, setModalVisible] = useState(false);
    const {masterProduceList} = buyerState;
    
    useEffect(() => {
        dispatch(getProduceList())
    }, [])

    const deleteProduce = (produceId: string) => {
        const actualProduceId = parseIDfromHash(produceId);
        dispatch(deleteSelectedProduce(actualProduceId));
    }

    const prepareForEditProduce = (produceData: ProduceModel) => {
        setIsEdit(true);
        setCurrentProduceRecord(produceData);
        setModalVisible(!modalVisible);
    }

    return (
        <div className="crops-container">
            <Title level={2}>My Requirements</Title>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => {
                    setIsEdit(false);
                    setModalVisible(true);
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
                columns={produceColumns({deleteProduce, prepareForEditProduce})}
                dataSource={buyerState.produceList}
            />
        </div>
    );
};

export default CropsSection;
