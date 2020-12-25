import {cloneDeep} from 'lodash';

export const convertMasterListToGradeStructure = (masterList: Array<any>) => {
    let gradeDataStructure: any = {};
    masterList.forEach((masterCropDetails) => {
        const {produce_name, crop_name, category_name, grade_name} = masterCropDetails;
        gradeDataStructure = updateMasterCropDatastructure(grade_name, true, {gradeDataStructure, selectedProduceCategory: produce_name, selectedCrop: crop_name, selectedVariety: category_name})
    });
    return gradeDataStructure;
}

export const updateMasterCropDatastructure = (
        gradeSelection: string,
        isSelected: boolean,
        {gradeDataStructure, selectedProduceCategory, selectedCrop, selectedVariety}: any
    ) => {
    const gradeDataStructreCopied = cloneDeep(gradeDataStructure);
    if(gradeDataStructreCopied[selectedProduceCategory])  {
        const allCropsDataFromProduce = gradeDataStructreCopied[selectedProduceCategory]
        if(allCropsDataFromProduce[selectedCrop]) {
            const allCategoryDataForCrop = allCropsDataFromProduce[selectedCrop]
            if(allCategoryDataForCrop[selectedVariety]) {
                const updatedCatGrade = {...allCategoryDataForCrop[selectedVariety], [gradeSelection]: isSelected}
                Object.assign(gradeDataStructreCopied[selectedProduceCategory][selectedCrop], {[selectedVariety]: updatedCatGrade})
                // updateSelectedList( gradeDataStructreCopied)
                return gradeDataStructreCopied;
            } else {
                Object.assign(gradeDataStructreCopied[selectedProduceCategory][selectedCrop], {[selectedVariety]: {[gradeSelection]: isSelected}})
                return gradeDataStructreCopied;
            }
        } else {
            Object.assign(gradeDataStructreCopied[selectedProduceCategory], {[selectedCrop]: {[selectedVariety]: {[gradeSelection]: isSelected}}})
            return gradeDataStructreCopied;
        }
    } else {
        Object.assign(gradeDataStructreCopied, { [selectedProduceCategory]: { [selectedCrop]: {[selectedVariety]: {[gradeSelection]: isSelected} } } });
        return gradeDataStructreCopied;    }
}