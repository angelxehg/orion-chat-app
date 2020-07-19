import { Channel } from './channel';

export class Message {
    id: number = 0;
    content: string = "";
    mine_flag: boolean = false;
}

export class MessageHistory {
    id: number = 0;
    lastFetch: number;
    channel: Channel;
    history: Array<Message>;
}
