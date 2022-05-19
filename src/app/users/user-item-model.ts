import { IDepartmentItem } from "../departments/department-item-model";

export interface IUserItem {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password?: string,
    department?: any,
    dateOfBirth: string,
    roles: any[],
    createDt?: string,
    lastLoginDt?: string,
    isActive: boolean


}