import React, { useEffect, useState, useRef } from 'react'

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("")
  const [messageList, setMessageList] = useState([])
  const messageEndRef = useRef(null)

  useEffect(() => {
    socket.on("messageReturn", data => {
      setMessageList(prev => [...prev, data])
    })
  }, [socket])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  const sendMessage = async () => {
    if (!message) return
    const messageContent = {
      username,
      room,
      message,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    await socket.emit("message", messageContent)
    setMessageList(prev => [...prev, messageContent])
    setMessage("")
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4' style={{ backgroundColor: '#555879' }}>
      <div className='w-full max-w-3xl h-[600px] rounded-2xl shadow-lg flex flex-col' style={{ backgroundColor: '#DED3C4' }}>
        
        {/* Header */}
        <div className='h-16 flex items-center px-4 sm:px-6' style={{ backgroundColor: '#98A1BC', color: '#F4EBD3' }}>
          <div className='w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full mr-3'></div>
          <h2 className='font-bold text-lg sm:text-xl truncate'>Room: {room}</h2>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3'>
          {messageList.map((msg, i) => (
            <div key={i} className={`${username === msg.username ? "flex justify-end" : "flex justify-start"}`}>
              <div
                className={`p-3 rounded-xl max-w-full sm:max-w-2/3 break-words`}
                style={{
                  backgroundColor: username === msg.username ? '#98A1BC' : '#F4EBD3',
                  color: username === msg.username ? '#F4EBD3' : '#555879'
                }}
              >
                <div>{msg.message}</div>
                <div className='text-xs flex justify-end mt-1 truncate'>{msg.username} • {msg.date}</div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef}></div>
        </div>

        {/* Input */}
        <div className='flex flex-col sm:flex-row p-4 sm:p-4 gap-2 border-t' style={{ borderColor: '#98A1BC' }}>
          <input
            type="text"
            placeholder='Type a message...'
            value={message}
            onChange={e => setMessage(e.target.value)}
            className='flex-1 h-16 sm:h-16 px-4 rounded-xl outline-none text-base sm:text-lg'
            style={{ backgroundColor: '#F4EBD3', color: '#555879',height: '4rem'  }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className='h-12 sm:h-16 w-full sm:w-48 rounded-xl font-bold text-lg sm:text-xl transition hover:opacity-80'
            style={{ backgroundColor: '#98A1BC', color: '#F4EBD3' }}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default Chat
