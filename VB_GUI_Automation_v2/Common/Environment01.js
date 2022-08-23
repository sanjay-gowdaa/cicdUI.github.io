import { Builder, By, Key, until } from "selenium-webdriver";

import * as RC from './Config.js'
import * as Ex_status from './GenericAction_0.js'

export let DR1 = null
export let ENV = null
export let E1 = null
export let E2 = null

//export let originalWindow = null
export const Launcapp = async (ENV_Type, ENV_Type1) => {
        E1 = ENV_Type
        E2 = ENV_Type1
        console.log("I am in ER ")
        var Url_path
        var Test = "np"
        console.log("Lanuching Local", ENV_Type1)
        if (ENV_Type1 == "Local") {
            console.log("Lanuching Local123", ENV_Type1)
            Url_path = RC.Config_Data("Con", "Local_URL")
            ENV = ENV_Type1
          }
        else if (ENV_Type == "Dev") {
            Url_path = RC.Config_Data("Con", "Dev_URL")
            ENV = ENV_Type
          }
        else if (ENV_Type == "Test") {
            Url_path = RC.Config_Data("Con", "Test_URL")
            ENV = ENV_Type
          }
        else {
            Url_path = RC.Config_Data("Con", "Dev_URL")
          }
        console.log("Launching Browser1239999");
        console.log("Execution status", Ex_status.status)
        if (DR1 == null || Ex_status.status == "LaunchNew") {
            console.log("Launching Browser1234");
            if (RC.Config_Data("Con", "BR_Name") == "FF") {
                DR1 = new Builder().forBrowser('firefox').build();
                DR1.manage().window().maximize()
              }
                if (RC.Config_Data("Con", "BR_Name") == "Chrome") {
                    DR1 = new Builder().forBrowser('chrome').build();
                  }
                await DR1.sleep(2000);
          }
        console.log("value of DR is", DR1);
        try {
           await DR1.findelement(By.css("button.ant-btn-lg:nth-child(1)"));
          }
        catch (error) {
            console.log("Opening Page1234");
            await DR1.get(Url_path);
          }
    }