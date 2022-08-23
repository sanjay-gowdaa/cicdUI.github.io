import * as EV from '../Common/Environment.js';
import * as SM from '../PO_Lib/SL_MT.js';
import * as LG from '../PO_Lib/Login.js';
import * as R from '../Common/TD.js';

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T11 = async (ENV_Type, ENV_Type1) => {
  await EV.Launcapp(ENV_Type, ENV_Type1)
  await LG.Login_VB(R.RT("TC_011", "TC_011", "SE1_UID"), R.RT("TC_011", "TC_011", "SE1_PWD"));
  await SM.Verify_Seller_Match(R.RT("TC_011", "TC_011", "M_ID"), R.RT("TC_011", "TC_011", "CP"), R.RT("TC_011", "TC_011", "QT"), R.RT("TC_011", "TC_011", "TPR"), R.RT("TC_011", "TC_011", "LC"), R.RT("TC_011", "TC_011", "QT_1"), R.RT("TC_011", "TC_011", "PQTL"), R.RT("TC_011", "TC_011", "PDT"))
}

T11(ENV_Type, ENV_Type1);
