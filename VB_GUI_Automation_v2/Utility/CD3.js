// var axios = require('axios')

import axios from "axios";

export const ClearData = async (arg)=>{
    
console.log("arg ",arg)    
var params = arg
const data = await axios.post('https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/crop/gettransactionid', params)

 console.log("Transactions 1234")

 console.log(data)  

 console.log("First Reocord",data["data"][0][0])  

 console.log("First Reocord",data["data"][0][1]) 

 
 console.log("First Reocord",data["data"][0][2]) 


var deleteParamList = []

for (let i =0;i<params.length; i++ )
{
    var deleteObject = {}
    deleteObject.user = paramList[i].user
    deleteObject.userId= paramList[i].userId
    deleteObject.userCropId = data["data"][i]
    deleteParamList.push(deleteObject)
}

var deletetransactionlist =[]

for (let i =0;i<data["data"].length;i++)

{
   var transaction = {}

   transaction.transactionId = data["data"][i]

   transaction.status  = "seller"

   deletetransactionlist.push(transaction)

}






const deleteData = await axios.post('https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/crop/deletetransactionid',deletetransactionlist)


}



var paramList  = []
//excel file having 10 rows
// for(let i=0;i<1;i++)
//{
    let jsonObjectParam = {}

    let status = "pending"
    
    let userId = "user#"+8971114041

    let user = "seller"


    jsonObjectParam.status = status

     jsonObjectParam.userId = userId

    jsonObjectParam.user = user

    paramList.push(jsonObjectParam)
//}
//console.log(paramList)

//ClearData(paramList)

