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



const StatementsDetails: React.FunctionComponent<{
    user: USER_SESSION;
    defaultStatementsInformation: any;
    loadTabData: (tab: any) => void;
    loading: boolean
}> = ({ user, defaultStatementsInformation, loadTabData, loading }) => {
    const [tab, setTab] = useState(0); // 0 = earnings, 1 = withdrawal, 2 = stats
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();

    const getWrapperClass = () => {
        let cla = "tab-content h-100";
        if (0 == tab) {
            cla = "earning-wrapper"
        } else if (1 == tab) {
            cla = "Withdrawals-wrapper"
        } else if (2 == tab) {
            cla = "stats-wrapper"
        }
        return cla;
    }

    useEffect(() => {
        if (loading)
            setShowLoader(true);
        else
            setShowLoader(false);
    }, [loading])

    const tabClicked = (inputTab: any) => {
        if (!tab == inputTab) {
            setTab(inputTab);
            loadTabData(inputTab);
            setShowLoader(true);
        }
    }

    return (
        <div>
            <Balance balance={defaultStatementsInformation.balance} pending={defaultStatementsInformation.pending} />
            <div className="tabs-section">
                <ul className="tabs-list d-flex justify-content-center text-center">
                    <li className={tab == 0 ? "w-100 display-inline-block position-relative active" : "w-100 display-inline-block position-relative"} id="0" onClick={(e: any) => { tabClicked(0) }}>Earnings</li>
                    <li className={tab == 1 ? "w-100 display-inline-block position-relative active" : "w-100 display-inline-block position-relative"} id="1" onClick={(e: any) => { tabClicked(1) }}>Withdrawals</li>
                    {/* <li className={tab == 2 ? "display-inline-block position-relative active" : "display-inline-block position-relative"} id="2" onClick={(e: any) => { tabClicked(2) }}>Stats</li> */}
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
                    {!showLoader
                        && (!defaultStatementsInformation || !defaultStatementsInformation.response || !Array.isArray(!defaultStatementsInformation.response))
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
            <ParagraphText className="d-flex justify-content-center text-primary font-25px">
                Statements
            </ParagraphText>
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
