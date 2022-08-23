// var axios = require('axios')

import axios from "axios";

export const ClearData = async (arg,ENV_Type)=>{
    
console.log("arg ",arg)    
var params = arg

var Url_path
if (ENV_Type=="Dev")

{
   // Url_path = 'http://localhost:3000/dev/crop/deleteTransaction'

    Url_path = 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/crop/deleteTransaction'

}


if (ENV_Type=="Test")

{
  
    Url_path = 'https://rxc185hspl.execute-api.ap-south-1.amazonaws.com/test/crop/gettransactionid'

}



console.log("Before Deletion 555")

const data = await axios.post(Url_path, params)

console.log("Deletion   Done  Donot worry")

//  console.log(data)  

//  console.log("First Reocord",data["data"][0][0])  

//  console.log("First Reocord",data["data"][0][1]) 

 
//  console.log("First Reocord",data["data"][0][2]) 


// var deleteParamList = []

// for (let i =0;i<params.length; i++ )
// {
//     var deleteObject = {}
//     deleteObject.user = paramList[i].user
//     deleteObject.userId= paramList[i].userId
//     deleteObject.userCropId = data["data"][i]
//     deleteParamList.push(deleteObject)
// }

// var deletetransactionlist =[]

// for (let i =0;i<data["data"].length;i++)

// {
//    var transaction = {}

//    transaction.transactionId = data["data"][i]

//    transaction.status  = "seller"

//    deletetransactionlist.push(transaction)

// }


// var Url_path1
// if (ENV_Type=="Dev")

// {
  
//     Url_path1 = 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/crop/deletetransactionid'

// }


// if (ENV_Type=="Test")

// {
  
//     Url_path1 = 'https://rxc185hspl.execute-api.ap-south-1.amazonaws.com/test/crop/deletetransactionid'

// }



// const deleteData = await axios.post(Url_path1,deletetransactionlist)


// }






// var paramList  = []
// //excel file having 10 rows
// for(let i=0;i<1;i++)
// {
//     let jsonObjectParam = {}

//     let status = "match"
    
//     let userId = "user#"+8971114041

//     let user = "seller"


//     jsonObjectParam.status = status

//      jsonObjectParam.userId = userId

//     jsonObjectParam.user = user

//     paramList.push(jsonObjectParam)
}
//console.log(paramList)

// ClearData(paramList)

