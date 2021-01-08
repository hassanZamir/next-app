// #region Global Imports
import React from "react";
import moment from "moment";

export const DisplayData: React.FunctionComponent<{
    data: any,
    tab: any,
}> = ({ data, tab }) => {
    const getTabHtml = () => {
        if (tab == 0) {
            return <ul>
                <li key={0} className="display-flex align-items-center flex-wrap justify-content-between">
                    <div className="list-content display-flex flex-column">
                        <h4 className="font-size-bold text-uppercase">{data.heading}</h4>
                        <p className="font-semi-bold">{data.title}</p>
                        <i>{data.description}</i>
                        <span>{moment(data.timeStamp).format('DD-MM-YYYY hh:mmA')}</span>
                    </div>
                    <div className="amount display-flex font-semi-bold">{data.mode == 0 ? '- $' + data.amount.toFixed(2) : '+$' + data.amount.toFixed(2)}</div>
                </li>
            </ul>;
        } else if (tab == 1) {
            return <ul >
                <li key={1} className="display-flex align-items-center flex-wrap justify-content-between">
                    <div className="list-content display-flex flex-column">
                        <p className="font-semi-bold">{'Withdrawal#' + data.id}</p>
                        <i>{data.mode == 0 ? 'Withdrawl Rejected' : data.mode == 1 ? 'Withdrawl Processed' : 'Withdrawl Pending'}</i>
                        <span>{moment(data.timeStamp).format('DD-MM-YYYY hh:mmA')}</span>
                    </div>
                    <div className="display-flex amount font-semi-bold">{data.mode == 0 ? '- $' + data.amount.toFixed(2) : '+$' + data.amount.toFixed(2)}</div>
                </li>
            </ul>;
        } else if (tab == 3) {
            return <div>
                {/* <div className="range-wrapper text-center">
                    <h5 className="font-bold">Custom Range</h5>
                    <div className="calander-wrapper display-flex align-items-center flex-wrap justify-content-between">
                        <span className="display-flex text-uppercase">01 March 2020</span>
                        to
                    <span className="display-flex text-uppercase">01 Sept 2020</span>
                    </div>
                </div> */}
                <ul>
                    <li className="display-flex align-items-center flex-wrap justify-content-between" key="sub">
                        <p className="font-bold text-capitalize">Subscriptions</p>
                        <p className="font-bold">${data.subscriptions.amount}</p>
                    </li>
                    <li className="display-flex align-items-center flex-wrap justify-content-between" key="tip">
                        <p className="font-bold  text-capitalize">Tips</p>
                        <p className="font-bold">${data.tips.amount}</p>
                    </li>
                    <li className="display-flex align-items-center flex-wrap justify-content-between" key="mc">
                        <p className="font-bold  text-capitalize">Message center</p>
                        <p className="font-bold">${data.message.amount}</p>
                    </li>
                    {/* <li className="display-flex align-items-center flex-wrap justify-content-between" key="ref">
                        <p className="font-bold  text-capitalize">Refferals</p>
                        <p className="font-bold">${data.referral.amount}</p>
                    </li> */}
                    <li className="total display-flex align-items-center flex-wrap justify-content-between" key="total">
                        <p className="font-bold  text-capitalize">Total</p>
                        <p className="font-bold">${data.subscriptions.amount + data.tips.amount + data.message.amount}</p>
                    </li>
                </ul>
            </div>;
        }
    }

    return <div>
        {getTabHtml()}
    </div>
};
