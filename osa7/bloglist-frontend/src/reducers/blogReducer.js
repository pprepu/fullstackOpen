const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    // ei vielä toimintaa
    return state
  default: return state
  }
}

export default blogReducer