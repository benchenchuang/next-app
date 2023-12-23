import React, { useState } from 'react'
import ShowDrawer from '@/components/ShowDrawer'
import { Form, Input, TreeSelect, message } from 'antd';
import { rules } from './rules';
import { addInfo, updateInfo } from '@/api/system/depart';

const DepartInfo = (props: any) => {
    let { info,list } = props;
    let fieldNames = {
        label: 'name',
        value: 'id',
        children: 'children',
    }
    //初始化表单
    let initForm = {
        name: '',
        code: '',
        parentId: '-1',
    }
    let departList:any[] = [
        {
            name: '一级部门',
            id: '-1',
            children: list?[...list]:null
        }
    ]
    const [form] = Form.useForm<DepartInfo>();
    const [infoForm, setInfoForm] = useState<DepartInfo>({ ...initForm, ...info });
    //完成提交
    const onFinish = ()=>{
        form.validateFields().then(async values => {
            try {
                let sendForm = {...infoForm,...values}
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

    //选择父级
    const changeTree = (value: string) => {
        setInfoForm({ ...infoForm, parentId: value });
    }

    return (
        <ShowDrawer
            close={() => props.close()}
            submit={() => onFinish()}>
            <Form
                form={form}
                name="info"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item<DepartInfo>
                    label="角色名称"
                    name="name"
                    rules={rules.name}
                    initialValue={infoForm.name}
                >
                    <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item<DepartInfo>
                    label="角色编码"
                    name="code"
                    rules={rules.code}
                    initialValue={infoForm.code}
                >
                    <Input disabled={infoForm.id ? true : false} placeholder="请输入编码" />
                </Form.Item>
                <Form.Item label="上级部门" initialValue={infoForm.parentId} name="parentId">
                    <TreeSelect
                        style={{ width: '100%' }}
                        value={infoForm.parentId}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择上级部门"
                        allowClear
                        onChange={changeTree}
                        treeData={departList}
                        fieldNames={fieldNames}
                    />
                </Form.Item>
            </Form>  
        </ShowDrawer>
    )
}

export default DepartInfo