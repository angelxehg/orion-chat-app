export interface TomatoeItem {
  id?: string;
  title?: string;
  content?: string;
  color?: string;
  icon?: TomatoeIcon;
  image?: string;
  url?: string;
}

export interface TomatoeIcon {
  name: string;
  color?: string;
}
