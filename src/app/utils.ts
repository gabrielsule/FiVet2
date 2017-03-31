import {DateObject} from '../model/alerta';

export class Utils {

    public static getDateNow() {
        var dateObject: DateObject = new DateObject();
        var date = new Date();
        dateObject.YEAR = date.getFullYear()
        dateObject.MONTH = date.getMonth() + 1;
        dateObject.DAY = date.getDate();
        //var df = year + "-" + month + "-" + day;
        // console.log(df);
        // return df;
        return dateObject;
    }

    public static addZeroDate(date) {
        if (date < 10) {
            return "0" + date;
        }
        return date;
    }
}