
import { motion } from 'framer-motion'
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5';

const Message = ({ _time, isread,text, userId, sender }) => {
  // console.log('Message rendered',userId,sender);
  
  const isSender = userId === sender;
  const alignmentClass = isSender ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-200 text-black';
  const messageContainerClass = isSender ? 'flex justify-end' : 'flex justify-start';
  const bubbleClass = isSender ? 'rounded-tl-lg rounded-bl-lg rounded-br-3xl' : 'rounded-tr-lg rounded-br-lg rounded-bl-3xl';

  return (
    <motion.div 
      className={`message-container ${messageContainerClass} my-2`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`message px-4 py-2 shadow-md ${alignmentClass} ${bubbleClass}`}>
        <p className="text-sm">{text}</p>
        <div className='flex items-center justify-end gap-2'>
        <span className={`text-xs font-light ${isSender ? 'text-gray-300' : 'text-gray-600'}`}>{_time} 
        </span> 
          <span>{(isSender && isread)&& <IoCheckmarkDoneOutline className='text-gray-200'/>}</span>
          <span>{(isSender && !isread)&& <IoCheckmarkOutline className='text-gray-200'/>}</span>
        </div>
      
      </div>
    </motion.div>
  )
}

export default Message

