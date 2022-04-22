export interface IUserItem {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password?: string,
    department?: string,
    roles: any[],
    signupTime?: string,
    loginTime?: string,
    status?: string


}