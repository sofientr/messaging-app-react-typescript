import { Message, User } from './assets/types';
import {useEffect}from 'react'
interface Props {
  className: string;
  currentUserId: string;
  messages: Message[];
  users: User[];
}


function tagsindexs (message:string,users:User[]):number[]{
  let splitedMessage=message.split(' ')
  let result:number[]= []
  
  
  for(var i =0 ; i<splitedMessage.length;i++){

    if(splitedMessage[i].startsWith("@")){
      
      
      users.map((user:User,index:number)=>{
        let userNameSplited=('@'+user.username).split(' ')
        let verifdot=splitedMessage[i]
        while (verifdot[verifdot.length-1] === ".")
          verifdot = verifdot.slice(0,-1);

        if('@'+user.username.split(' ')[0]==splitedMessage[i]||'@'+user.username.split(' ')[0]==verifdot){
     
          for(var j=0 ;j<userNameSplited.length;j++){
           
            
            
            if(userNameSplited[j]==splitedMessage[i]||verifdot==userNameSplited[j]){
              console.log(i, userNameSplited[j])
              result.push(i)
              i++;
              
            }
            
            
            
          }

        }

      })
    }


  }



  return result

}

const Conversation = (props: Props) => {



  const { className  ,messages,users ,currentUserId} = props;


  return <div className={className} >{
    messages.sort((a:Message,b:Message)=>a.createdAt-b.createdAt)
            .map((message:Message) =>{
    return  message.type =='text' ?
    <p className={"chat_message"+(message.senderId==currentUserId ? "_owner":"" )} > 
      <span className="chat_name">{users.find((user:User)=>{return user.id==message.senderId})?.username}</span>

       
     
       
      {
        message.content.split(' ').map((text:string,index:number)=>tagsindexs(message.content,users).includes(index)?
        <div className='tag'>&nbsp;{ text} </div>
        :
        <> {text}</>
        )

      }

         
          
       

    


      <span className="date">{fixDate(message.createdAt)}</span>
    </p>

    :message.type =='image'?
    
      
    <p className={"chat_message_image"+(message.senderId==currentUserId ? "_owner":"" )} >
      <span className="chat_name_image">{users.find((user:User)=>{return user.id==message.senderId})?.username}</span>
      <img className="chat_image" src={message.url} alt="" />
      {
        message.caption.split(' ').map((text:string,index:number)=>tagsindexs(message.caption,users).includes(index)?
        <div className='tag'>&nbsp;{ text} </div>
        :
        <> {text}</>
        )

      }
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
