import * as EV from "../Common/Environment.js";
import * as R from "../Common/TD.js";
import * as RS from "../Common/LG.js";
import * as BR from "../PO_Lib/BY_RG.js";
var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];
export const T31 = async (ENV_Type,ENV_Type1)=>{
    try{
        RS.Write_Log("TC_BYR","Verify that, Registration of Buyer is working fine","");
        console.log("Starting Actual Buyer Registration scenerio");

        await EV.Launcapp(ENV_Type,ENV_Type1);
        await BR.BR_RG(
            R.RT("TC_BYR","DataSet1","BY_T"),
            R.RT("TC_BYR","DataSet1","BY_C"),
            R.RT("TC_BYR","DataSet1","BY_N"),
            R.RT("TC_BYR","DataSet1","BY_M"),
            R.RT("TC_BYR","DataSet1","BY_E")
        );
    }
    catch(error){

    }
}
T31(ENV_Type,ENV_Type1);
