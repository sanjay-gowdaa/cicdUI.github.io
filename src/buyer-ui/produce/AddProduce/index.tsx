import React, { useState } from 'react';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select
} from 'antd';
import { useDispatch } from 'react-redux';

import { addNewProduce } from '../../../store/buyerReducer/actions';
import CancelBtn from '../../../app-components/cancelBtn';
import PrimaryBtn from '../../../app-components/primaryBtn';
import { MasterListApiFormat } from '../../../store/buyerReducer/types';

const { TextArea } = Input;
const { Option } = Select;

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 20 },
};

const fieldwithInfoLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const getMasterProduceListOpts = ({masterProduceList}: {masterProduceList: Array<MasterListApiFormat>}) => {
    return (
        <>
            {
                masterProduceList.map((masterProduceItem: MasterListApiFormat) => {
                    const {produce_name = '', crop_name = '', category_name = '', grade_name = ''} = masterProduceItem;
                    return (
                        <Option
                            key={`${produce_name}-${crop_name}-${category_name}-${grade_name}`}
                            value={`${produce_name}-${crop_name}-${category_name}-${grade_name}`}
                        >
                            {`${produce_name}-${crop_name}-${category_name}-${grade_name}`}
                        </Option>
                    );
                })
            }
        </>
    );
};

const AddCropModal = ({masterProduceList}: {masterProduceList: Array<any>}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = (fieldsValue: any) => {
        const {produce_name, delivery_by, quantity, additional_info} = fieldsValue;
        const [masterProduce, category, sub_type, grade] = produce_name.split('-');
        const deliveryByIsoformat = new Date(delivery_by).toISOString();
        const addProducePayload = {category, sub_type, grade, delivery_by: deliveryByIsoformat, additional_info, quantity};
        console.log('addProducePayload', addProducePayload);
        dispatch(addNewProduce(addProducePayload));
        form.resetFields();
        setModalVisible(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
        setModalVisible(false);
    };

    return (
        <>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => setModalVisible(true)}
                content="Add Produce"
            />
            <Modal
                title="Add Interested Crops"
                visible={modalVisible}
                footer={null}
                maskClosable={false}
                onCancel={() => setModalVisible(false)}
                width={'90%'}
                wrapClassName="add-crop-modal"
            >
                <Form
                    form={form}
                    className="add-crop-form"
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={{additional_info: ''}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={10} lg={10}>
                            <Form.Item
                                label="Select Produce (From Master List)"
                                name="produce_name"
                                rules={[{ required: true, message: 'Please select the Produce!' }]}
                            >
                                <Select className="custom-select" placeholder="Select">
                                    {getMasterProduceListOpts({masterProduceList})}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                {...fieldwithInfoLayout}
                                label="Qunatity"
                                name="quantity"
                                rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                            >
                                <div className="display-flex-row">
                                    <Input className="custom-input" placeholder="In quintal" />
                                    <span className="additional-text">Qtl</span>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Delivery Required By"
                                name="delivery_by"
                                rules={[{ type: 'object', required: true, message: 'Please select time!' }]}
                            >
                                <DatePicker className="custom-input" />
                            </Form.Item>
                            <Form.Item label="Additional Information" name="additional_info">
                                <TextArea className="custom-input" rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <CancelBtn
                                className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                                onClick={onReset}
                            />
                            <Button
                                className="crop-modal-action-btn vikas-btn-radius"
                                type="primary"
                                htmlType="submit"
                            >
                                Add Produce
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AddCropModal;
