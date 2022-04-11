import React, { useEffect } from 'react'


export const Avatar = (props) => {
    return (
        <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        </div>
    )
}

export const Header = (props) => {
    return (<div></div>)
}

export const TextLine = (props) => {
    const { type } = props

    return (
        <div className="p-2 w-full mx-auto">
            <div className="before:absolute before:-translate-x-[100%] before:animate-sekeleton before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-gradient-to-r before:from-slate-200 before:to-slate-100 w-full h-3 bg-slate-200 relative overflow-hidden"></div>
        </div>
    )
}

export const Illustration = (props) => {
    return (<div></div>)
}

const Sekeleton = ({ children, isPending }) => {
    return (
        <>
            {isPending ? children : null}
        </>
    )
}

Sekeleton.Avatar = Avatar
Sekeleton.Header = Header
Sekeleton.TextLine = TextLine
Sekeleton.Image = Illustration

export default Sekeleton