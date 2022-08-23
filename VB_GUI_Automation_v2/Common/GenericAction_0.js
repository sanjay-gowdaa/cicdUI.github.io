import { Builder, By, Key, until } from "selenium-webdriver";

import * as EV from './Environment.js'
import * as Loc from './LocHandler.js'
import * as RS from './LG.js'

export let status = null
export const Edt = async (Obj_prop, Val) => {
   await Loc.Get_prop_val(Obj_prop);
   try {
      await EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000).sendKeys(Val);
      RS.Write_Log("Edit Specified Field", "Pass", " ")
   }
   catch (error) {
      RS.Write_Log("Edit Specified Field", "Fail", "Specified Element not found")
   }
}

export const Verify_Val = async (Obj_prop, ExpVal) => {
   await Loc.Get_prop_val(Obj_prop);
   try {
      let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000);
      await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);

      let Actval = await item.getText();
      await console.log("Actual val Exp val 55 ",Actval,ExpVal)
      if (ExpVal == Actval) {
         await console.log("Expected Value equals Actual Vaue ")
         await console.log("value saved 123")
         RS.Write_Log("Verify Specified Val Saved or not", "Pass", " ")
      }
      else {
         await console.log("Expected Value  Not equals Actual Vaue ")
         await console.log("value Not saved ")
         RS.Write_Log("Verify Specified Val Saved or not", "Fail", " Not Saved ")
      }
   }
   catch (error) {
      RS.Write_Log("Verify Specified Val Saved or not", "Fail", " Element not found")
   }
}

//  Verify Field val
export const Verify_Val_1 = async (Obj_prop, ExpVal) => {
   await Loc.Get_prop_val(Obj_prop);
   try {
      await console.log("I am in Verify Val Generic Actoion  Lib  Latest 12345 ")
      let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000);
      await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
      let Actval = await item.getText();
      
      if (Actval.includes(ExpVal)) {
         await console.log("Expected Value equals Actual Vaue ")
         await console.log("value saved ")
         RS.Write_Log("Verify Specified Val Saved or not", "Pass", " ")
      }
      else {
         await console.log("Expected Value Not equals Actual Vaue ")
         await console.log("value Not saved ")
         RS.Write_Log("Verify Specified Val Saved or not", "Fail", " Not Saved ")
      }
   }
   catch (error) {
      RS.Write_Log("Verify Specified Val Saved or not", "Fail", " Element not present ")
   }
}

// Mouse Move
export const scroll_move = async (Obj_prop) => {
   await Loc.Get_prop_val(Obj_prop);
   try {
      console.log(" Button property007")
      console.log(Loc.Prop_val)
      let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000)
      await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
      const actions = EV.DR.actions({ async: true });
      await actions.move({ origin: item }).perform();
   }
   catch (error) {
      RS.Write_Log("Click Specified Element ", "Fail", "Element not found")
      RS.Write_Log("Click Specified Element ", "Fail", error.message)
   }
}

//   Click Function
export const Clk = async (Obj_prop) => {
   await Loc.Get_prop_val(Obj_prop);
   try {
      console.log(" Button property007")
      console.log(Loc.Prop_val)
      let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000)
      await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
      const actions = EV.DR.actions({ async: true });
      await actions.move({ origin: item }).perform();
      item.click();
      RS.Write_Log("Click Specified Element ", "Pass", " ")
   }
   catch (error) {
      RS.Write_Log("Click Specified Element ", "Fail", "Element not found")
      RS.Write_Log("Click Specified Element ", "Fail", error.message)
   }
}

export const Clk_1 = async (Obj_prop) => {
   await Loc.Get_prop_val(Obj_prop);

   console.log(" Button property007")
   console.log(Loc.Prop_val)
   try {
      let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000);
      await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
      item.click();
      RS.Write_Log("Click Specified Element ", "Pass", " ")
   }
   catch (error) {
      RS.Write_Log("Click Specified Element ", "Fail", "Element not found")
      RS.Write_Log("Click Specified Element ", "Fail", error.message)
   }
}


export const Clk_2 = async (Obj_prop) => {
   await Loc.Get_prop_val(Obj_prop);
   try {
      let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000)
      await actions.move({ origin: item }).perform();

      item.click();
   }
   catch (error) {
   }
}

// Radio off
export const RD_OFF = (Obj_prop) => {
         Loc.Get_prop_val(Obj_prop);
         try {
               let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 'Timed out after 30 seconds', 5000);
               if (item.isSelected() = true) {
               item.click();
               RS.Write_Log("OFF Specified Radio Button ", "Pass", "")
            }
         }
         catch (error) {
               RS.Write_Log("OFF Specified Radio Button ", "Fail", "Specified Element not found")
            }
      }

      
 // Radio on
export const RD_ON = (Obj_prop) => {
   Loc.Get_prop_val(Obj_prop);
   try {
         let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 'Timed out after 30 seconds', 5000);
         if (item.isSelected() != true) {
         item.click();
         RS.Write_Log("On Specified Radio Button ", "Pass", "")
      }
   }
   catch (error) {
         RS.Write_Log("On Specified Radio Button ", "Fail", "Specified Element not found")
      }
}











// Check Box
export const Box_Check = (Obj_prop) => {
      Loc.Get_prop_val(Obj_prop);
      try {
         let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000,'Timed out after 30 seconds', 5000);
         if (item.isSelected() != true) {
            item.click();
            RS.Write_Log("Check Specified Box ", "Pass", "")
         }
      }
      catch (error) {
         console.log(error);
         RS.Write_Log("Check Specified Box ", "Fail", "Element not Found")
      }
   }

export const Box_Un_Check = (Obj_prop) => {
      Loc.Get_prop_val(Obj_prop);
       try {
            let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 'Timed out after 30 seconds', 5000);
            if (item.isSelected() = true) {
               item.click();
               RS.Write_Log(" Un Check Specified Box ", "Pass", "")
            }
         }
      catch (error) {
         RS.Write_Log(" Un Check Specified Box ", "Pass", "Element Not Found")
      }
   }

export const Verify_Existence = async (Obj_prop) => {
         await Loc.Get_prop_val(Obj_prop);
         try {
            let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000)
            await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
            const actions = EV.DR.actions({ async: true });
            await actions.move({ origin: item }).perform();
            RS.Write_Log("Verify presence of Specified Element ", "Pass", "")
         }
         catch (Error) {
            RS.Write_Log("Verify presence of Specified Element ", "Fail", "Not Found")
         }
      }

export const Verify_Non_Existence = async (Obj_prop) => {
         await Loc.Get_prop_val(Obj_prop);
         try {
            let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000)
            await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
            const actions = EV.DR.actions({ async: true });
            await actions.move({ origin: item }).perform();
            RS.Write_Log("Verify Non presence of Specified Element ", "Fail", "Element Found")
         }
         catch (Error) {
            RS.Write_Log("Verify Non presence of Specified Element ", "Pass", "")
         }
      }

export const Verify_Logout = async (Obj_prop) => {
         await console.log("I am in Verify Existence  latest 12345678")
         await Loc.Get_prop_val(Obj_prop);
         try {
            let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 30000, 'Timed out after 30 seconds', 5000)
            await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
            const actions = EV.DR.actions({ async: true });
            await actions.move({ origin: item }).perform();
            RS.Write_Log("Verify Logout ", "Pass", "")
         }
         catch (Error) {
            console.log("Login Element Not Found will close browser")
            RS.Write_Log("Verify Logout ", "Fail", "")
         }
      }

export const Clk_Newuser = async (Obj_prop) => {
         await console.log("I am in Clk_Newuser")
         await Loc.Get_prop_val(Obj_prop);
         try {
            let item = EV.DR.wait(until.elementLocated(Loc.Prop_val), 5000, 'Timed out after 30 seconds', 5000)
            await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
            const actions = EV.DR.actions({ async: true });
            await actions.move({ origin: item }).perform();
            item.click();
            RS.Write_Log("Click Specified Element ", "Pass", " ")
         }
         catch (error) {
         // RS.Write_Log("Click Specified Element ","Fail","Element not found")
         }
      }