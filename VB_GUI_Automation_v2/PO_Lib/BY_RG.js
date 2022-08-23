import * as EV from "../Common/Environment.js";
import * as RS from "../Common/LG.js";
import * as GA_0 from "../Common/GenericAction_0.js";
import * as GA_5 from "../Common/GenericAction_5.js";
import * as W_T from"../PO_Lib/Waits.js";
export const BR_RG = async(BY_T,BY_C,BY_N,BY_M,BY_E)=>{
    try{
        RS.Write_Log("---Functionlity: Buyer registration : ---start","","");
        await EV.DR.sleep(5000);
        await GA_0.Clk("CLASS=ant-btn ant-btn-primary ant-btn-lg margin-l-r-1em vikas-btn-radius wid150 custom-register-button custom-primary-button");
        await GA_0.Clk("CSS=.ant-btn ant-btn-lg width-full color-green-shade custom-default-button");
        await GA_0.Clk("CSS=.ant-select-selection-search-input");
        await GA_5.Find_Match_Click_2("/html/body/div[3]/div/div/div/div[2]/div[1]/div/div/div[change]/div",BY_T,1);
        await GA_0.Clk("ID=basic_category");
        await GA_5.Find_Match_Click_2("/html/body/div[4]/div/div/div/div[2]/div[1]/div/div/div[change]/div",BY_C,1);
        await GA_0.Edt("ID=basic_name",BY_N);
        await GA_0.Edt("ID=basic_number",BY_M);
        await GA_0.Edt("ID=basic_email",BY_E);
        await GA_0.Clk("CSS=.ant-checkbox-input");
        // await GA_0.Clk("CSS=.ant-btn ant-btn-primary undefined custom-primary-button");
        await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/form/div[7]/div/div/div/button[1]");
        RS.Write_Log("---Functionlity: Buyer registraiton : ---End","","");
    }
    catch(error){
        console.log(error);
        RS.Write_Log("Buyer Registration failed");
    }
}

