import { Button, Flex, Image, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const columns = (updateItem:Function,deleteItem:Function): ColumnsType<any> => {
    return [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            render:(value,record,index)=><span>{index+1}</span>
        },
        {
            title: "字典名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "字典编码",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            render:(value, record, index)=><Flex wrap="wrap" gap="small">
                <Button type='primary' onClick={()=>updateItem(record)}>编辑</Button>
                <Button danger onClick={()=>deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}
//字典数据
export const dataColumn = (updateItem:Function,deleteItem:Function): ColumnsType<any>=>{
    return [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            render:(value,record,index)=><span>{index+1}</span>
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "编码",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "数值",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            render:(value, record, index)=><Flex wrap="wrap" gap="small">
                <Button type='primary' onClick={()=>updateItem(record)}>编辑</Button>
                <Button danger onClick={()=>deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}