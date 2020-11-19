import React, {useState} from 'react';
import { Row, Col, Select, List } from 'antd';
import {uniqBy} from 'lodash';
import {flatMasterListType, masterFlatList} from '../../store/mockMasterList';
const { Option } = Select;

const MasterList = () => {
    const [selectedProduceDetails, setSelectedProduceDetails] = useState([]);
    const [selectedCropID, setSelectedCropID] = useState('');
    const [selectedCategoryID, setSelectedCategoryID] = useState('');
    
    const handleChange = (value: Array<any>, option: any) => {
        value.forEach((productName, index) => {
            const filteredLi = masterFlatList.filter((prod) => prod.produce_id === productName)
            const updatedArr: any = [...selectedProduceDetails, ...filteredLi]
            setSelectedProduceDetails(updatedArr)  
        })
    }

    const renderChildren = () => {
        const uniqueProduce = uniqBy(masterFlatList, 'produce_id')
        return (
            <>
                {
                    uniqueProduce.map((produce) => {
                        const {produce_id, produce_name} = produce
                        return <Option key={produce_id} value={produce_id}>{produce_name}</Option> 
                    })
                }
            </>
        )

    }

    const getProduceTypeData = () => {
        const uniqueProduce: Array<flatMasterListType> = uniqBy(selectedProduceDetails, 'crop_id')        
        return uniqueProduce.map((productData) => {
            return {cropId: productData.crop_id, cropName: productData.crop_name}
        })
    }

    const getCropData = () => {
        const uniqueCrop: Array<{categoryID: string, categoryName: string}> = selectedProduceDetails.filter(
            (produce: flatMasterListType) => produce.crop_id === selectedCropID
        ).map((matchedCrop: flatMasterListType) => {
            return ({
                categoryID: matchedCrop.category_id,
                categoryName: matchedCrop.category_name
            })
        })        
        return uniqueCrop;
    }

    const getGradeData = () => {
        const uniqueCrop: Array<{gradeID: string, gradeName: string}> = selectedProduceDetails.filter(
            (produce: flatMasterListType) => produce.category_id === selectedCategoryID
        ).map((matchedCrop: flatMasterListType) => {
            return ({
                gradeID: matchedCrop.grade_id,
                gradeName: matchedCrop.grade_name
            })
        })        
        return uniqueCrop;
    }

    return (
        <>
        <Row gutter={16}>
            <Col span={8}>
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    {renderChildren()}
                </Select>
            </Col>
        </Row>
        <Row gutter={16} className='margin-t-1em'>
            <Col className="gutter-row" span={8}>
                <List
                    size="large"
                    header={<div>Crops</div>}
                    bordered
                    dataSource={getProduceTypeData()}
                    renderItem={(item: any) => {
                        return (
                            <List.Item  
                                onClick={(options: any) => setSelectedCropID(item.cropId)}
                                key={item.cropId}
                            >
                                {item.cropName}
                            </List.Item>
                        )
                    }}
                />
            </Col>
            <Col className="gutter-row" span={8}>
                <List
                    size="large"
                    header={<div>Category</div>}
                    bordered
                    dataSource={selectedCropID ? getCropData() : []}
                    renderItem={(item: any) => {
                        return (
                            <List.Item
                                onClick={(options: any) => setSelectedCategoryID(item.categoryID)} 
                                key={item.categoryID}
                            >
                                {item.categoryName}
                            </List.Item>
                        )   
                    }}
                />
            </Col>
            <Col className="gutter-row" span={8}>
                <List
                    size="large"
                    header={<div>Grade</div>}
                    bordered
                    dataSource={selectedCategoryID ? getGradeData(): []}
                    renderItem={(item: any) => <List.Item key={`${selectedCategoryID}-${item.gradeID}`}>{item.gradeName}</List.Item>}
                />
            </Col>
        </Row>
        </>
    )
}

export default MasterList;