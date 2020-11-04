import React from 'react'
import { Typography, Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { cropColumns } from './cropsTable.model';
import './crops.scss'

const { Title } = Typography;

const CropsSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    return (
        <div className='crops-container'>
            <Title level={2}>My Crops</Title>
            <Button type="primary" className='add-crop-btn vikas-btn-radius'>Add Crop</Button>
            <Table className='margin-t-1em' columns={cropColumns} dataSource={sellerState.cropsList} />
        </div>
    )
}

export default CropsSection;