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

export const T8 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log("TC_008", "Verify that, Detials of single Seller(Partial FullFillment) in Buyer Matches List", "")
    console.log("Credientials")

    await CL_B.Delete_Data(R.RT("TC_008", "DataSet1", "BY1_UID"), ENV_Type)
    await CL_S.Delete_Data(R.RT("TC_008", "DataSet1", "SE1_UID"), ENV_Type)

    await EV.Launcapp(ENV_Type, ENV_Type1)
    await LG.Login_VB(R.RT("TC_008", "DataSet1", "SE1_UID"), R.RT("TC_008", "DataSet1", "SE1_PWD"));
    
    await console.log("category",R.RT("TC_008", "DataSet1", "CG"))
    await SP.Add_PD(R.RT("TC_008", "DataSet1", "CG"), R.RT("TC_008", "DataSet1", "PD"), R.RT("TC_008", "DataSet1", "VR"), R.RT("TC_008", "DataSet1", "GD"), R.RT("TC_008", "DataSet1", "QT"), R.RT("TC_008", "DataSet1", "PR"));
    await HM.Logout_VB()

    await LG.Login_VB(R.RT("TC_008", "DataSet1", "BY1_UID"), R.RT("TC_008", "DataSet1", "BY1_PWD"));
    await BU.Remove_BY_ML()

    await BU.Add_ML(R.RT("TC_008", "DataSet1", "CG"), R.RT("TC_008", "DataSet1", "PD"), R.RT("TC_008", "DataSet1", "VR"), R.RT("TC_008", "DataSet1", "GD"))
    await HM.Logout_VB()

    await LG.Login_VB(R.RT("TC_008", "DataSet1", "BY1_UID"), R.RT("TC_008", "DataSet1", "BY1_PWD"));
    await BU.Add_Req(R.RT("TC_008", "DataSet1", "CP"), R.RT("TC_008", "DataSet1", "BQT"), "", R.RT("TC_008", "DataSet1", "PD"), R.RT("TC_008", "DataSet1", "GD"))
    await HM.Logout_VB()

    await LG.Login_VB(R.RT("TC_008", "DataSet1", "BY1_UID"), R.RT("TC_008", "DataSet1", "BY1_PWD"));
    await BU1.Verify_Buyer_Match(R.RT("TC_008", "DataSet1", "M_ID"), R.RT("TC_008", "DataSet1", "MI"), R.RT("TC_008", "DataSet1", "GD"), R.RT("TC_008", "DataSet1", "QT"), R.RT("DataSet1", "DataSet1", "TPR"), R.RT("TC_008", "DataSet1", "LC"), R.RT("TC_008", "DataSet1", "CP"), R.RT("TC_008", "DataSet1", "QT_1"), R.RT("TC_008", "DataSet1", "PQTL"), R.RT("TC_008", "DataSet1", "PDT"))
    await HM.Logout_VB() 
    
    await CB.CL_BR()
    
  } catch (error) {
    console.log(error.message);
    console.log("Could not Continue Scenario Please Check ")
  }
}

T8(ENV_Type, ENV_Type1);
