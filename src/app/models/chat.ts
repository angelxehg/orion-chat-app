export interface DBChat {
  title: string;
  messages?: DBMessage[];
  participants?: string[];
}

export interface DBMessage {
  from: string;
  content: string;
}

export interface AppChat extends DBChat {
  id: string;
  messages?: AppMessage[];
  imageSrc?: string;
  lastMsg?: string;
  lastMsgDate?: string;
}

export interface AppMessage extends DBMessage {
  mine: boolean;
  name?: string;
}

export function transformChat(chat: (DBChat & { id: string }), uid: string): AppChat {
  const lastMessageFrom = uid === chat.messages.slice(-1)[0].from ? 'Yo' : 'Otro';
  const lastMessageContent = chat.messages.slice(-1)[0].content;
  const lastMessage = `${lastMessageFrom}: ${lastMessageContent}`;
  return {
    id: chat.id,
    title: chat.title,
    participants: chat.participants,
    imageSrc: 'assets/icon/favicon.png',
    lastMsg: lastMessage,
    lastMsgDate: '10:00',
    messages: chat.messages.map(message => {
      return {
        from: message.from,
        content: message.content,
        mine: uid === message.from,
      };
    })
  };
}
