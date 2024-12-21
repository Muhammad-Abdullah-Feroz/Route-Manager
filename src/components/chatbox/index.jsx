import { useState, useEffect, useRef } from 'react'
import Message from './Message'
import { motion } from 'framer-motion'
import SpanLoader from '../SpanLoader'
import { MdOutlineMarkChatUnread } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import {  IoClose, IoPersonAddOutline, IoPersonOutline } from 'react-icons/io5'
import io from 'socket.io-client'
import axios from 'axios'
import ChatModal from './ChatModal'
import { formatTime, formatTimeForChatSection } from '../../handlers/format-date'

import { toast } from 'react-toastify'


const socket = io(`${import.meta.env.VITE_BACKEND_URL}`)

// eslint-disable-next-line react/prop-types
const Chatbox = ({userData, refer}) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [AllChats, setAllChats] = useState([])
  const [AlreadyStartedChats, setAlreadyStartedChats] = useState([])
  const [isChatListOpen, setIsChatListOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)
  const [isChatListLoading, setIsChatListLoading] = useState(false)
  const [isMessageLoading, setIsMessageLoading] = useState(false)
  const [AddChatModalOpen, setAddChatModalOpen] = useState(false)
  const messagesEndRef = useRef(null);
  const userInfo = {
    // eslint-disable-next-line react/prop-types
    id: userData?._id,
    refer: refer 
  }
  useEffect(() => {
    const getAllDriversAndUsers=async()=>{
    try{
      const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get/users-drivers`)
      if(response.data.success){
        const drivers=response.data.data.drivers.map(driver=>({refer:'uet_drivers',id:driver._id,name:driver.username,email:driver.email}))
        const users=response.data.data.users.map(user=>({refer:'uet_users',id:user._id,name:user.username,email:user.email}))
        const combinedArray=[...drivers,...users]
        setAllChats(combinedArray)
      }
        
    }catch(err){
      console.log("Error while fetching drivers and users ",err)
    }
    }

    getAllDriversAndUsers()
  },[])
  useEffect(() => {
    socket.emit('register', userInfo.id)
    getAllAready_chats()
        return () => {
      socket.off('chat message')
    }
  }, [userInfo.id])


  useEffect(() => {
    socket.on('chat-message', (msg) => {
      if(selectedChat && (selectedChat?.id== msg.sender || selectedChat?.id==msg.receiver) && !(selectedChat?.id== msg.sender && selectedChat?.id==msg.receiver)){
        
        socket.emit('mark-as-read',{chatId:msg._id,userId:userInfo.id})
        console.log("go to mark as read");
        setMessages(msg.messages)
        socket.on('sync-chat', (msg) => {
        getAllAready_chats();
        })
      }else{
        getAllAready_chats();        
        const lastMessage = msg.messages[msg.messages.length - 1];
        if (lastMessage.sender !== userInfo.id) {
          toast.info(`Check new messages`, { autoClose: 1000 });
        }
      }
    })
  }
  ,[socket])

  const handleSend = (e) => {
    e.preventDefault()
    if (input.trim()) {
      const message = { 
        sender: userInfo.id, 
        senderModel: userInfo.refer, 
        receiver: selectedChat.id, 
        receiverModel: selectedChat.refer, 
        content: input 
      }
      socket.emit('chat-message', message)
      socket.on('chat-message', (msg) => {
        setMessages(msg.messages)
      }
    )
      setInput('')
      getAllAready_chats();
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setIsChatListLoading(true)
  }

  const getAllAready_chats=()=>{
    socket.emit('get-all-chats', userInfo.id) 
    socket.on('all-chats', (chats) => {
      setAlreadyStartedChats(chats)
    }
  )
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsChatListLoading(false)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [search])

  const handleSelectChat = (chat) => {
    setAddChatModalOpen(false)
    if(chat.chatId){
    socket.emit('mark-as-read',{chatId:chat.chatId,userId:userInfo.id,receiver: chat.id})
    }else{
      socket.emit('sync-chat', { sender: userInfo.id, receiver: chat.id })
    }
    socket.on('sync-chat', (msg) => {
      setMessages(msg.messages)
      getAllAready_chats();
    })

    getAllAready_chats();
    setIsMessageLoading(true)
    setSelectedChat(chat)
    setMessages(chat.messages)
    setIsChatOpen(true)
    setTimeout(() => {
      setIsMessageLoading(false)
      scrollToBottom();
    }, 500)
      getAllAready_chats();
  }



  const alreadyChatFilter = AlreadyStartedChats
  .filter(chat => chat.otherMember.username?.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => b.unreadMessagesCount - a.unreadMessagesCount);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isMessageLoading]);

  const groupMessagesByDate = (messages) => {
    if (!messages) return {};
    return messages.reduce((acc, message) => {
      const dateKey = formatTimeForChatSection(message.timestamp);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(message);
      return acc;
    }, {});
  };
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <>
      <motion.div 
        className="fixed bottom-0 right-0 m-4 w-80 bg-white shadow-md shadow-gray-300 rounded-t-lg flex flex-col transition-all duration-300 z-30"
        initial={{ height: '3rem' }}
        animate={{ height: isChatListOpen ? '24rem' : '3rem' }}
      >
        <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-t-lg cursor-pointer" onClick={() => setIsChatListOpen(!isChatListOpen)}>
          <div className='flex gap-2 items-center'><MdOutlineMarkChatUnread/>Messaging</div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isChatListOpen ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isChatListOpen ? <IoIosArrowDown size={25} className='hover:bg-blue-400 p-1 rounded-full'/> : <IoIosArrowUp size={25} className='hover:bg-blue-400 p-1 rounded-full'/>}
          </motion.div>
        </div>
        {isChatListOpen && (
          <motion.div 
            className="p-2 flex-1 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex gap-2 items-center'>
              <input
                type="text"
                placeholder="Search chats..."
                value={search}
                onChange={handleSearch}
                className="w-full outline-none focus:border-blue-400 focus:border-2 border font-light border-gray-300 rounded-lg p-2 mb-2"
              />
              <button className='relative w-10 flex justify-center items-center  h-full mb-2 bg-gray-200 hover:bg-blue-200 rounded-full p-3' onClick={()=>setAddChatModalOpen(true)}><IoPersonAddOutline /></button>
            </div>
            {isChatListLoading ? (
              <div className='py-20'>
                <SpanLoader height='300px'/>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <div className="mb-2  pb-2">
                  <h3 className="text-gray-600 font-semibold bg-gray-100 p-2 rounded-lg">Chats</h3>
                  {alreadyChatFilter.length > 0 ? (
                    alreadyChatFilter.map((chat, index) => (
                      // console.log("Chat is ",chat)
                      
                      <motion.div 
                        key={index} 
                        className="relative p-2 max-w-full cursor-pointer hover:bg-gray-200 font-light rounded-lg flex gap-2 items-center overflow-hidden" 
                        onClick={() => handleSelectChat({chatId:chat._id,refer:chat.otherMember.model,id:chat.otherMember.id,name:chat.otherMember.username})}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <IoPersonOutline  className='p-2 min-w-10 min-h-10 border-gray-300 border rounded-full' />
                        <div> 
                          <div className='flex items-center gap-1'>
                            <h1 className='font-semibold max-w-[150px] truncate'>{chat.otherMember.username}</h1> 
                            {chat.otherMember.model=='uet_drivers' && <span className='text-[13px]'>(Driver)</span>}
                        {
                          chat.otherMember.id==userInfo.id && <span className='text-[13px]'>(you)</span>
                        }
                          </div>
                          <div className='text-[14px] font-normal max-w-[200px] truncate'>
                     {chat.otherMember.email}
                    </div>
                        </div>
                        {
                         chat.unreadMessagesCount>0 && <span className="absolute bg-blue-400 font-normal px-2.5 rounded-full text-white right-2 bottom-2 text-[12px] text-center">{chat.unreadMessagesCount}</span>
                        }
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center my-20 text-gray-500">No Chats found</div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
      {AddChatModalOpen && (
        <ChatModal 
          data={AllChats} 
          setAddChatModalOpen={setAddChatModalOpen} 
          setSelectedChat={handleSelectChat} 
        />
      )}
      {selectedChat && (
        <motion.div 
          className="fixed bottom-0 right-0 m-4 w-96 bg-white shadow-md shadow-gray-300 rounded-t-lg flex flex-col transition-all duration-300 z-30" 
          style={{ right: '21rem' }}
          initial={{ height: '3rem' }}
          animate={{ height: isChatOpen ? '34rem' : '3rem' }}
        >
          <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-t-lg cursor-pointer" >
            <div>{selectedChat.driver || selectedChat.name}</div>
            <div className='flex gap-2'> 
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isChatOpen ? 360 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                {isChatOpen ?  <IoIosArrowDown className='hover:bg-blue-400 p-1 rounded-full'  size={25}/> : <IoIosArrowUp className='hover:bg-blue-400 p-1 rounded-full' size={25}/>}
              </motion.div>
              <div onClick={() => setSelectedChat(null)}> 
                <IoClose className='hover:bg-blue-400 p-1 rounded-full' size={25}/>
              </div>
            </div>
          </div>
          {isChatOpen && (
            <>
              {isMessageLoading ? (
                <div className='pt-[150px]'>
                <SpanLoader />
                </div>
              ):(
                <>
                  <div className="flex-1 overflow-y-auto p-2">
                    {Object.keys(groupedMessages).map((dateKey, index) => (
                      <div key={index}>
                        <div className="text-center text-gray-500 text-xs my-2">{dateKey}</div>
                        {groupedMessages[dateKey].map((msg) => (
                          <Message key={msg._id} text={msg.message} sender={msg.sender} userId={userInfo.id} _time={formatTime(msg.timestamp)} />
                        ))}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <form className="p-2 flex ">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className=" border w-[80%] border-gray-300 focus:border-blue-400 focus:border-2 outline-none rounded-l-lg p-2"
                    />
                    <button type='submit' onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-r-lg flex-shrink-0 w-[20%]">Send</button>
                  </form>
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