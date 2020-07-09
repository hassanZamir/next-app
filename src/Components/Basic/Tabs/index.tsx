
// #region Global Imports
import React from "react";
import styled from "styled-components";
// #endregion Global Imports

// #region Local Imports
import { ITab, IContent } from "./Tabs";
// #endregion Local Imports

const Tabs = styled.div`
  overflow: hidden;
  font-family: Open Sans;
  height: 3em;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content:center;
`;

const Tab = styled.button<ITab.IProps>`
    border: 0;
    border-right: ${({ border}) => (border ? '1px solid black' : '0px')};
    outline: none;
    cursor: pointer;
    color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.inputTextClor)};
    width: 33%;
    font-family: 'Gibson SemiBold';
    font-size: 13px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content:center;
    background: transparent;
    font-size: 0.8125rem;
    :active, :focus {
      outline: none;
    }
`;

const Content = styled.div<IContent.IProps>`
  ${props => (props.active ? "" : "display:none")}
`;

export { Tabs, Tab, Content }

