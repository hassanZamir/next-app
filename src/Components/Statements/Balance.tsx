// #region Global Imports
import React from "react";

export const Balance: React.FunctionComponent<{
    balance: any;
    pending: any;
}> = ({ balance, pending }) => {
    return (
        <div className="d-flex flex-column">
            <section className="balance-section">
                <div className="balance-upper-wrapper">
                    <div className="d-flex justify-content-center pt-2">
                        <p> Current {" "}
                            <img
                                src="/images/veno_tv_logo.png"
                                height="45px"
                                width="45px"
                                className=""
                            /> {" "}
                    Balance</p>
                    </div>
                    <div className="balance-middle-wrapper d-flex justify-content-center pt-2">{`$${balance ?? 0.00}`}</div>
                    <div className="pending-middle-wrapper d-flex justify-content-center pt-2">{`$${pending ?? 0.00} Pending`}</div>
                </div>
                <div className="balance-lower-wrapper d-flex justify-content-center">
                    <div className="statements-btn">Withdraw</div>
                </div>
            </section>
        </div>
    );
};
