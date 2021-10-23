import React, { useContext } from 'react';
import { Input, Button, Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { validateSellerPrice } from '../cropUtils';

import { CropApiModel } from '../../../store/sellerReducer/types';
import confirmationPopup from '../../../buyer-seller-commons/confirmationPopup';

const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof CropApiModel | 'action';
    record: CropApiModel;
    isEdit: boolean;
    setIsEdit: any;
    handleSave: (record: CropApiModel) => void;
};

interface EditableRowProps {
    index: number;
};

const ActionEditComponent = ({ dataIndex, record, editForm, setIsEdit, handleSave, ...restProps }: any) => {
    editForm.setFieldsValue({
        'intent_to_sell': record['intent_to_sell'],
        'price_per_qnt': record['price_per_qnt'],
        'quantity': record['quantity']
    })

    const save = async () => {
        try {
            const values = await editForm.validateFields();
            const isPriceUpdated = editForm.getFieldValue('price_per_qnt') !== record['price_per_qnt']
            setIsEdit(false)
            handleSave({ ...record, ...values }, isPriceUpdated)
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    return (
        <td {...restProps}>
            <Button
                type="link"
                block
                className="save-button"
                onClick={() => confirmationPopup('save', save, null)}
            >
                Save
            </Button>
            <Button
                type="link"
                danger
                block
                className="cancel-button"
                onClick={() => setIsEdit(false)}
            >
                Cancel
            </Button>
        </td>
    );
};

const IntentToSellEditComponent = ({ dataIndex, record, ...restProps }: any) => {
    return (
        <td {...restProps}>
            <Form.Item
                shouldUpdate
                style={{ margin: 0 }}
                name={dataIndex}
            >
                <Select
                    className="custom-select"
                    placeholder="Select"
                >
                    <Option value='Yes'>Yes</Option>
                    <Option value='No'>No</Option>
                </Select>
            </Form.Item>
        </td>
    );
};

const PriceEditComponent = ({ dataIndex, record, ...restProps }: any) => {
    return (
        <td {...restProps}>
            <Form.Item
                shouldUpdate
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{
                    required: true,
                    validator: (rule, value) => validateSellerPrice(rule, value, record.apmc_rate_data.apmc_price)
                }]}
            >
                <Input className="custom-input" placeholder="In rupees" />
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
                rules={[{
                    required: true,
                    message: `Quantity is required.`,
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

            case 'intent_to_sell':
                return isEdit ? <IntentToSellEditComponent {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

            case 'price_per_qnt':
                return isEdit ? <PriceEditComponent {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

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
