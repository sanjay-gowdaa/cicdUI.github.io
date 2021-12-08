import React, { useContext } from 'react';
import { Input, Button, Form, DatePicker } from 'antd';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';

import { ProduceModel } from '../../../store/buyerReducer/types';
import confirmationPopup from '../../../buyer-seller-commons/confirmationPopup';
import { validateQuantity } from '../../../buyer-seller-commons/produce/utils';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof ProduceModel | 'action';
    record: ProduceModel;
    isEdit: boolean;
    setIsEdit: Function;
    handleSave: (record: ProduceModel) => void;
};

interface EditableRowProps {
    index: number;
};

const ActionEditComponent = (
    {
        dataIndex,
        record,
        editForm,
        setIsEdit,
        handleSave,
        ...restProps
    }: any) => {
    editForm.setFieldsValue({
        'delivery_by': moment(record['delivery_by']),
        'quantity': record['quantity']
    })

    const save = async () => {
        try {
            const values = await editForm.validateFields();
            setIsEdit(false)
            handleSave({ ...record, ...values })
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    return (
        <td {...restProps}>
            <Button
                type="link"
                block
                onClick={() => confirmationPopup('save', save, null)}
            >
                Save
            </Button>
            <Button
                type="link"
                danger
                block
                onClick={() => setIsEdit(false)}
            >
                Cancel
            </Button>
        </td>
    );
};

const RequestDeliveryByComponent = ({ dataIndex, record, ...restProps }: any) => {
    const defaultDateStart = new Date();
    const defaultDateEnd = new Date();
    defaultDateStart.setDate(defaultDateStart.getDate() + 4);
    defaultDateEnd.setDate(defaultDateEnd.getDate() + 20);

    const disabledDate = (currentDate: Object) => {
        return currentDate < moment(defaultDateStart, 'YYYY-MM-DD') || currentDate > moment(defaultDateEnd, 'YYYY-MM-DD');
    };

    return (
        <td {...restProps}>
            <Form.Item
                shouldUpdate
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ type: 'object', required: true, message: 'Please select date!' }]}
            >
                <DatePicker
                    className="custom-input"
                    disabledDate={disabledDate}
                    format="YYYY-MM-DD"
                />
            </Form.Item>
        </td>
    );
};

const QuantityEditComponent = ({ dataIndex, record, ...restProps }: any) => {
    return (
        <td {...restProps}>
            <Form.Item
                shouldUpdate
                style={{ margin: 0 }}
                name={dataIndex}
                initialValue={record.quantity}
                rules={[{
                    required: true,
                    validator: (rules, value) => validateQuantity(rules, value)
                }]}
            >
                <Input className="custom-input" placeholder="In quintal" />
            </Form.Item>
        </td>
    );
};

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    isEdit,
    setIsEdit,
    handleSave,
    ...restProps
}) => {
    const editForm = useContext(EditableContext)!;
    const genericProps = {
        record,
        dataIndex,
        handleSave,
        setIsEdit
    };

    if (editable) {
        switch (dataIndex) {
            case 'action':
                return isEdit ? <ActionEditComponent editForm={editForm} {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

            case 'delivery_by':
                return isEdit ? <RequestDeliveryByComponent {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

            case 'quantity':
                return isEdit ? <QuantityEditComponent {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

            default:
                return <td {...restProps}>{children}</td>;
        }
    } else {
        return <td {...restProps}>{children}</td>;
    }
};

export { EditableCell, EditableRow };
