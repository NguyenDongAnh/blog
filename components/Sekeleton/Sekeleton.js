import React from 'react'

export const Avatar = () => {
	return (
		<div className="animate-pulse flex space-x-4">
			<div className="rounded-full bg-slate-200 h-11 w-11"></div>
		</div>
	)
}

export const Header = () => {
	return <div></div>
}

export const TextLine = () => {
	return (
		<div className="p-2 w-full mx-auto animate-pulse">
			<div className="w-full h-3 bg-slate-300 relative overflow-hidden"></div>
		</div>
	)
}

export const Illustration = () => {
	return <div></div>
}

const Sekeleton = ({ children, isPending }) => {
	return <>{isPending ? children : null}</>
}

Sekeleton.Avatar = Avatar
Sekeleton.Header = Header
Sekeleton.TextLine = TextLine
Sekeleton.Image = Illustration

export default Sekeleton
