import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
// import { v4 as uuidv4 } from 'uuid'

const SocketIO = () => {
	useEffect(() => {
		// eslint-disable-next-line no-unused-vars
		const socket = io({ transports: ['websocket', 'polling'] })
		return () => {}
	}, [])
	return <></>
}

export default SocketIO
