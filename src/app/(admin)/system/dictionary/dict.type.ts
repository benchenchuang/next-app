export interface IDictObject {
    list: DictType[]
    total: number

}
export type DictType = {
    id: string
    name: string
    code: string
    createTime: string
    updatedTime: string
}

export type DictData = {
    id?: string
    name: string
    code: string
    value: string
    color?: string
    createTime: string
    updatedTime: string
}


export interface IForm {
    name: string
}