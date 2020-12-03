export enum CONTENT_TYPE {
    IMAGE = 1,
    VIDEO = 2,
    Text = 3
}


export const ICCBillConstants = {
    "SinglePaymentType": 1,
    "RecurringPaymentType": 2,
    "MinimumLimit": 3.00, // must be two decimal places
    "InfinitRebills": 99, // should be 99 for infinite rebills
    "DefaultFollowingPeriod": 30,
    "DefaultCurrencyCode": "840", // string instead of number  due to object literal issue
    "DynamicPricingFlexForm": process.env.DYNAMIC_PRICING_FORM,
}
