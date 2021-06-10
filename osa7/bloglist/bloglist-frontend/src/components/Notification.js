import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return notification ?
    <div>
      <div className='notification'> {notification} </div>
    </div>
    :
    <div></div>
}

export default Notification