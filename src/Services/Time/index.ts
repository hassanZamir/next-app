const timeFormats = [{
    key: 'default',
    values: ['just now', ' seconds ago', ' minutes ago', ' hours ago', ' days ago', ' months ago', ' years ago']
}, {
    key: 'short',
    values: ['now', ' sec', ' min', 'h', 'd', 'm', 'y']
}]
export const CurrentTimeDifference = (time: string, stringFormat?: string) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    
    const utcOffset = new Date().getTimezoneOffset();
    let postTime = null;

    let formatArr: any = null;
    if (stringFormat) {
        formatArr = timeFormats.filter((format) => {
            return format.key === stringFormat
        })[0].values;
    } else {
        formatArr = timeFormats[0].values
    }

    if (utcOffset > 0) {
        postTime = new Date(time).valueOf() + (utcOffset * 60 * 1000);
    } else {
        postTime = new Date(time).valueOf() - (utcOffset * 60 * 1000);
    }
    let elapsed = new Date().valueOf() - postTime;
    
    if (elapsed < 0) return formatArr[0]
    
    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + formatArr[1];   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + formatArr[2];   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + formatArr[3];   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + formatArr[4];   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + formatArr[5];   
    }

    else {
        return Math.round(elapsed/msPerYear ) + formatArr[6];   
    }
}