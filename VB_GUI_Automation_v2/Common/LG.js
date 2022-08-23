import fs from 'fs';

export const Write_Log = async (p1, p2, p3) => {
    var datetime = new Date();
    console.log(datetime.toISOString().slice(0, 10));
    var res = String(p1)
    p2 = String(p2)
    p3 = String(p3)

    console.log(res)

    if (res.startsWith("TC")) {
        await fs.appendFile('../LG/LG.txt', "".concat("").concat(datetime, '\r\n'), function (err) {
            if (err) { console.log(err) }
        });
        await fs.appendFile('../LG/LG.txt', p1.concat(":   ").concat(p2).concat("   ").concat(p3, '\r\n'), function (err) {
            if (err) { console.log(err); }
        });
    }
    else {
        await fs.appendFile('../LG/LG.txt', p1.concat(":   ").concat(p2).concat("   ").concat(p3, '\r\n'), function (err) {
            if (err) { console.log(err); }
        });
    }


}

