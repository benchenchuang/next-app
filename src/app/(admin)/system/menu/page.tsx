'use client'
import { deleteInfo, remoteList } from '@/api/system/menu';
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { Button, Card, Flex, Form, Input, Modal, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { IForm, IMenuResult, MenuType } from './menu.type';
import { columns } from './columns';
import { PlusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import ShowInfo from './_components/info'
import { useDictionary } from '@/hooks/dictionary';
const { confirm } = Modal;
const Menu = () => {
    const [form] = Form.useForm();
    const [isShow, setShow] = useState<boolean>(false);
    const [info, setInfo] = useState<MenuType>();
    const [list,setList] = useState<MenuType[]>();
    const dictData = useDictionary('menu_type');

    //查询信息列表
    const searchList = (params: any, formData: IForm): Promise<IMenuResult> => {
        return new Promise(async (resolve, reject) => {
            setShow(false);
            try {
                let { pageSize: size, current: page } = params;
                let form = {
                    page,
                    size,
                    ...formData
                }
                let res = await remoteList(form);
                let { list, total } = res.data;
                let result: IMenuResult = {
                    list,
                    total
                }
                setList(list)
                resolve(result)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    };
    //删除
    const deleteItemByInfo = (item: MenuType) => {
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
    const updateItemByInfo = (item?: MenuType) => {
        setInfo(item);
        setShow(true)
    }
    const { tableProps, search } = useAntdTable(searchList, { defaultPageSize: 10, form })
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    const { run: deleteItem } = useRequest(async (item: MenuType) => deleteItemByInfo(item), {
        manual: true,
    });
    const { run: updateItem } = useRequest(async (item: MenuType) => updateItemByInfo(item), {
        manual: true,
    });

    return (
        <Card style={{ margin: '10px 0' }}>
            {
                <Form form={form} onValuesChange={autoSearch} layout="inline">
                    {/* <Form.Item label="" name="name">
                        <Input placeholder='菜单名称' />
                    </Form.Item> */}
                    <Flex wrap="wrap" gap="small">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={search.submit}>
                            查询
                        </Button>
                        {/* <Button onClick={search.reset}>重置</Button> */}
                        <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => updateItemByInfo()}>添加</Button>
                    </Flex>
                </Form>
            }
            <Table
                style={{ marginTop: '20px' }}
                rowKey='id'
                bordered
                scroll={{ x: 1000 }}
                columns={columns(updateItem, deleteItem,dictData)}
                {...tableProps} />
            {
                isShow && <ShowInfo dict={dictData} menus={list} info={info} submit={() => { search.submit() }} close={() => setShow(false)} />
            }
        </Card>
    )
}

export default Menu