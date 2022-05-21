import React from 'react'
import styles from './Avatar.module.css'
const Avatar = ({ size = 44, url, alt = "Image Profile" }) => {
	return (
		<img
			src={url ? url : '/images/chandung.jpg'}
			alt={alt}
			width={size}
			height={size}
			className={styles.avatar}
		/>
	)
}

export default Avatar