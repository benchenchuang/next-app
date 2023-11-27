export interface IUserObject {
    list: IUserInfo[]
    total: number

}
export interface IUserInfo {
    username: string
    email: string
    phone: string
    password: string
    avatar?: string
    isAdmin: boolean
    isActive: boolean
    address?: string
}
export interface IForm {
    username: string
    phone: string
}