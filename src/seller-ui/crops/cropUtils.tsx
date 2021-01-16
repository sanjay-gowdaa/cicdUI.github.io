import React from 'react';
import { Select } from 'antd';
import { uniqBy } from 'lodash';
import { CropCategoryModel } from '../../store/sellerReducer/types';
import { camelToSnakeCase } from '../../store/utils';
import { generateFileData } from '../../app-components/utils';
const {Option} = Select

export const renderCategoryOptions = (categories: Array<string>) => {
    const categoryOptions = categories.map((category) => <Option key={category} value={category}>{category}</Option> )
    return categoryOptions;
}

export const renderSubCategoryOptions = (selectedCropDataList: Array<CropCategoryModel>) => {    
    const subCategoryOptions = uniqBy(selectedCropDataList, 'variety').map((curCropData: CropCategoryModel) => {
        const {variety} = curCropData;
        return <Option key={variety} value={variety}>{variety}</Option>
    })
    return subCategoryOptions;
}

export const renderGradeOptionsForSubCategory = (selectedCropDataList: Array<CropCategoryModel>, subCategory: string) => {
    console.log('subCategory', subCategory)
    console.log('filter', selectedCropDataList.filter((cropData: CropCategoryModel) => cropData.variety === subCategory))
    const gradeOptions = selectedCropDataList
                            .filter((cropData: CropCategoryModel) => cropData.variety === subCategory)
                            .map(({grade}: CropCategoryModel, index) => <Option key={`${grade}-${index}`} value={grade}> {grade} </Option>)
    return gradeOptions
}

export const createSellerFormData = (formValues: any) => {
    const sellerCropKeys = Object.keys(formValues);
    const sellerCropJsonData: any = {};
    const sellerCropImagesPromises: Array<Promise<any>> = []
    sellerCropKeys.forEach((cropKey) => {
        if (cropKey !== 'cropImages') {
            const snakeCaseKey = camelToSnakeCase(cropKey);
            const cropDataValue = formValues[cropKey];
            sellerCropJsonData[snakeCaseKey] = cropDataValue;
        } else {
            const cropImagesObject = formValues[cropKey] || {file: {}, fileList: []};
            const {fileList: cropImagesList} = cropImagesObject;
            cropImagesList.forEach((imageFileObj: any, index: number) => {
                const {originFileObj} = imageFileObj;
                const cropImagePromise = generateFileData(originFileObj, `crop_image_${index}`);
                sellerCropImagesPromises.push(cropImagePromise);
            })
        }
    });
    
    return Promise.all(sellerCropImagesPromises).then((cropImagesValues) => {
        return {...sellerCropJsonData, crop_images: cropImagesValues};
    });
};
