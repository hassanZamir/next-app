// #region Global Imports
import "styled-components";
// #endregion Global Imports

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryBackground: string;
            borderGrey: string;
            disabledGrey: string;
            inputTextClor: string;
            lightGrey: string;
            darkGrey: string;
        };
    }
}

