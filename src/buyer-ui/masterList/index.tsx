import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import MasterList from './addProduce';

const { Title, Paragraph } = Typography;

const AddProduceModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <div>
                <Title level={5}>Create/ Update Your Produce Master List</Title>
                <Paragraph>Add all the produce that you deal with into a master list for quick and easy selection when there a requirement to buy.</Paragraph>
                <Button
                    className="add-produce-btn vikas-btn-radius"
                    onClick={() => setModalVisible(true)}
                >
                    My Master List
                </Button>
            </div>
            <Modal
                title="Add Crop"
                visible={modalVisible}
                footer={null}
                maskClosable={false}
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