import React, { useState, useEffect } from 'react';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    InputNumber
} from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { addNewProduce, editProduce } from '../../../store/buyerReducer/actions';
import CancelBtn from '../../../app-components/cancelBtn';
import { MasterListApiFormat, ProduceModel } from '../../../store/buyerReducer/types';

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

type AddCropModalProps = {
    masterProduceList: Array<any>;
    isEdit: boolean;
    currentProduceRecord: ProduceModel;
    setModalVisible: any;
    modalVisible: boolean;
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

const AddCropModal = ({
        masterProduceList,
        isEdit,
        currentProduceRecord,
        setModalVisible,
        modalVisible
    }: AddCropModalProps) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [formInitialize, setFormInitValues] = useState({produce_name: '', quantity: '', delivery_by: '', additional_info: ''});

    useEffect(() => {
        if(modalVisible) {
            const formInitValues: any = isEdit ? 
            processOnEditInitValues(currentProduceRecord) :
            {produce_name: '', quantity: '', delivery_by: '', additional_info: ''};

            setFormInitValues(formInitValues);
            form.setFieldsValue(formInitValues)
        }
    }, [modalVisible]);

    const onFinish = (fieldsValue: any) => {
        const {produce_name, delivery_by, quantity, additional_info} = fieldsValue;
        const [masterProduce, category, sub_type, grade] = produce_name.split('-');
        const deliveryByIsoformat = new Date(delivery_by).toISOString();
        const addProducePayload = {
            crop_name: masterProduce.trim(),
            category: category.trim(),
            sub_type: sub_type.trim(),
            grade: grade.trim(),
            delivery_by: deliveryByIsoformat,
            additional_info,
            quantity: quantity
        };
        const {sk, pk} = currentProduceRecord;
        console.log('addProducePayload', addProducePayload);
        (isEdit 
            ? dispatch(editProduce({...addProducePayload, is_delete: "no", sk, pk})) 
            : dispatch(addNewProduce(addProducePayload)));
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

    const processOnEditInitValues = (currentProduceRecord: ProduceModel) => {
        const {crop_name, category, sub_type, grade} = currentProduceRecord;
        const produce_name = `${crop_name}-${category}-${sub_type}-${grade}`;
        const deliveryByProcessed = moment(currentProduceRecord.delivery_by);
        return {...currentProduceRecord, delivery_by: deliveryByProcessed, produce_name};
    };

    return (
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
                initialValues={formInitialize}
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
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: 'Please input the Qunatity!' }]}
                        >
                            <InputNumber
                                style={{ width: 160 }}
                                className="custom-input"
                                placeholder="In quintal"
                                stringMode
                            />
                            &nbsp; &nbsp; Qtl
                        </Form.Item>
                        <Form.Item
                            label="Request Delivery By"
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
                            { isEdit ? 'Edit' : 'Add' } Requirements
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddCropModal;
