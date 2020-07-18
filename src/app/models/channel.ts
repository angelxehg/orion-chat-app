import { BaseModel } from './base-model'
import { Message } from './message'

export class Channel extends BaseModel {
    lastFetch: number;
    history: Array<Message>;
}
