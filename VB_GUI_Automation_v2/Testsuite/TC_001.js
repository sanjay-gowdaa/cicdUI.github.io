import * as EV from "../Common/Environment.js";
import * as CB from '../Common/closeBrowser.js';
import * as R from "../Common/TD.js";
import * as RS from "../Common/LG.js";

import * as SP from "../PO_Lib/SL_PD.js";
import * as LG from "../PO_Lib/Login.js";
import * as HM from "../PO_Lib/Home.js";

import * as CL_S from "../Utility/Clear_Seller_Data.js";

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T1 = async (ENV_Type, ENV_Type1) => {
    
    
    try {
        RS.Write_Log("TC_001", "Verify that, Seller is able to Add Produce ", "");

       console.log("Starting Actual TC-001");
       
       await CL_S.Delete_Data(await R.RT("TC_001","DataSet1", "SE1_UID"), ENV_Type);

    //     // Seller One
        await EV.Launcapp(ENV_Type, ENV_Type1);
        await LG.Login_VB(
             R.RT("TC_001", "DataSet1", "SE1_UID"),
             R.RT("TC_001", "DataSet1", "SE1_PWD")
        );

         await SP.Add_PD(
             R.RT("TC_001","DataSet1", "CG"),
             R.RT("TC_001","DataSet1", "PD"),
             R.RT("TC_001","DataSet1", "VR"),
             R.RT("TC_001","DataSet1", "GD"),
             R.RT("TC_001","DataSet1", "QT"),
             R.RT("TC_001","DataSet1", "PR")
        );

       await HM.Logout_VB();
       await CB.CL_BR()
    } catch (error) {
        console.log(error.message);
        console.log("Could not Continue Scenario Please Check ");
    }
};

T1(ENV_Type,ENV_Type1)
