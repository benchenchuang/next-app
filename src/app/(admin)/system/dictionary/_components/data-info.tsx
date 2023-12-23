import React, { useState } from 'react'
import ShowDrawer from '@/components/ShowDrawer';
import { ColorPicker, Form, Input, message } from 'antd';
import { dataRules } from './rules';
import { DictData, DictType } from '../dict.type';
import { addInfo, updateInfo } from '@/api/system/dict-data';
import { ColorPickerProps } from 'antd/lib/color-picker';

const TypeInfo = (props: any) => {
    let { info, parent } = props;
    //初始化表单
    let initForm = {
        dictType: parent.code,
        name: '',
        code: '',
        value: '',
        color: ''
    }
    const [form] = Form.useForm<DictData>();
    const [infoForm, setInfoForm] = useState<DictData>({ ...initForm, ...info });
    const [color, setColor] = useState<string | undefined>(infoForm.color);

    //完成
    const onFinish = () => {
        form.validateFields().then(async values => {
            try {
                let sendForm: DictData = { ...infoForm, ...values, color }
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
                <Form.Item<DictData>
                    label="名称"
                    name="name"
                    rules={dataRules.name}
                    initialValue={infoForm.name}
                >
                    <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item<DictData>
                    label="编码/标签"
                    name="code"
                    rules={dataRules.code}
                    initialValue={infoForm.code}
                >
                    <Input placeholder="请输入编码/标签" />
                </Form.Item>
                <Form.Item<DictData>
                    label="字典值"
                    name="value"
                    rules={dataRules.value}
                    initialValue={infoForm.value}
                >
                    <Input placeholder="请输入字典值" />
                </Form.Item>
                <Form.Item
                    label="颜色"
                    name="color"
                    initialValue={infoForm.color}
                >
                    <ColorPicker
                        onChangeComplete={(color: any) => {
                            setColor(color.toHexString());
                        }} />
                </Form.Item>
            </Form>
        </ShowDrawer>
    )
}

export default TypeInfo