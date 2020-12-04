import React, { useEffect, useState, ReactElement } from 'react'
import { remote } from 'electron'

import { Close, Minimize, Restore, Maxmize } from './Icons'

interface IWindowBarProps {
    Icon?: JSX.Element | ReactElement
}

const WindowBar = ({ Icon, ...props }: React.PropsWithChildren<IWindowBarProps>) => {

    const win = remote.getCurrentWindow()

    const [max, setMax] = useState(false)

    const handleMinimize = () => {
        win.minimize()
    }

    const handleMaximized = () => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
        setMax(win.isMaximized())
    }

    const handleClose = () => {
        win.close();
    }

    const clearHover = () => {
        document.querySelectorAll('.button').forEach((ell) => {
            ell.classList.add('clear-hover')
        })

        document.querySelector('#close-button')?.classList.add('clear-hover')
    }

    const resetHover = () => {
        document.querySelectorAll('.button').forEach((ell) => {
            ell.classList.remove('clear-hover')
        })

        document.querySelector('#close-button')?.classList.remove('clear-hover')
    }


    useEffect(() => {

        win.on('minimize', clearHover)
        win.on('maximize', clearHover)
        win.on('unmaximize', clearHover)
        win.on('restore', clearHover)
        return () => {
            //Clear all listeners when componet destroy
            win.removeAllListeners('minimize')
            win.removeAllListeners('maximize')
            win.removeAllListeners('unmaximize')
            win.removeAllListeners('restore')
        }
    })

    return (
        <header id="window-bar" >
            <div id="drag-region">
                <div id='window-title'>
                    {
                        Icon !== undefined
                            ? Icon
                            : <span className="window-title">{document.title}</span>
                    }
                </div>

            </div>
            <div id="window-controls">
                <div
                    className="button"
                    id="min-button"
                    onClick={_ => handleMinimize()}
                    onMouseOver={() => resetHover()}
                >
                    <Minimize />
                </div>

                <div
                    className="button"
                    id="max-button"
                    onClick={_ => handleMaximized()}
                    onMouseOver={() => resetHover()}
                >
                    {max ? <Restore /> : <Maxmize />}
                </div>


                <div
                    className="button"
                    id="close-button"
                    onClick={_ => handleClose()}
                    onMouseOver={() => resetHover()}
                >
                    <Close />
                </div>

            </div>
        </header>
    )
}

export { WindowBar }