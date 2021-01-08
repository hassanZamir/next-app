import { USER_SESSION, IFeed, FEED, IStatementsPage } from "@Interfaces";
import { StatementsAction } from "@Actions";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@Redux/IStore";
import { Balance } from "./Balance";
import { DisplayData } from "./DisplayData";
import { ParagraphText } from "@Components/ParagraphText";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { date } from "@storybook/addon-knobs";



const StatementsDetails: React.FunctionComponent<{
    user: USER_SESSION;
    defaultStatementsInformation: any;
    loadTabData: (tab: any) => void;
}> = ({ user, defaultStatementsInformation, loadTabData }) => {
    const [tab, setTab] = useState(0); // 0 = earnings, 1 = withdrawal, 2 = stats
    // const [balance, setBalance] = useState<any>({});
    // const [fData, setFData] = useState<any>({});
    // const [data, setData] = useState<any>([]);
    // const [earning, setEarning] = useState(true);
    // const [withDrawls, setWithDrawls] = useState(false);
    // const [stats, setStats] = useState(false);
    const dispatch = useDispatch();

    const getWrapperClass = () => {
        let cla = "";
        if (0 == tab) {
            cla = "earning-wrapper tab-content"
        } else if (1 == tab) {
            cla = "Withdrawals-wrapper tab-content"
        } else if (2 == tab) {
            cla = "stats-wrapper tab-content"
        }
        return cla;
    }

    // useEffect(() => {
    //     loadTabData(tab);
    // }, [tab])

    const tabClicked = (inputTab: any) => {
        console.log("tabClicked:", inputTab);
        console.log("tab:", tab);
        if (!tab == inputTab) {
            setTab(inputTab);
            loadTabData(inputTab);
        }
    }

    return (
        <div>
            <Balance balance={defaultStatementsInformation.balance} pending={defaultStatementsInformation.pending} />
            <div className="tabs-section">
                <ul className="tabs-list display-inline-block text-center">
                    <li className={tab == 0 ? "display-inline-block position-relative active" : "display-inline-block position-relative"} id="0" onClick={(e: any) => { tabClicked(0) }}>Earnings</li>
                    <li className={tab == 1 ? "display-inline-block position-relative active" : "display-inline-block position-relative"} id="1" onClick={(e: any) => { tabClicked(1) }}>Withdrawals</li>
                    {/* <li className={tab == 2 ? "display-inline-block position-relative active" : "display-inline-block position-relative"} id="2" onClick={(e: any) => { tabClicked(2) }}>Stats</li> */}
                </ul>
                <div className={getWrapperClass()}>

                    {
                        (tab == 0 || tab == 1)
                        && defaultStatementsInformation
                        && defaultStatementsInformation.response
                        && defaultStatementsInformation.response
                            .map((data: any, index: number) => {
                                return <div key={index}>
                                    <DisplayData data={data} tab={tab} />
                                </div>
                            })
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
        const { defaultStatementsInformation } = useSelector((state: IStore) => state.statements);

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

        return (
            <div className="">
                <ParagraphText className="d-flex justify-content-center text-primary font-25px">
                    Statements
            </ParagraphText>
                <StatementsDetails
                    user={user}
                    defaultStatementsInformation={defaultStatementsInformation}
                    loadTabData={loadtabData}
                />
            </div>
        );
    };
