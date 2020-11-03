export interface DBChat {
  title: string;
  messages: DBMessage[];
  participants: string[];
}

export interface DBMessage {
  from: string;
  content: string;
}

export interface AppChat extends DBChat {
  id: string;
  messages: AppMessage[];
}

export interface AppMessage extends DBMessage {
  mine: boolean;
}

export const chatsExample: AppChat[] = [{
  id: 'chat',
  title: 'Conversación de ejemplo',
  messages: [
    {
      from: 'user1',
      content: 'Hola!',
      mine: true
    },
    {
      from: 'user2',
      content: 'Hola!',
      mine: false
    }
  ],
  participants: [
    'user1', 'user2'
  ]
}];
