import { Builder, By, Key, until } from "selenium-webdriver";

import * as EV from '../Common/Environment.js';
import * as GA_0 from '../Common/GenericAction_0.js';
import * as GA_5 from '../Common/GenericAction_5.js';
import * as RS from '../Common/LG.js';

//  Add Requirements
export const Add_Req = async (SelectProduce, QT, DT, PD, GD) => {
   try {
      console.log("Adding Req 1234")
      RS.Write_Log("---Funtionality :Add Req: ---Start", " ", " ")
      await GA_0.scroll_move("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
      await EV.DR.sleep(3000);
      await GA_0.Clk_1("CLASS=ant-btn ant-btn-primary add-crop-btn vikas-btn-radius custom-primary-button");

      await GA_0.scroll_move("CSS=#my-requirements-button > span:nth-child(1)");

      await GA_0.Clk_1("Xpath=//@class='ant-btn ant-btn-primary add-crop-btn vikas-btn-radius custom-primary-button' and @content='Add Requirements']");
      await EV.DR.sleep(3000);
      await GA_0.Clk_1("CLASS=ant-select-selection-item");
      await EV.DR.sleep(3000);
      let v1 = "'".concat(SelectProduce).concat("'");
      console.log(v1);
   
      let s1 = "//*[@title=".concat(v1).concat("]");
      console.log("Crop 1234");
      console.log(s1);
   
      await EV.DR.findElement(By.xpath(s1)).click();
      await EV.DR.sleep(5000);
      await GA_0.Edt("ID=basic_quantity", QT)
      await EV.DR.sleep(5000);
      await GA_0.Clk("CLASS=ant-btn ant-btn-primary crop-modal-action-btn vikas-btn-radius add-edit-button");
      await EV.DR.sleep(5000);

      var item_pos = await GA_5.Find_Match_Pos("div.ant-table-wrapper:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(change) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)", PD, 1)
      console.log("REQ ITem", item_pos)
      await GA_0.Verify_Val("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(2)"), GD);
      console.log("REQ ITem", item_pos)
      await GA_0.Verify_Val_1("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(3) > p:nth-child(1)"), QT);
      // await GA_0.Verify_Val("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(4)"),DT); 
      RS.Write_Log("---Funtionality :Add Req: ---End", " ", " ")
   }
   catch (error) {
      console.log("Could not Add Requirements- fix the problem")
   }
}

export const Add_ML = async (CG, PD, VR, GD) => {
   try {
      console.log("Data is ",CG,PD,VR)   
      RS.Write_Log("---Funtionality :Add Master List: ---Start", " ", " ")

      //Adding new feature class name for adding My masterlist
      await GA_0.scroll_move("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
      await EV.DR.sleep(3000);
      await GA_0.Clk_1("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
      await GA_0.Clk("CSS=button.ant-btn:nth-child(7)")
      await EV.DR.sleep(3000);
      await GA_0.Clk("ID=rc_select_0");
      await EV.DR.sleep(3000);

      let v1 = "'".concat(CG).concat("'");
      console.log(v1);

      let s1 = "//*[@title=".concat(v1).concat("]");
      console.log("Crop 1234");

      console.log(s1);
      EV.DR.findElement(By.xpath(s1)).click();
      await EV.DR.sleep(3000);

      var Temp1 = await GA_5.Find_Match_Click("li.ant-list-item:nth-child(change)", PD, 3);
      console.log("Produce Item Position");
      console.log(Temp1);
      await EV.DR.sleep(3000);

      console.log("Variety Item Position");
      var Temp2 = await GA_5.Find_Match_Click("li.variety-list-item:nth-child(change)", VR, 3);
      console.log("Variety Item Position");
      console.log(Temp2);
      await EV.DR.sleep(3000);
      console.log("Checking grade 124");
      await GA_0.Clk_1("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/div[3]/div/li/label/span[1]/input")
      
      //Adding class name for Done button in My masterlist
      await GA_0.Clk_1("CLASS=ant-btn ant-btn-primary crop-modal-action-btn vikas-btn-radius done-button");
      await EV.DR.sleep(7000);

      //Adding class name for My masterlist
      // await GA_0.Clk_2("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
      // await EV.DR.sleep(3000);

      await GA_0.scroll_move("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
      await EV.DR.sleep(3000);
      await GA_0.Clk_1("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
      await EV.DR.sleep(3000);

      console.log("only verificaiton  be ready")

      var pos = await GA_5.Find_Match_Pos_1("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[4]/div/div/div/div/div/div/div[2]/table/tbody/tr[change]/td[1]", CG, 2);
      console.log("Item Position");
      console.log(pos);

      let p1 = "tr.custom-row:nth-child(".concat(pos).concat(") > td:nth-child(1)")
      await GA_0.Verify_Val("CSS=".concat(p1), CG);

      let p2 = "tr.custom-row:nth-child(".concat(pos).concat(") > td:nth-child(2)")
      await GA_0.Verify_Val("CSS=".concat(p2), PD);

      let p3 = "tr.custom-row:nth-child(".concat(pos).concat(") > td:nth-child(3)")
      await GA_0.Verify_Val("CSS=".concat(p3), VR);
      await EV.DR.sleep(3000);

      //await GA_0.Clk("CSS=button.crop-modal-action-btn:nth-child(2) > span:nth-child(1)");
      await GA_0.Clk_1("CLASS=ant-btn ant-btn-primary crop-modal-action-btn vikas-btn-radius done-button");
      RS.Write_Log("---Funtionality :Add Master List: ---End", " ", " ")
   }
   catch (error) {
      console.log("Could not Add Master List- fix the problem")
   }
}

export const Verify_Buyer_Req_Detials = async (PD, GD, QT, DT) => {
   try {
      console.log("Adding Req 1234")
      RS.Write_Log("---Funtionality :Verify Buyer Requirement Details : ---Start", " ", " ")
      await EV.DR.sleep(5000);

      var item_pos = await GA_5.Find_Match_Pos("div.ant-table-wrapper:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(change) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)", PD, 1)
      console.log("REQ ITem", item_pos)

      await GA_0.Verify_Val("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(2)"), GD);
      console.log("REQ ITem", item_pos)

      await GA_0.Verify_Val_1("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(3) > p:nth-child(1)"), QT);
      //  await GA_0.Verify_Val("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(4)"),DT); 
      RS.Write_Log("---Funtionality :Verify Buyer Requirement  Details : ---End", " ", " ")
   }
   catch (error) {
      console.log("Could not Verify Buyer Requirements- fix the problem")
   }
}

//  Remove Master List From Buyer Screen
export const Remove_BY_ML = async (QTY, DATE) => {
   console.log("I am in Remove Master List Screen")
   await GA_0.scroll_move("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
   await EV.DR.sleep(3000);
   await GA_0.Clk_1("CLASS=ant-btn add-produce-btn vikas-btn-radius my-master-list-button custom-default-button");
   await GA_0.Clk("CSS=button.ant-btn:nth-child(7)")
   
   //var  Obj_prop = "tr.ant-table-row:nth-child(change) > td:nth-child(5) > div:nth-child(1) > button:nth-child(1) > span:nth-child(1)"
   var Obj_prop = "tr.ant-table-row:nth-child(2) > td:nth-child(5) > div:nth-child(1) > button:nth-child(1) > span:nth-child(1)"
   let intail_prop = Obj_prop;
   let counter = 2;
   for (; ; counter++) {
      try {
         //    var res = Obj_prop.replace("change", counter);
         await console.log("Trying To Remove Master list Item")
         await console.log("List Item prop val")
         await console.log("Trying to find Item 123456789")
         await console.log(Obj_prop)
         //  EV.DR.findElement(By.css(res));
         let item = await EV.DR.wait(until.elementLocated(By.css(Obj_prop)), 30000, 'Sorry waited so long', 5000)
         await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
         await item.click();
      }catch (error) {
         console.log("Sorry Element not found")
         await GA_0.Clk("CSS=button.crop-modal-action-btn:nth-child(2)");
         break;
      }
   }
}

//New feature of Edit button
export const edit_AddReqmts = async (QTY, DT) => {
   try {
      console.log("I am in edit button");
      RS.Write_Log("---Funtionality :Editing of requirements : ---Start", " ", " ");
      await EV.DR.sleep(5000);
      await GA_0.Clk("CLASS=ant-btn ant-btn-link");
      //quantity reqmt
      await GA_0.Edt("ID=basic_quantity", QTY);
      //date selection
      //await GA_0.Clk("ID=basic_delivery_by", DT);
      await GA_0.Clk_1("CSS=td.ant-picker-cell-end:nth-child(1) > div:nth-child(1)");
      await GA_0.Clk("CLASS=ant-btn ant-btn-link ant-btn-block");
      await GA_0.Clk("CLASS=ant-btn ant-btn-primary");
      RS.Write_Log("---Funtionality :Editing of requirements : ---End", " ", " ");
   }
   catch (error) {
      console.log("Sorry")

   }
}
export const delete_AddReqmts = async () => {
   try {
      console.log("I am in delete button");
      RS.Write_Log("---Funtionality :Deleting of requirements : ---Start", " ");
      await EV.DR.sleep(5000);
      await GA_0.Clk("CLASS=ant-btn ant-btn-link ant-btn-dangerous");
      await EV.DR.sleep(5000);
      await GA_0.Clk("CLASS=ant-btn ant-btn-primary");
      await EV.DR.sleep(5000);
      RS.Write_Log("---Funtionality :Deleting of requirements : ---End", " ");
   }
   catch (error) {
      console.log("Sorry")
   }
}





