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
    Divider,
    Typography
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { addNewProduce } from '../../../store/buyerReducer/actions';
import CancelBtn from '../../../app-components/cancelBtn';
import { MasterListApiFormat, ProduceModel } from '../../../store/buyerReducer/types';
import { RootState } from '../../../store/rootReducer';
import { validateQuantity } from '../../../buyer-seller-commons/produce/utils';

const { Text } = Typography;
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
    masterProduceList: Array<MasterListApiFormat>;
    isEdit: boolean;
    currentProduceRecord: ProduceModel;
    setModalVisible: Function;
    modalVisible: boolean;
};

const getMasterProduceListOpts = ({ masterProduceList }: { masterProduceList: Array<MasterListApiFormat> }) => {

    return (
        <React.Fragment>
            {masterProduceList.map((masterProduceItem: MasterListApiFormat) => {
                const { produce_name = '', crop_name = '', category_name = '', grade_name = '' } = masterProduceItem;

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
        </React.Fragment>
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
    const defaultDateStart = new Date();
    const defaultDateEnd = new Date();
    defaultDateStart.setDate(defaultDateStart.getDate() + 4);
    defaultDateEnd.setDate(defaultDateEnd.getDate() + 20);
    const [formInitialize, setFormInitValues] =
        useState({ produce_name: '', quantity: '', delivery_by: '', additional_info: '' });

    const buyerState = useSelector((state: RootState) => state.buyer);
    const { produceList } = buyerState;

    useEffect(() => {
        if (modalVisible) {
            const formInitValues: any = isEdit ?
                processOnEditInitValues(currentProduceRecord) :
                { produce_name: '', quantity: '', delivery_by: '', additional_info: '' };

            setFormInitValues(formInitValues);
            form.setFieldsValue(formInitValues)
        }
    }, [modalVisible]);

    const onFinish = (fieldsValue: any) => {
        const {
            produce_name,
            // delivery_by, 
            quantity
        } = fieldsValue;
        const [masterProduce, category, sub_type, grade] = produce_name.split('-');
        // const deliveryByIsoformat = new Date(delivery_by).toISOString();
        const additional_info = {
            moisture: fieldsValue.moisture,
            other_info: fieldsValue.other_info,
            packing_size: fieldsValue.packing_size,
            packing_type: fieldsValue.packing_type,
            fungus: fieldsValue.fungus
        };
        const addProducePayload = {
            crop_name: masterProduce.trim(),
            category: category.trim(),
            sub_type: sub_type.trim(),
            grade: grade.trim(),
            // delivery_by: deliveryByIsoformat,
            additional_info,
            isEditable: true,
            quantity: quantity
        };
        const produceName = `${addProducePayload.crop_name}-${addProducePayload.category}-${addProducePayload.sub_type}-${addProducePayload.grade}`;

        let counter = 0;
        for (let i = 0; i < produceList.length; i++) {
            const produceListName = `${produceList[i].crop_name}-${produceList[i].category}-${produceList[i].sub_type}-${produceList[i].grade}`;
            if (produceListName === produceName) {
                counter++;
            }
        }
        if (counter < 2) {
            dispatch(addNewProduce(addProducePayload));
            form.resetFields();
            setModalVisible(false);
        } else {
            Modal.error({
                title: "You can't add a requirement more than two times!",
                content: "Please wait till the requirement is fulfilled to add the same requirement!"
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
        setModalVisible(false);
    };

    const processOnEditInitValues = (currentProduceRecord: ProduceModel) => {
        const { crop_name, category, sub_type, grade } = currentProduceRecord;
        const produce_name = `${crop_name}-${category}-${sub_type}-${grade}`;
        const deliveryByProcessed = moment(currentProduceRecord.delivery_by);
        return { ...currentProduceRecord, delivery_by: deliveryByProcessed, produce_name };
    };

    const disabledDate = (currentDate: Object) => {
        return currentDate < moment(defaultDateStart, 'YYYY-MM-DD') || currentDate > moment(defaultDateEnd, 'YYYY-MM-DD');
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
                                {getMasterProduceListOpts({ masterProduceList })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...fieldwithInfoLayout}
                            label="Quantity"
                            name="quantity"
                            rules={[{
                                required: true,
                                validator: (rules, value) => validateQuantity(rules, value)
                            }]}
                        >
                            <Form.Item name="quantity">
                                <Input
                                    style={{ width: 160 }}
                                    className="custom-input"
                                    placeholder="In quintal"
                                    suffix="Qtl"
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="Request Delivery By"
                            name="delivery_by"
                        // rules={[{ type: 'object', required: true, message: 'Please select time!' }]}
                        >
                            <DatePicker
                                disabled={true}
                                className="custom-input"
                                format="YYYY-MM-DD"
                                defaultValue={moment(defaultDateStart, 'YYYY-MM-DD')}
                                disabledDate={disabledDate}
                            />
                        </Form.Item>
                    </Col>
                    <Divider className="height-full" type="vertical" style={{ height: "25rem", color: "black" }} />
                    <Col span={12}>
                        <Form.Item label={<Text style={{ fontWeight: 700 }} >Buyer Specifications</Text>}>
                            <Form.Item
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                labelAlign="left"
                                label="Moisture"
                                name="moisture"
                            >
                                <Input
                                    className="custom-input"
                                    placeholder="Moisture in %"
                                />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                labelAlign="left"
                                label="Fungus"
                                name="fungus"
                            >
                                <Input
                                    className="custom-input"
                                    placeholder="Fungus in %"
                                />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                labelAlign="left"
                                label="Packing Type"
                                name="packing_type"
                            >
                                <Input
                                    className="custom-input"
                                    placeholder="Packing type"
                                />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                labelAlign="left"
                                label="Packing Size"
                                name="packing_size"
                            >
                                <Input
                                    className="custom-input"
                                    placeholder="Packing size in kg"
                                />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                labelAlign="left"
                                label="Other Information"
                                name="other_info"
                            >
                                <TextArea className="custom-input" rows={4} />
                            </Form.Item>
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
                            className="crop-modal-action-btn vikas-btn-radius add-edit-button"
                            type="primary"
                            htmlType="submit"
                        >
                            Add Requirements
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddCropModal;
