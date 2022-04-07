import React from 'react'
import Navbar from "./Navbar"
import styles from './Layout.module.css'

function Layout({ children }) {
    return (
        <>
            <Navbar />
            {/* <div className={styles.main}> */}
                {children}
            {/* </div> */}
        </>
    )
}

export default Layout
