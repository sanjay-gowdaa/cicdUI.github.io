import { Builder, By, Key, until } from "selenium-webdriver";

import * as EV from '../Common/Environment.js'
import * as GA_0 from '../Common/GenericAction_0.js'
import * as RS from '../Common/LG.js'

// Adding requirements and click on cancel
export const Cancel_Req = async (CG, QT, DT, PD, GD) => {
   try {
      console.log("Adding Req 1234")
      RS.Write_Log("---Funtionality :Rqmt cancel start: ---Start", " ", " ")

      await GA_0.Clk_1("CSS=.add-crop-btn > span:nth-child(1)");
      await EV.DR.sleep(5000);
      await GA_0.Clk("CSS=.ant-select-selection-item");
      await EV.DR.sleep(3000);

      let v1 = "'".concat(CG).concat("'");
      console.log(v1);

      let s1 = "//*[@title=".concat(v1).concat("]");
      console.log("Crop 1234");

      console.log(s1);
      EV.DR.findElement(By.xpath(s1)).click();

      await EV.DR.sleep(5000);
      await GA_0.Edt("ID=basic_quantity", QT)
      await GA_0.Edt("ID=basic_delivery_by", DT)
      await GA_0.Clk("ID=basic_delivery_by")

      // EV.DR.findElement(By.id("basic_delivery_by")).sendKeys(DT, Key.ENTER);

      await EV.DR.sleep(5000);
      await GA_0.Clk("CSS=.ant-picker-cell-end > div:nth-child(1)");
      await EV.DR.sleep(5000);
      //await GA_0.Clk("CSS=button.crop-modal-action-btn:nth-child(2)");

      //Cancel button
      await GA_0.Clk_1("CSS=.cancel-button > span:nth-child(1)");
      await EV.DR.sleep(5000);
      RS.Write_Log("---Funtionality :Rqmt cancel: ---End", " ", " ")
   }

   catch (error) {
      console.log(error.message);
      console.log("Could not Add Requirements- fix the problem")
   }
}






