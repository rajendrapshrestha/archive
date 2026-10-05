import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const styleShow = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const styleHide = {
    display: 'none'
  }

  const style = (notification === null) ? styleHide : styleShow

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification