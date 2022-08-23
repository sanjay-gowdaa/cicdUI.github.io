import * as EV from "../Common/Environment.js";
import * as CB from "../Common/closeBrowser.js";
import * as R from "../Common/TD.js";
import * as RS from "../Common/LG.js";
import * as LG from "../PO_Lib/Login.js";
import * as HM from "../PO_Lib/Home.js";
import * as SR from "../PO_Lib/SL_RG.js";

var ENV_Type = process.argv[2];
var ENV_Type1 = process.argv[3];

export const T30 = async(ENV_Type,ENV_Type1)=>{
    try{
        RS.Write_Log("TC_SLR","Verify that , Registration of Seller is working fine","");
        console.log("Starting Actual Seller Registration scenerio");
        
        await EV.Launcapp(ENV_Type, ENV_Type1);
        await SR.SL_RG(
            R.RT("TC_SLR","DataSet1","SL_T"),
            R.RT("TC_SLR","DataSet1","SL_N"),
            R.RT("TC_SLR","DataSet1","SL_M")
        );
        await SR.SL_KYC(
            R.RT("TC_SLR","DataSet1","SL_KC"),
            R.RT("TC_SLR","DataSet1","SL_AC"),
            R.RT("TC_SLR","DataSet1","SL_RTC"),
            R.RT("TC_SLR","DataSet1","SL_E"),
            R.RT("TC_SLR","DataSet1","SL_PIN"),
            R.RT("TC_SLR","DataSet1","SL_ADR"),
            R.RT("TC_SLR","DataSet1","SL_BKN"),
            R.RT("TC_SLR","DataSet1","SL_IFC"),
            R.RT("TC_SLR","DataSet1","SL_ACN"),
            R.RT("TC_SLR","DataSet1","SL_CACN"),
            R.RT("TC_SLR","DataSet1","SL_UPI"),
            R.RT("TC_SLR","DataSet1","SL_AI")
        );


    }
    catch(error){
        console.log(error);
        console.log("could not continue scenerio please check!!!");
    }
}
T30(ENV_Type,ENV_Type1)