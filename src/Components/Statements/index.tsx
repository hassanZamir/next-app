import { USER_SESSION, IFeed, FEED, IStatementsPage } from "@Interfaces";
import { StatementsAction } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import { Balance } from "./Balance";
import { DisplayData } from "./DisplayData";
import { ParagraphText } from "@Components/ParagraphText";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "@Components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { theme } from "@Definitions/Styled";



const StatementsDetails: React.FunctionComponent<{
    user: USER_SESSION;
    defaultStatementsInformation: any;
    loadTabData: (tab: any) => void;
    loading: boolean
}> = ({ user, defaultStatementsInformation, loadTabData, loading }) => {
    const [tab, setTab] = useState(0); // 0 = earnings, 1 = withdrawal, 2 = stats
    const [showLoader, setShowLoader] = useState(false);
    const [stats, setStats] = useState({
        subscriptions: 0.00,
        tips: 0.00,
        messages: 0.00
    });;



    const dispatch = useDispatch();

    const getWrapperClass = () => {
        let cla = "tab-content h-100";
        if (tab == 0) {
            cla = "earning-wrapper"
        } else if (tab == 1) {
            cla = "Withdrawals-wrapper"
        } else if (tab == 2) {
            cla = "stats-wrapper"
        }
        return cla;
    }

    useEffect(() => {
        if (loading)
            setShowLoader(true);
        else {

            if (tab == 2 && defaultStatementsInformation && defaultStatementsInformation.response) {
                // stats counters
                let subscriptions = 0.00;
                let tips = 0.00;
                let messages = 0.00;
                defaultStatementsInformation.response
                    .map((data: any, index: number) => {
                        // if the transaction is processed then
                        // calculate sum for each source
                        if (data.status == 2 && data.type == 1)
                            if (data.source == 1)
                                subscriptions += data.amount;
                            else if (data.source == 2)
                                tips += data.amount;
                            else if (data.source == 3)
                                messages += data.amount;
                    });

                setStats({ subscriptions, tips, messages });
            }
            setShowLoader(false);
        }

    }, [loading])

    const tabClicked = (inputTab: any) => {
        if (!(tab == inputTab)) {
            setTab(inputTab);
            loadTabData(inputTab);
            setShowLoader(true);
        }
    }

    return (
        <div>
            <Balance balance={defaultStatementsInformation.balance} pending={defaultStatementsInformation.pending} />
            <div className="tabs-section">
                <ul className="tabs-list d-flex justify-content-center text-center cursor-pointer font-bold">
                    <li className={tab == 0 ? "w-100 display-inline-block position-relative active" : "w-100 display-inline-block position-relative"} id="0" onClick={(e: any) => { tabClicked(0) }}>Earnings</li>
                    <li className={tab == 1 ? "w-100 display-inline-block position-relative active" : "w-100 display-inline-block position-relative"} id="1" onClick={(e: any) => { tabClicked(1) }}>Withdrawals</li>
                    <li className={tab == 2 ? "w-100 display-inline-block position-relative active" : "w-100 display-inline-block position-relative"} id="2" onClick={(e: any) => { tabClicked(2) }}>Stats</li>
                </ul>
                {showLoader && <div className="w-100 d-flex flex-column" style={{
                    paddingTop: "30%",
                    paddingBottom: "30%"
                }}>
                    <div
                        style={{ flex: 1 }}
                        className="w-100 h-100 d-flex align-items-center justify-content-center"
                    >
                        <LoadingSpinner size="3x" />
                    </div>
                    <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                        Please wait ...!
                    </ParagraphText>
                </div>}
                <div className={getWrapperClass()}>
                    {
                        (tab == 0 || tab == 1)
                        && !showLoader
                        && defaultStatementsInformation
                        && defaultStatementsInformation.response
                        && Array.isArray(defaultStatementsInformation.response)
                        && defaultStatementsInformation.response
                            .map((data: any, index: number) => {
                                return <div key={index}>
                                    <DisplayData data={data} tab={tab} />
                                </div>
                            })
                    }
                    {
                        (tab == 2)
                        && !showLoader
                        && stats
                        && <div className="">
                            <div>
                                <div className="range-wrapper text-center">
                                    <h5 className="font-bold">All Time Stats</h5>
                                    {/* <div className="calander-wrapper display-flex align-items-center flex-wrap justify-content-between px-1">
                                        <span className="display-flex text-uppercase">01 March 2020</span>
                                                    to
                                                <span className="display-flex text-uppercase">01 Sept 2020</span>
                                    </div> */}
                                </div>
                                <ul className="">
                                    <li className="display-flex align-items-center flex-wrap justify-content-between px-5" key="sub">
                                        <p className="font-bold text-capitalize">Subscriptions</p>
                                        <p className="font-bold">${stats.subscriptions}</p>
                                    </li>
                                    <li className="display-flex align-items-center flex-wrap justify-content-between px-5" key="tip">
                                        <p className="font-bold  text-capitalize">Tips</p>
                                        <p className="font-bold">${stats.tips}</p>
                                    </li>
                                    <li className="display-flex align-items-center flex-wrap justify-content-between px-5" key="mc">
                                        <p className="font-bold  text-capitalize">Messages</p>
                                        <p className="font-bold">${stats.messages}</p>
                                    </li>
                                    {/* <li className="display-flex align-items-center flex-wrap justify-content-between px-5" key="ref">
                                        <p className="font-bold  text-capitalize">Refferals</p>
                                        <p className="font-bold">${data.referral.amount}</p>
                                    </li> */}
                                    <li className="total display-flex align-items-center flex-wrap justify-content-between px-5" key="total">
                                        <p className="font-bold  text-capitalize">Total</p>
                                        <p className="font-bold">${stats.subscriptions + stats.tips + stats.messages}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    {!showLoader
                        && (tab != 2)
                        && (!defaultStatementsInformation || !defaultStatementsInformation.response || !Array.isArray(defaultStatementsInformation.response) || !defaultStatementsInformation.response.length)
                        && <div className="w-100 d-flex flex-column" style={{
                            paddingTop: "30%",
                            paddingBottom: "30%"
                        }}>
                            <ParagraphText className="font-18px lato-bold text-primary text-center my-4">
                                No content!
                            </ParagraphText>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export const Statements: React.FunctionComponent<{
    user: USER_SESSION
    // scrolledToBottom: boolean; 
}> = ({
    user,
    // scrolledToBottom,
}) => {
        const router = useRouter();
        const dispatch = useDispatch();
        const { defaultStatementsInformation, loading } = useSelector((state: IStore) => state.statements);

        useEffect(() => {
            if (user && !user.isCreator) {
                router.push("/");
            }
        }, [user])

        useEffect(() => {
            const params = {
                authtoken: user.token,
                userId: user.id,
                type: 1, // earnings
                source: 0, // any
            };
            dispatch(StatementsAction.GetStatements(params));
        }, []);

        const loadtabData = (tab: any) => {
            if (tab == 0) {
                const params = {
                    authtoken: user.token,
                    userId: user.id,
                    type: 1, // earnings
                    source: 0,
                };
                dispatch(StatementsAction.GetStatements(params));
            } else if (tab == 1) {
                const params = {
                    authtoken: user.token,
                    userId: user.id,
                    type: 2, // withdrawals
                    source: 0,
                };
                dispatch(StatementsAction.GetStatements(params));
            } else if (tab == 2) {
                const params = {
                    authtoken: user.token,
                    userId: user.id,
                    type: 1, // earnings stats
                    source: 0,
                    // dateStart: new Date(),
                    // dateEnd: new Date(),
                };
                dispatch(StatementsAction.GetStatements(params));
            }
        }

        // useEffect(() => {
        //     (async () => {
        //         if (scrolledToBottom) {
        //             // TODO: add transaction pagination logic
        //         }
        //     })();
        // }, [scrolledToBottom]);

        return <React.Fragment>
            <div className="mt-4 mb-2 d-flex justify-content-between no-gutters px-2">
                <FontAwesomeIcon
                    onClick={() => router.push("/")}
                    className="cursor-pointer" icon={faArrowLeft} color={theme.colors.primary} size="lg" />
            </div>
            <ParagraphText className="mb-2 gibson-semibold font-40px text-center text-primary">Statements</ParagraphText>

            <div className="statements h-100">
                <StatementsDetails
                    user={user}
                    defaultStatementsInformation={defaultStatementsInformation}
                    loadTabData={loadtabData}
                    loading={loading}
                />
            </div>
        </React.Fragment>;
    };
