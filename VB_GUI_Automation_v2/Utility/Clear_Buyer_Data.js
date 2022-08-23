import * as CD1 from   '../Utility/CD1.js'

import * as CD2 from   '../Utility/CD2.js'

import * as R1 from   '../Common/TD.js'

export const    Delete_Data =async (BY_ID,ENV_Type) =>


{

 console.log("Clearing the Data be ready 1234")


 // Cleaar Buyer Data

var paramList  = []

let cell_id = BY_ID

let User_Type = "buyer"


let jsonObjectParam = {}
    
let userId = "user#"+cell_id

   
jsonObjectParam.userId = userId
    
jsonObjectParam.user = User_Type

paramList.push(jsonObjectParam)


CD1.ClearData(paramList,ENV_Type)







// Cleaar Buyer  Pending Items


// paramList  = []


// jsonObjectParam = {}

//  let status = "pending"

// jsonObjectParam.status = status

// jsonObjectParam.userId = userId

// jsonObjectParam.user = User_Type

// paramList.push(jsonObjectParam)


// CD2.ClearData(paramList,ENV_Type)






// Clear Buyer Completed  List

paramList  = []


jsonObjectParam = {}

// status = "complete"

//jsonObjectParam.status = status

jsonObjectParam.userId = userId

jsonObjectParam.user = User_Type

paramList.push(jsonObjectParam)


CD2.ClearData(paramList,ENV_Type)



}

 //Delete_Data()