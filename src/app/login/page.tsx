'use client'
import { siteConfig } from '@/config/site';
import styles from './login.module.scss';
import { App, Button, Form, FormInstance, Input, Spin } from 'antd';
import { FieldType } from './login.types';
import React, { useState } from 'react';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import { login } from '@/api/login/index';
import { setCache } from '@/libs/session';
import { useRouter } from 'next/navigation';

const Login = () => {
    let router = useRouter();
    let [loading,setLoading] = useState<Boolean>(false);
    const formRef = React.useRef<FormInstance>(null);
    const { message } = App.useApp();
    const onFinish = async (values: any) => {
        try{
            setLoading(true)
            let {username,password} = values;
            let res = await login({username,password})
            let {token,...userInfo} = res.data;
            message.success('登录成功')
            setCache('token',token)
            setCache('userInfo',userInfo)
            router.push('/admin/dashboard')
        }catch(err:any){
            message.error(err.message)
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className={`flex-column ${styles.wrapper}`}>
            <Spin spinning={loading as boolean}>
                <div className={styles.container}>
                    <h2 className={styles.login_head}>{siteConfig.name}</h2>
                    <div className={styles.form}>
                        <Form
                            size='large'
                            ref={formRef}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label=""
                                name="username"
                                rules={[{ required: true, message: '请输入账号!' }]}
                            >
                                <Input placeholder='请输入账号' prefix={<UserOutlined className="site-form-item-icon" />} />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label=""
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password placeholder='请输入密码' prefix={<LockOutlined className="site-form-item-icon" />} />
                            </Form.Item>

                            <Form.Item>
                                <Button className={styles.btn} type="primary" htmlType="submit">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default Login