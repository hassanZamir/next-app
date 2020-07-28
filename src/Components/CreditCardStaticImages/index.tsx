import React from 'react';
import { StaticImage } from "@Components";

export const CreditCardStaticImages = () => {
    return <React.Fragment>
        <StaticImage src="/images/visa_card.png" height="20px" width="auto" />
        <StaticImage src="/images/master_card.png" height="20px" width="auto" />
        <StaticImage className="mx-1" src="/images/american_express.png" height="18px" width="auto" />
        <StaticImage src="/images/credit_card.png" height="18px" width="auto" />
    </React.Fragment>
}