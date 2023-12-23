import ShowDrawer from '@/components/ShowDrawer';
import { Form, Input, Select, Spin, TreeSelect, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { IUserInfo } from '../users.type';
import { rules } from './rules';
import { remoteList as remoteRoleList } from '@/api/system/role';
import { remoteList as remoteDepartList } from '@/api/system/depart';
import { addInfo, updateInfo } from '@/api/system/users';

const UserInfo = (props: any) => {
    let { info } = props;
    //初始化表单
    let initForm = {
        name: '',
        username: '',
        phone: '',
        email: '',
        post: '',
        roleId: null,
        departId: undefined
    }
    const [form] = Form.useForm<IUserInfo>();
    const [loading, setLoading] = useState<boolean>(false)
    const [infoForm, setInfoForm] = useState<IUserInfo>({ ...initForm, ...info });
    const [roleList, setRoleList] = useState<roleInfo[]>();
    const [departList, setDepartList] = useState<DepartInfo[]>();

    useEffect(() => {
        getDepartSearch();
        getRoleSearch();
    }, []);

    //部门列表
    const getDepartSearch = async () => {
        try {
            let res = await remoteDepartList({});
            let { list } = res.data;
            setDepartList(list);
        } finally { }
    }
    //角色列表
    const getRoleSearch = async () => {
        setLoading(true)
        try {
            let res = await remoteRoleList({});
            let { list } = res.data;
            setRoleList(list)
        } finally {
            setLoading(false)
        }
    }

    //完成 提交
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
    };

    //选择部门
    const changeDepart = async (e: string) => {
        setInfoForm({ ...infoForm, departId: e });
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
                    <Form.Item<IUserInfo>
                        label="账号"
                        name="username"
                        rules={rules.username}
                        initialValue={infoForm.username}
                    >
                        <Input disabled={infoForm.id ? true : false} placeholder="请输入登录账号" />
                    </Form.Item>
                    <Form.Item<IUserInfo>
                        label="名称"
                        name="name"
                        rules={rules.name}
                        initialValue={infoForm.name}
                    >
                        <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item<IUserInfo>
                        label="手机号"
                        name="phone"
                        rules={rules.phone}
                        initialValue={infoForm.phone}
                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item<IUserInfo>
                        label="角色"
                        name="roleId"
                        rules={rules.roleId}
                        initialValue={infoForm.roleId}
                    >
                        <Select
                            options={roleList}
                            fieldNames={{
                                label: 'name',
                                value: 'id'
                            }}
                        />
                    </Form.Item>
                    <Form.Item<IUserInfo>
                        label="部门"
                        name="departId"
                        rules={rules.departId}
                        initialValue={infoForm.departId}
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={infoForm.departId}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择部门"
                            treeDefaultExpandAll
                            onChange={e => changeDepart(e)}
                            treeData={departList}
                            fieldNames={{
                                label: 'name',
                                value: 'id'
                            }}
                        />
                    </Form.Item>
                    <Form.Item<IUserInfo>
                        label="邮箱"
                        name="email"
                        initialValue={infoForm.email}
                    >
                        <Input placeholder="请输入邮箱" />
                    </Form.Item>
                    <Form.Item<IUserInfo>
                        label="岗位"
                        name="post"
                        initialValue={infoForm.post}
                    >
                        <Input placeholder="请输入岗位" />
                    </Form.Item>
                </Form>
            </Spin>
        </ShowDrawer>
    )
}

export default UserInfo