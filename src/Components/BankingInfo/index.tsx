import { USER_SESSION } from "@Interfaces";
import { PrimaryButton } from "@Components";
import { PaymentActions } from "@Actions";
import { useDispatch } from "react-redux";

export const BankingInfo: React.FunctionComponent<{ user: USER_SESSION; }> 
    = ({ user }) => {
    
        const dispatch = useDispatch();
        return <div className="d-flex align-items-center justify-content-center flex-fill h-100">
            <PrimaryButton isActive={true} onClick={()=> { dispatch(PaymentActions.OnBecomeCreator()) }}>
                Become Creator
            </PrimaryButton>
        </div>
}