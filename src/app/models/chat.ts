export interface TomatoeChatGroup {
  title: string;
  items?: TomatoeChat[];
}

export interface TomatoeChat {
  id: string;
  title: string;
  lastMsg: string;
  lastMsgDate: string;
  imageSrc?: string;
}
