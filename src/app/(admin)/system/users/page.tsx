/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:06:11
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-01 20:09:14
 * @FilePath: /next-app/src/app/views/system/users/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client';
import { Button, Card, Flex, Form, Input, Modal, Table, message } from 'antd';
import { columns } from './columns';
import { deleteInfo, remoteList } from '@/api/system/users';
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { IForm, IUserObject, IUserInfo } from './users.type';
import { ExclamationCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import UserInfo from './_components/info'

const { confirm } = Modal;

const Users = (props: any) => {
    const { isShowSearch = true, roleId = '', departId = '' } = props;
    const [form] = Form.useForm();
    const [showData, setShowData] = useState<Boolean>(false);
    const [dataInfo, setDataInfo] = useState<IUserInfo | object>();
    useEffect(() => {
        search.reset()
    }, [roleId, departId])
    //查询信息列表
    const searchList = (params: any, formData: IForm): Promise<IUserObject> => {
        return new Promise(async (resolve, reject) => {
            try {
                let { pageSize: size, current: page } = params;
                let form = {
                    page,
                    size,
                    roleId,
                    departId,
                    ...formData
                }
                let res = await remoteList(form);
                let { list, total } = res.data;
                let result: IUserObject = {
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
    //删除
    const deleteItemByInfo = (item: IUserInfo) => {
        let { id, name } = item;
        confirm({
            title: '操作提示',
            icon: <ExclamationCircleFilled />,
            content: `确定要删除 ${name} 字典?`,
            cancelText: '取消',
            okText: '确定',
            onOk: async () => {
                try {
                    await deleteInfo({ ids: [id as string] });
                    message.success('操作成功')
                    search.submit()
                } catch (err) {
                    message.error('操作失败')
                }
            }
        });
    }
    //编辑
    const updateItemByInfo = (item?: IUserInfo) => {
        setShowData(true);
        setDataInfo(item)
    }
    const { tableProps, search } = useAntdTable(searchList, { defaultPageSize: 10, form })
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    const { run: deleteItem } = useRequest(async (item: IUserInfo) => deleteItemByInfo(item), {
        manual: true,
    });
    const { run: updateItem } = useRequest(async (item: IUserInfo) => updateItemByInfo(item), {
        manual: true,
    });

    return (
        <>
            {
                isShowSearch ? <Card style={{ margin: '10px 0' }}>
                    {
                        <Form form={form} onValuesChange={autoSearch} layout="inline">
                            <Form.Item label="" name="name">
                                <Input placeholder='请输入姓名' />
                            </Form.Item>
                            <Form.Item label="" name="phone">
                                <Input placeholder='请输入手机号' />
                            </Form.Item>
                            <Flex wrap="wrap" gap="small">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={search.submit}>
                                    查询
                                </Button>
                                <Button onClick={search.reset}>重置</Button>
                                <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => updateItemByInfo()}>添加</Button>
                            </Flex>
                        </Form>
                    }
                    <Table
                        style={{ marginTop: '20px' }}
                        rowKey='id'
                        bordered
                        columns={columns(updateItem, deleteItem)}
                        {...tableProps} />
                </Card> : (
                    <>
                        <Form form={form}></Form>
                        <Table
                            rowKey='id'
                            bordered
                            columns={columns(updateItem, deleteItem)}
                            {...tableProps} />
                    </>
                )
            }

            {
                showData && <UserInfo info={dataInfo} submit={() => { setShowData(false); search.submit(); }} close={() => setShowData(false)} />
            }
        </>
    )
}

export default Users