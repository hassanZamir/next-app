// #region Local Imports
import cookie from 'js-cookie';
// #endregion Local Imports

// #region Interface Imports
// #endregion Interface Imports

export const setCookie = (key: string, value: string) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: '/'
        });
    }
};

export const removeCookie = (key: string) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key: string, req: any) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

export const getQueryParams = (params: any) => {
    let query = '';
    Object.keys(params).forEach((key, index) => {
        if (!index) query += ('?' + key + '=' + params[key])
        else query += ('&' + key + '=' + params[key])
    });
    return query;
};

const getCookieFromBrowser = (key: string) => {
    return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find((c: any) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};
