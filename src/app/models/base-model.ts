export class BaseModel {
    id: number = 0;
    title: string = "";
    description: string = "";
    admin_flag: boolean = false;
    people: Array<number> = [];
}
