import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import './messenger.css'

function Messenger() {
    return (

        <div className='messenger-contain'>
            <div className="sidebar">
                <Sidebar />
                sidebar
            </div>
            <div className="messenger">
               

                <div className="chatBox">

                    <div className="chatBoxWrapper">
                    messenger
                        <div className="chatBoxTop">
                            {/* {messages.map((m) => (
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id} />
                                </div>
                            ))} */}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatMessageInput"
                                placeholder="write something..."
                                // onChange={(e) => setNewMessage(e.target.value)}
                                // value={newMessage}
                            ></textarea>
                            <button className="chatSubmitButton" >
                                Send
                            </button>
                        </div>


                        {/* <span className="noConversationText">
                            Open a conversation to start a chat.
                        </span> */}

                    </div>
                </div>
                <div className="chatRight">
                    <div className="chatMenu">
                        <div className="chatMenuWrapper">
                            <input placeholder="Search for friends" className="chatMenuInput" />

                            {/* {conversations.map((c) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            ))} */}
                        </div>
                    </div>
                    <div className="chatOnline">
                        <div className="chatOnlineWrapper">
                            {/* <ChatOnline
                                onlineUsers={onlineUsers}
                                currentId={user._id}
                                setCurrentChat={setCurrentChat}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger