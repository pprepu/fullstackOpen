import React from 'react'
import { connect } from 'react-redux'
//style
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  if (props.notification.message === '') {
    return null
  }
  /*
  const style = {
    color: props.notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  */
  return (
    <div>
      {props.notification.error && ( <Message error>
        {props.notification.message}
      </Message> )}
      {props.notification.error || ( <Message success>
        {props.notification.message}
      </Message> )}
    </div>

  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification