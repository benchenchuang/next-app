export interface GoodsObject {
    list: GoodsInfo[]
    total: number

}
export type GoodsInfo = {
    id: string
    image: string
    title: string
    quantity: number
    rank: number
    content: string
    price: number
}
export interface IForm {
    title: string
}