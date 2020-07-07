import React from "react";
import styled from "styled-components";

import { IBackgroundImage } from "./BackgroundImage";

const Container = styled.div<IBackgroundImage.IProps>`
    background-image: url(${({ src }) => src });
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    padding-bottom: 35.25%;
    border-radius: 2px;
`;

export const BackgroundImage: React.FunctionComponent<IBackgroundImage.IProps> = (props) => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Container {...props} />
        </div>
    );
};
