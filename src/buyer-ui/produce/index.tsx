import React, { useEffect, useState } from 'react';
import { Table, Typography, Button, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { produceColumns } from './produceTable.model';
import AddProduce from './AddProduce';
import './crops.scss';

import { RootState } from '../../store/rootReducer';
import { deleteSelectedProduce, getProduceList } from '../../store/buyerReducer/actions';
import { ProduceModel } from '../../store/buyerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';

const { Title } = Typography;

const CropsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as ProduceModel);
    const [modalVisible, setModalVisible] = useState(false);
    const {masterProduceList} = buyerState;
    var isApproved;
    if(loginState.kyc_flag === "approved") {
        isApproved = 'true' ;
    };

    
    useEffect(() => {
        dispatch(getProduceList());
    }, [])

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
            <Tooltip title="Please complete your KYC to add requirements" >
                <Button
                    className={isApproved? "custom-primary-button add-crop-btn vikas-btn-radius": "add-crop-btn vikas-btn-radius custom-default-button "}
                    onClick={() => {
                        setIsEdit(false);
                        setModalVisible(true);
                    }}
                    style={!isApproved ? { display: "none" } : {}}
                    disabled={!isApproved }
                >
                    Add Requirements              
                </Button>
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
