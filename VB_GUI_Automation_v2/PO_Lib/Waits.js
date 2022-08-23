import { Builder ,By , Key ,until, WebElement } from 'selenium-webdriver';
import * as EV from '../Common/Environment.js';
import * as GA_0 from '../Common/GenericAction_0.js';
import * as RS from '../Common/LG.js';
import * as Loc from '../Common/LocHandler.js'

//const NODE_OPTIONS="--max-old-space-size=8192" // Increase to 8 GB

export const Wait_For_Otp = async(Obj_prop)=>{
    Loc.Get_prop_val(Obj_prop);

    try{
        console.log("waiting for OTP");
        RS.Write_Log("---Functionality : wait for OTP : ---start","","")
        var item = await EV.DR.wait(until.elementLocated(Loc.Prop_val),30000,'Timed out after 30 seconds',5000).isEnabled();
         while(item!=true){
             var item = await EV.DR.findElement(Loc.Prop_val).isEnabled();
         }
         RS.Write_Log("---Fuctionality : wait for OTP : ---End","","");

    }
    catch(error){
        console.log(error);
        RS.Write_Log("OTP failed : Please check!!!","","");
    }
}

export const Wait_For_Doc = async (Obj_prop)=>{
    Loc.Get_prop_val(Obj_prop);
    try{
        console.log("waiting for Documents to be uploaded");
        RS.Write_Log("---Functionality : wait for File: ---start","","");
        var item = await EV.DR.wait(until.elementLocated(Loc.Prop_val),5000).isDisplayed();
        while(item!=true){
            var item = await EV.DR.wait(until.elementLocated(Loc.Prop_val),5000).isDisplayed();
        }
        RS.Write_Log("---Functionality : wait for File: ---End","","");

    }
    catch(error){
        console.log(error);
        RS.Write_Log("Upload documents failed : Please check!!!","","");
    }
}