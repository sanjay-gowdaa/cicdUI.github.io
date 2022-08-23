import * as EV from "../Common/Environment.js";
import * as GA_0 from "../Common/GenericAction_0.js";
import * as GA_5 from "../Common/GenericAction_5.js";
import * as RS from "../Common/LG.js";
import * as W_T from "./Waits.js";


export const Buyer_Pending = async(PY_M,PY_N,BY_Receipt) => {
    try{
        console.log("I am in Buyer Pending Transaction");
        RS.Write_Log("---Functionality: Buyer Transaction : ---Start","","");
        await GA_0.scroll_move("Xpath=/html/body/div/div/div[2]/div[8]/h2");
        await EV.DR.sleep(5000);
        await GA_0.Clk("Xpath=//*[@id='rc-tabs-1-tab-Pending']");
        await GA_0.Clk("Xpath=/html/body/div/div/div[2]/div[8]/div/div[2]/div/div[1]/div/div/div/div/div/div/table/tbody/tr/td[9]/button");
        await GA_0.Clk("CSS=.ant-select-selection-item");
        await GA_5.Find_Match_Click_2("/html/body/div[3]/div/div/div/div[2]/div[1]/div/div/div[change]/div",PY_M,3);
        await GA_0.Clk("ID=CollectedDate");
        await GA_0.Clk("CSS=.ant-picker-today-btn");
        await GA_0.Edt("ID=CollectedBy",PY_N);
        //await W_T.Wait_For_Doc("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/div[2]/form/div/form/div[4]/div[2]/div/div/span");
        await GA_0.Edt("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/div[2]/form/div/form/div[4]/div[2]/div/div/input",BY_Receipt);
        await GA_0.Clk("CSS=.ant-btn other-btn-save");


    }
    catch(error){
        console.log(error);
    }
}

