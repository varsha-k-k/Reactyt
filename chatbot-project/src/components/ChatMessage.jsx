
import dayjs from 'dayjs';
import robotimage from '../assets/robot.png';
import userimage from '../assets/user.png';

import './ChatMessage.css';

export function ChatMessage(props)
{
      const {message,sender,time}=props;
      
      return (
        <div className={
          sender==='user' 
          ? 'user-msg'
           :'bot-msg'
        }>
        {sender==='bot' && <img src={robotimage} className="bot-img"/>}

      <div className="chat-message-text"> 
          {message} 
          
          {time && (
          <div className='chat-message-time'>
            { dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      {sender==='user' &&<img src={userimage} className="user-img" />}
        </div>
      );
}
