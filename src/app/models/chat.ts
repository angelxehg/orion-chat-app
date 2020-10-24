export interface TomatoeChatGroup {
  title: string;
  items?: TomatoeChat[];
}

export interface TomatoeChat {
  title: string;
  lastMsg: string;
  lastMsgDate: string;
  imageSrc?: string;
}
