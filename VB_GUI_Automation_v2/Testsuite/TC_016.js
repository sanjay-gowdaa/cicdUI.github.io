import * as EV from '../Common/Environment.js';
import * as LG from '../PO_Lib/Login.js';
import * as HM from '../PO_Lib/Home.js';
import * as BC from '../PO_Lib/Buyer_Reqmts_Cancel.js';
import * as BU from '../PO_Lib/BY_ML.js';
import * as R from '../Common/TD.js';
import * as RS from '../Common/LG.js';
import * as CB from '../Common/closeBrowser.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T16 = async (ENV_Type, ENV_Type1) => {
    try {
        RS.Write_Log("TC_016", "Verify that, Buyer is able to cancel Requirements for Multiple times ", "")

        console.log("Credientials")
        console.log(R.RT("TC_016", "TC_016", "BY1_UID"))
        console.log("Starting Actual Scenario")

        await EV.Launcapp(ENV_Type, ENV_Type1)
        await LG.Login_VB(R.RT("TC_016", "TC_016", "BY1_UID"), R.RT("TC_016", "TC_016", "BY1_PWD"));
        await BU.Remove_BY_ML()
        await BU.Add_ML(R.RT("TC_016", "TC_016", "CG"), R.RT("TC_016", "TC_016", "PD"), R.RT("TC_016", "TC_016", "VR"), R.RT("TC_016", "TC_016", "GD"))
        await HM.Logout_VB()
        await LG.Login_VB(R.RT("TC_016", "TC_016", "BY1_UID"), R.RT("TC_016", "TC_016", "BY1_PWD"));
        for (var counter = 1; counter <= 3; counter++) {
            await BC.Cancel_Req(R.RT("TC_016", "TC_016", "CG_PD"), R.RT("TC_016", "TC_016", "QT"), "", R.RT("TC_016", "TC_016", "PD"), R.RT("TC_016", "TC_016", "GD"), R.RT("TC_005", "TC_005", "DT"))
        }
        await EV.DR.sleep(5000);
        await HM.Logout_VB()
        await CB.CL_BR()
    } catch (error) {
        console.log(error.message);
        console.log("Could not Continue Scenario Please Check ")
    }
}

T16(ENV_Type, ENV_Type1)
