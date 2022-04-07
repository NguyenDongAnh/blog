import React from 'react'

const Avatar = ({ size, url }) => {
  return (
    <img
      src={url ? url : `${process.env.BASE_SERVER}/images/chandung.jpg`}

    />
  )
}

export default Avatar