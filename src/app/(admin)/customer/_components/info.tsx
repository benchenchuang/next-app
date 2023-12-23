import React, { useState } from 'react'
import ShowDrawer from '@/components/ShowDrawer'
import { Form, Input, Select, Switch, message } from 'antd'
import { CustomerInfo } from '../customer.type'
import { rules } from './rules'
import { addInfo, updateInfo } from '@/api/customer'
import { useDictionary } from '@/hooks/dictionary'

const Info = (props: any) => {
    let { info,level:levelList } = props;
    //初始化表单
    let initForm = {
        name: '',
        phone: '',
        email: '',
        level: 1,
        status: 1
    }
    const [form] = Form.useForm<CustomerInfo>();
    const [infoForm, setInfoForm] = useState<CustomerInfo>({ ...initForm, ...info });
    //提交
    const onFinish = () => {
        form.validateFields().then(async values => {
            try {
                let sendForm = { ...infoForm, ...values }
                if (sendForm.id) {
                    await updateInfo(sendForm);
                } else {
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
                <Form.Item<CustomerInfo>
                    label="姓名"
                    name="name"
                    rules={rules.name}
                    initialValue={infoForm.name}
                >
                    <Input placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item<CustomerInfo>
                    label="手机号"
                    name="phone"
                    rules={rules.phone}
                    initialValue={infoForm.phone}
                >
                    <Input placeholder="请输入手机号" />
                </Form.Item>
                <Form.Item<CustomerInfo>
                    label="邮箱"
                    name="email"
                    initialValue={infoForm.email}
                >
                    <Input placeholder="请输入邮箱号" />
                </Form.Item>
                <Form.Item<CustomerInfo>
                    label="等级"
                    name="level"
                    initialValue={infoForm.level+''}
                >
                    <Select
                        options={levelList}
                        fieldNames={{
                            label: 'name',
                            value: 'value'
                        }}
                    />
                </Form.Item>
                <Form.Item<CustomerInfo>
                    label="状态"
                    name="status"
                    initialValue={infoForm.status}
                    valuePropName='checked'
                >
                    <Switch defaultChecked={infoForm.status == 1 ? true : false} checkedChildren="开启" unCheckedChildren="关闭" />
                </Form.Item>
            </Form>
        </ShowDrawer>
    )
}

export default Info