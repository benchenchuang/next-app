"use client";
import React, { useState } from 'react'
import { App, Button, Card, Flex, Form, Input, Modal, Table, message } from 'antd'
import { ExclamationCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { GoodsInfo, GoodsObject, IForm } from './goods.type';
import { deleteInfo, remoteList } from '@/api/goods';
import { columns } from './columns';
import ShowInfo from './_components/info'

const Goods = () => {
    const [form] = Form.useForm();
    const { message, modal } = App.useApp();
    const [isShow, setShow] = useState<Boolean>(false);
    const [dataInfo, setDataInfo] = useState<GoodsInfo | object>();
    //查询信息列表
    const searchList = (params: any, formData: IForm): Promise<GoodsObject> => {
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
                let result: GoodsObject = {
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
            content: `确定要删除 ${name} 商品?`,
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
    const updateItemByInfo = (item?: GoodsInfo) => {
        setDataInfo(item);
        setShow(true)
    }
    const { tableProps, search } = useAntdTable(searchList, { defaultPageSize: 10, form })
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    const { run: deleteItem } = useRequest(async (item: GoodsInfo) => deleteItemByInfo(item), {
        manual: true,
    });
    const { run: updateItem } = useRequest(async (item: GoodsInfo) => updateItemByInfo(item), {
        manual: true,
    });
    return (
        <Card style={{ margin: '10px 0' }}>
            <Form form={form} onValuesChange={autoSearch} layout="inline">
                <Form.Item label="" name="title">
                    <Input placeholder='请输入标题' />
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
            <Table
                style={{ marginTop: '20px' }}
                rowKey='id'
                bordered
                columns={columns(updateItem, deleteItem)}
                {...tableProps} />
            {
                isShow && <ShowInfo info={dataInfo} submit={() => { setShow(false); search.submit(); }} close={() => setShow(false)}/>
            }
        </Card>
    )
}

export default Goods