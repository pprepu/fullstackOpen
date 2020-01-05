import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, messageIsError }) => {

  if (message === null) {
    return null
  }

  const standardStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  }
  let style
  if (messageIsError) {
    style = errorStyle
  } else {
    style = standardStyle
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  messageIsError: PropTypes.bool.isRequired
}

export default Notification