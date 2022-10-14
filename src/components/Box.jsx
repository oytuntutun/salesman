import React, { useRef } from 'react'
import styled from '@emotion/styled'
import { clickTypeToColorMap } from '../common/config'

const BoxElement = styled.div`
    border: 0.5px solid rgba(60, 60, 60, 0.2);
    background-color: ${(props) => clickTypeToColorMap.get(props.clickType)};
    transition: background-color 0.5s;

    &:hover {
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.25);
    }
`

export const Box = ({ i, j, clickType }) => {
    return <BoxElement className="box" data-i={i} data-j={j} clickType={clickType} />
}
