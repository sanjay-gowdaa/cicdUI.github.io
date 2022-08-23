// var axios = require('axios')

import axios from "axios";

//export const  Add_PD = async (CG,PD,VR,GD,QT,PR_QT) => 

export const ClearData = async (arg)=>{
    
/*
var params = arg

var deleteParamList = []

var delete_crop_user = {}


delete_crop_user.userId = params[0].userId

delete_crop_user.user = params[0].user

deleteParamList.push(delete_crop_user)
 
console.log(deleteParamList)

*/




const deleteData = await axios.post('https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/crop/deletecrop',arg)

console.log('delte data',deleteData["data"])

}









//clearData(arg)


var paramList  = []

let cell_id = 8971114041

let User_Type = "seller"


let jsonObjectParam = {}
    
    let userId = "user#"+cell_id
    
    let user = User_Type

    jsonObjectParam.userId = userId
    jsonObjectParam.user = user

    paramList.push(jsonObjectParam)

ClearData(paramList)



/*


for(let i=0;i<1;i++)
{
    let jsonObjectParam = {}
    
    let userId = "user#"+cell_id
    let user = "seller"

    jsonObjectParam.userId = userId
    jsonObjectParam.user = user

    paramList.push(jsonObjectParam)
}
//console.log(paramList)
*/



