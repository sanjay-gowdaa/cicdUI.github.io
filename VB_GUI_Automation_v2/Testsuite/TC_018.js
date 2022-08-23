import * as EV from '../Common/Environment.js';
import * as CB from '../Common/closeBrowser.js';
import * as R from '../Common/TD.js';
import * as RS from '../Common/LG.js';

import * as SP from '../PO_Lib/SL_PD.js';
import * as LG from '../PO_Lib/Login.js';
import * as HM from '../PO_Lib/Home.js';
import * as BU from '../PO_Lib/BY_ML.js';
import * as BU1 from '../PO_Lib/BY_MT.js';

import * as CL_B from '../Utility/Clear_Buyer_Data.js';
import * as CL_S from '../Utility/Clear_Seller_Data.js';
//import * as RS from '../Common/LG.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T18 = async (ENV_Type, ENV_Type1) => {
    try {
        RS.Write_Log("TC_018", "Verify that, Buyer should not get any match because seller has 60% less quantity than buyer  ", "")

        console.log("Credientials 12345")

       await CL_B.Delete_Data( R.RT("TC_018", "DATASET1", "BY1_UID"), ENV_Type)
       await CL_S.Delete_Data(R.RT("TC_018", "DATASET1", "SE1_UID"), ENV_Type)

        await EV.Launcapp(ENV_Type, ENV_Type1)
        await LG.Login_VB(R.RT("TC_018", "DATASET1", "BY1_UID"), R.RT("TC_018", "DATASET1", "BY1_PWD"));
        await BU.Remove_BY_ML()
        await BU.Add_ML(R.RT("TC_018", "DATASET1", "CG"), R.RT("TC_018", "DATASET1", "PD"), R.RT("TC_018", "DATASET1", "VR"), R.RT("TC_018", "DATASET1", "GD"))
        await HM.Logout_VB()
        await LG.Login_VB(R.RT("TC_018", "DATASET1", "SE1_UID"), R.RT("TC_018", "DATASET1", "SE1_PWD"));
        await SP.Add_PD(R.RT("TC_018", "DATASET1", "CG"), R.RT("TC_018", "DATASET1", "PD"), R.RT("TC_018", "DATASET1", "VR"), R.RT("TC_018", "DATASET1", "GD"), R.RT("TC_018", "DATASET1", "SQT"), R.RT("TC_018", "DATASET1", "PR"));
        await HM.Logout_VB()
        await LG.Login_VB(R.RT("TC_018", "DATASET1", "BY1_UID"), R.RT("TC_018", "DATASET1", "BY1_PWD"));
        await BU.Add_Req(R.RT("TC_018", "DATASET1", "CG_PD"), R.RT("TC_018", "DATASET1", "BQT"), R.RT("TC_018", "DATASET1", "DT"), R.RT("TC_018", "DATASET1", "PD"), R.RT("TC_018", "DATASET1", "GD"))
        await BU1.Verify_Buyer_Match_Non_Existence(R.RT("TC_018", "DATASET1", "M_ID"))
        await HM.Logout_VB()
        await CB.CL_BR()
    } catch (error) {
        console.log(error.message);
        console.log("Could not Continue Scenario Please Check ")
    }
}

T18(ENV_Type, ENV_Type1)
