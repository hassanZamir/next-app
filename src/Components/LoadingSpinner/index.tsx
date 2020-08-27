import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoadingSpinner: React.FunctionComponent<{ size: any, showLoading?: boolean, children?: any }> 
    = ({ size, showLoading, children }) => {
    
    if (!children) {
        return <FontAwesomeIcon icon={faSpinner} color="#F57B54" className="fa-spin" size={size} />
    } else {
        if (showLoading) return <FontAwesomeIcon icon={faSpinner} color="#F57B54" className="fa-spin" size={size} />
        else return children;
    }
}