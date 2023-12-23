'use client';
import React, { useState } from 'react'
import { App, Button, Card, Flex, Form, Input, Table } from 'antd'
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { ExclamationCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { CustomerInfo, CustomerObject, IForm } from './customer.type';
import { deleteInfo, remoteList } from '@/api/customer';
import { columns } from './columns';
import ShowInfo from './_components/info'
import { useDictionary } from '@/hooks/dictionary';

const Customer = () => {
    const [form] = Form.useForm();
    const { message, modal } = App.useApp();
    const [showData, setShowData] = useState<Boolean>(false);
    const [dataInfo, setDataInfo] = useState<CustomerInfo | object>();
    const levelList = useDictionary('customer_level');
    //查询信息列表
    const searchList = (params: any, formData: IForm): Promise<CustomerObject> => {
        return new Promise(async (resolve, reject) => {
            try {
                let { pageSize: size, current: page } = params;
                let form = {
                    page,
                    size,
                    ...formData
                }
                let res = await remoteList(form);
                let { list, total } = res.data;
                let result: CustomerObject = {
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
    const deleteItemByInfo = (item: any) => {
        let { id, name } = item;
        modal.confirm({
            title: '操作提示',
            icon: <ExclamationCircleFilled />,
            content: `确定要删除 ${name} 会员?`,
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
    const updateItemByInfo = (item?: CustomerInfo) => {
        setDataInfo(item);
        setShowData(true)
    }
    const { tableProps, search } = useAntdTable(searchList, { defaultPageSize: 10, form })
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    const { run: deleteItem } = useRequest(async (item: CustomerInfo) => deleteItemByInfo(item), {
        manual: true,
    });
    const { run: updateItem } = useRequest(async (item: CustomerInfo) => updateItemByInfo(item), {
        manual: true,
    });
    return (
        <Card style={{ margin: '10px 0' }}>
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
                    {/* <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => updateItemByInfo()}>添加</Button> */}
                </Flex>
            </Form>
            <Table
                style={{ marginTop: '20px' }}
                rowKey='id'
                bordered
                columns={columns(updateItem, deleteItem,levelList)}
                {...tableProps} />
            {
                showData && <ShowInfo level={levelList} info={dataInfo} submit={() => { setShowData(false); search.submit(); }} close={() => setShowData(false)} />
            }
        </Card>
    )
}

export default Customer