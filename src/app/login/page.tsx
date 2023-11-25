'use client'
import { siteConfig } from '@/config/site';
import styles from './login.module.scss';
import { Button, Form, FormInstance, Input } from 'antd';
import { FieldType } from './login.types';
import React from 'react';
import { UserOutlined,LockOutlined } from '@ant-design/icons';

const Login = () => {
    const formRef = React.useRef<FormInstance>(null);
    
    const onFinish = (values: any) => {
        let {username,password} = values;
        console.log(username,password)
    };

    return (
        <div className={`flex-column ${styles.wrapper}`}>
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
        </div>
    )
}

export default Login