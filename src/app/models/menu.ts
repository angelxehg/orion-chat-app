export interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}
