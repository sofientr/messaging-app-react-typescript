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
        let verifdot = splitedMessage[i]
        // remove dot from end of each word in text
        while (verifdot[verifdot.length - 1] === ".")
          verifdot = verifdot.slice(0, -1);

        if ('@' + user.username.split(' ')[0] == splitedMessage[i] || verifdot) {

          for (var j = 0; j < userNameSplited.length; j++) {
            if (userNameSplited[j] == splitedMessage[i] || verifdot == userNameSplited[j]) {
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



  const { className, messages, users, currentUserId } = props;


  return <div className={className} >{
    messages.sort((a: Message, b: Message) => a.createdAt - b.createdAt)
      .map((message: Message) => {
        return message.type == 'text' ?
          <MessageComponent {...{ message, users, currentUserId, tagsindexs, fixDate }}></MessageComponent>

          : message.type == 'image' ?
            <ImageMessageComponent {...{ message, users, currentUserId, tagsindexs, fixDate }}></ImageMessageComponent>
            :
            <></>

      })}</div>;
};

function fixDate(date: number): string {
  let toFix: string = new Date(date).toLocaleString()
  return toFix.replace(",", " -")


}


export default Conversation;
