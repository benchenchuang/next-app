/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-23 13:17:48
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 17:40:49
 * @FilePath: /next-app/src/app/(admin)/goods/columns.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
                <Button size='small' type='primary' onClick={() => updateItem(record)}>编辑</Button>
                <Button size='small' danger onClick={() => deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}