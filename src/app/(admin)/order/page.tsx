"use client";
import { deleteInfo, remoteList } from '@/api/order';
import { ExclamationCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { App, Button, Card, Flex, Form, Input, Select, Table } from 'antd';
import React, { useState } from 'react'
import { IForm, OrderInfo, OrderObject } from './order.type';
import { useDictionary } from '@/hooks/dictionary';
import { columns } from './columns';
import ShowInfo from './_components/info'

const Order = () => {
    const [form] = Form.useForm();
    const { message, modal } = App.useApp();
    const [isShow, setShow] = useState<Boolean>(false);
    const [dataInfo, setDataInfo] = useState<OrderInfo | object>();
    const orderStatusList = useDictionary('order_status');
    //查询信息列表
    const searchList = (params: any, formData: IForm): Promise<OrderObject> => {
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
                let result: OrderObject = {
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
        let { id, customer, product } = item;
        modal.confirm({
            title: '操作提示',
            icon: <ExclamationCircleFilled />,
            content: `确定要删除 ${customer.name}的${product.title}商品 订单?`,
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
    const updateItemByInfo = (item?: OrderInfo) => {
        setDataInfo(item);
        setShow(true)
    }
    const { tableProps, search } = useAntdTable(searchList, { defaultPageSize: 10, form })
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    const { run: deleteItem } = useRequest(async (item: OrderInfo) => deleteItemByInfo(item), {
        manual: true,
    });
    const { run: updateItem } = useRequest(async (item: OrderInfo) => updateItemByInfo(item), {
        manual: true,
    });
    return (
        <Card style={{ margin: '10px 0' }}>
            <Form form={form} onValuesChange={autoSearch} layout="inline">
                <Form.Item label="" name="title">
                    <Input placeholder='请输入标题' />
                </Form.Item>
                <Form.Item label="" name="name">
                    <Input placeholder='请输入用户' />
                </Form.Item>
                <Form.Item label="" name="status">
                    <Select
                        style={{ width: '120px' }}
                        options={orderStatusList}
                        placeholder="请选择状态"
                        allowClear
                        fieldNames={{
                            label: 'name',
                            value: 'value'
                        }}
                    />
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
            <div className='common_table_wrapper'>
                <Table
                    style={{ marginTop: '20px' }}
                    rowKey='id'
                    bordered
                    scroll={{ x: 800 }}
                    columns={columns(updateItem, deleteItem, orderStatusList)}
                    {...tableProps} />
            </div>
            {
                isShow && <ShowInfo orderStatus={orderStatusList} info={dataInfo} submit={() => { setShow(false); search.submit(); }} close={() => setShow(false)} />
            }
        </Card>
    )
}

export default Order