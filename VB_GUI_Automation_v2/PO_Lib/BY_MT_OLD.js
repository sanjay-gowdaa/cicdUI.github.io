import * as EV from   '../Common/Environment.js';
import * as RS  from   '../Common/LG.js';
import * as GA_0 from   '../Common/GenericAction_0.js';
import * as GA_5 from   '../Common/GenericAction_5.js';

export const  Connect_SL = async (CR_Name) => {
  try {
    RS.Write_Log("---Funtionality :Connect Seller : ---Start"," ")
    console.log("I a m in connect SL")
    RS.Write_Log("---Funtionality :connect seller : ---Start"," ")
    var item_pos = await GA_5.Find_Match_Pos(".matches-table > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(change) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)", CR_Name, 1)
    console.log("item position is",item_pos)
    await EV.DR.sleep(5000);
    let s1 = "/html/body/div/div/div[2]/div[6]/div/div/div/div/div/div/table/tbody/tr[".concat(item_pos).concat("]/td[6]/div/button[2]/span");
    await GA_0.Clk_1("Xpath=".concat(s1));
    await EV.DR.sleep(7000);
    await GA_0.Clk("CSS=.ant-checkbox-input");
    // OTP MODAL 
    await GA_0.Edt("CLASS=ant-input custom-input digit1","1") 
    await GA_0.Edt("CLASS=ant-input custom-input digit2","2") 
    await GA_0.Edt("CLASS=ant-input custom-input digit3","3") 
    await GA_0.Edt("CLASS=ant-input custom-input digit4","4") 
    // END OF OTP
    
    console.log("OTP is entered")
    await EV.DR.sleep(5000);
    // Button
    await GA_0.Clk_1("CSS=.verify-otp-and-agree > span:nth-child(1)");
    await GA_0.Clk_1("CSS=.ant-modal-confirm-btns > button:nth-child(1) > span:nth-child(1)")
    RS.Write_Log("---Funtionality :Connect Seller : ---End"," ")
  } 
     catch(Error) {
      console.log("Could not Connect to  Seller Fix the problem")
      console.log(error.message);
    }
}

export const  Reject_SL = async (CR_Name) => {
  try {
      console.log("I a m in Reject SL")
      RS.Write_Log("---Funtionality :Reject Seller : ---Start"," ")
      
      var item_pos = await GA_5.Find_Match_Pos(".matches-table > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(change) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)", CR_Name, 1)
      console.log("item position is",item_pos)
      await EV.DR.sleep(5000);
      let s1 = "/html/body/div[1]/div/div[2]/div[6]/div/div/div/div/div/div/table/tbody/tr[1]/td[6]/div/button[3]/span";
      await GA_0.Clk_1("Xpath=".concat(s1));
      await GA_0.Clk_1("CSS=.ant-modal-confirm-btns > button:nth-child(2) > span:nth-child(1)");
      await EV.DR.sleep(4000);
      RS.Write_Log("---Funtionality :Reject Seller : ---End"," ")
  } 
  catch (Error) {
      console.log("Could not Reject Seller Fix the problem")
    }
}

// Verification of Match
export const  Verify_Buyer_Match= async (ID,PD,GD,QT,PR,LC,PD_CG,QT_l,Per_Qtl,Pick_Up_DT) => {
  try {
      console.log("I am in Buyer Match 99912")
      RS.Write_Log("---Funtionality : Buyer Match- View Detials: ---Start"," ")
    // var item_pos = await GA_5.Find_Match_Pos_1("/html/body/div[1]/div/div[2]/div[6]/div/div/div/div/div/div/table/tbody/tr[change]/td[1]/span/u",ID,1)  
     var item_pos = await GA_5.Find_Match_Pos_1("/html/body/div[1]/div/div[2]/div[6]/div/div/div/div/div/div/table/tbody/tr[change]/td[6]/div/button[1]/span",ID,1)  
   
     console.log("item position is778",item_pos)
    
    await GA_0.Verify_Val("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)"),PD );
    await GA_0.Verify_Val("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)"),GD );
    await GA_0.Verify_Val_1("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(")> td:nth-child(3)"),QT );
    await GA_0.Verify_Val("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(4)"),PR );
    await GA_0.Verify_Val("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(5)"),LC );
    console.log("Verify View Detials12345")
    RS.Write_Log("---Funtionality : Buyer Match- View Detials Screens: ---Start"," ")
    //await GA_0.Clk("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(6) > div:nth-child(1) > button:nth-child(1) > span:nth-child(1)"))
  //await GA_0.Clk("CSS=".concat(".matches-table > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(6) > div:nth-child(1) > button:nth-child(1) > span:nth-child(1"))
    await GA_0.Clk("CSS=.view-details-button > span:nth-child(1)")
    await EV.DR.sleep(5000);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(2) > div:nth-child(1)","Seller Id")
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(2) > div:nth-child(2)",ID);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(3) > div:nth-child(1)","Produce")
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(3) > div:nth-child(2)",PD_CG);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(4) > div:nth-child(1)","Quantity")
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(4) > div:nth-child(2)",QT_l);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(5) > div:nth-child(1)","Price per quintal")
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(5) > div:nth-child(2)",Per_Qtl);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(6) > div:nth-child(1)","Total price")
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(6) > div:nth-child(2)",PR);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(7) > div:nth-child(1)","Location");
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(7) > div:nth-child(2)",LC);
    await GA_0.Verify_Val("CSS= div.ant-row:nth-child(8) > div:nth-child(1)","Tentative pickup")
    await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(8) > div:nth-child(2)",Pick_Up_DT);
    // var prop = "//*[text()='Close']";
    //Dev site
   // await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[8]/div/button/span")
   //Test site
    await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[10]/div/button/span")
    RS.Write_Log("---Funtionality :Buyer Match- View Detials: ---End"," ")
  } 
  catch (error) {
      console.log("Could not Verify View Detials- fix the problem")
    }
}

//  Verify Buyer Match Removal
export const  Verify_Buyer_Match_Non_Existence= async (ID) => {
  try {
      console.log("I am in Buyer Match 99912")
      RS.Write_Log("---Funtionality : Verify Buyer Match Non Existence: ---Start"," ")
      await GA_5.Verify_Non_Existence("html/body/div/div/div[2]/div[6]/div/div/div/div/div/div/table/tbody/tr/td[change]/div/div/span/u",ID,1) 
      RS.Write_Log("---Funtionality :Verify Buyer Match Non Existence:: ---End"," ")
  } 
  catch (error) {
      console.log("Could not Verify Removal- fix the problem")
    }
}