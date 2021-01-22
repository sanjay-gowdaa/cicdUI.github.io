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

export const getTimeStamp = () => {
    const dateAndTime = new Date();
    const dd = ("0" + (dateAndTime.getDate()+1)).slice(-2);
    const mm = ("0" + (dateAndTime.getMonth()+1)).slice(-2);
    const date = `${dd}/${mm}/${dateAndTime.getFullYear()}`;

    var hour = dateAndTime.getHours();
    var hh, amPm;
    const min = ("0" +dateAndTime.getMinutes()).slice(-2);

    if(hour < 12){
        hh = hour;
        amPm="A.M";
    }else if(hour === 12){
        hh = hour;
        (dateAndTime.getMinutes() === 0) ? (amPm="noon"): (amPm="P.M")
    }else if(hour > 12 && hour !== 24){
        hh = hour - 12;
        amPm = "P.M";
    } else {
        hh = 12;
        amPm = "P.M";
    }
    ((hh < 10) && (hh = "0" + hh) )
    const time = `${hh}:${min}${amPm}`;
    const timeStamp = {date: date, time: time};

    return timeStamp;
}
