import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import MasterList from './addProduce';

const AddProduceModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Button
                type="primary"
                className="add-produce-btn vikas-btn-radius"
                onClick={() => setModalVisible(true)}
            >
                My Master List
            </Button>
            <Modal
                title="Add Crop"
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                onCancel={() => setModalVisible(false)}
                width={'90%'}
                wrapClassName="add-produce-modal"
            >
                <MasterList />
            </Modal>
        </>
    )
}

export default AddProduceModal;