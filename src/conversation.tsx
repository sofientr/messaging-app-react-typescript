import { Message, User, ImageMessage } from './assets/types';
import { useEffect } from 'react'
import { MessageComponent } from './message';
import { ImageMessageComponent } from './image_message';
interface Props {
  className: string;
  currentUserId: string;
  messages: Message[];
  users: User[];
}

//this methode return the index of tags in a massage  
function tagsindexs(message: string, users: User[]): number[] {
  let splitedMessage = message.split(' ')
  let result: number[] = []

  for (var i = 0; i < splitedMessage.length; i++) {
    //if a word starts with @ check all users name
    if (splitedMessage[i].startsWith("@")) {
      users.map((user: User, index: number) => {
        let userNameSplited = ('@' + user.username).split(' ')
        if (splitedMessage[i].startsWith('@' + user.username.split(' ')[0] )  ) {
          var j = 0
          let endTest=false
          while(j < userNameSplited.length && endTest==false ) {
            let verifdotCurrent = splitedMessage[i]
            // remove dot from end of each word in text
            while (!verifdotCurrent[verifdotCurrent.length - 1].match(/^[a-z0-9]/i)){
                endTest=true//if the first word of the name containe non non alphanumeric characters dont check any more 
                verifdotCurrent = verifdotCurrent.slice(0, -1);
              }
                
                if ( verifdotCurrent == userNameSplited[j]) {
                  result.push(i)
                  i++
                  j++
                  
                }else{
                  endTest=true
                }
          }

        }

      })
    }


  }
  console.log(result)



  return result

}

const Conversation = (props: Props) => {



  const { className, messages, users, currentUserId } = props;


  return <div className={className} >{
    messages.sort((a: Message, b: Message) => a.createdAt - b.createdAt)
      .map((message: Message, index:number) => {
        return message.type == 'text' ?
          <MessageComponent {...{ message, users, currentUserId, tagsindexs, fixDate }} key={index}></MessageComponent>

          : message.type == 'image' ?
            <ImageMessageComponent {...{ message, users, currentUserId, tagsindexs, fixDate }} key={index}></ImageMessageComponent>
            :
            <></>

      })}</div>;
};

function fixDate(date: number): string {
  let toFix: string = new Date(date).toLocaleString()
  return toFix.replace(",", " -")


}


export default Conversation;
