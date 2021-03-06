import React, { useContext } from 'react';
import { Input, Button, Form, Select } from 'antd';
import { CropApiModel } from '../../../store/sellerReducer/types';
import { FormInstance } from 'antd/lib/form';
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
}
  
interface EditableRowProps {
    index: number;
}

const ActionEditComponent = ({dataIndex, record, editForm, setIsEdit, handleSave, ...restProps}: any) => {
    editForm.setFieldsValue({'intent_to_sell': record['intent_to_sell'], 'price_per_qnt': record['price_per_qnt']})

    const save = async () => {
        try {
            const values = await editForm.validateFields();
            setIsEdit(false)
            handleSave({...record, ...values})
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    return (
        <td {...restProps}>
            <Button
                type="link"
                block
                onClick={save}
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
    )
}

const IntentToSellEditComponent = ({dataIndex, record, ...restProps}: any) => {
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
    )
}

const PriceEditComponent = ({dataIndex, record, ...restProps}: any) => {
    return (
        <td {...restProps}>
            <Form.Item
                shouldUpdate
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `Price is required.`,
                    }
                ]}
            >
                <Input className="custom-input" placeholder="In rupees" />
            </Form.Item>
        </td>
    )
}

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
    handleSave,
    ...restProps
}) => {
    const editForm = useContext(EditableContext)!;
    const genericProps = {
        record,
        dataIndex,
        handleSave
    }

    if(editable) {
        switch(dataIndex) {
            case 'action':
                return isEdit ? <ActionEditComponent editForm={editForm} {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;
            
            case 'intent_to_sell':
                return isEdit ? <IntentToSellEditComponent {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

            case 'price_per_qnt':
                return isEdit ? <PriceEditComponent {...genericProps} {...restProps} /> : <td {...restProps}>{children}</td>;

            default:
                return <td {...restProps}>{children}</td>;
        }
    } else {
        return <td {...restProps}>{children}</td>;
    }
};
  
export {EditableCell, EditableRow}