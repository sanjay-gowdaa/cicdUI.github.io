import { Builder, By, Key, until } from "selenium-webdriver";

export let Prop_val
export const Get_prop_val = (Obj_prop) => {
    var res = String(Obj_prop);
    if (res.startsWith("Name")) {
        const val = res.split("=", 2)[1];
        Prop_val = By.name(val);
      }
    if (res.startsWith("ID")) {
        const val = res.split("=", 2)[1];
        Prop_val = By.id(val);
      }
    if (res.startsWith("Xpath")) {
        const val = res.slice(6)
        Prop_val = By.xpath(val);
      }
    if (res.startsWith("CSS")) {
        const val = res.split("=", 2)[1];
        Prop_val = By.css(val);
      }
      if (res.startsWith("CLASS")) {
        const val = res.split("=", 2)[1];
        Prop_val = By.className(val);
      }

  }