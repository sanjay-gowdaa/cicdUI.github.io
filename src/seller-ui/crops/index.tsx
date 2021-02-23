import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { cropColumns } from './cropsTable.model';
import './crops.scss';
import AddCropModal from './AddCrop';
import { deleteSelectedCrop, getAllCropsList } from '../../store/sellerReducer/actions';
import { SellerStateModel } from '../../store/sellerReducer/types';

const { Title } = Typography;

const CropsSection = () => {
    const sellerState: SellerStateModel = useSelector((state: RootState) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCropsList());
    }, [])

    const deleteCrop = (cropID: string) => {
        const indexOfHash = cropID.indexOf('#');
        const actualCropID = indexOfHash > 0 ? cropID.substr(indexOfHash+1) : '';
        dispatch(deleteSelectedCrop(actualCropID));
    }

    return (
        <div className="crops-container" id="seller-ui-crops">
            <Title level={2}>My Produce</Title>
            <AddCropModal />
            <Table
                className="margin-t-1em"
                columns={cropColumns({deleteCrop})}
                dataSource={sellerState.cropsList}
            />
        </div>
    );
};

export default CropsSection;
