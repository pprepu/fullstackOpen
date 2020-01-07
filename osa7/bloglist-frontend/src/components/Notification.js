import React from 'react'

const Notification = (props) => {

  if (props.store.getState().notification.message === '') {
    return null
  }

  const style = {
    color: props.store.getState().notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {props.store.getState().notification.message}
    </div>
  )
}

export default Notification