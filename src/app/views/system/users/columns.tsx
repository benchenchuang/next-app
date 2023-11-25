import { Image, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const columns = (): ColumnsType<object> => {
    return [
        {
            title: "头像",
            dataIndex: "avatar",
            render: (text: any, row: any, index: number) =><Image width={80} alt={row.username} src={text}/>
        },
        {
            title: "用户名",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "是否管理员",
            dataIndex: "isAdmin",
            render(value, record, index) {
                return value?<Tag color="#4062d8">是</Tag>:<Tag>否</Tag>
            },
        },
        {
            title: "是否激活",
            dataIndex: "isActive",
            render(value, record, index) {
                return value?<Tag color="#4062d8">是</Tag>:<Tag>否</Tag>
            },
        },
        {
            title: "手机",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "住址",
            dataIndex: "address",
            key: "address",
        },
    ]
}