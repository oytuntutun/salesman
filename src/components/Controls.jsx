import React, { useState } from 'react'
import ReactiveButton from 'reactive-button'
import styled from '@emotion/styled'
import { FaRandom } from 'react-icons/fa'
import { GrPowerReset } from 'react-icons/gr'
import { BsPlay } from 'react-icons/bs'
import { IoEnterOutline } from 'react-icons/io5'
import { IoExitOutline } from 'react-icons/io5'
import { MdBlock } from 'react-icons/md'
import { CgTrashEmpty } from 'react-icons/cg'

import { cellType, wallType, entryType, exitType } from '../common/config'
import { randomMazeGenerator } from '../common/helper'

const buttonsColorMap = new Map([
    [wallType, 'red'],
    [entryType, 'blue'],
    [exitType, 'green'],
])

const Row = styled.div`
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
`

const WebButtons = styled.div`
    width: 90%;
    margin: auto;
    display: none;

    .web-icons {
        display: flex;
        justify-content: center;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        justify-content: center;

        button {
            padding: 6px 12px;
        }
    }
`

export const Controls = ({
    rows,
    cols,
    entry,
    exit,
    setGrid,
    startBFS,
    clickType,
    setClickType,
    isInProgress,
    resetGrid,
    showCustomControls,
}) => {
    const randomGrid = () => {
        isInProgress.current = false
        const [grid, newEntry, newExit] = randomMazeGenerator(rows, cols)
        entry.current = newEntry
        exit.current = newExit
        setGrid(grid)
    }

    const isDisabled = isInProgress.current

    // Customized Reactive Button
    const MyReactiveButton = ({ text, type }) => {
        return (
            <ReactiveButton
                onClick={() => setClickType(type)}
                color={buttonsColorMap.get(type)}
                disabled={isInProgress.current}
                idleText={text}
                outline={clickType !== type}
            />
        )
    }

    return (
        <>
            <Row>
                <div style={{ gap: 16, display: 'flex' }}>
                    <ReactiveButton onClick={startBFS} disabled={isDisabled} idleText="Search Path" />
                </div>

                <div>
                    <ReactiveButton onClick={resetGrid} idleText="Reset" outline />
                    <ReactiveButton onClick={randomGrid} idleText="Random Maze" outline />
                </div>
            </Row>
            {showCustomControls && (
                <div>
                    <MyReactiveButton text="Entry" type={entryType} />
                    <MyReactiveButton text="Exit" type={exitType} />
                    <MyReactiveButton text="Wall" type={wallType} />
                    <MyReactiveButton text="Clear" type={cellType} />
                </div>
            )}
        </>
    )
}
