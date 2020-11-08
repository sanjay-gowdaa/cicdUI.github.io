export const UPDATE_FORM = 'UPDATE_FORM';

export const updateForm = (formData: any) => {

    return {

       type: UPDATE_FORM,
        payload: formData
    };

};