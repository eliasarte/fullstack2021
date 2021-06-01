import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hideNotification = () => {
    setTimeout(() => { dispatch(removeNotification()) }, 5000)
  }

  return notification ?
    <div>
      <div style={style}> {notification} </div>
      {hideNotification()}
    </div>
    :
    <div></div>
}

export default Notification