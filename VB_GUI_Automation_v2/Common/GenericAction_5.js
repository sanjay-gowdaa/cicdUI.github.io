import { Builder, By, Key, until } from "selenium-webdriver";

import * as EV from './Environment.js'
import * as Loc from './LocHandler.js'
import * as GA_0 from './GenericAction_0.js'
import * as RS from './LG.js'

export const Find_Match_Click = async (Obj_prop, Expval, start) => {
   // console.log("I am in Match List latest 12345-CSS")
   // console.log(Obj_prop)
   let intail_prop = Obj_prop;
   let counter = start;
   for (; ; counter++) {
   try {
         var res = Obj_prop.replace("change", counter);
         console.log("List Item prop val")
         console.log(res)
         let item = await EV.DR.wait(until.elementLocated(By.css(res)), 30000, 'Sorry waited so long', 5000)
         await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);

         let var1 = await item.getText();
         // console.log("Actual Values")
         // console.log(var1)
         if (Expval == var1) {
                  (await item).click();
                 // console.log("Element found")
                  RS.Write_Log("Select Specified Element in the list and Click", "Pass")
                  return counter;
                  break;
               }
         Obj_prop = intail_prop;
      }
   catch (error) {
        // console.log("Sorry Element not found")
         RS.Write_Log("Select Specified Element in the list and Click", "Fail", "Element not found")
         break;
      }
}
}

export const Find_Match_Click_1 = async (Obj_prop, Expval, start) => {
         // console.log("I am in Match List- xpath with out move ")
         // console.log(Obj_prop)
         let intail_prop = Obj_prop;
         let counter = start;
         for (; ; counter++) {
            try {
               var res = Obj_prop.replace("change", counter);
               // console.log("List Item prop val")
               // console.log(res)
               await EV.DR.wait(until.elementLocated(By.xpath(res)), 30000, 'Sorry waited so long', 5000)
               let item = await EV.DR.findElement(By.xpath(res));
               await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);

               let var1 = await item.getText();
               // console.log("Actual Values")
               // console.log(var1)
               if (Expval == var1) {
                     await item.click();
                    // console.log("Element found")
                     return counter;
                     break;
                  }
               Obj_prop = intail_prop;
            }
            catch (error) {
              // console.log("Sorry Element not found")
               break;
            }
         }
      }

export const Find_Match_Click_2 = async (Obj_prop, Expval, start) => {
            // console.log("I am in Match List")
            // console.log(Obj_prop)
            let intail_prop = Obj_prop;
            let counter = start;
            for (; ; counter++) {
               try {
                  var res = Obj_prop.replace("change", counter);
                  console.log("List Item prop val")
                  console.log("I am in Match List- xpath with  move ")
                  console.log(res)
                  let item = await EV.DR.wait(until.elementLocated(By.xpath(res)), 30000, 'Sorry waited so long', 5000);
                  await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
                  const actions = EV.DR.actions({ async: true });
                  //let var1= await actions.move({ origin: item }).getText().perform();
                   await actions.move({ origin: item }).perform();
                  let var1 = await item.getText();
                   console.log("Actual Values")
                   console.log(var1)
                  if (Expval == var1) {
                        await item.click();
                        await EV.DR.sleep(2000);
                        //console.log("Element found")
                        RS.Write_Log("Select Specified Element in the list and Click", "Pass")
                        return counter;
                        break;
                     }
                  Obj_prop = intail_prop;
               }
               catch (error) {
                  RS.Write_Log("Select Specified Element in the list and Click", "Fail", "Element not Found")
               //   console.log("Sorry Element not found Donot worry  if Element is not found")
               }
            }
         }

export const Verify_Non_Existence = async (Obj_prop, Expval, start) => {
         console.log("I am in Match List to find pos latest 12345")
         console.log(Obj_prop)
         let intail_prop = Obj_prop;
         let counter = start;
         for (; ; counter++) {
            try {
               var res = Obj_prop.replace("change", counter);
               console.log("List Item prop val")
               console.log(res)
               await EV.DR.wait(until.elementLocated(By.xpath(res)), 30000, 'Sorry waited so long', 5000)
               let item = await EV.DR.findElement(By.xpath(res));
               await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
               let var1 = await item.getText();
               console.log("Actual Values")
               console.log(var1)
               if (Expval == var1) {
                  console.log("Element found")
                  console.log("Scenario failed, Please log a bug at the earliest")
                  RS.Write_Log("Verify Non Existence of Specified Element  ", "Fail ", "Element Exists")
                  return counter;
                  break;
               }
               Obj_prop = intail_prop;
            }
            catch (error) {
               console.log("Element not found be happy")
               console.log("Scenario Pass, donot worry");
               RS.Write_Log("Verify Non Existence of Specified Element  ", "Pass", "")
               break;
            }
         }
      }

// Find_Match Pos
export const Find_Match_Pos_1 = async (Obj_prop, Expval, start) => {
      console.log("I am in Match List to find pos using Xpath")
      console.log(Obj_prop)
      let intail_prop = Obj_prop;
      let counter = start;
      for (; ; counter++) {
         try {
            var res = Obj_prop.replace("change", counter);
            console.log("List Item prop val")
            console.log(res)
            let item = await EV.DR.wait(until.elementLocated(By.xpath(res)), 30000, 'Sorry waited so long', 5000)
            await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
            let var1 = await item.getText();
            console.log("Actual Values")
            console.log(var1)
            if (Expval == var1) {
              console.log("Element found No Clicking")
               RS.Write_Log("Find Specified Element in the list ", "Pass", "")
               return counter;
               break;
            }
            Obj_prop = intail_prop;
         }
         catch (error) {
          //  console.log("Sorry Element not found")
            RS.Write_Log("Find Specified Element in the list ", "Fail", "Element Not Found")
            break;
         }
      }
   }

export const Find_Match_Pos = async (Obj_prop, Expval, start) => {
   // console.log("I am in Match List to find pos using CSS")
   // console.log(Obj_prop)
   let intail_prop = Obj_prop;
   let counter = start;
   for (; ; counter++) {
      try {
         var res = Obj_prop.replace("change", counter);
         console.log("List Item prop val")
         console.log(res)
         let item = await EV.DR.wait(until.elementLocated(By.css(res)), 30000, 'Sorry waited so long', 5000)
         await EV.DR.executeScript("return arguments[0].scrollIntoView();", item);
         let var1 = await item.getText();
         console.log("Actual Values")
         console.log(var1)
         console.log("Expected Values")
         console.log(Expval)
         if (Expval == var1) {
           // console.log("Element found , No clicking")
            RS.Write_Log("Find Specified Element in the list ", "Pass", "")
            return counter;
            break;
         }
         Obj_prop = intail_prop;
      }
      catch (error) {
         console.log("Sorry Element not found")
         RS.Write_Log("Find Specified Element in the list ", "Fail", "Element Not Found")
         break;
      }
   }
}
