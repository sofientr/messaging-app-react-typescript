import { Message, User } from './assets/types';
import {useEffect}from 'react'
interface Props {
  className: string;
  currentUserId: string;
  messages: Message[];
  users: User[];
}

const Conversation = (props: Props) => {



  const { className  ,messages,users ,currentUserId} = props;


  return <div className={className} >{
    messages.sort((a:Message,b:Message)=>a.createdAt-b.createdAt)
            .map((message:Message) =>{
    return  message.type =='text' ?
    <p className={"chat_message"+(message.senderId==currentUserId ? "_owner":"" )} > 
      <span className="chat_name">{users.find((user:User)=>{return user.id==message.senderId})?.username}</span>
      {message.content} 
      <span className="date">{fixDate(message.createdAt)}</span>
    </p>

    :message.type =='image'?
    
      
    <p className={"chat_message_image"+(message.senderId==currentUserId ? "_owner":"" )} >
      <span className="chat_name_image">{users.find((user:User)=>{return user.id==message.senderId})?.username}</span>
      <img className="chat_image" src={message.url} alt="" />
      {message.caption} 
      <span className="date">{fixDate(message.createdAt)}</span>


    </p>
    : 
    <></>

  })}</div>;
};

 function  fixDate(date:number):string{
    let toFix: string =new Date(date).toLocaleString()
    return toFix.replace(","," -")


}

export default Conversation;
