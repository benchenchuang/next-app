import { Image, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const columns = (): ColumnsType<object> => {
    return [
        // {
        //     title: "头像",
        //     dataIndex: "avatar",
        //     render: (text: any, row: any, index: number) =><Image width={80} alt={row.username} src={text}/>
        // },
        {
            title: "用户名",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "姓名",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "部门",
            dataIndex: "depart",
            key: "depart",
        },
        {
            title: "角色",
            dataIndex: "role",
            render(value, record, index) {
                return value=='ADMIN'?<Tag color="#4062d8">管理员</Tag>:<Tag>用户</Tag>
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