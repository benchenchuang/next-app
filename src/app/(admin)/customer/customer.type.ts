export interface CustomerObject {
    list: CustomerInfo[]
    total: number

}
export type CustomerInfo = {
    id: string
    name: string
    email?: string
    phone: string
    password: string
    level: number
    status: number
}
export interface IForm {
    name: string
    phone: string
}