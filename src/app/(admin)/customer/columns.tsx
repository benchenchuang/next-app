import { Button, Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CustomerInfo } from './customer.type';
import { DictData } from '../system/dictionary/dict.type';
import ShowDict from '@/components/ShowDict';

export const columns = (updateItem: Function, deleteItem: Function,level:DictData[]): ColumnsType<CustomerInfo> => {
    return [
        {
            title: "姓名",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "手机号",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "等级",
            dataIndex: "level",
            key: "level",
            render:(value,record,index)=><ShowDict data={level} value={value}></ShowDict>
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render:(value,record,index)=><Tag>{value==1?'已开启':'已关闭'}</Tag>
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            render: (value, record: CustomerInfo, index) => <Flex wrap="wrap" gap="small">
                <Button type='primary' onClick={() => updateItem(record)}>编辑</Button>
                <Button danger onClick={() => deleteItem(record)}>删除</Button>
            </Flex>
        },
    ]
}