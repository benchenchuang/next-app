'use client';
import React, { useEffect, useState } from 'react'
import ShowDrawer from '@/components/ShowDrawer'
import { Form, Input, InputNumber, Popover, Radio, RadioChangeEvent, Select, Spin, TreeSelect, message } from 'antd';
import { MenuType } from '../menu.type';
import { rules } from './rules';
import { paths, iconList } from './dictionary';
import IconSvg from '@/components/IconSvg';
import { addInfo, remoteList, updateInfo } from '@/api/system/menu';
import { DictData } from '../../dictionary/dict.type';

const MenuInfo = (props: any) => {
    let { info,menus,dict:dictData } = props;
    let fieldNames = {
        label: 'name',
        value: 'id',
        children: 'children',
    }
    //初始化表单
    let initForm = {
        name: '',
        type: 'C',
        parentId: '-1',
        icon: '',
        path: undefined,
        orderNum: 0,
    }
    const [form] = Form.useForm<MenuType>();
    const [infoForm, setInfoForm] = useState<MenuType>({ ...initForm, ...info });
    const [loading,setLoading] = useState<boolean>(false);
    const [treeData,setTreeData] = useState<MenuType[]>();

    useEffect(()=>{
        dealMenuList(menus)
    },[])

    //完成
    const onFinish = () => {
        form.validateFields().then(async values => {
            try {
                let sendForm = {...infoForm,...values}
                sendForm.icon = infoForm.icon;
                if(sendForm.id){
                    await updateInfo(sendForm);
                }else{
                    await addInfo(sendForm);
                }
                form.resetFields();
                message.success('操作成功')
                props.submit();
            } finally {
            }
        })
    }
    //处理菜单级别
    const dealMenuList = (data: Array<object>) => {
        let tree = [
            {
                name: '顶级菜单',
                id: '-1',
                children: data?[...data]:null
            }
        ]
        setTreeData(tree)
    }
    //选择父级
    const changeTree = (value: string) => {
        setInfoForm({ ...infoForm, parentId: value });
    }

    //选择类型
    const changeType = (e: RadioChangeEvent) =>{
        let {value} = e.target;
        setInfoForm({...infoForm,type:value})
    }
    //选择图标
    const selectedIcon = (item:any)=>{
        setInfoForm({ ...infoForm, icon: item });
    }
    //图标列表 
    const MenuIconContent = () => {
        return (
            <div style={{ width: 400 }}>
                {
                    iconList.map((icon, index) => {
                        return <span onClick={e=>selectedIcon(icon)} key={index}>
                            <IconSvg style={{ margin: '10px', cursor: 'pointer' }} name={icon} />
                        </span>
                    })
                }
            </div>
        )
    }

    return (
        <ShowDrawer
            close={() => props.close()}
            submit={() => onFinish()}>
            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="info"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onFinish}
                    autoComplete="off">
                    <Form.Item label="菜单名称" initialValue={infoForm.name} name="name" rules={rules.name}>
                        <Input placeholder="请输入菜单名称" />
                    </Form.Item>
                    <Form.Item label="菜单类型" initialValue={infoForm.type} name="type" rules={rules.type}>
                        <Radio.Group value={infoForm.type} onChange={e=>changeType(e)}>
                            {
                                dictData && dictData.map((item:DictData) => {
                                    return <Radio value={item.value} key={item.value}>{item.name}</Radio>
                                })
                            }
                        </Radio.Group>
                    </Form.Item>
                    {
                        infoForm.type != 'B' && (
                            <Form.Item label="菜单图标" initialValue={infoForm.icon} name="icon">
                                <Popover
                                    content={<MenuIconContent />}
                                    title=""
                                    placement="bottom"
                                    trigger="click"
                                >
                                    <Input addonBefore={infoForm.icon?<IconSvg name={infoForm.icon}/>:''} className='flex_item' placeholder="请选择菜单图标" />
                                </Popover>
                            </Form.Item>
                        )
                    }
                    <Form.Item label="上级菜单" initialValue={infoForm.parentId} name="parentId">
                        <TreeSelect
                            style={{ width: '100%' }}
                            value={infoForm.parentId}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择上级菜单"
                            allowClear
                            onChange={changeTree}
                            treeData={treeData}
                            fieldNames={fieldNames} />
                    </Form.Item>
                    {
                        infoForm.type !== 'M'? (
                            <Form.Item label="权限名称" initialValue={infoForm.path} name="path" rules={rules.path}>
                                <Input placeholder="请输入权限名称" />
                            </Form.Item>
                        ):(
                            <Form.Item label="路径" initialValue={infoForm.path} name="path" rules={rules.path}>
                                <Select
                                    showSearch
                                    placeholder="请选择路径"
                                    options={(paths || []).map((d) => ({
                                        value: d.path,
                                        label: `${d.name} - ${d.path}`,
                                    }))}>
                                </Select>
                            </Form.Item>
                        )
                    }
                    <Form.Item label="排序" initialValue={infoForm.orderNum} name="orderNum">
                        <InputNumber className='form_item' style={{ width: '100%' }} min={0} precision={0} placeholder="请输入排序" />
                    </Form.Item>
                </Form>
            </Spin>
        </ShowDrawer>
    )

}

export default MenuInfo