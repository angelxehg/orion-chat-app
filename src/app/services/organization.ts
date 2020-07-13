export interface Organization {
    id: number,
    title: string,
    description: string,
    admin_flag: boolean,
    people: Array<number>
}
