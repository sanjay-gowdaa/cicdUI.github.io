import * as EV from "../Common/Environment.js";

import * as SP from "../PO_Lib/SL_PD.js";
import * as LG from "../PO_Lib/Login.js";
import * as HM from "../PO_Lib/Home.js";
import * as BU from "../PO_Lib/BY_ML.js";
import * as BU1 from "../PO_Lib/BY_MT.js";

import * as R from "../Common/TD.js";
import * as CB from '../Common/closeBrowser.js';
import * as RS from "../Common/LG.js";

import * as CL_B from "../Utility/Clear_Buyer_Data.js";
import * as CL_S from "../Utility/Clear_Seller_Data.js";


var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T4 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log("TC_004", "Verify that, Buyer  is able to Reject Seller ", "");
    console.log("Credientials");

    //CL_B.Delete_Data(R.RT("TC_004", "DataSet1", "BY1_UID"), ENV_Type);
    CL_S.Delete_Data(R.RT("TC_004", "DataSet1", "SE1_UID"), ENV_Type);

    await EV.Launcapp(ENV_Type, ENV_Type1);
    // console.log("credentials ",
    // await R.RT("TC_004", "TC_004", "BY1_UID"),
    // await R.RT("TC_004", "TC_004", "BY1_PWD"))
    await LG.Login_VB(
      await R.RT("TC_004", "DataSet1", "BY1_UID"),
      await R.RT("TC_004", "DataSet1", "BY1_PWD")
    );
    await BU.Remove_BY_ML();
    await BU.Add_ML(
      await R.RT("TC_004", "DataSet1", "CG"),
      await R.RT("TC_004", "DataSet1", "PD"),
      await R.RT("TC_004", "DataSet1", "VR"),
      await R.RT("TC_004", "DataSet1", "GD")
    );
   
    await HM.Logout_VB();

    console.log("Starting Actual Scenario");

     await LG.Login_VB(
      await R.RT("TC_004", "DataSet1", "SE1_UID"),
      await R.RT("TC_004", "DataSet1", "SE1_PWD")
    );
    await SP.Add_PD(
      await R.RT("TC_004", "DataSet1", "CG"),
      await R.RT("TC_004", "DataSet1", "PD"),
      await R.RT("TC_004", "DataSet1", "VR"),
      await R.RT("TC_004", "DataSet1", "GD"),
      await R.RT("TC_004", "DataSet1", "QT"),
      await R.RT("TC_004", "DataSet1", "PR")
    );
    await HM.Logout_VB();

    await LG.Login_VB(
      await R.RT("TC_004", "DataSet1", "BY1_UID"),
      await R.RT("TC_004", "DataSet1", "BY1_PWD")
  );
    await BU.Add_Req(
      await R.RT("TC_004", "DataSet1", "CG_PD"),
      await R.RT("TC_004", "DataSet1", "QT"),
      await R.RT("TC_004", "DataSet1", "DT"),
      await R.RT("TC_004", "DataSet1", "PD"),
      await R.RT("TC_004", "DataSet1", "GD")
    );

   await HM.Logout_VB();

    await LG.Login_VB(
    await R.RT("TC_004", "DataSet1", "BY1_UID"),
    await R.RT("TC_004", "DataSet1", "BY1_PWD")
    );
   await BU1.Reject_SL(
   await R.RT("TC_004", "DataSet1", "MI"));
   await HM.Logout_VB();
   await CB.CL_BR()
  } catch (error) {
    console.log(error.message);
    console.log("Could not Continue Scenario Please Check ");
  }
};

T4(ENV_Type,ENV_Type1);
