export interface TomatoeItem {
  id?: string;
  title?: string;
  content?: string;
  color?: string;
  icon?: TomatoeIcon;
  image?: string;
  url?: string;
  user?: string;
}

export interface TomatoeIcon {
  name: string;
  color?: string;
}
