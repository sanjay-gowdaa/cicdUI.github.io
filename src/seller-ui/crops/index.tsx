import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { cropColumns } from './cropsTable.model';
import './crops.scss';
import AddCropModal from './AddCrop';
import { deleteSelectedCrop, getAllCropsList } from '../../store/sellerReducer/actions';
import { CropApiModel, SellerStateModel } from '../../store/sellerReducer/types';
import PrimaryBtn from '../../app-components/primaryBtn';

const { Title } = Typography;

const CropsSection = () => {
    const sellerState: SellerStateModel = useSelector((state: RootState) => state.seller);
    const [isEdit, setIsEdit] = useState(false);
    const [currentProduceRecord, setCurrentProduceRecord] = useState({} as CropApiModel);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCropsList());
    }, [])

    const prepareForEditCrop = (cropData: CropApiModel) => {
        setIsEdit(true);
        setCurrentProduceRecord(cropData);
        setModalVisible(true);
    }

    const deleteCrop = (cropID: string) => {
        const indexOfHash = cropID.indexOf('#');
        const actualCropID = indexOfHash > 0 ? cropID.substr(indexOfHash+1) : '';
        dispatch(deleteSelectedCrop(actualCropID));
    }

    return (
        <div className="crops-container" id="seller-ui-crops">
            <Title level={2}>My Produce</Title>
            <PrimaryBtn
                className="add-crop-btn vikas-btn-radius"
                onClick={() => {
                    setIsEdit(false);
                    setModalVisible(true)
                }}
                content="Add Produce"
            />
            <AddCropModal
                currentProduceRecord={currentProduceRecord}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
            <Table
                className="margin-t-1em"
                columns={cropColumns({deleteCrop, prepareForEditCrop})}
                dataSource={sellerState.cropsList}
            />
        </div>
    );
};

export default CropsSection;
