export interface TomatoeItem {
  title?: string;
  content?: string;
  color?: string;
  icon?: TomatoeIcon;
  url?: string;
}

export interface TomatoeIcon {
  name: string;
  color?: string;
}
