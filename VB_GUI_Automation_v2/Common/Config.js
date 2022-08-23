import * as CG from "../CG/CG.js";
    

export const Config_Data = (ST_Name, Fname) => 

{   var cobj = CG.CGDetials

   var counter =0
   
    for (var key in Object.keys(cobj[counter]))

             {
               console.log("Keys are ",Object.keys(cobj[counter])[key])
               if(Fname==Object.keys(cobj[counter])[key])

               {
                console.log("value of field is",Object.values(cobj[counter])[key]) 
                
                return  Object.values(cobj[counter])[key]
               }
             }
    
}
