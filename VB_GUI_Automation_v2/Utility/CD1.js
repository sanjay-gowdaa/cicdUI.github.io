// var axios = require('axios')

import axios from "axios";

//export const  Add_PD = async (CG,PD,VR,GD,QT,PR_QT) => 

export const ClearData = async (arg,ENV_Type)=>{
    
/*
var params = arg

var deleteParamList = []

var delete_crop_user = {}


delete_crop_user.userId = params[0].userId

delete_crop_user.user = params[0].user

deleteParamList.push(delete_crop_user)
 
console.log(deleteParamList)

*/
var Url_path
console.log("Environment type is ",ENV_Type)

if (ENV_Type=="Dev")

{
  
   // Url_path = 'http://localhost:3000/dev/crop/deletecrop'

   Url_path = 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/crop/deletecrop'

}


if (ENV_Type=="Test")

{
  
    Url_path = 'https://rxc185hspl.execute-api.ap-south-1.amazonaws.com/test/crop/deletecrop'

}



console.log("URL and UID are ",Url_path,arg)

 const deleteData = await axios.post(Url_path,arg)

 console.log('delte data',deleteData["data"])

}









//clearData(arg)

/*
var paramList  = []

let cell_id = 8971114041

let User_Type = "seller"


let jsonObjectParam = {}
    
    let userId = "user#"+cell_id
    
    let user = User_Type

    jsonObjectParam.userId = userId
    jsonObjectParam.user = user

    paramList.push(jsonObjectParam)

clearData(paramList)






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



