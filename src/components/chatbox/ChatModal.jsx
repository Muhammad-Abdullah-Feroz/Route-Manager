import React, { useState, useEffect } from 'react'
import { IoClose,   IoPersonOutline } from 'react-icons/io5'
import SpanLoader from '../SpanLoader'
import { motion } from 'framer-motion'
import {  BsChatRightDots } from 'react-icons/bs'

const ChatModal = ({ data, setAddChatModalOpen, setSelectedChat }) => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [])

  const handleSearch = (e) => {
    setIsLoading(true)
    setSearch(e.target.value)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const filteredData = data?.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-lg w-96  p-4 "
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex gap-2 items-center"><BsChatRightDots/>Select Chat</h2>
          <IoClose 
            className="cursor-pointer" 
            size={25} 
            onClick={() => setAddChatModalOpen(false)} 
          />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="w-full border font-light outline-none border-gray-300 focus:border-blue-400 focus:border-2 rounded-lg p-2 mb-4"
        />
        <div className="max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className='py-10'> 
              <SpanLoader height='300px'/>
            </div>
          ) : (
            filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-2 font-normal cursor-pointer hover:bg-gray-100 rounded-lg flex items-center gap-2" 
                  onClick={() => setSelectedChat(item)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <IoPersonOutline className='border border-gray-200 rounded-full p-2 size-10' />
                  <div className='flex flex-col w-full'>
                    <div className='text-[16px] font-semibold flex items-center'>
                      <span className='truncate max-w-[200px]'>{item.name}</span>
                      {item.refer=='uet_drivers' && <span className='text-xs font-light ml-1'>(Driver)</span>}
                    </div>
                    <div className='text-[14px] font-normal max-w-[200px] truncate'>
                     {item.email}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center my-20 text-gray-500">No chats found</div>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ChatModal
