import * as EV from "../Common/Environment.js";
import * as RS from "../Common/LG.js";
import * as GA_0 from "../Common/GenericAction_0.js";
import * as GA_5 from "../Common/GenericAction_5.js";
import * as W_T from "./Waits.js";
import { Key } from "selenium-webdriver";
export const SL_RG = async (SL_T,SL_N,SL_M)=>{
    try{
        RS.Write_Log("---Functionality: Seller Registration as Farmer : ---Start","","");
        await EV.DR.sleep(5000);
        await GA_0.Clk("CLASS=ant-btn ant-btn-primary ant-btn-lg margin-l-r-1em vikas-btn-radius wid150 custom-register-button custom-primary-button");
        await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/div[2]/div[1]/button");
        await GA_0.Clk("ID=basic_type");
        await GA_5.Find_Match_Click_2("/html/body/div[3]/div/div/div/div[2]/div[1]/div/div/div[change]/div",SL_T,1);
        await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/form/div[2]/div[2]/div/div/div/label[2]/span[2]");
        await GA_0.Edt("ID=basic_name",SL_N);
        await GA_0.Edt("ID=basic_number",SL_M);
        // await EV.DR.sleep(1000);
        await GA_0.Clk("CSS=.ant-checkbox-input");
        // await EV.DR.sleep(5000);
        //await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/form/div[5]/div/div/div/button[1]");
        //await GA_0.Clk("CSS=.ant-btn ant-btn-primary undefined custom-primary-button");
        await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/form/div[6]/div/div/div/button[1]");
        await EV.DR.sleep(5000);
        await W_T.Wait_For_Otp("Xpath=/html/body/div[4]/div/div[2]/div/div[2]/div[2]/div[3]/div/div/div/button");
        await GA_0.Clk("Xpath=/html/body/div[4]/div/div[2]/div/div[2]/div[2]/div[3]/div/div/div/button");
        RS.Write_Log("---Funtionality : Seller Registration as Farmer  : ---End"," "," ")

    }
    catch(error){
        console.log(error);
        RS.Write_Log("Registration failed!!!","","");
    }


}
export const SL_KYC = async (SL_KC,SL_AC,SL_RTC,SL_E,SL_PIN,SL_ADR,SL_BKN,SL_IFC,SL_ACN,SL_CACN,SL_UPI,SL_AI)=>{
    try{
        console.log("Seller Kyc Reg");
        RS.Write_Log("---Functionality: Kyc : ---start","","");
        await GA_0.Edt("ID=basic_kisancard",SL_KC);
        await W_T.Wait_For_Doc("Xpath=/html/body/div/div/div[2]/form/div[2]/div/div[1]/div[2]/div/div/div[2]/div/div/div/span/div[2]");
        await GA_0.Edt("ID=basic_uidai",SL_AC);
        await W_T.Wait_For_Doc("Xpath=/html/body/div/div/div[2]/form/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/div/span/div[2]");
        await GA_0.Edt("ID=basic_rtc",SL_RTC);
        await W_T.Wait_For_Doc("Xpath=/html/body/div/div/div[2]/form/div[2]/div/div[3]/div[2]/div/div/div[2]/div/div/div/span/div[2]");
        await GA_0.Edt("ID=basic_email",SL_E);
        await GA_0.Edt("ID=basic_zip",SL_PIN);
        await GA_0.scroll_move("ID=basic_address1");
        await EV.DR.sleep(1000);
        await GA_0.Edt("ID=basic_address1",SL_ADR);
        await GA_0.Edt("ID=basic_account_name",SL_BKN);
        await GA_0.Edt("ID=basic_ifsc_code",SL_IFC);
        await GA_0.Edt("ID=basic_account_number",SL_ACN);
        await GA_0.Edt("ID=basic_confirm_account_number",SL_CACN);
        await W_T.Wait_For_Doc("Xpath=/html/body/div/div/div[2]/form/div[4]/div/div[1]/div[2]/div/div/span/div[2]");
        await GA_0.Edt("ID=basic_upi_id",SL_UPI);
        await GA_0.Edt("ID=basic_additional_info",SL_AI);
        await GA_0.Clk("CSS=.ant-checkbox-input");
        // await GA_0.Clk("CSS=.ant-btn ant-btn-primary margin-l-r-1em width-full custom-primary-button");
        await GA_0.Clk("Xpath=/html/body/div/div/div[2]/form/div[6]/div/div/div[2]/div/div/div/div/button");
        RS.Write_Log("---Functionality: Kyc : ---End","","");


    }
    catch(error){
        console.log(error);
        RS.Write_Log("seller Kyc failed","","");
    }
}
