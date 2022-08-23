import * as EV from '../Common/Environment.js';
import * as R from '../Common/TD.js';
import * as RS from '../Common/LG.js';
import * as CB from '../Common/closeBrowser.js';

import * as LG from '../PO_Lib/Login.js';
import * as HM from '../PO_Lib/Home.js';
import * as SP from '../PO_Lib/SL_PD.js';
import * as SM from '../PO_Lib/SL_MT.js';
import * as BU from '../PO_Lib/BY_ML.js';
import * as BU1 from '../PO_Lib/BY_MT.js';
import * as BUT from '../PO_Lib/Buyer_Transaction.js';

import * as CL_B from '../Utility/Clear_Buyer_Data.js';
import * as CL_S from '../Utility/Clear_Seller_Data.js';


var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T101 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log("TC_101", "Verify that, Buyer and Seller is able to do Transaction for One installment ", "")
    console.log("Credientials")

    await CL_B.Delete_Data(await R.RT("TC_101", "DataSet1", "BY1_UID"), ENV_Type)
    await CL_S.Delete_Data(await R.RT("TC_101", "DataSet1", "SE1_UID"), ENV_Type)

    await EV.Launcapp(ENV_Type, ENV_Type1)
 
    await LG.Login_VB(R.RT("TC_101", "DataSet1", "BY1_UID"), R.RT("TC_101", "DataSet1", "BY1_PWD"));
    await BU.Remove_BY_ML()
    await HM.Logout_VB()

    await LG.Login_VB(R.RT("TC_101", "DataSet1", "BY1_UID"), R.RT("TC_101", "DataSet1", "BY1_PWD"));
    await BU.Add_ML(
      await R.RT("TC_101", "DataSet1", "CG"),
      await R.RT("TC_101", "DataSet1", "PD"),
      await R.RT("TC_101", "DataSet1", "VR"),
      await R.RT("TC_101", "DataSet1", "GD")
    );
    await HM.Logout_VB()

    console.log("Starting Actual Scenario")

    await LG.Login_VB(R.RT("TC_101", "DataSet1", "SE1_UID"), R.RT("TC_101", "DataSet1", "SE1_PWD"));
    await SP.Add_PD(
      await R.RT("TC_101", "DataSet1", "CG"),
      await R.RT("TC_101", "DataSet1", "PD"),
      await R.RT("TC_101", "DataSet1", "VR"),
      await R.RT("TC_101", "DataSet1", "GD"),
      await R.RT("TC_101", "DataSet1", "QT"),
      await R.RT("TC_101", "DataSet1", "PR")
  );
    await HM.Logout_VB()
    
    await LG.Login_VB(await R.RT("TC_101", "DataSet1", "BY1_UID"), await R.RT("TC_101", "DataSet1", "BY1_PWD"));
    await BU.Add_Req(
      await R.RT("TC_101", "DataSet1", "CG_PD"),
      await R.RT("TC_101", "DataSet1", "QT"),"",
      await R.RT("TC_101", "DataSet1", "PD"),
      await R.RT("TC_101", "DataSet1", "GD")
    );
    await HM.Logout_VB()
    
    await LG.Login_VB(await R.RT("TC_101", "DataSet1", "BY1_UID"), await R.RT("TC_101", "DataSet1", "BY1_PWD"));
    await BU1.Connect_SL (
    await R.RT("TC_101", "DataSet1", "MI"))
    await HM.Logout_VB()
    
    await LG.Login_VB(await R.RT("TC_101", "DataSet1", "SE1_UID"), await R.RT("TC_101", "DataSet1", "SE1_PWD"));
    await SM.Accept_BY(
    await R.RT("TC_101", "DataSet1", "CG_PD"))
    await HM.Logout_VB()
    await LG.Login_VB(await R.RT("TC_101","DataSet1","BY1_UID"),await R.RT("TC_101","DataSet1","BY1_PWD"));
    await BUT.Buyer_Pending(await R.RT("TC_101","DataSet1","PY_M"),await R.RT("TC_101","DataSet1","PY_N"),await R.RT("TC_101","DataSet1","BY_Receipt"));
    await CB.CL_BR()
  } catch (error) {
    console.log("Could not Continue Scenario Please Check ", error.message)
  }
}

T101(ENV_Type,ENV_Type1);