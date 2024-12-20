
import './message.css'
import PropTypes from 'prop-types'

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      {text}
    </div>
  )
}
Message.propTypes = {
  text: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
}

export default Message

