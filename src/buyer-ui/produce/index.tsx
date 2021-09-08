import React, { useEffect, useState } from 'react';
import { Modal, Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { produceColumns } from './produceTable.model';
import AddProduce from './AddProduce';
import './crops.scss';

import { RootState } from '../../store/rootReducer';
import { deleteSelectedProduce, getProduceList } from '../../store/buyerReducer/actions';
import { ProduceModel } from '../../store/buyerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';
import PrimaryBtn from '../../app-components/primaryBtn';
import { routesMap } from '../../constants';

const { Text, Title } = Typography;

const ProduceSection = (props: any) => {
    const { history } = props;
    const buyerState = useSelector((state: RootState) => state.buyer);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as ProduceModel);
    const [modalVisible, setModalVisible] = useState(false);
    const { masterProduceList } = buyerState;
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
                onClick={() => {
                    if (isApproved) {
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
                columns={produceColumns({ deleteProduce, prepareForEditProduce })}
                dataSource={buyerState.produceList}
            />
        </div>
    );
};

export default ProduceSection;
