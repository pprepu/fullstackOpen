
const messageReducer = (state = 'Welcome to the anecdote -app', action) => {
  switch (action.type) {
    case 'SET_MSG':
      return action.message
    default: return state
  }
}

export const messageChange = message => {
  return {
    type: 'SET_MSG',
    message
  }
}

export const setNotification = (message, time) => {
  const waitingTime = time * 1000
  console.log('wTime: ', waitingTime)
  return async dispatch => {
    //tee jotain
    
    await dispatch({
      type: 'SET_MSG',
      message
    })
    
    setTimeout(() => dispatch({
      type: 'SET_MSG',
      message: ''
    }), waitingTime)

  }
}


export default messageReducer