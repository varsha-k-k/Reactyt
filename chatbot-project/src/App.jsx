import { useEffect, useState } from 'react'
import {ChatInput } from './components/ChatInput';
import { Chatbot } from 'supersimpledev';
import { ChatMessages } from './components/ChatMessages';
import './App.css'


function App()
{
   const [chatMessage, setChatMessage] = useState([
                  {message:'hello chatbot',sender:'user',key :'id1', id:'id1' , time:1736127291230},
                 {message:'Hello! How can I help you?',sender:'bot',key :'id2' , id:'id2' , time:1736127292230}
                  ]);

                  useEffect(()=>
                  {
                    Chatbot.addResponses(
                      {'How are you?' : 'I am just a bot, but thanks for asking!',
                      'good bye': 'Goodbye! Have a great day!',
                      'give me a unique id' : function ()
                        {
                          return `here is your unique id ${crypto.randomUUID()}`;
                        } 
                     });
                    },[]);
  return (
    <div className="app-container">
      
       <ChatMessages 
        chatMessage={chatMessage} 
        setChatMessage={setChatMessage}/>

      <ChatInput chatMessage={chatMessage} 
       setChatMessage={setChatMessage}
       />

  </div> 
  );
}

export default App
