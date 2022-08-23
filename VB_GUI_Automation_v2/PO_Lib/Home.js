import * as EV from '../Common/Environment.js'
import * as GA_0 from '../Common/GenericAction_0.js'
import * as RS from '../Common/LG.js'

export const Logout_VB = async () => {
    await EV.DR.sleep(5000);
    RS.Write_Log("---Funtionality :Log out : ---Start", " ", " ")
    
    await EV.DR.sleep(5000);
    await GA_0.scroll_move("CSS=.anticon-logout > svg:nth-child(1)");
    await EV.DR.navigate().refresh();
    await EV.DR.sleep(5000);
    await GA_0.Clk("CSS=.anticon-logout > svg:nth-child(1)");
    await EV.DR.sleep(5000);
    await GA_0.Clk_1("CSS=button.ant-btn-sm:nth-child(2) > span:nth-child(1)");
    await EV.DR.sleep(7000);
    if (EV.ENV == "Local") {
        // only for local
        var str = await EV.DR.getCurrentUrl();
        console.log("Url Value before replacing ", str)
        var current_url = str.replace("https", "http");
        console.log("The current URL is 5678 ", current_url)
        await EV.DR.sleep(9000);
        await EV.DR.get(current_url);
        // only for local
        }
    await EV.DR.manage().deleteAllCookies();
    // await EV.DR.sleep(5000);
    RS.Write_Log("---Funtionality :Log out : ---End", " ", " ")
    console.log("Logging out")
  }