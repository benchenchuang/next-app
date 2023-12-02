export interface IUserObject {
    list: IUserInfo[]
    total: number

}
export interface IUserInfo {
    id:string
    username: string
    name: string
    email?: string
    phone: string
    password: string
    avatar?: string
    role: string
    address?: string
}
export interface IForm {
    username: string
    phone: string
}