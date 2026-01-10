import { useEffect,useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css';
export function ChatMessages({chatMessage})
{

    const chatMessageRef= useRef(null);
    useEffect(()=>
   {
       if(chatMessageRef.current)
       {
            chatMessageRef.current.scrollTop=chatMessageRef.current.scrollHeight;
         }
  },[chatMessage])

    return(
      <div className="chat-messages-container"
           ref={chatMessageRef}>
       { chatMessage.map((chatMessage)=>
      {
          return (<ChatMessage message={chatMessage.message} 
                               sender={chatMessage.sender}
                               key={chatMessage.key} 
                               time={chatMessage.time}
                              
                />
                );
      }           
      )}</div>)
}