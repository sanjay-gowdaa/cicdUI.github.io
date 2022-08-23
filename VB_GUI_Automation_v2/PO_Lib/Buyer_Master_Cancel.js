import { Builder, By, Key, until } from "selenium-webdriver";

import * as EV from '../Common/Environment.js'
import * as GA_0 from '../Common/GenericAction_0.js'
import * as GA_5 from '../Common/GenericAction_5.js'
import * as RS from '../Common/LG.js'

export const Cancel_Masterlist = async (CG, PD, VR, GD) => {
  try {
    RS.Write_Log("---Funtionality :Cancel Master List: ---Start", " "," ")
    await GA_0.Clk("CSS=button.ant-btn:nth-child(3) > span:nth-child(1)")
    await EV.DR.sleep(5000);
    await GA_0.Clk("ID=rc_select_0");
    await EV.DR.sleep(3000);
    let v1 = "'".concat(CG).concat("'");
    console.log(v1);

    let s1 = "//*[@title=".concat(v1).concat("]");
    console.log("Crop 1234");
    console.log(s1);

    EV.DR.findElement(By.xpath(s1)).click();
    await EV.DR.sleep(5000);

    var Temp1 = await GA_5.Find_Match_Click("li.ant-list-item:nth-child(change)", PD, 3);
    console.log("Produce Item Position");
    console.log(Temp1);
    await EV.DR.sleep(5000);
    console.log("Variety Item Position");

    var Temp2 = await GA_5.Find_Match_Click("li.variety-list-item:nth-child(change)", VR, 3);
    console.log("Variety Item Position");
    console.log(Temp2);
    await EV.DR.sleep(5000);
    
    var Temp3 = await GA_5.Find_Match_Click_2("html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[2]/div[3]/div/li[change]/label/span[2]", GD, 1);
    console.log("Grade  Item Position");
    console.log(Temp3);
    await EV.DR.sleep(5000);
    await GA_0.Clk("CSS=button.crop-modal-action-btn:nth-child(2) > span:nth-child(1)");
    await EV.DR.sleep(5000);

    //Cancel button for Masterlist
    await GA_0.Clk("button.margin-l-r-1em > span:nth-child(1)")
    await EV.DR.sleep(5000);

    RS.Write_Log("---Funtionality :Cancel Master List: ---End", " "," ")

  }
  catch (error) {
    console.log(error.message);
  }
}
