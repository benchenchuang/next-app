import { Menu } from 'antd';
export interface IMenuResult {
    list: MenuType[]
    total: number

}
export type MenuType={
    parentId?: any;
    id:string
    name: string
    icon?: string
    path?: string
    type?: string
    orderNum?: string
}
export interface IForm {
    name: string
}