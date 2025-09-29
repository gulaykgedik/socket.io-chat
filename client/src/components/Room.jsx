import React from 'react'

const Room = ({ username, room, setUsername, setRoom, setChatScreen, socket }) => {
  const sendRoom = () => {
    if (!username || !room) return;
    socket.emit("room", room);
    setChatScreen(true);
  }

  return (
    <div className='flex items-center justify-center min-h-screen' style={{ backgroundColor: '#555879' }}>
      <div className='w-full max-w-md h-auto flex flex-col space-y-6 p-8 rounded-2xl shadow-lg' style={{ backgroundColor: '#DED3C4' }}>
        <h1 className='text-center font-extrabold text-3xl' style={{ color: '#98A1BC' }}>Welcome to Chat</h1>

        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          className='h-14 px-4 rounded-xl border outline-none transition duration-300'
          style={{ borderColor: '#98A1BC', backgroundColor: '#F4EBD3', color: '#555879', placeholderColor: '#555879' }}
          type="text"
          placeholder='Username'
        />

        <input
          value={room}
          onChange={e => setRoom(e.target.value)}
          className='h-14 px-4 rounded-xl border outline-none transition duration-300'
          style={{ borderColor: '#98A1BC', backgroundColor: '#F4EBD3', color: '#555879' }}
          type="text"
          placeholder='Room'
        />

        <button
          onClick={sendRoom}
          className='h-14 w-full rounded-xl font-bold text-lg tracking-wide transition duration-200'
          style={{ backgroundColor: '#98A1BC', color: '#F4EBD3' }}
        >
          JOIN CHAT
        </button>
      </div>
    </div>
  )
}

export default Room
