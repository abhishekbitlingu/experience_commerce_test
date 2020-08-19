import { Alert } from "react-native"

export default class AppUtilities {
    static showAlert(message, positiveButtonText, onPositiveButtonPress, negativeButtonText, onNegativeButtonPress) {
        let buttonArray = []
        buttonArray.push({ text: (positiveButtonText) ? positiveButtonText : 'Ok', onPress: () => { (onPositiveButtonPress) ? onPositiveButtonPress() : console.log('On Ok pressed function not available') } })
        if (negativeButtonText) {
            buttonArray.push({ text: (negativeButtonText) ? negativeButtonText : 'Cancel', onPress: () => { (onNegativeButtonPress) ? onNegativeButtonPress() : console.log('On Cancel pressed function not available') } })
        }
        Alert.alert(
            'Alert',
            (message) ? message : "",
            buttonArray
        )
    }

    static isNumeric(value) {
        var numericExpression = /^[-]?\d*\.?\d*$/;
        return (value.toString().trim().match(numericExpression))
    }

    static isEmpty(value) {
        return (value.toString().trim().length <= 0)
    }

    static getFormattedDate(date) {
        var Str =
            ("00" + date.getDate()).slice(-2)
            + "/" + ("00" + (date.getMonth() + 1)).slice(-2)
            + "/" + date.getFullYear();
        return Str
    }

    static getFormattedTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    static parseDaytime(time) {
        let [hours, minutes] = time.substr(0, time.length - 2).split(":").map(Number);
        if (time.includes("pm") && hours !== 12) hours += 12;
        return 1000/*ms*/ * 60/*s*/ * (hours * 60 + minutes);
    }

    static isValidEmail(value) {
        var regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regexp.test(value);
    }
}



