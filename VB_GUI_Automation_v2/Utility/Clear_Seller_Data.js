import * as CD1 from   '../Utility/CD1.js'

import * as CD2 from   '../Utility/CD2.js'

import * as R1 from   '../Common/TD.js'

export const    Delete_Data =async (SL_ID,ENV_Type) =>


{

 console.log("Clearing the Data be ready 1234")


 // Cleaar Seller One Data

var paramList  = []

let cell_id = SL_ID

let User_Type = "seller"


let jsonObjectParam = {}
    
let userId = "user#"+cell_id

   
jsonObjectParam.userId = userId
    
jsonObjectParam.user = User_Type

paramList.push(jsonObjectParam)


await CD1.ClearData(paramList,ENV_Type)








// Clear Seller one Matches

// paramList  = []


// jsonObjectParam = {}

// let status = "match"

// jsonObjectParam.status = status

// jsonObjectParam.userId = userId

// jsonObjectParam.user = User_Type

// paramList.push(jsonObjectParam)


// CD2.ClearData(paramList,ENV_Type)




// Cleaar Seller  Pending Items


// paramList  = []


// jsonObjectParam = {}

//  status = "pending"

// jsonObjectParam.status = status

// jsonObjectParam.userId = userId

// jsonObjectParam.user = User_Type

// paramList.push(jsonObjectParam)


// CD2.ClearData(paramList,ENV_Type)



// Clear Seller Completed  List

paramList  = []


jsonObjectParam = {}



//jsonObjectParam.status = status

jsonObjectParam.userId = userId

jsonObjectParam.user = User_Type

paramList.push(jsonObjectParam)


await CD2.ClearData(paramList,ENV_Type)



}

// Delete_Data()