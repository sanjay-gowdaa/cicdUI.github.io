import * as EV from '../Common/Environment.js';
import * as CB from '../Common/closeBrowser.js';
import * as R from '../Common/TD.js';
import * as RS from '../Common/LG.js';

import * as SP from '../PO_Lib/SL_PD.js';
import * as SM from '../PO_Lib/SL_MT.js';
import * as LG from '../PO_Lib/Login.js';
import * as HM from '../PO_Lib/Home.js';
import * as BU from '../PO_Lib/BY_ML.js';
import * as BU1 from '../PO_Lib/BY_MT.js';

import * as CL_B from '../Utility/Clear_Buyer_Data.js';
import * as CL_S from '../Utility/Clear_Seller_Data.js';


var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T22 = async (ENV_Type, ENV_Type1) => {
  try {
    RS.Write_Log("TC_022", "Verify that among Three sellers and one buyer seller second  having high price than one and third is not shown in matches List")

    console.log("Credientials")

    await CL_B.Delete_Data(R.RT("TC_022", "DataSet1", "BY1_UID"), ENV_Type)
    await CL_S.Delete_Data(R.RT("TC_022", "DataSet1", "SE1_UID"), ENV_Type)
    await CL_S.Delete_Data(R.RT("TC_022", "DataSet1", "SE2_UID"), ENV_Type)
    await CL_S.Delete_Data(R.RT("TC_022", "DataSet1", "SE3_UID"), ENV_Type)

    //Seller one
    await EV.Launcapp(ENV_Type, ENV_Type1);
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "SE1_UID"), R.RT("TC_022", "DataSet1", "SE1_PWD"));
    await SP.Add_PD(R.RT("TC_022", "DataSet1", "CG"), R.RT("TC_022", "DataSet1", "PD"), R.RT("TC_022", "DataSet1", "VR"), R.RT("TC_022", "DataSet1", "GD"), R.RT("TC_022", "DataSet1", "QT"), R.RT("TC_022", "DataSet1", "PR"));
    await HM.Logout_VB()

    // Seller Two
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "SE2_UID"), R.RT("TC_022", "DataSet1", "SE2_PWD"));
    await SP.Add_PD(R.RT("TC_022", "DataSet1", "CG"), R.RT("TC_022", "DataSet1", "PD"), R.RT("TC_022", "DataSet1", "VR"), R.RT("TC_022", "DataSet1", "GD"), R.RT("TC_022", "DataSet1", "QT"), R.RT("TC_022", "DataSet1", "PR1"));
    await HM.Logout_VB()

    //Seller three
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "SE3_UID"), R.RT("TC_022", "DataSet1", "SE3_PWD"));
    await SP.Add_PD(R.RT("TC_022", "DataSet1", "CG"), R.RT("TC_022", "DataSet1", "PD"), R.RT("TC_022", "DataSet1", "VR"), R.RT("TC_022", "DataSet1", "GD"), R.RT("TC_022", "DataSet1", "QT"), R.RT("TC_022", "DataSet1", "PR"));
    await HM.Logout_VB()

    // Buyer
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "BY1_UID"), R.RT("TC_022", "DataSet1", "BY1_PWD"));
    await BU.Remove_BY_ML()
    await BU.Add_ML(R.RT("TC_022", "DataSet1", "CG"), R.RT("TC_022", "DataSet1", "PD"), R.RT("TC_022", "DataSet1", "VR"), R.RT("TC_022", "DataSet1", "GD"))
    await HM.Logout_VB()
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "BY1_UID"), R.RT("TC_022", "DataSet1", "BY1_PWD"));
    await BU.Add_Req(R.RT("TC_022", "DataSet1", "CP"), R.RT("TC_022", "DataSet1", "BQT"), "", R.RT("TC_022", "DataSet1", "PD"), R.RT("TC_022", "DataSet1", "GD"))
    await BU1.Connect_SL(R.RT("TC_022", "DataSet1", "MI"))
    await HM.Logout_VB()
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "BY1_UID"), R.RT("TC_022", "DataSet1", "BY1_PWD"));
    await BU1.Connect_SL(R.RT("TC_022", "DataSet1", "MI"))
    await HM.Logout_VB()
    // Login to Seller one
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "SE1_UID"), R.RT("TC_022", "DataSet1", "SE1_PWD"));
    await SM.Accept_BY(R.RT("TC_022", "DataSet1", "CP"))
    await HM.Logout_VB()

    // Login to Seller three
    await LG.Login_VB(R.RT("TC_022", "DataSet1", "SE3_UID"), R.RT("TC_022", "DataSet1", "SE3_PWD"));
    await SM.Accept_BY(R.RT("TC_022", "DataSet1", "CP"))
    await HM.Logout_VB()

    //Close all tabs
    await CB.CL_BR()
  } catch (error) {
    console.log(error.message)
    console.log("Could not Continue Scenario Please Check ")
  }
}

T22(ENV_Type, ENV_Type1);
