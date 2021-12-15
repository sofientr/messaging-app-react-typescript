import React ,{useState, useEffect} from 'react';
import { TextMessage, User } from './assets/types';
type MessageProps = {
    message: TextMessage;
    users: User[];
    currentUserId: string;
    tagsindexs: (message: string, users: User[]) => number[];
    fixDate: (date: number) => string;
}

export const MessageComponent = ({ users, message, currentUserId, tagsindexs, fixDate }: MessageProps)=> {
    const [tags, setTags] = useState<Array<number>>([]);
    useEffect(() => {
        setTags(tagsindexs(message.content, users))

    }, [])
 
    return  <p className={"chat_message" + (message.senderId == currentUserId ? "_owner" : "")} >
    <span className="chat_name">{users.find((user: User) => { return user.id == message.senderId })?.username}</span>
    {
        message.content.split(' ').map((text: string, index: number) => tags.includes(index) ?
            <span key={index} className='tag'>&nbsp;{text} </span>
            :
            <span key={index} > {text}</span>
        )
    }
    <span  className="date">{fixDate(message.createdAt)}</span>
    </p>

}