/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-18 13:46:00
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 17:34:37
 * @FilePath: /next-app/src/app/(admin)/system/menu/columns.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Flex } from "antd"
import { ColumnsType } from "antd/lib/table"
import IconSvg from '@/components/IconSvg';
import ShowDict from "@/components/ShowDict";
import { DictData } from "../dictionary/dict.type";

export const columns = (updateItem:Function,deleteItem:Function,dictData:DictData[]): ColumnsType<any>=>{
    return [
        // {
        //     title: "序号",
        //     dataIndex: "index",
        //     key: "index",
        //     width:80,
        //     render:(value,record,index)=><span>{index+1}</span>
        // },
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width:140,
        },
        {
            title: "图标",
            dataIndex: "icon",
            key: "icon",
            width:80,
            render:(value,record,index)=>record.icon && <IconSvg name={record.icon} style={{color:'#666'}}/>
        },
        {
            title: "排序",
            dataIndex: "orderNum",
            key: "orderNum",
            width:70
        },
        {
            title: "路径",
            dataIndex: "path",
            key: "path",
        },
        {
            title: "类型",
            dataIndex: "type",
            key: "type",
            width:90,
            render:(value,record,index)=><ShowDict data={dictData} value={value} />
        },
        // {
        //     title: "是否显示",
        //     dataIndex: "show",
        //     key: "show",
        //     width:90
        // },
        // {
        //     title: "是否跳出",
        //     dataIndex: "extend",
        //     key: "extend",
        //     width:90
        // },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            width:200,
        },
        {
            title: "操作",
            dataIndex: "action",
            width:180,
            render:(value, record, index)=><Flex wrap="wrap" gap="small">
                <Button size="small" type='primary' onClick={()=>updateItem(record)}>编辑</Button>
                <Button size="small" danger onClick={()=>deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}