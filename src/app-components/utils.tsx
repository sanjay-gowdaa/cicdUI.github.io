/** Convert base64 to blob
 * 
 * @param { any } content 
 * @param { any } contentType 
 * @returns Blob
 */
export const converBase64toBlob = (content: any, contentType: any) => {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
        type: contentType
    }); //statement which creates the blob
    return blob;
};

/** Convert file to base64
 * 
 * @param { any } inputFileObj - File object
 * @returns base64 data
 */
export const proccessFileToBase64 = (inputFileObj: any) => {
    const webworkerReader = new FileReader();

    return new Promise((resolve, reject) => {
        webworkerReader.onerror = () => {
            webworkerReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        webworkerReader.onload = function () {
            const binaryStr: any = webworkerReader.result;
            const base64Str = btoa(binaryStr);
            resolve(base64Str);
        };

        webworkerReader.readAsBinaryString(inputFileObj);
    });
};

/** Generate file data
 * 
 * @param { Object } fileObject - File Object
 * @param { string } fieldname - Field name
 * @returns { fieldname, filename, content } File data
 */
export const generateFileData = async (fileObject: { name: string, type: string }, fieldname: string) => {
    const filename = fileObject.name;
    const content = await proccessFileToBase64(fileObject);
    return { fieldname, filename, content };
};

/**
 * 
 * @param { string } rawID - Raw id ex: user#9876543210
 * @returns { string } - ex: 9876543210
 */
export const parseIDfromHash = (rawID: string): string => {
    const indexOfHash = rawID.indexOf('#');
    const actualID = indexOfHash > 0 ? rawID.substring(indexOfHash + 1) : '';
    return actualID;
};

/** Mask first 6 digit of a phone number
 * 
 * @param { string } toBeMaskedStr - Phone number to be masked
 * @returns { string } - Masked phone number
 */
export const maskData = (toBeMaskedStr: string) => {
    return toBeMaskedStr.replace(/^.{6}/, '******');
};
