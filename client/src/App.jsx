import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Room from './components/Room'
import Chat from './components/Chat'
import { io } from 'socket.io-client'

const socket = io.connect("http://localhost:5001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [chatScreen, setChatScreen] = useState(false)

  return (
    <>
      <div className='App'>
        {!chatScreen ? 
            <Room username={username} room={room} setUsername={setUsername} setRoom={setRoom} 
      setChatScreen={setChatScreen} socket={socket} /> :
            <Chat username={username} room={room} socket={socket} />
      }
      </div>
     
    </>
  )
}

export default App
