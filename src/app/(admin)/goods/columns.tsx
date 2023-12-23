import { Button, Flex, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GoodsInfo } from './goods.type';

export const columns = (updateItem: Function, deleteItem: Function): ColumnsType<GoodsInfo> => {
    return [
        {
            title: "排序",
            dataIndex: "rank",
            key: "rank",
        },
        {
            title: "头图",
            dataIndex: "image",
            key: "image",
            render: (value) => {
                return <Image width={80} src={value} />
            }
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "价格",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "数量",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            render: (value, record: GoodsInfo, index) => <Flex wrap="wrap" gap="small">
                <Button type='primary' onClick={() => updateItem(record)}>编辑</Button>
                <Button danger onClick={() => deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}