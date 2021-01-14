// const converBase64toBlob = (content, contentType) => {
//     contentType = contentType || '';
//     var sliceSize = 512;
//     var byteCharacters = window.atob(content); //method which converts base64 to binary
//     var byteArrays = [
//     ];
//     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       var slice = byteCharacters.slice(offset, offset + sliceSize);
//       var byteNumbers = new Array(slice.length);
//       for (var i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       var byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }
//     var blob = new Blob(byteArrays, {
//       type: contentType
//     }); //statement which creates the blob
//     return blob;
// }


export const proccessFileToBase64 = (inputFileObj: any) => {
    const webworkerReader = new FileReader();

    return new Promise((resolve, reject) => {
        webworkerReader.onerror = () => {
            webworkerReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
    
        webworkerReader.onload = function() {
            const binaryStr: any = webworkerReader.result;
            const base64Str = btoa(binaryStr);
            resolve(base64Str);
        };

        webworkerReader.readAsBinaryString(inputFileObj);
    });
}

export const generateFileData = async (fileObject: {name: string, type: string}, fieldname: string) => {
    const filename = fileObject.name;
    const content = await proccessFileToBase64(fileObject);
    return {fieldname, filename , content};
}