import * as EV from   '../Common/Environment.js'
import * as GA_0 from   '../Common/GenericAction_0.js'
import * as RS from   '../Common/LG.js'

export const  Login_VB = async (UID,PWD) => { 
    RS.Write_Log("---Funtionality :Login  : ---Start"," "," ")
    await EV.DR.sleep(5000);
    await GA_0.Clk("CLASS=ant-btn ant-btn-lg vikas-btn-radius custom-login-button custom-default-button");
    
    console.log("Trying to find  login as different user")
    await EV.DR.sleep(3000);
    await GA_0.Clk_Newuser("Xpath=/html/body/div[1]/div/div[2]/div[2]/div/div/div/form/div/div/p/a");
      
    await GA_0.Edt("ID=login-form_userName", UID);
    await GA_0.Edt("CSS=#login-form_password", PWD);
    
    await GA_0.Clk("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div/form/button");
    
    RS.Write_Log("---Funtionality :Login  : ---End"," "," ")
    console.log("Checking environment ", EV.ENV)
   }
     // await EV.DR.manage().deleteAllCookies();
     // await EV.DR.navigate().refresh();