import React, { useEffect, useState } from 'react'
import { remote } from 'electron'

import { Close, Minimize, Restore, Maxmize } from './Icons'


const WindowBar = () => {

    const win = remote.getCurrentWindow()

    const [max, setMax] = useState(false)

    const handleMinimize = () => {
        win.minimize()
    }

    const handleMaximized = () => {
        const window = win;
        window.isMaximized() ? window.unmaximize() : window.maximize();
    }

    const handleClose = () => {
        win.close();
    }

    const toggleMax = () => {
        setMax(win.isMaximized())
    }

    useEffect(() => {
        win.on('maximize', toggleMax)
        win.on('unmaximize', toggleMax)

        return () => {
            win.removeListener('maximize', toggleMax)
            win.removeListener('unmaximize', toggleMax)
        }

    }, [])

    return (
        <header id="window-bar" >
            <div id="drag-region">

            </div>
            <div id="window-controls">
                <div className="button" id="min-button" onClick={_ => handleMinimize()}>
                    <Minimize />
                </div>

                <div className="button" id="max-button" onClick={_ => handleMaximized()}>
                    {max ? <Restore /> : <Maxmize />}
                </div>


                <div className="button" id="close-button" onClick={_ => handleClose()}>
                    <Close />
                </div>

            </div>
        </header>
    )
}

export { WindowBar }