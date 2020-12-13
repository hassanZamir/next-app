// #region Global Imports
import "isomorphic-unfetch";
// import getConfig from "next/config";
import { stringify } from "query-string";
// #endregion Global Imports

// #region Interface Imports
import { HttpModel, IStore } from "@Interfaces";
// #endregion Interface Imports

const BaseUrl = `${process.env.API_URL}/api`;
const uploadingServiceBaseUrl = process.env.CloudinaryMS_URL;

export const Http = {
    UserAuthRequest: async <A>(
        methodType: string,
        url: string,
        authtoken: string,
        params?: HttpModel.IRequestQueryPayload,
        payload?: HttpModel.IRequestPayload
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            const query = params ? `?${stringify({ ...params })}` : "";

            fetch(`${BaseUrl}${url}${query}`, {
                body: JSON.stringify(payload),
                cache: "no-cache",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${authtoken}`,
                },
                method: `${methodType}`,
            })
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    }
                    return reject(response);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    Request: async <A>(
        methodType: string,
        url: string,
        params?: HttpModel.IRequestQueryPayload,
        payload?: HttpModel.IRequestPayload
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            const query = params ? `?${stringify({ ...params })}` : "";

            fetch(`${BaseUrl}${url}${query}`, {
                body: JSON.stringify(payload),
                cache: "no-cache",
                headers: {
                    "content-type": "application/json",
                },
                method: `${methodType}`,
            })
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    }
                    return reject(response);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    UploadFile: async <A>(
        methodType: string,
        url: string,
        params?: HttpModel.IRequestQueryPayload,
        payload?: HttpModel.IRequestPayload
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            const query = params ? `?${stringify({ ...params })}` : "";

            fetch(`${url}${query}`, {
                body: payload,
                // body: JSON.stringify(payload),
                // cache: "no-cache",
                // headers: {
                //    "Content-Type": "multipart/form-data"
                // },
                method: `${methodType}`,
            } as any)
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    }
                    return reject(response);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    UploadContentMedia: async <A>(
        payload?: HttpModel.IRequestPayload
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            fetch(`${uploadingServiceBaseUrl}/api/upload/content`, {
                body: payload,
                method: `POST`,
            } as any)
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    }
                    return reject(response);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    UploadVideoContentMedia: async <A>(
        payload?: HttpModel.IRequestPayload
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            fetch(`${uploadingServiceBaseUrl}/api/upload/video`, {
                body: payload,
                method: `POST`,
            } as any)
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    }
                    return reject(response);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    FEAPIRequest: async <A>(
        methodType: string,
        url: string,
        params?: HttpModel.IRequestQueryPayload,
        payload?: HttpModel.IRequestPayload
    ): Promise<A> => {
        return new Promise((resolve, reject) => {
            const query = params ? `?${stringify({ ...params })}` : "";

            fetch(`${url}${query}`, {
                body: JSON.stringify(payload),
                mode: 'same-origin', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json' // 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                method: `${methodType}`,
            } as any)
                .then(async response => {
                    if (response.status === 200) {
                        return response.json().then(resolve);
                    }
                    return reject(response);
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
};
