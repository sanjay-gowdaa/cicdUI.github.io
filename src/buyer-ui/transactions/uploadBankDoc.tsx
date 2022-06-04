import React from 'react';
import Compress from 'compress.js';

const UploadBankDoc = (props: any) => {
    
    const {imageFile,setImageFile} = props
    const compress = new Compress()

    const upload=(e:any)=> {
        const files = [...e.target.files];
        compress.compress(files, {
            size: 4, // the max size in MB, defaults to 2MB
            quality: .75, // the quality of the image, max is 1,
            maxWidth: 1000, // the max width of the output image, defaults to 1920px
            maxHeight: 1000, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
        }).then((results) => {
            const img1 = results[0];
            // console.log("img1",img1);
            // const convertedImage = img1.data;
            let uploadFile = {
                content : img1.data,
                filename : "document",
                fieldname: "fieldname"
            };
            // const imgExt = img1.ext
            // const file = Compress.convertBase64ToFile(base64str, imgExt)
            setImageFile({uploadFile});
            // console.log(convertedImage);
        })
    }

    return (

        <>
            <input
                type="file"
                accept='image/*'
                onChange={(e)=>{upload(e)}}
            />
        </>
    )
};

export default UploadBankDoc;