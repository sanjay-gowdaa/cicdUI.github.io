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

import * as CB from '../Common/closeBrowser.js';


var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T7 = async (ENV_Type, ENV_Type1) => {
  try {
    await RS.Write_Log("TC_007", "Verify Detials of single Seller(Complete FullFillment) in Buyer Matches List", "")

    console.log("Credientials")

    await CL_B.Delete_Data(await R.RT("TC_007", "DataSet1", "BY1_UID"), ENV_Type)
    await CL_S.Delete_Data(await R.RT("TC_007", "DataSet1", "SE1_UID"), ENV_Type)
    await EV.Launcapp(ENV_Type, ENV_Type1)
    await LG.Login_VB(await R.RT("TC_007", "DataSet1", "SE1_UID"), await R.RT("TC_007", "DataSet1", "SE1_PWD"));
    await SP.Add_PD(await R.RT("TC_007", "DataSet1", "CG"), await R.RT("TC_007", "DataSet1", "PD"), await R.RT("TC_007", "DataSet1", "VR"), await R.RT("TC_007", "DataSet1", "GD"), await R.RT("TC_007", "DataSet1", "QT"), await R.RT("TC_007", "DataSet1", "PR"));
    await HM.Logout_VB()
    await LG.Login_VB(await R.RT("TC_007", "DataSet1", "BY1_UID"), await R.RT("TC_007", "DataSet1", "BY1_PWD"));
    await BU.Remove_BY_ML()
    await BU.Add_ML(await R.RT("TC_007", "DataSet1", "CG"), await R.RT("TC_007", "DataSet1", "PD"), await R.RT("TC_007", "DataSet1", "VR"), await R.RT("TC_007", "DataSet1", "GD"))
    await HM.Logout_VB()
    await LG.Login_VB(await R.RT("TC_007", "DataSet1", "BY1_UID"), await R.RT("TC_007", "DataSet1", "BY1_PWD"));
    await BU.Add_Req(await R.RT("TC_007", "DataSet1", "CP"), await R.RT("TC_007", "DataSet1", "QT"), "", await R.RT("TC_007", "DataSet1", "PD"), await R.RT("TC_007", "DataSet1", "GD"))
    await HM.Logout_VB()
   
    await LG.Login_VB(await R.RT("TC_007", "DataSet1", "BY1_UID"), await R.RT("TC_007", "DataSet1", "BY1_PWD"));
   
    await BU1.Verify_Buyer_Match(await R.RT("TC_007", "DataSet1", "M_ID"), await R.RT("TC_007", "DataSet1", "MI"), await R.RT("TC_007", "DataSet1", "GD"), await R.RT("TC_007", "DataSet1", "QT"), await R.RT("TC_007", "DataSet1", "TPR"), await R.RT("TC_007", "DataSet1", "LC"), await R.RT("TC_007", "DataSet1", "CP"), await R.RT("TC_007", "DataSet1", "QT_1"),await R.RT("TC_007", "DataSet1", "PQTL"),await R.RT("TC_007", "DataSet1", "PDT"))
    await HM.Logout_VB()
    
    await CB.CL_BR()

  } catch (error) {
    console.log("Could not Continue Scenario Please Check ")
  }
}

T7(ENV_Type, ENV_Type1);
