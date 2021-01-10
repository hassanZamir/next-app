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
                <li key={0} className="d-flex align-items-center flex-wrap justify-content-between p-4">
                    <div className="list-content display-flex flex-column">
                        <h4 className="font-size-bold text-uppercase">{data.heading}</h4>
                        <p className="font-semi-bold pt-2">{data.title}</p>
                        <i>{data.description}</i>
                        <span className="pt-1">{moment(data.timeStamp).format('DD-MM-YYYY hh:mmA')} UTC</span>
                    </div>
                    <div>
                        <div className="amount d-flex font-semi-bold content-align-right">{data.mode == 0 ? '- $' + data.amount.toFixed(2) : '+$' + data.amount.toFixed(2)}</div>
                    </div>
                </li>
            </ul>;
        } else if (tab == 1) {
            return <ul >
                <li key={1} className="display-flex align-items-center flex-wrap justify-content-between">
                    <div className="list-content display-flex flex-column">
                        <p className="font-semi-bold pb-1">{'Withdrawal #' + data.id}</p>
                        <i>{data.mode == 0 ? 'Withdrawl Rejected' : data.mode == 1 ? 'Withdrawl Processed' : 'Withdrawl Pending'}</i>
                        <span className="pt-1">{moment(data.timeStamp).format('DD-MM-YYYY hh:mmA')} UTC</span>
                    </div>
                    <div>
                        <div className="display-flex amount font-semi-bold">{data.mode == 0 ? '- $' + data.amount.toFixed(2) : '+$' + data.amount.toFixed(2)}</div>
                    </div>
                </li>
            </ul>;
        }
    }

    return <div>
        {getTabHtml()}
    </div>
};
