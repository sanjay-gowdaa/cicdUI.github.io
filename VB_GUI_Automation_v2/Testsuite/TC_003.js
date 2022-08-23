import * as EV from "../Common/Environment.js";
import * as LG from "../PO_Lib/Login.js";
import * as HM from "../PO_Lib/Home.js";
import * as BU from "../PO_Lib/BY_ML.js";
import * as R from "../Common/TD.js";
import * as CB from '../Common/closeBrowser.js';
import * as CL_B from "../Utility/Clear_Buyer_Data.js";
import * as RS from "../Common/LG.js";

import * as GA_0 from '../Common/GenericAction_0.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T3 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log(
      "TC_003",
      "Verify that, Buyer is able to Add Requirements ",
      ""
    );

    console.log("Credientials");
    await console.log(await R.RT("TC_003", "DataSet1", "BY1_UID"));

    await CL_B.Delete_Data(await R.RT("TC_003", "DataSet1", "BY1_UID"), ENV_Type);

    console.log("Starting Actual Scenario");

    await EV.Launcapp(ENV_Type, ENV_Type1);

    await LG.Login_VB(
      await R.RT("TC_003", "DataSet1", "BY1_UID"),
      await R.RT("TC_003", "DataSet1", "BY1_PWD")
    );

    await BU.Remove_BY_ML();

    await BU.Add_ML(
      await R.RT("TC_003", "DataSet1", "CG"),
      await R.RT("TC_003", "DataSet1", "PD"),
      await R.RT("TC_003", "DataSet1", "VR"),
      await R.RT("TC_003", "DataSet1", "GD")
    );
    await HM.Logout_VB();
    await LG.Login_VB(
      await R.RT("TC_003", "DataSet1", "BY1_UID"),
      await R.RT("TC_003", "DataSet1", "BY1_PWD")
    );


 
      await BU.Add_Req(
      await R.RT("TC_003", "DataSet1", "SelectProduce"),
       await R.RT("TC_003", "DataSet1", "QT"),
       "",
       await R.RT("TC_003", "DataSet1", "PD"),
       await R.RT("TC_003", "DataSet1", "GD")
     );

    await HM.Logout_VB();
    await CB.CL_BR()
  } catch (error) {
    console.log(error.message);
    console.log("Could not Continue Scenario Please Check ");
  }
 };

T3(ENV_Type, ENV_Type1);
