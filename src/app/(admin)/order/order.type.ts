export interface OrderObject {
    list: OrderInfo[]
    total: number

}
export type OrderInfo = {
    address: string
    phone: string
    total: number
    status: number
    customer: any
    product: any
    id: string
    image: string
    title: string
    quantity: number
    price: number
}
export interface IForm {
    title: string
    name: string
    status: number
}