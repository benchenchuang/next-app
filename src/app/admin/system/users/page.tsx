/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:06:11
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-01 20:09:14
 * @FilePath: /next-app/src/app/views/system/users/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';
import { Button, Card, Form, Input, Table } from 'antd';
import { columns } from './columns';
import { remoteList } from '@/api/system/users';
import { useAntdTable, useDebounceFn } from 'ahooks';
import { IForm, IUserObject,IUserInfo } from './users.type';

const Users = () => {
    const [form] = Form.useForm();
    //查询信息列表
    const searchList = (params: any,formData:IForm): Promise<IUserObject> => {
        return new Promise(async (resolve, reject) => {
            try {
                let {pageSize:size,current:page} = params;
                let form = {
                    page,
                    size,
                    ...formData
                }
                let res = await remoteList(form);
                let { list,total } = res.data;
                let result:IUserObject = {
                    list,
                    total
                }
                resolve(result)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    };
    const { tableProps,search } = useAntdTable(searchList, { defaultPageSize: 10 , form})
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    // const { run: deleteItem } = useRequest((id) => deleteItemByIds(id), {
    //     manual: true,
    // });
    
    return (
        <Card style={{ margin: '10px 0' }}>
            <Form form={form} onValuesChange={autoSearch} layout="inline">
                <Form.Item label="姓名" name="name">
                    <Input placeholder='请输入姓名' />
                </Form.Item>
                <Form.Item label="手机" name="phone">
                    <Input placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 20 }}
                        onClick={search.submit}
                    >
                        查询
                    </Button>
                    <Button onClick={search.reset}>重置</Button>
                </Form.Item>
            </Form>
            <Table
                style={{marginTop:'20px'}}
                rowKey='_id'
                bordered
                columns={columns()}
                {...tableProps} />
        </Card>
    )
}

export default Users