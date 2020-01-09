const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return null
  default: return state
  }
}

export const login = (data) => {
  return {
    type: 'LOG_IN',
    data
  }
}

export const logout = () => {
  return {
    type: 'LOG_OUT'
  }
}

export default userReducer