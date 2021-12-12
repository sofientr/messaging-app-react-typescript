import React from 'react';
import { TextMessage, User, ImageMessage } from './assets/types';
type MessageImageProps = {
    message: ImageMessage;
    users: User[];
    currentUserId: string;
    tagsindexs: (message: string, users: User[]) => number[];
    fixDate: (date: number) => string;
}

export const ImageMessageComponent = ({ users, message, currentUserId, tagsindexs, fixDate }: MessageImageProps) =>
<p className={"chat_message_image" + (message.senderId == currentUserId ? "_owner" : "")} >
    <span className="chat_name_image">{users.find((user: User) => { return user.id == message.senderId })?.username}</span>
    <img className="chat_image" src={message.url} alt="" />
    {
        message.caption.split(' ').map((text: string, index: number) => tagsindexs(message.caption, users).includes(index) ?
            <div className='tag'>&nbsp;{text} </div>
            :
            <> {text}</>
        )
    }
    <span className="date">{fixDate(message.createdAt)}</span>
</p>