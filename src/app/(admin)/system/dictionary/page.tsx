'use client';
import { Button, Card, Flex, Form, Input, Modal, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { columns, dataColumn } from './columns'
import { useAntdTable, useDebounceFn, useRequest } from 'ahooks';
import { IDictObject, DictType, IForm, DictData } from './dict.type';
import { deleteInfo, remoteList } from '@/api/system/dict-type';
import { deleteInfo as deleteData, remoteList as dataList } from '@/api/system/dict-data';
import { PlusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import TypeInfo from './_components/type-info';
import DataInfo from './_components/data-info';
import styles from './dict.module.scss';

const { confirm } = Modal;

const Dictionary = () => {
    const [form] = Form.useForm();
    //是否弹出信息编辑框
    const [showType, setShowType] = useState<Boolean>(false);
    const [typeInfo, setTypeInfo] = useState<DictType | object>();
    const [selectedItem, setSelectedItem] = useState<any>();
    const [dictTableList,setDictTableList] = useState<DictType[]>();
    const [loading,setLoading] = useState<boolean>(false);
    const [showData, setShowData] = useState<Boolean>(false);
    const [dataInfo, setDataInfo] = useState<DictData | object>();

    //查询信息列表
    const searchList = (params: any, formData: IForm): Promise<IDictObject> => {
        return new Promise(async (resolve, reject) => {
            setShowType(false)
            try {
                let { pageSize: size, current: page } = params;
                let form = {
                    page,
                    size,
                    ...formData
                }
                let res = await remoteList(form);
                let { list, total } = res.data;
                let result: IDictObject = {
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
    //字典信息类型的删除
    const deleteItemByInfo = (item: DictType) => {
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
    //字典信息类型的编辑 or 添加
    const updateItemByInfo = (item?: DictType) => {
        setTypeInfo(item);
        setShowType(true);
    }
    const { tableProps, search } = useAntdTable(searchList, { defaultPageSize: 10, form })
    const { run: autoSearch } = useDebounceFn(search.submit, { wait: 500 });
    const { run: deleteItem } = useRequest(async (item) => deleteItemByInfo(item), {
        manual: true,
    });
    const { run: updateItem } = useRequest(async (item) => updateItemByInfo(item), {
        manual: true,
    });

    //字典数据相关
    useEffect(() => {
        if(selectedItem){
            let { code } = selectedItem;
            code && searchDataByCode(code);
        }
    }, [selectedItem]);
    //根据字典类型id查询字典数据
    const searchDataByCode = async (dictType: string) => {
        setLoading(true)
        setShowData(false);
        setDataInfo({})
        try {
            let res = await dataList({ dictType });
            let {list} = res.data;
            setDictTableList(list)
        } finally {
            setLoading(false)
        }
    };
    const updateDataItem = (item?: DictData)=>{
        setDataInfo(item);
        setShowData(true);
    }
    const deleteDataItem = async(item: DictData)=>{
        let { id, name } = item;
        confirm({
            title: '操作提示',
            icon: <ExclamationCircleFilled />,
            content: `确定要删除 ${name} 字典数据?`,
            cancelText: '取消',
            okText: '确定',
            onOk: async () => {
                try {
                    await deleteData({ ids: [id as string] });
                    message.success('操作成功')
                    searchDataByCode(selectedItem.code)
                } catch (err) {
                    message.error('操作失败')
                }
            }
        });
    }

    return (
        <div className={styles.wrapper}>
            <Card
                className={styles.cardBox}
                title="字典信息"
                style={{ margin: '10px 0' }}>
                <Form form={form} onValuesChange={autoSearch} layout="inline">
                    <Form.Item label="" name="name">
                        <Input placeholder='请输入名称' />
                    </Form.Item>
                    <Flex wrap="wrap" gap="small">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={search.submit}
                        >
                            查询
                        </Button>
                        <Button onClick={search.reset}>重置</Button>
                        <Button type='primary' icon={<PlusCircleOutlined />} onClick={() => updateItemByInfo()}>添加</Button>
                    </Flex>
                </Form>
                <Table
                    style={{ marginTop: '20px' }}
                    onRow={(record) => ({
                        onClick: () => {
                            setSelectedItem(record);
                        },
                    })}
                    rowClassName={(record)=>{
                        return record.id==selectedItem?.id?styles.active:''
                    }}
                    rowKey='id'
                    bordered
                    columns={columns(updateItem, deleteItem)}
                    {...tableProps} />
                {
                    showType && <TypeInfo info={typeInfo} submit={() => { search.submit() }} close={() => setShowType(false)} />
                }
            </Card>
            <Card className={styles.cardBox} title={selectedItem?selectedItem.name:'字典数据'} style={{ margin: '10px 0' }}>
                <Form layout="inline">
                    <Flex wrap="wrap" gap="small">
                        <Button disabled={selectedItem?false:true} type='primary' icon={<PlusCircleOutlined />} onClick={() => setShowData(true)}>添加数据</Button>
                    </Flex>
                </Form>
                <Table
                    style={{ marginTop: '20px' }}
                    rowKey='id'
                    bordered
                    loading={loading}
                    columns={dataColumn(updateDataItem, deleteDataItem)}
                    dataSource={dictTableList} />
                {
                    showData && <DataInfo parent={selectedItem} info={dataInfo} submit={() => { searchDataByCode(selectedItem.code) }} close={() => setShowData(false)} />
                }
            </Card>
        </div>
    )
}

export default Dictionary