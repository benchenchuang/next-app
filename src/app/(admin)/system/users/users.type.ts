export interface IUserObject {
    list: IUserInfo[]
    total: number

}
export type IUserInfo={
    id:string
    username: string
    name: string
    email?: string
    phone: string
    password: string
    post?: string
    avatar?: string
    roleId: string
    departId: string
    address?: string
}
export interface IForm {
    username: string
    phone: string
}