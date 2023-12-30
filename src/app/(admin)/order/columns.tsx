/*
 * @Author: Jimmy
 * @LastModifiedBy: Jimmy
 * @Date: 2023-12-28 12:54:25
 * @LastEditTime: 2023-12-30 16:21:33
 * @FilePath: /next-app/src/app/(admin)/order/columns.tsx
 */
import { Button, Flex, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DictData } from '../system/dictionary/dict.type';
import ShowDict from '@/components/ShowDict';
import { OrderInfo } from './order.type';
import { formatDate } from '@/libs/utils';

export const columns = (updateItem: Function, deleteItem: Function,orderStatus:DictData[]): ColumnsType<OrderInfo> => {
    return [
        {
            title: "商品",
            dataIndex: "product",
            key: "product",
            width:100,
            render: (value,record) => {
                return <Image width={80} alt={record.title} src={record.product.image} />
            }
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            width:200,
            ellipsis:true,
            render: (value,record) => record.product.title
        },
        {
            title: "下单用户",
            dataIndex: "user",
            key: "user",
            width:100,
            render: (value,record) => record.customer.name
        },
        {
            title: "价格",
            dataIndex: "price",
            width:100,
            key: "price"
        },
        {
            title: "数量",
            dataIndex: "quantity",
            width:100,
            key: "quantity"
        },
        {
            title: "总价",
            dataIndex: "total",
            width:100,
            key: "total"
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            width:100,
            render:(value,record,index)=><ShowDict data={orderStatus} value={value}></ShowDict>
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            width: 200,
            render:(value)=>formatDate(value)
        },
        {
            title: "更新时间",
            dataIndex: "updatedTime",
            key: "updatedTime",
            width: 200,
            render:(value)=>formatDate(value)
        },
        {
            title: "操作",
            dataIndex: "action",
            width:180,
            fixed:'right',
            render: (value, record: OrderInfo, index) => <Flex wrap="wrap" gap="small">
                <Button size='small' disabled={record.status==0} type='primary' onClick={() => updateItem(record)}>编辑</Button>
                <Button size='small' disabled={record.status==1} danger onClick={() => deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}