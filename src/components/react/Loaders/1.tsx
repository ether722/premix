import React, { useEffect } from 'react'

export default function () {
    useEffect(() => {
        // 创建css样式
        const style = document.createElement('style')
        style.innerHTML = `
    .loader {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 100vw;
    }

    .line-scale-pulse-out > div {
    background-color: #4daef8;
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    }

    .line-scale-pulse-out > div:nth-child(1),
    .line-scale-pulse-out > div:nth-child(5) {
    -webkit-animation-delay: -0.2s !important;
    animation-delay: -0.2s !important;
    }

    .line-scale-pulse-out > div:nth-child(2),
    .line-scale-pulse-out > div:nth-child(4) {
    -webkit-animation-delay: -0.4s !important;
    animation-delay: -0.4s !important;
    }

    @-webkit-keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }

    50% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
    }

    @keyframes line-scale-pulse-out {
    0% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }

    50% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }

    100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
    }
    `
        document.head.appendChild(style)
    })

    return (
        <>
            <div className="preloader">
                <div className="loader">
                    <div className="line-scale-pulse-out">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    )
}
