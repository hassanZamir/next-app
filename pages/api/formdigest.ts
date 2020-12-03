import { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from "crypto-js";
import { PaymentSettingsModel } from '@Interfaces';
import { ICCBillConstants } from '@Constants';

// CORS : https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.js
export default (async (req: NextApiRequest, res: NextApiResponse<PaymentSettingsModel.IPaymentFormdigestResponse>) => {
    try {
        if (req.headers.host !== process.env.ALLOWED_ORIGIN) res.status(400);
        let data: PaymentSettingsModel.IPaymentFormdigestPayload = req.body;
        // console.log("formdigest -input", data);
        // extract input fields
        // const clientAccnum = 0; // An integer value representing the 6 - digit merchant account number.
        // const clientSubacc = '0000'; // An integer value representing the 4 - digit merchant subaccount number the customer should be charged on.
        const initialPrice = data.followingFee; // A decimal value representing the initial price.
        const initialPeriod = data.followingPeriod;// An integer representing the length, in days, of the initial billing period.By default this is a 30, 60, or 90 day period.
        const currencyCode = data.currencyCode; // An integer representing the 3 - digit currency code that will be used for the transaction.  978 - EUR, 036 - AUD, 124 - CAD, 826 - GBP, 392 - JPY, 840 - USD
        const recurringPrice = data.recurringPrice;
        const recurringPeriod = data.recurringPeriod;
        const rebills = data.rebills;
        const salt = process.env.SALT;
        let md5Hash = '';
        if (data.type == ICCBillConstants.SinglePaymentType)
            md5Hash = CryptoJS.MD5(`${initialPrice}${initialPeriod}${currencyCode}${salt}`).toString();
        else if (data.type == ICCBillConstants.RecurringPaymentType)
            md5Hash = CryptoJS.MD5(`${initialPrice}${initialPeriod}${recurringPrice}${recurringPeriod}${rebills}${currencyCode}${salt}`).toString();

        res.json({
            status: true,
            data: {
                formdigest: md5Hash
            },
            error: ''
        });

    } catch (error) {
        res.json({
            status: false,
            data: {
                formdigest: '',
            },
            error: "Somthing went wrong. Please try again later"
        });
    }
});