import * as EV from   '../Common/Environment.js'
import * as GA_0 from   '../Common/GenericAction_0.js'
import * as GA_5 from   '../Common/GenericAction_5.js'
import * as Loc  from   '../Common/LocHandler.js'
import * as RS  from   '../Common/LG.js'

 export const  Add_PD_CANCEL = async (CG,PD,VR,GD,QT,PR_QT) => { 
    //try {
    RS.Write_Log("---Funtionality :Cancel Produce Start : ---Start"," " , " ")
    console.log("Totally New Method 1234");
    await GA_0.scroll_move("CSS=.add-crop-btn")
    await GA_0.Clk("CSS=.add-crop-btn")
    await EV.DR.sleep(5000);

//Selecting category 
    await GA_0.Clk("CSS=#basic_categoryName");
    await console.log("Trying to select Category")

    let arg = "'".concat(CG).concat("'");
    let s = "//*[@title=".concat(arg).concat("]");
    console.log(s)
    await GA_0.Clk("Xpath=".concat(s));
// category end

// Selecting produce
    await GA_0.Clk("CSS=#basic_cropName");
    arg = "'".concat(PD).concat("'");
    s = "//*[@title=".concat(arg).concat("]");
    await GA_0.Clk("Xpath=".concat(s));
// produce End

//Selecting  variety 
    await GA_0.Clk("CSS=#basic_subCategory");
    arg = "'".concat(VR).concat("'");
    s = "//*[@title=".concat(arg).concat("]");
    await GA_0.Clk("Xpath=".concat(s));     
// variety  End

// Selecting Grade 
    await GA_0.Clk("CSS=#basic_grade");
    await EV.DR.sleep(5000);
    await GA_5.Find_Match_Click_2("/html/body/div[6]/div/div/div/div[2]/div[1]/div/div/div[change]/div",GD,1)       
// Grade End

//Adding quantity and price
    await GA_0.Edt("CSS=#basic_quantity", QT )  
    await GA_0.Edt("CSS=#basic_pricePerQnt",PR_QT)  
 //Cancel  
    await GA_0.Clk("CLASS=ant-btn ant-btn-text cancel-button");

    await EV.DR.sleep(5000);
    await EV.DR.navigate().refresh();
    RS.Write_Log("---Funtionality :Cancel Produce Start : ---End"," ", " ")
//}

 //catch (error){
    console.log(error.message);
    //console.log("Could not Add produce- fix the problem")

//}
}