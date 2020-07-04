// #region Interface Imports
import { IHomePage } from "@Interfaces";
import { ILoginPage } from "@Interfaces";
// #endregion Interface Imports

export interface IStore {
    home: IHomePage.IStateProps;
    login: ILoginPage.IStateProps;
}
