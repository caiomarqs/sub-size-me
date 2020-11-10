import React, { useEffect, useState } from 'react'
import { remote } from 'electron'

const getWindow = () => remote.BrowserWindow.getFocusedWindow();

const WindowBar = () => {

    const handleMinimize = () => {
        getWindow()?.minimize()
        getWindow()?.hide();
    }

    const handleMaximized = () => {
        const window = getWindow();
        window?.isMaximized() ? window?.unmaximize() : window?.maximize();
    }

    const handleClose = () => {
        getWindow()?.close();
    }

    useEffect(() => {
    }, [])

    return (
        <header id="window-bar" >
            <div id="drag-region">
                <div id="window-controls">
                    <div className="button" id="min-button" onClick={_ => handleMinimize()}>
                        <img className="icon" srcSet="icons/min-w-10.png 1x, icons/min-w-12.png 1.25x, icons/min-w-15.png 1.5x, icons/min-w-15.png 1.75x, icons/min-w-20.png 2x, icons/min-w-20.png 2.25x, icons/min-w-24.png 2.5x, icons/min-w-30.png 3x, icons/min-w-30.png 3.5x" draggable="false" />
                    </div>

                    <div className="button" id="max-button" onClick={_ => handleMaximized()}>
                        <img className="icon" srcSet="icons/max-w-10.png 1x, icons/max-w-12.png 1.25x, icons/max-w-15.png 1.5x, icons/max-w-15.png 1.75x, icons/max-w-20.png 2x, icons/max-w-20.png 2.25x, icons/max-w-24.png 2.5x, icons/max-w-30.png 3x, icons/max-w-30.png 3.5x" draggable="false" />
                    </div>

            
                    <div className="button" id="close-button" onClick={_ => handleClose()}>
                        <img className="icon" srcSet="icons/close-w-10.png 1x, icons/close-w-12.png 1.25x, icons/close-w-15.png 1.5x, icons/close-w-15.png 1.75x, icons/close-w-20.png 2x, icons/close-w-20.png 2.25x, icons/close-w-24.png 2.5x, icons/close-w-30.png 3x, icons/close-w-30.png 3.5x" draggable="false" />
                    </div>

                </div>
            </div>
        </header>
    )
}

export { WindowBar }