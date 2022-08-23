import * as EV from '../Common/Environment.js';
import * as LG from '../PO_Lib/Login.js';
import * as HM from '../PO_Lib/Home.js';
import * as BM from '../PO_Lib/Buyer_Master_Cancel.js';
import * as BU from "../PO_Lib/BY_ML.js";
import * as R from '../Common/TD.js';
import * as CL_B from '../Utility/Clear_Buyer_Data.js';
import * as RS from '../Common/LG.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T17 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log("TC_017", "Verify that, Buyer  is able to add and Cancel Master List for Multiple times ", "")

    console.log("Credientials")
    console.log(R.RT("TC_017", "TC_017", "BY1_UID"))

    CL_B.Delete_Data(R.RT("TC_017", "TC_017", "BY1_UID"), ENV_Type)

    console.log("Starting Actual Scenario")

    await EV.Launcapp(ENV_Type, ENV_Type1)
    await LG.Login_VB(R.RT("TC_017", "TC_017", "BY1_UID"), R.RT("TC_017", "TC_017", "BY1_PWD"));
    await BU.Remove_BY_ML()
    for (var counter = 1; counter <= 3; counter++) {
      await BM.Cancel_Masterlist(R.RT("TC_017", "TC_017", "CG"), R.RT("TC_017", "TC_017", "PD"), R.RT("TC_017", "TC_017", "VR"), R.RT("TC_017", "TC_017", "GD"))
    }
    await EV.DR.sleep(5000);
    await HM.Logout_VB()
  } catch (error) {
    console.log(error.message);
    console.log("Could not Continue Scenario Please Check ")
  }
}

T17(ENV_Type, ENV_Type1)
