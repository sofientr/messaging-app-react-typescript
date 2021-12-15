import React ,{useState, useEffect} from 'react';
import { TextMessage, User, ImageMessage } from './assets/types';
type MessageImageProps = {
    message: ImageMessage;
    users: User[];
    currentUserId: string;
    tagsindexs: (message: string, users: User[]) => number[];
    fixDate: (date: number) => string;
}


export const ImageMessageComponent = ({ users, message, currentUserId, tagsindexs, fixDate }: MessageImageProps) =>{
    const [tags, setTags] = useState<Array<number>>([]);
    useEffect(() => {
        setTags(tagsindexs(message.caption, users))

    }, [])

return <p className={"chat_message_image" + (message.senderId == currentUserId ? "_owner" : "")} >
    <span className="chat_name_image">{users.find((user: User) => { return user.id == message.senderId })?.username}</span>
    <img className="chat_image" src={message.url} alt="" />
    {
        message.caption.split(' ').map((text: string, index: number) => tags.includes(index) ?
            <span key={index} className='tag'>&nbsp;{text} </span>
            :
            <span key={index}> {text}</span>
        )
    }
    <span className="date">{fixDate(message.createdAt)}</span>
</p>
}