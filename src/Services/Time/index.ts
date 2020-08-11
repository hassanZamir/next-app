export const CurrentTimeDifference = (time: string) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    
    const utcOffset = new Date().getTimezoneOffset();
    let postTime = null;
    if (utcOffset > 0) {
        postTime = new Date(time).valueOf() + (utcOffset * 60 * 1000);
    } else {
        postTime = new Date(time).valueOf() - (utcOffset * 60 * 1000);
    }
    let elapsed = new Date().valueOf() - postTime;
    
    if (elapsed < 0) return 'just now'
    
    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}