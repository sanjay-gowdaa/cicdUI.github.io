import React, { useEffect, useState } from 'react';
import { Modal, Typography } from 'antd';

import MasterList from './addProduce';
import DefaultBtn from '../../app-components/defaultBtn';
import { useDispatch } from 'react-redux';
import { getMasterProduceList } from '../../store/buyerReducer/actions';

const { Paragraph, Title } = Typography;

const AddProduceModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getMasterProduceList())
    }, [])
    return (
        <>
            <div>
                <Title level={5}>Create/ Update Your Produce Master List</Title>
                <Paragraph>Add all the produce that you deal with into a master list for quick and easy selection when there a requirement to buy.</Paragraph>
                <DefaultBtn
                    className="add-produce-btn vikas-btn-radius"
                    onClick={() => setModalVisible(true)}
                    content="My Master List"
                />
            </div>
            <Modal
                title={<Title level={3}>Produce Master List</Title>}
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                className="custom-masterlist-modal"
                onCancel={() => setModalVisible(false)}
                width={'90%'}
                wrapClassName="add-produce-modal"
            >
                <MasterList setModalVisible={setModalVisible} />
            </Modal>
        </>
    )
}

export default AddProduceModal;