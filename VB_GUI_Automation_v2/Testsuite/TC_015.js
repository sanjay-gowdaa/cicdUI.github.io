import * as EV from '../Common/Environment.js';
import * as SP from '../PO_Lib/Seller_Produce_Cancel.js';
import * as LG from '../PO_Lib/Login.js';
import * as R from '../Common/TD.js';
import * as RS from '../Common/LG.js';
import * as CB from '../Common/closeBrowser.js';
import * as CL_S from '../Utility/Clear_Seller_Data.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T15 = async (ENV_Type, ENV_Type1) => {
    try {
        RS.Write_Log("TC_015", "Verify that, Seller is able to cancel produce Multiple times", "")
        CL_S.Delete_Data(R.RT("TC_015", "TC_015", "SE1_UID"), ENV_Type)

        console.log("Starting Actual Scenario")

        // Login as a seller add produce n clicking on cancel button
        await EV.Launcapp(ENV_Type, ENV_Type1)
        await LG.Login_VB(R.RT("TC_015", "TC_015", "SE1_UID"), R.RT("TC_015", "TC_015", "SE1_PWD"));

        for (var counter = 1; counter < 4; counter++) {
            console.log("Iteratiuon started")
            await SP.Add_PD_CANCEL(R.RT("TC_015", "TC_015", "CG"), R.RT("TC_015", "TC_015", "PD"), R.RT("TC_015", "TC_015", "VR"), R.RT("TC_015", "TC_015", "GD"), R.RT("TC_015", "TC_015", "QT"), R.RT("TC_015", "TC_015", "PR"));
            await EV.DR.sleep(4000);
        }
        await HM.Logout_VB()
        await CB.CL_BR()
    } catch (error) {
        console.log(error.message);
        console.log("Could not Continue Scenario Please Check ")
    }
}

T15(ENV_Type, ENV_Type1)
