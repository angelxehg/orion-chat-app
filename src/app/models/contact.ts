export interface DBContactGroup {
  contacts: AppContact[];
}

export interface AppContact {
  name: string;
  email: string;
  uid: string;
}
