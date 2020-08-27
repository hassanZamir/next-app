
// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { ITab, IContent } from "./Tabs";
// #endregion Local Imports

const Tabs = styled.div<{ borderBottom?: string }>`
  overflow: hidden;
  height: 3em;
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '1px solid black;')};
  display: flex;
  // align-items: center;
  justify-content:center;
`;

const TabConatiner = styled.button<ITab.IProps>`
    padding: ${({ padding }) => (padding ? padding : 'initial')};
    border: 0;
    border-bottom: ${({ active, theme, showBorderBottom }) => (showBorderBottom && active ? "2px solid " + theme.colors.primary : "0px")};
    border-radius: 0px;
    border-right: ${({ borderRight}) => (borderRight ? '1px solid black' : '0px')};
    outline: none;
    cursor: pointer;
    color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.inputTextClor)};
    width: ${({ width }) => (width ? width : '33%')};
    font-family: 'Gibson SemiBold';
    position: relative;
    display: flex;
    align-items: center;
    justify-content:center;
    background: transparent;
    margin: 0;
    font-size: 0.8125rem;
    :active, :focus {
      outline: none;
    }
`;

const Tab:React.FunctionComponent<ITab.IProps> = ({ children, ...rest }) => {
  return <TabConatiner {...rest}>
    { children }
  </TabConatiner>
}

const Content = styled.div<IContent.IProps>`
  ${props => (props.active ? "" : "display:none")}
`;

export { Tabs, Tab, Content }

