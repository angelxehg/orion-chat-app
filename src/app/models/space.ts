import { AppChat } from './chat';

export interface DBSpaceGroup {
  spaces: DBSpace[];
}

export interface DBSpace {
  title: string;
  chats: string[];
}

export interface AppSpace {
  title: string;
  chats: AppChat[];
}

export function transformSpaces(dbSpaceGroup: DBSpaceGroup) {
  const dbSpaces = dbSpaceGroup.spaces;
  return dbSpaces.map(dbSpace => {
    const space: AppSpace = {
      title: dbSpace.title,
      chats: dbSpace.chats.map(chatId => {
        const chat: AppChat = {
          id: chatId,
          title: 'Mi chat'
        };
        return chat;
      })
    };
    return space;
  });
}
