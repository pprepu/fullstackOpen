import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.message === '') {
    return null
  }

  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}


const ConnectedNotification = connect(
  mapStateToProps
  )(Notification)

export default ConnectedNotification