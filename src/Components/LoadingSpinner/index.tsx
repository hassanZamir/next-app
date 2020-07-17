import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoadingSpinner: React.FunctionComponent<{ size: any }> = ({ size }) => {
    return <FontAwesomeIcon icon={faSpinner} color="#F57B54" className="fa-spin" size={size} />
}