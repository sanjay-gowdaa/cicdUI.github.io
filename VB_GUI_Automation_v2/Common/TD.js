

import * as T1 from "../TD/DS1.js";



export const RT =  (TC_ID, DSName,Fname) => 
{
    console.log("TC id is ",TC_ID)
     
     if (DSName=="DataSet1" || DSName=="DATASET1")
     {
      console.log("Data Set is ",DSName)
      var pobj = T1.TCDetials
     }   


    for (var counter=0;counter<pobj.length;counter++)
    {

        if(TC_ID==Object.values(pobj[counter])[0])
        {
          console.log("Record Found")
                              
          for (var key in Object.keys(pobj[counter]))

             {
               console.log("Keys are ",Object.keys(pobj[counter])[key])
               if(Fname==Object.keys(pobj[counter])[key])

               {
                console.log("value of field is",Object.values(pobj[counter])[key]) 
                
                return  Object.values(pobj[counter])[key]
               }
             }

        }
        
    }
 
}






// export const RT = async (TC_ID, ST_Name, Fname) => 
// {
//    // await console.log("Test Data is ",T.Login)

//     for (var counter=0;counter<T.Login.length;counter++)
//     {
//        // await console.log("Test Data is",T.Login[counter])
//        //var size = Object.keys(T.Login[counter]).length;
         
//         //console.log("size is",size)

//         console.log("value is",Object.keys(T.Login[counter]))

        
//             // for (var key in Object.keys(T.Login[counter]))
//             // {
//             //   //  console.log( key + ": " + Object.keys(T.Login[counter])[key]);

//             //     if(Fname==Object.keys(T.Login[counter])[key] )
//             //     {
//             //         console.log( key + ": " + Object.keys(T.Login[counter])[key]);

//             //     }
//             // }
        
//             // for (let value of Object.values(T.Login[counter]))
            
//             // {
//             //     console.log(value); 
               
//             // }
//     }
 
// }






// export const RT = async (TC_ID, ST_Name, Fname) => 
// {
   

//     for (var counter=0;counter<T.Login.length;counter++)
//     {
//        // await console.log("Test Data is",T.Login[counter])
//        //var size = Object.keys(T.Login[counter]).length;
         
//         //console.log("size is",size)

//         console.log("attributes are",Object.keys(T.Login[counter])[0])
//         console.log("values are",Object.values(T.Login[counter])[0])
        
//             // for (var key in Object.keys(T.Login[counter]))
//             // {
//             //   //  console.log( key + ": " + Object.keys(T.Login[counter])[key]);

//             //     if(Fname==Object.keys(T.Login[counter])[key] )
//             //     {
//             //         console.log( key + ": " + Object.keys(T.Login[counter])[key]);

//             //     }
//             // }
        
//             // for (let value of Object.values(T.Login[counter]))
            
//             // {
//             //     console.log(value); 
               
//             // }
//     }
 
// }






// export const RT = async (TC_ID, ST_Name, Fname) => 
// {
   
//      var pobj = T.Login

//     for (var counter=0;counter<pobj.length;counter++)
//     {
       

//        // console.log("attributes are",Object.keys(pobj[counter])[0])
//        // console.log("values are",Object.values(pobj[counter])[0])

//         if(TC_ID==Object.values(pobj[counter])[0])
//         {
//           console.log("Record Found")
          
//           //console.log("Record Length is",pobj[counter].length)
          
//           for (var key in Object.keys(T.Login[counter]))

//              {
//                if(Fname==Object.keys(pobj[counter])[key])

//                {
//                 console.log("values are",Object.values(pobj[counter])[key])  
//                }
//              }

//         }
        
//     }
 
// }



// export const RT =  (TC_ID, ST_Name, Fname) => 
// {
//     console.log("Sheet Name is ",ST_Name)
//      if(ST_Name=="Login")
//      {
//      var pobj = T.Login
//      }

//      if(ST_Name=="SL_Home")
//      {
//      var pobj = T1.SL_Home
//      }

//      if(ST_Name=="Add_ML")
//      {
//      var pobj = T2.ADD_ML
//      }


//     for (var counter=0;counter<pobj.length;counter++)
//     {

//         if(TC_ID==Object.values(pobj[counter])[0])
//         {
//           console.log("Record Found")
                              
//           for (var key in Object.keys(pobj[counter]))

//              {
//                console.log("Keys are ",Object.keys(pobj[counter])[key])
//                if(Fname==Object.keys(pobj[counter])[key])

//                {
//                 console.log("value of field is",Object.values(pobj[counter])[key]) 
                
//                 return  Object.values(pobj[counter])[key]
//                }
//              }

//         }
        
//     }
 
// }

