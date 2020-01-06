
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


export default messageReducer