import React from 'react'
import { Typography, Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { cropColumns } from './cropsTable.model';
import './crops.scss'
import AddCropModal from './AddCrop';

const { Title } = Typography;

const CropsSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    return (
        <div className='crops-container'>
            <Title level={2}>My Crops</Title>
            <AddCropModal />
            <Table className='margin-t-1em' columns={cropColumns} dataSource={sellerState.cropsList} />
        </div>
    )
}

export default CropsSection;