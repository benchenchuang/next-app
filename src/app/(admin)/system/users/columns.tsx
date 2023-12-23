/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-22 11:29:54
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 17:40:02
 * @FilePath: /next-app/src/app/(admin)/system/users/columns.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import { Button, Flex, Image, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IUserInfo } from './users.type';

export const columns = (updateItem:Function,deleteItem:Function): ColumnsType<IUserInfo> => {
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
            title: "手机",
            dataIndex: "phone",
            key: "phone",
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
            render(value, record, index) {
                return <Tag color="#4062d8">{value.name}</Tag>
            },
        },
        {
            title: "角色",
            dataIndex: "role",
            render(value, record, index) {
                return <Tag>{value.name}</Tag>
            },
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            dataIndex: "action",
            width:150,
            render:(value, record:IUserInfo, index)=><Flex wrap="wrap" gap="small">
                <Button size='small' type='primary' onClick={()=>updateItem(record)}>编辑</Button>
                {
                    record.username!='admin' && <Button  size='small' danger onClick={()=>deleteItem(record)}>删除</Button>
                }
            </Flex>
        },
    ]
}