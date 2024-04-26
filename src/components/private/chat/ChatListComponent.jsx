import { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent.jsx";

const ChatListComponent = ({chatList, setChatList}) => {
    // states
    // const [chats, setChats] = useState();

    useEffect(() => {
        console.log('Chats');
        console.log(chatList);
        // setChats(chat => [...chat, chatList]);
        // console.log(chats);
    }, [chatList]);
    

    return (
        <>
            <section className="w-full absolute bottom-0 flex flex-row-reverse">
                {
                    chatList.map( chat => <ChatComponent chat={chat} chatList={chatList} setChatList={setChatList} />)
                }
            </section>
        </>
    )
}

export default ChatListComponent