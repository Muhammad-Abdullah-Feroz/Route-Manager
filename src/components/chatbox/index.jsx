import  { useState, useEffect } from 'react'
import { driverChats, groups } from '../../data/dummyData'
import Message from './Message'
import { motion } from 'framer-motion'
import SpanLoader from '../SpanLoader'
import { MdOutlineMarkChatUnread } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Chatbox = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isChatListOpen, setIsChatListOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)
  const [isChatListLoading, setIsChatListLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
      // Simulate receiving a response from the backend
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Response from backend', sender: 'bot' }])
      }, 1000)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setIsChatListLoading(true)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsChatListLoading(false)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [search])

  const handleSelectChat = (chat) => {
    setIsMessageLoading(true);
    setSelectedChat(chat);
    setMessages(chat.messages);
    setIsChatOpen(true);
    setTimeout(() => {
      setIsMessageLoading(false);
    }, 500);
  }

  const filteredDrivers = driverChats.filter(chat => 
    chat.driver?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredGroups = groups.filter(group => 
    group.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <motion.div 
        className="fixed bottom-0 right-0 m-4 w-80 bg-white shadow-md shadow-gray-300 rounded-t-lg flex flex-col transition-all duration-300 z-50"
        initial={{ height: '3rem' }}
        animate={{ height: isChatListOpen ? '24rem' : '3rem' }}
      >
        <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-t-lg cursor-pointer" onClick={() => setIsChatListOpen(!isChatListOpen)}>
          <div className='flex gap-2 items-center'><MdOutlineMarkChatUnread/>Chats</div>
          <div>{isChatListOpen ? <IoIosArrowDown size={25}/> : <IoIosArrowUp size={25}/>}</div>
        </div>
        {isChatListOpen && (
          <div className="p-2 flex-1 overflow-y-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="w-full  border border-gray-300 rounded-lg p-2 mb-2"
            />
            {isChatListLoading ? (
              <SpanLoader height='300px'/>
  
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <div className="mb-2 border-b border-gray-300 pb-2">
                  <h3 className="text-gray-600 font-semibold bg-gray-100 p-2 rounded-lg">Drivers</h3>
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((chat, index) => (
                      <div key={index} className="p-2 cursor-pointer hover:bg-gray-200  rounded-lg" onClick={() => handleSelectChat(chat)}>
                        {chat.driver}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No drivers found</div>
                  )}
                </div>
                <div className="border-b border-gray-300 pb-2">
                  <h3 className="text-gray-600 font-semibold bg-gray-100 p-2 rounded-lg">Groups</h3>
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((group, index) => (
                      <div key={index} className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg border-gray-300" onClick={() => handleSelectChat(group)}>
                        {group.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No groups found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
      {selectedChat && (
        <motion.div 
          className="fixed bottom-0 right-0 m-4 w-80 bg-white shadow-md shadow-gray-300 rounded-t-lg flex flex-col transition-all duration-300 z-50" 
          style={{ right: '21rem' }}
          initial={{ height: '3rem' }}
          animate={{ height: isChatOpen ? '34rem' : '3rem' }}
        >
          <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-t-lg cursor-pointer" onClick={() => setIsChatOpen(!isChatOpen)}>
            <div>{selectedChat.driver || selectedChat.name}</div>
            <div>{isChatOpen ?  <IoIosArrowDown size={25}/> : <IoIosArrowUp size={25}/>}</div>
          </div>
          {isChatOpen && (
            <>
              {isMessageLoading ? (
                <SpanLoader />
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-2">
                    {messages.map((msg, index) => (
                      <Message key={index} text={msg.text} sender={msg.sender} />
                    ))}
                  </div>
                  <div className="p-2 flex ">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className=" border w-[80%] border-gray-300 rounded-l-lg p-2"
                    />
                    <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-r-lg flex-shrink-0 w-[20%]">Send</button>
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
      )}
    </>
  )
}

export default Chatbox