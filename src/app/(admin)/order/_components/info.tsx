import ShowDrawer from '@/components/ShowDrawer'
import { App, Form,Image, Input, InputNumber, Select } from 'antd'
import React, { useState } from 'react'
import { OrderInfo } from '../order.type'
import { rules } from './rules'
import { addInfo, updateInfo } from '@/api/order'

const Info = (props: any) => {
    let { info,orderStatus } = props;
    //初始化表单
    let initForm = {
        status:0
    }
    const { message } = App.useApp();
    const [form] = Form.useForm<OrderInfo>();
    const [loading, setLoading] = useState(false);
    const [infoForm, setInfoForm] = useState<OrderInfo>({ ...initForm, ...info });

    const onFinish = () => {
        form.validateFields().then(async values => {
            try {
                let sendForm = { ...infoForm, ...values}
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
            isSubmit={infoForm.status==0}
            submit={() => onFinish()}>
            <Form
                form={form}
                name="info"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                disabled={infoForm.status!=0}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item<OrderInfo>
                    label="图片"
                >
                    <Image width={160} alt='图片' src={infoForm.product.image} />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="标题"
                    initialValue={infoForm.product.title}
                >
                    <Input disabled placeholder="请输入标题" />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="购买价格"
                    name="price"
                    rules={rules.price}
                    initialValue={infoForm.price}
                >
                    <InputNumber style={{width:'100%'}} placeholder="购买价格" min={0} />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="购买数量"
                    name="quantity"
                    rules={rules.quantity}
                    initialValue={infoForm.quantity}
                >
                    <InputNumber style={{width:'100%'}} placeholder="购买数量" min={1} />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="购买总价"
                    name="total"
                    rules={rules.total}
                    initialValue={infoForm.total}
                >
                    <InputNumber style={{width:'100%'}} placeholder="购买总价" min={0} />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="购买用户"
                    initialValue={infoForm.customer.name}
                >
                    <Input placeholder="购买用户" />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="电话"
                    name="phone"
                    rules={rules.phone}
                    initialValue={infoForm.phone}
                >
                    <Input placeholder="电话" />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="地址"
                    name="address"
                    rules={rules.address}
                    initialValue={infoForm.address}
                >
                    <Input placeholder="地址" />
                </Form.Item>
                <Form.Item<OrderInfo>
                    label="状态"
                    name="status"
                    rules={rules.status}
                    initialValue={infoForm.status+''}
                >
                    <Select
                        options={orderStatus}
                        fieldNames={{
                            label: 'name',
                            value: 'value'
                        }}
                    />
                </Form.Item>
            </Form>
        </ShowDrawer>
    )
}

export default Info