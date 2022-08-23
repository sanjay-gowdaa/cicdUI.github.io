import * as EV from '../Common/Environment.js';
import * as SP from '../PO_Lib/SL_PD.js';
import * as LG from '../PO_Lib/Login.js';
import * as HM from '../PO_Lib/Home.js';
import * as BU from '../PO_Lib/BY_ML.js';
import * as BU1 from '../PO_Lib/BY_MT.js';
import * as R from '../Common/TD.js';
import * as CL_B from '../Utility/Clear_Buyer_Data.js';
import * as CL_S from '../Utility/Clear_Seller_Data.js';
import * as RS from '../Common/LG.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T10 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log("TC_010", "Verify that, Detials of Two Matching Sellers Partial Fullfillment in Buyer Matches List", "")

    console.log("Credientials")

    await CL_B.Delete_Data(R.RT("TC_010", "TC_010", "BY1_UID"), ENV_Type)
    await CL_S.Delete_Data(R.RT("TC_010", "TC_010", "SE1_UID"), ENV_Type)
    await CL_S.Delete_Data(R.RT("TC_010", "TC_010", "SE2_UID"), ENV_Type)
    await EV.Launcapp(ENV_Type, ENV_Type1)

    // Seller 1
    await LG.Login_VB(R.RT("TC_010", "TC_010", "SE1_UID"), R.RT("TC_010", "TC_010", "SE1_PWD"));
    await SP.Add_PD(R.RT("TC_010", "TC_010", "CG"), R.RT("TC_010", "TC_010", "PD"), R.RT("TC_010", "TC_010", "VR"), R.RT("TC_010", "TC_010", "GD"), R.RT("TC_010", "TC_010", "QT"), R.RT("TC_010", "TC_010", "PR"));
    await HM.Logout_VB()

    // Seller 2
    await LG.Login_VB(R.RT("TC_010", "TC_010", "SE2_UID"), R.RT("TC_010", "TC_010", "SE2_PWD"));
    await SP.Add_PD(R.RT("TC_010", "TC_010", "CG"), R.RT("TC_010", "TC_010", "PD"), R.RT("TC_010", "TC_010", "VR"), R.RT("TC_010", "TC_010", "GD"), R.RT("TC_010", "TC_010", "QT"), R.RT("TC_010", "TC_010", "PR"));
    await HM.Logout_VB()

    // Buyer
    await LG.Login_VB(R.RT("TC_010", "TC_010", "BY1_UID"), R.RT("TC_010", "TC_010", "BY1_PWD"));
    await BU.Remove_BY_ML()
    await BU.Add_ML(R.RT("TC_010", "TC_010", "CG"), R.RT("TC_010", "TC_010", "PD"), R.RT("TC_010", "TC_010", "VR"), R.RT("TC_010", "TC_010", "GD"))
    await HM.Logout_VB()
    await LG.Login_VB(R.RT("TC_010", "TC_010", "BY1_UID"), R.RT("TC_010", "TC_010", "BY1_PWD"));
    await BU.Add_Req(R.RT("TC_010", "TC_010", "CP"), R.RT("TC_010", "TC_010", "BQT"), "", R.RT("TC_010", "TC_010", "PD"), R.RT("TC_010", "TC_010", "GD"))
    await HM.Logout_VB()
    await LG.Login_VB(R.RT("TC_010", "TC_010", "BY1_UID"), R.RT("TC_010", "TC_010", "BY1_PWD"));
    await BU1.Verify_Buyer_Match(R.RT("TC_010", "TC_010", "M1_ID"), R.RT("TC_010", "TC_010", "MI"), R.RT("TC_010", "TC_010", "GD"), R.RT("TC_010", "TC_010", "QT"), R.RT("TC_010", "TC_010", "TPR"), R.RT("TC_010", "TC_010", "LC"), R.RT("TC_010", "TC_010", "CP"), R.RT("TC_010", "TC_010", "QT_1"), R.RT("TC_010", "TC_010", "PQTL"), R.RT("TC_010", "TC_010", "PDT"))
    await HM.Logout_VB()
    await LG.Login_VB(R.RT("TC_010", "TC_010", "BY1_UID"), R.RT("TC_010", "TC_010", "BY1_PWD"));
    await BU1.Verify_Buyer_Match(R.RT("TC_010", "TC_010", "M2_ID"), R.RT("TC_010", "TC_010", "MI"), R.RT("TC_010", "TC_010", "GD"), R.RT("TC_010", "TC_010", "QT"), R.RT("TC_010", "TC_010", "TPR"), R.RT("TC_010", "TC_010", "LC"), R.RT("TC_010", "TC_010", "CP"), R.RT("TC_010", "TC_010", "QT_1"), R.RT("TC_010", "TC_010", "PQTL"), R.RT("TC_010", "TC_010", "PDT"))
  } catch (error) {
    console.log("Could not Continue Scenario Please Check ")
  }
}

T10(ENV_Type, ENV_Type1);
