import React from 'react';
import { TextMessage, User } from './assets/types';
type MessageProps = {
    message: TextMessage;
    users: User[];
    currentUserId: string;
    tagsindexs: (message: string, users: User[]) => number[];
    fixDate: (date: number) => string;
}

export const MessageComponent = ({ users, message, currentUserId, tagsindexs, fixDate }: MessageProps) => 
<p className={"chat_message" + (message.senderId == currentUserId ? "_owner" : "")} >
    <span className="chat_name">{users.find((user: User) => { return user.id == message.senderId })?.username}</span>
    {
        message.content.split(' ').map((text: string, index: number) => tagsindexs(message.content, users).includes(index) ?
            <div className='tag'>&nbsp;{text} </div>
            :
            <> {text}</>
        )
    }
    <span className="date">{fixDate(message.createdAt)}</span>
    </p>