import * as EV from '../Common/Environment.js'
import * as GA_0 from '../Common/GenericAction_0.js'
import * as GA_5 from '../Common/GenericAction_5.js'
import * as RS from '../Common/LG.js'
// Sanjay Edit for OTP
import * as W_OTP from './Waits.js'

export const Accept_BY = async (CR_Name) => {
    try {
        console.log("I am In Accept Function")
        RS.Write_Log("---Funtionality :Accept Buyyer : ---Start", " ", " ")

        var item_pos = await GA_5.Find_Match_Pos("div.ant-table-wrapper:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(change) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)", CR_Name, 1)
        console.log(item_pos)
        await EV.DR.sleep(5000);
        let s1 = "#matches > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(".concat(item_pos).concat(")> td:nth-child(6) > div:nth-child(1) > button:nth-child(2) > span:nth-child(1)");
        await GA_0.Clk("CSS=".concat(s1));
        await EV.DR.sleep(4000);
        await GA_0.Clk("CSS=button.ant-btn-primary:nth-child(2) > span:nth-child(1)");
        await GA_0.Clk("CSS=.ant-checkbox-input");
 
        // OTP MODAL
        // await GA_0.Edt("CLASS=ant-input custom-input digit1","1") 
        // await GA_0.Edt("CLASS=ant-input custom-input digit2","2") 
        // await GA_0.Edt("CLASS=ant-input custom-input digit3","3") 
        // await GA_0.Edt("CLASS=ant-input custom-input digit4","4") 
        // Sanjay Edit for OTP
        await W_OTP.Wait_For_Otp("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[11]/div/div/div/button");

        //OTP END
    
        console.log("OTP is entered");
        await EV.DR.sleep(4000);
        await GA_0.Clk("CSS=button.ant-btn-primary:nth-child(1) > span:nth-child(1)");
        await EV.DR.sleep(2000);
        await RS.Write_Log("---Funtionality :Accept Buyer  : ---End", " ", " ")
      }
      catch (Error) {
      console.log("Could not accept Buyer Fix Problem")
    }
  }

export const Reject_BY = async (CR_Name) => {
    try {
        RS.Write_Log("---Funtionality :Reject Buyer  : ---Start", " ", " ")
        console.log("New Change 12345");
        var item_pos = await GA_5.Find_Match_Pos("div.ant-table-wrapper:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(change) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)", CR_Name, 1)
        console.log(item_pos)
        await EV.DR.sleep(5000);
        let s1 = "button.ant-btn:nth-child(3) > span:nth-child(".concat(item_pos).concat(")")
        
        await GA_0.Clk("CSS=".concat(s1));
        await EV.DR.sleep(5000);
        await GA_0.Clk("CSS=.ant-select-selector");
        await EV.DR.sleep(5000);
        await GA_0.Clk("CSS=.ant-select-item-option-content");
        await EV.DR.sleep(5000);
        await GA_0.Clk("CSS=.ant-modal-confirm-btns > button:nth-child(2) > span:nth-child(1)");
        await RS.Write_Log("---Funtionality :Reject Buyer  : ---End", " ", " ")
      }
      catch (Error) {
        console.log("Could not Reject Buyer Fix the problem");
      }
  }
 
export const Verify_Seller_Match = async (ID, PD, QT, PR, LC, QT_l, Per_Qtl, Pick_Up_DT) => {
    try {
        console.log("I am in Seller Match")
        RS.Write_Log("---Funtionality :View Details Seller Match  : ---Start", " ", " ")
        var item_pos = await GA_5.Find_Match_Pos_1("/html/body/div/div/div[2]/div[4]/div/div/div/div/div/div/table/tbody/tr[change]/td[1]/span/u", ID, 1)
        console.log(item_pos)
        await GA_0.Verify_Val_1("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)"), PD);
        await GA_0.Verify_Val_1("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(3) > p:nth-child(1)"), QT);
        await GA_0.Verify_Val_1("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(4)"), LC);
        console.log("Verify View Detials")
        await GA_0.Clk("CSS=".concat("div.ant-table-wrapper:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(").concat(item_pos).concat(") > td:nth-child(6) > div:nth-child(1) > button:nth-child(1) > span:nth-child(1)"))
        await EV.DR.sleep(5000);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(2) > div:nth-child(1)", "Buyer Id")
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(2) > div:nth-child(2)", ID);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(3) > div:nth-child(1)", "Produce")
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(3) > div:nth-child(2)", PD);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(4) > div:nth-child(1)", "Quantity")
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(4) > div:nth-child(2)", QT_l);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(5) > div:nth-child(1)", "Price per quintal")
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(5) > div:nth-child(2)", Per_Qtl);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(6) > div:nth-child(1)", "Total price")
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(6) > div:nth-child(2)", PR);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(7) > div:nth-child(1)", "Location");
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(7) > div:nth-child(2)", LC);
        await GA_0.Verify_Val("CSS= div.ant-row:nth-child(8) > div:nth-child(1)", "Tentative pickup")
        await GA_0.Verify_Val_1("CSS= div.ant-row:nth-child(8) > div:nth-child(2)", Pick_Up_DT);
        await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[9]/div/button/span")
        RS.Write_Log("---Funtionality :View Details Seller Match  : ---End", " ", " ")
      }
      catch (Eror) {
          console.log("Could not View Detials of Match Please check")
        }
    }

export const Verify_Seller_Match_Non_Existence = async (ID) => {
      try {
          RS.Write_Log("---Funtionality : Verify Seller Match Non Existence: ---Start", " ", " ")
          var item_pos = await GA_5.Verify_Non_Existence("/html/body/div[1]/div/div[2]/div[6]/div/div/div/div/div/div/table/tbody/tr[change]/td[1]/span/u", ID, 1)
          RS.Write_Log("---Funtionality :Verify Seller Match Non Existence:: ---End", " ", " ")
        }
      catch (error) {
          console.log("Could not Verify Removal- fix the problem")
        }
    }