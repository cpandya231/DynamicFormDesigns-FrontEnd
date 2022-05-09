export interface IUserItem {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password?: string,
    department?: string,
    dateOfBirth:string,
    roles: any[],
    createDt?: string,
    lastLoginDt?: string,
    isActive: boolean


}