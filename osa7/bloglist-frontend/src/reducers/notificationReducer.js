const notificationReducer = (state = { message: '', error: false }, action) => {
  switch(action.type) {
  case 'NEW_MESSAGE':
    return { message: action.message, error: action.error }
  default: return state
  }
}

export const notificationChange = (message, error) => {
  return {
    type: 'NEW_MESSAGE',
    message,
    error
  }
}


export default notificationReducer