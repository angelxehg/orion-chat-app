export interface Workspace {
    id: number,
    title: string,
    description: string,
    admin_flag: boolean,
    people: Array<number>
}
