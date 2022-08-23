import * as EV from '../Common/Environment.js'
import * as GA_0 from '../Common/GenericAction_0.js'
import * as GA_5 from '../Common/GenericAction_5.js'
import * as RS from '../Common/LG.js'

export const Add_PD = async (CG, PD, VR, GD, QT, PR_QT) => {
  try {
        RS.Write_Log("---Funtionality :Add Produce Start : ---Start", " "," ")
        console.log("Totally New Method 1234");
        await GA_0.scroll_move("CSS=h2.ant-typography:nth-child(5)")
        await GA_0.Clk_1("ID=add-produce-button")
        //await GA_0.Clk("ID=add-produce-button")
        // category start
        await GA_0.Clk("CSS=#basic_categoryName");
        console.log("Trying to select cateegory")
        await GA_5.Find_Match_Click_2("/html/body/div[3]/div/div/div/div[2]/div[1]/div/div/div[change]/div", CG , 1)
        console.log("Category selection end")
        // category end
        // produce start
        await EV.DR.sleep(2000);
        await GA_0.Clk("CSS=#basic_cropName");
        // await EV.DR.sleep(20000);
        await GA_5.Find_Match_Click_2("/html/body/div[4]/div/div/div/div[2]/div[1]/div/div/div[change]/div", PD , 1 )
        // produce End
        // variety  start
        await GA_0.Clk("CSS=#basic_subCategory");
        await GA_5.Find_Match_Click_2("/html/body/div[5]/div/div/div/div[2]/div[1]/div/div/div[change]/div", VR , 1 )
        // variety  End
        // Grade Start
        await GA_0.Clk("CSS=#basic_grade");
        await EV.DR.sleep(3000);
        await GA_5.Find_Match_Click_2("/html/body/div[6]/div/div/div/div[2]/div[1]/div/div/div[change]/div", GD, 1)
        //Grade End
        await GA_0.Edt("CSS=#basic_quantity", QT)
        await GA_0.Edt("CSS=#basic_pricePerQnt", PR_QT)

        // Need to change the below code for Radio Button
        await GA_0.Clk_1("Xpath=/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[1]/div[1]/div[7]/div[2]/div/div/div/label[1]/span[1]/input");
        await GA_0.Clk_1("CLASS=ant-btn ant-btn-primary crop-modal-action-btn vikas-btn-radius add-produce-done"); 
        await EV.DR.sleep(5000);

        // only verification
        console.log("Verification Starts be ready")
        var item_pos = await GA_5.Find_Match_Pos("tr.ant-table-row:nth-child(change) > td:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(1)", PD, 1)
        console.log("The produce is found at position")
        console.log(item_pos)
        await GA_0.Verify_Val("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(2)"), GD);
        await GA_0.Verify_Val_1("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(3) > p:nth-child(1)"), QT);
        await GA_0.Verify_Val("CSS=".concat("tr.ant-table-row:nth-child(").concat(item_pos).concat(") > td:nth-child(4)"), PR_QT);
        
        RS.Write_Log("---Funtionality :Add Produce Start : ---End", " "," ")
        await EV.DR.sleep(4000);
       }
      catch (error) {
                console.log("Could not Add produce- fix the problem")
           }
  }

  export const Edit_PD = async (QTY, PRICE) => {
    try {
          RS.Write_Log("---Funtionality :Edit Produce Start : ---Start", " ", " ")
          console.log("I am in edit produce");
          await GA_0.Clk_1("CLAss=ant-btn ant-btn-link ant-btn-block");
          //QTY
          await GA_0.Edt("CSS=#basic_quantity", QTY);
          //PRICE
          await GA_0.Edt("CSS=#basic_pricePerQnt", PRICE);
          //INTENT TO SELL
          await GA_0.RD_ON("Name=intentToSell");
          await GA_0.Clk_1("CLAss=ant-btn ant-btn-link ant-btn-block save-button");
          await GA_0.Clk_1("CLAss=ant-btn ant-btn-primary");
          RS.Write_Log("---Funtionality :Edit Produce End : ---End", " ", " ")
        }
        catch (error){
           console.log("Could not edit produce");
        }
    }
    
  export const Delete_PD = async () => {
    try {
          RS.Write_Log("---Funtionality :Delete Produce Start : ---Start", " ")
          console.log("I am in delete produce button");
          await GA_0.Clk_1("CLAss=ant-btn ant-btn-link ant-btn-block ant-btn-dangerous");
          await GA_0.Clk_1("CLAss=ant-btn ant-btn-primary");
          RS.Write_Log("---Funtionality :Edit Produce End : ---End", " ")
        }
        catch (error){
           console.log("Could not edit produce");
        }
    }