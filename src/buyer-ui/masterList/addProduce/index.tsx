import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Checkbox,
    Col,
    Input,
    List,
    Row,
    Select,
    Space,
    Table,
    Typography
} from 'antd';
import {uniqBy, remove} from 'lodash';
import { FilterOutlined, CaretRightOutlined } from '@ant-design/icons';

import {mockMasterFlatList} from '../../../store/mockMasterList';
import { masterListColumns } from './../masterListTable.model';
import { flatMasterListType } from '../../../store/buyerReducer/types';
import { updateMasterlist } from '../../../store/buyerReducer/actions';
import DefaultBtn from '../../../app-components/defaultBtn';
import CancelBtn from '../../../app-components/cancelBtn';

import '../../../app-components/customComponent.scss';

const { Search } = Input;
const { Option } = Select;
const { Text, Title } = Typography;

const MasterList = (props: any) => {
    const {setModalVisible} = props;
    const dispatch = useDispatch();
    const [masterList, updateMasterList] = useState(mockMasterFlatList);
    const [produceListForMasterCategory, setProduceListForMasterCategory] = useState([]);
    const [selectedProduce, setSelectedProduce] = useState({produceId: '', produceName: ''});
    const [selectedCropDetails, setSelectedCropDetails] = useState({cropId: '', cropName: ''});
    const [selectedCategoryDetails, setSelectedCategoryDetails] = useState({categoryId: '', categoryName: ''});
    const [addedMasterList, updateAddedMasterList] = useState([]);
    
    /* On change of master produce selection*/
    const handleMasterProduceChange = (productName: string) => {
        const filteredLi = masterList.filter((prod) => prod.produce_id === productName);
        const updatedArr: any = [...produceListForMasterCategory, ...filteredLi];
        
        setProduceListForMasterCategory(updatedArr);
    }

    /* Show options for master produce details */
    const renderMasterProduceChildren = () => {
        const uniqueProduce = uniqBy(masterList, 'produce_id');
        return (
            <>
                {
                    uniqueProduce.map((produce) => {
                        const {produce_id, produce_name} = produce;
                        return <Option key={produce_id} value={produce_id}>{produce_name}</Option>;
                    })
                }
            </>
        )
    };

    /* Get/Show Crops for the selected master produce */
    const getProduceTypeData = (): Array<{produceId: string, produceName: string, cropId: string, cropName: string}> => {
        const uniqueProduce: Array<flatMasterListType> = uniqBy(produceListForMasterCategory, 'crop_id');
        return uniqueProduce.map((productData) => {
            return {
                produceId: productData.produce_id,
                produceName: productData.produce_name,
                cropId: productData.crop_id,
                cropName: productData.crop_name
            };
        });
    };

    /* Show categories for the selected Crop */
    const getCategoryListData = () => {
        /* Filter the categories from the crop list based on crop selected */
        const filteredCrops: Array<flatMasterListType> = produceListForMasterCategory.filter(
            (produce: flatMasterListType) => produce.crop_id === selectedCropDetails.cropId
        );
        
        /* Since its a flat array, and there might be multiple entries of same category, 
            get only the unique categories to be displayed */
        const uniqueCategories: Array<{categoryID: string, categoryName: string}> = uniqBy(filteredCrops, 'category_id').map((matchedCrop: flatMasterListType) => {
            return ({
                categoryID: matchedCrop.category_id,
                categoryName: matchedCrop.category_name
            });
        });        
        return uniqueCategories;
    };

    /* Show grades for the selected Category */
    const getGradeData = () => {
        const uniqueCrop: Array<{gradeID: string, gradeName: string}> = produceListForMasterCategory.filter(
            (produce: flatMasterListType) => produce.category_id === selectedCategoryDetails.categoryId
        ).map((matchedCrop: flatMasterListType) => {
            return ({
                gradeID: matchedCrop.grade_id,
                gradeName: matchedCrop.grade_name
            });
        });
        return uniqueCrop;
    };

    const addCropToList = ({gradeId, gradeName}: {gradeId: string, gradeName: string}) => {
        const {produceId, produceName} = selectedProduce;
        const {categoryName, categoryId} = selectedCategoryDetails;
        const {cropName, cropId} = selectedCropDetails;
        
        /* Update reference/existing arrays */
        // Update original masterList
        let duplicateMasterList = [...masterList];
        remove(duplicateMasterList, (masterProduce: flatMasterListType) => masterProduce.crop_id === cropId && masterProduce.grade_id === gradeId);
        updateMasterList(duplicateMasterList);
        
        // Update produce list based on dropdown values
        // let duplicateProduceList = [...produceListForMasterCategory];
        // remove(duplicateProduceList, (masterProduce: flatMasterListType) => masterProduce.crop_id === cropId && masterProduce.grade_id === gradeId);
        // setProduceListForMasterCategory(duplicateProduceList);
        
        /* Table data manipulations start */
        // Create entry data
        const entryData = {categoryName, cropName, categoryId, cropId, produceId, produceName, gradeId, gradeName};
        
         // Update master list
        const updatedMasterList: any = [...addedMasterList, entryData];
        updateAddedMasterList(updatedMasterList);
        /* Table data manipulations end */
    }

    const setSelectedClassName = (selectedClassName: string, listType: string) => {
        var element = document.getElementsByClassName(selectedClassName);
        var idName = "";
        var gradeSelected = "";
        var isGrade = false;

        switch(listType){
            case "produce": {
                idName="selected-produce-item";
                break;
            }
            case "variety": {
                idName="selected-variety-item";
                break;
            }
            case "grade": {
                gradeSelected="selected-grade-item";
                isGrade = true;
                break;
            }
        }

        if (isGrade) {
            element.item(0)?.setAttribute("className", gradeSelected);
        } else {
            element.item(0)?.setAttribute("id",idName);
        }
    };
    
    return (
        <>
        <Row gutter={16}>
            <Col>
                <Title level={5}>Select all the produce you buy regularly</Title>
                <Text>Select Produce Category</Text>
                <Select
                    className="custom-select"
                    allowClear
                    placeholder="Please select"
                    onChange={handleMasterProduceChange}
                    style={{ width: '100%' }}
                >
                    {renderMasterProduceChildren()}
                </Select>
            </Col>
        </Row>
        <Row className="margin-t-1em">
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Produce</Title>
                    <Search className="custom-search" placeholder="Search" />
                    {
                        getProduceTypeData().map((item: any) =>{ 
                            return (
                            <List.Item
                                className= {item.cropId}
                                onClick={(options: any) => {
                                    setSelectedProduce({produceId: item.produceId, produceName: item.produceName});
                                    setSelectedCropDetails({cropId: item.cropId, cropName: item.cropName});
                                    document.getElementById("selected-produce-item")?.removeAttribute("id");
                                    setSelectedClassName(item.cropId, "produce");
                                }}
                                key={item.cropId}
                            >
                                {item.cropName}<CaretRightOutlined />
                            </List.Item>);
                        })
                    }
                </div>
            </Col>
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Variety</Title>
                    <Search className="custom-search" placeholder="Search" />
                    {
                        getCategoryListData().map((item: any) => {
                            return (
                                <List.Item
                                    className={item.categoryID}
                                    onClick={(options: any) => {
                                        setSelectedCategoryDetails({categoryId: item.categoryID, categoryName: item.categoryName})
                                        document.getElementById("selected-variety-item")?.removeAttribute("id");
                                        setSelectedClassName(item.categoryID, "variety");
                                    }} 
                                    key={item.categoryID}
                                >
                                    {item.categoryName}
                                </List.Item>
                            );
                        })
                    }
                </div>
            </Col>
            <Col span={8}>
                <div className="custom-list">
                    <Title level={5}>Grade</Title>
                    {
                       getGradeData().map((item: any) =>{
                           return(
                                <List.Item
                                    className={item.gradeName}
                                    actions={[
                                        <Checkbox
                                            className="custom-checkbox"
                                            onChange={() => {
                                                addCropToList({gradeId: item.gradeID, gradeName: item.gradeName})
                                                setSelectedClassName(item.gradeName, "grade");
                                            }}>
                                                {item.gradeName}
                                        </Checkbox>]} 
                                    key={`${selectedCategoryDetails?.categoryId}-${item.gradeID}`}
                                />
                            );
                       }) 
                    }
                </div>
            </Col>
        </Row>
        <Row className="margin-t-1em">
            <Col>
                <Space direction="vertical">
                    <Title level={5}>My Master List</Title>
                    <Space>
                        <Search className="custom-search" placeholder="Search" />
                        <DefaultBtn icon={<FilterOutlined/>} content="Filter" />
                        </Space>
                </Space>
            </Col>
        </Row>
        <Row justify="center">
            <Col>
                <Table
                    className="margin-t-1em"
                    columns={masterListColumns({removeProduceEntry: (record: any) => {
                        console.log('removeProduceEntry', record)
                    }})}
                    pagination={ false }
                    rowClassName="custom-row"
                    scroll = {{y: 100}}
                    dataSource={addedMasterList}
                />
            </Col>
        </Row>
        <Row justify="center">
            <Col>
                <CancelBtn
                    className="margin-l-r-1em crop-modal-action-btn vikas-btn-radius"
                    onClick={() => {
                        setModalVisible(false);
                    }}
                />
                <Button
                    className="crop-modal-action-btn vikas-btn-radius"
                    type="primary"
                    onClick={() => {
                        dispatch(updateMasterlist(addedMasterList));
                        setModalVisible(false);
                    }}
                >
                    Done
                </Button>
            </Col>
        </Row>
        </>
    )
}

export default MasterList;
