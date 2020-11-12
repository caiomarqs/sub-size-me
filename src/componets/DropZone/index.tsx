import React, { ReactNode, DragEventHandler, MouseEventHandler, useEffect } from 'react'

interface IDropZone {
    children: ReactNode | JSX.Element,
    id: string
    onDrop: DragEventHandler<HTMLDivElement>
    onClick: MouseEventHandler<HTMLDivElement>
    onDragOver?: DragEventHandler<HTMLDivElement>
    onDragLeave?: DragEventHandler<HTMLDivElement>
    onDragEnd?: DragEventHandler<HTMLDivElement>
}

export const DropZone = ({ children, ...props }: IDropZone) => {
    
    const onDragEnter = (e: Event) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDragOver = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onDragLeave = (e: Event) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        let files = e.dataTransfer?.files;
    }

    useEffect(() => {
        window.addEventListener('mouseup', onDragLeave);
        window.addEventListener('dragenter', onDragEnter);
        window.addEventListener('dragover', onDragOver);
        document.getElementById('dragbox')?.addEventListener('dragleave', onDragLeave);
        window.addEventListener('drop', onDrop);


        return () => {
            window.removeEventListener('mouseup', onDragLeave);
            window.removeEventListener('dragenter', onDragEnter);
            window.addEventListener('dragover', onDragOver);
            document.getElementById('dragbox')?.removeEventListener('dragleave', onDragLeave);
            window.removeEventListener('drop', onDrop);
        }
    }, [])

    return (
        <div {...props} >
            {children}
        </div>
    )

}