import React from 'react'

const Close = () => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path d="M10.0005 9.29229L0.698853 -0.00933838L-0.00828927 0.697803L9.29334 9.99943L10.0005 9.29229Z" fill="white" />
                <path d="M0.699577 9.99941L10.0012 0.697784L9.29406 -0.0093575L-0.00756523 9.29227L0.699577 9.99941Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="10" height="10" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

const Minimize = () => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path d="M10 5H0V5.99997H10V5Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="10" height="10" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

const Maxmize = () => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 10H0V0H10V10ZM9 1H1V9H9V1Z" fill="white" />
        </svg>
    )
}

const Restore = () => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.00069 3H1.00069V9H7.00069V3ZM8.00069 6.99867H9.00069V0.998667H3.00069V2.00133H8.00069V6.99867ZM-0.00131226 10.0007V2.00133H1.99869V0H10.0007V7.99933H8.00069V10.0007H-0.00131226Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="10" height="10" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export { Close, Maxmize, Minimize, Restore }