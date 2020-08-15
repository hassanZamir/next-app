import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

export const SocialLogin: React.FunctionComponent<{}> = ({}) => {
    const responseGoogle = (a: any) => {
        console.log("Response google success", a);
    }
    
    const responseGoogleError = (e: any) => {
        console.log("Google login init error : ", e.details);
    }

    return  <div className="d-flex flex-column">
        <button
            style={{ borderRadius: "25px" }}
            className="bg-primary-gradient text-white px-4 py-2 mb-3" 
            >
            
            <FontAwesomeIcon icon={faTwitter} color="white" />
            <span className="ml-2">Sign Up / Login with Twitter</span>
        </button>
        <GoogleLogin
            clientId="188853246065-9nsijv8cfajp02qn8t3sgmnir0g9n6lq.apps.googleusercontent.com"
            buttonText="Login"
            render={renderProps => (
                <button
                    style={{ borderRadius: "25px" }}
                    className="bg-primary-gradient text-white px-4 py-2" 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled}>
                    
                    <FontAwesomeIcon icon={faGoogle} color="white" />
                    <span className="ml-2">Sign Up / Login with Google</span>
                </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogleError}
            cookiePolicy={'single_host_origin'}
        />
    </div> 
}