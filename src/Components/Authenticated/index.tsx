import dynamic from 'next/dynamic';
import { ToastProvider } from 'react-toast-notifications';
import { ILoginPage, USER_SESSION } from '@Interfaces';

import { Footer, Toast } from '@Components';

const DynamicLogin: any = dynamic(
    () => import('@Components/LoginComponent').then((mod) => mod.LoginComponent) as Promise<React.FunctionComponent<ILoginPage.IProps>>,
    { ssr: false }
);


export const Authenticated: React.FunctionComponent<{session: USER_SESSION, name: string}> = ({ session, children, name }) => {
    if (!session || !('id' in session)) {
        return <DynamicLogin />
    } else {
        return <ToastProvider components={{ Toast: Toast } as any}
            autoDismiss={true}
            placement="bottom-left"
            >
                <div className="w-100 row flex-column justify-content-between flex-nowrap">
                    <div style={{ marginBottom: "40px" }}>{ children }</div>
                    <Footer selected={name} />
                </div>
        </ToastProvider>
    }
}