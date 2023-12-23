import React, { useState } from 'react'
import ShowDrawer from '@/components/ShowDrawer';
import { Form, Input, message } from 'antd';
import { typeRules } from './rules';
import { DictType } from '../dict.type';
import { addInfo, updateInfo } from '@/api/system/dict-type';

const TypeInfo = (props: any) => {
    let {info} = props;
    //初始化表单
    let initForm = {
        name: '',
        code: '',
    }
    const [form] = Form.useForm<DictType>();
    const [infoForm, setInfoForm] = useState<DictType>({ ...initForm, ...info });
    
    //完成
    const onFinish = () => {
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
                <Form.Item<DictType>
                    label="名称"
                    name="name"
                    rules={typeRules.name}
                    initialValue={infoForm.name}
                >
                    <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item<DictType>
                    label="编码"
                    name="code"
                    rules={typeRules.code}
                    initialValue={infoForm.code}
                >
                    <Input disabled={infoForm.id ? true : false} placeholder="请输入编码" />
                </Form.Item>
            </Form>
        </ShowDrawer>
    )
}

export default TypeInfo