import * as EV from "../Common/Environment.js";
import * as CB from '../Common/closeBrowser.js';
import * as RS from "../Common/LG.js";
import * as R from "../Common/TD.js";

import * as LG from "../PO_Lib/Login.js";
import * as HM from "../PO_Lib/Home.js";
import * as BU from "../PO_Lib/BY_ML.js";

import * as CL_B from "../Utility/Clear_Buyer_Data.js";

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T2 = async (ENV_Type, ENV_Type1) => {
   try {
    RS.Write_Log(
      "TC_002",
      "Verify that, Buyer  is able to Add Master List ",
      ""
    );

    console.log("Credientials");
    await console.log(await R.RT("TC_002","DataSet1","BY1_UID"));

    await CL_B.Delete_Data(await R.RT("TC_002","DataSet1","BY1_UID"), ENV_Type);

    console.log("Starting Actual This is Add Master List");

    await EV.Launcapp(ENV_Type, ENV_Type1);

    await LG.Login_VB(
    await R.RT("TC_002","DataSet1","BY1_UID"),
    await R.RT("TC_002","DataSet1","BY1_PWD")
    );

   await BU.Remove_BY_ML();
   await HM.Logout_VB();
   await LG.Login_VB(
   await R.RT("TC_002", "DataSet1", "BY1_UID"),
   await R.RT("TC_002", "DataSet1", "BY1_PWD")
   );
   
    await BU.Add_ML(
      await R.RT("TC_002", "DataSet1", "CG"),
      await R.RT("TC_002", "DataSet1", "PD"),
      await R.RT("TC_002", "DataSet1", "VR"),
      await R.RT("TC_002", "DataSet1", "GD")
    );

    await HM.Logout_VB();
    await CB.CL_BR()
  } catch (error) {
    console.log(error.message);
    console.log("Could not Continue Scenario Please Check ");
  }
};

T2(ENV_Type,ENV_Type1)
