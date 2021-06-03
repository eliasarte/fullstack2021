const notificationReducer = (state = false, action) => {
  console.log('notif state now: ', state)
  console.log('notif action', action)

  switch (action.type) {
    case 'SET':
      return action.data
    case 'REMOVE':
      return false
    default:
      return state
  }
}

let timeoutId
export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: notification,
    })

    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, time * 1000)
  }
}

/*export const setNotification = (notification) => {
    return {
        type: 'SET',
        data: notification
    }
}

export const removeNotification = () => {
  return {
      type: 'REMOVE',
  }
}*/


export default notificationReducer