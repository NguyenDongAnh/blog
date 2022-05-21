import React from 'react'
import Navbar from './Navbar'
import { SocketIO } from '../SocketIO'

function Layout({ children }) {
	return (
		<>
			<Navbar />
			<SocketIO />
			{children}
		</>
	)
}

export default Layout
