import {useState} from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import './ChatInput.css';

export function ChatInput({chatMessage,setChatMessage})
      {
        const [isLoading,setIsLoading]=useState(false);

         const [inputText,setInputText]=useState('');

                  function updateChange(event)
                  {
                      setInputText(event.target.value);
            
                  }

                    async function sendMessage()
                  {
                              if (!inputText.trim() || isLoading) return; // prevent empty/duplicate sends

                              setIsLoading(true);
                              const newChatMessage=[...chatMessage,{message:inputText,
                                                                    sender:'user',
                                                                    key:crypto.randomUUID(),
                                                                    id:crypto.randomUUID(),
                                                                    time :dayjs().valueOf()
                                                                  }];
                              setChatMessage(newChatMessage);

                              try
                              {

                                  const response= await Chatbot.getResponseAsync(inputText);

                                    setChatMessage([...newChatMessage,{message:response,
                                    sender:'bot',
                                    key:crypto.randomUUID() ,
                                    id:crypto.randomUUID() ,
                                    time :dayjs().valueOf()
                                    }]);
                              }
                              catch(e)
                              {
                                console.error(e);
                                setChatMessage([...newChatMessage,{message:e.message,
                                sender:'bot',
                                key:crypto.randomUUID() ,
                                id:crypto.randomUUID() ,
                                time: dayjs().valueOf()

                                }]);
                              }
                          finally
                          {
                            
                            setIsLoading(false);
                            setInputText("");
                          }

                  }

      
          return (
            <div className="chat-input">
              <input
                 onKeyDown={(event)=>{
                if(event.key==="Enter")
                {
                    sendMessage();
                } 

                else if(event.key==="Escape")
                {
                    setInputText("");
                }

              }} 
                onChange={updateChange} 
                value={isLoading ? 'Loading...' : inputText} 
                disabled={isLoading} 
                className="input-field"
                placeholder="Send a Message to Chatbot"
                    />


              <button onClick={sendMessage}
              className="btn" disabled={isLoading}>
             {isLoading ? 'loading...' : 'Send'}</button>
          </div>
          );
}
