import { Form, Input, Spin, Switch, Tree, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { rules } from './rules';
import ShowDrawer from '@/components/ShowDrawer';
import { addInfo, updateInfo } from '@/api/system/role';
import { remoteList } from '@/api/system/menu';
import { MenuType } from '../../menu/menu.type';
import { remoteList as remotePermissionList } from '@/api/system/permission'
import { deepClone } from '@/libs/utils';

const Info = (props: any) => {
    const { info } = props;
    const fieldNames = {
        children: 'children',
        title: 'name',
        key: 'id'
    }
    //初始化表单
    let initForm = {
        name: '',
        code: '',
        status: 1,
        permission: []
    }
    const [form] = Form.useForm<roleInfo>();
    const [infoForm, setInfoForm] = useState<roleInfo>({ ...initForm, ...info });
    const [menus, setMenus] = useState<MenuType[]>([])
    const [checkedIds, setCheckedIds] = useState<string[]>([])
    const [checkedBox, setCheckedList] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        getAllMenus();
    }, []);
    //获取菜单
    const getAllMenus = async () => {
        setLoading(true)
        try {
            let res = await remoteList({});
            let { list } = res.data;
            setMenus(list)
            if (info.id) {
                let permissionResult = await remotePermissionList({ roleId: info.id });
                let perList = permissionResult.data.list;
                let ids: string[] = [];
                if (perList?.length) {
                    perList.map((item: any) => {
                        ids.push(item.menuId)
                    })
                }
                let result = dealRoutes(ids, list);
                setCheckedIds(result);
                // let halfIds = ids.filter(id => !result.includes(id));
                setCheckedList(perList)
            }
        } finally {
            setLoading(false)
        }
    }
    //处理父层级 选中 子层级为全选
    const dealRoutes = (routes: Array<any>, treeData: Array<any>) => {
        if (!treeData.length) return [];
        dealMenuChecked(treeData, routes)
        let res = dealChecked(treeData, routes)
        return res
    }
    const dealMenuChecked = (treeData: Array<any>, routes: Array<any>) => {
        if (treeData?.length) {
            treeData.map((item: any) => {
                item.childNum = 0;
                if (item.children?.length) {
                    item.children.map((child: { id: any; }) => {
                        if (routes.indexOf(child.id) != -1) {
                            item.childNum += 1
                        }
                    })
                    item.children = dealMenuChecked(item.children, routes)
                } else {
                    if (routes.indexOf(item.path) != -1) {
                        item.childNum += 1
                    }
                }
            })
        }
        return treeData;
    }
    const dealChecked = (treeData: any[], menus: any[]) => {
        let menusArray = deepClone(menus);
        if (treeData?.length) {
            treeData.map(item => {
                if (item.children?.length) {
                    if (item.childNum != 0 && item.childNum < item.children.length) {
                        menusArray = menusArray.filter((route: any) => route != item.id)
                        menusArray = dealChecked(item.children, menusArray)
                    }
                }
            })
        }
        return menusArray
    }
    //提交
    const onFinish = () => {
        form.validateFields().then(async values => {
            try {
                let sendForm = { ...infoForm, ...values }
                let { status } = sendForm;
                sendForm.status = status ? 1 : 0
                sendForm.permission = [...checkedBox];
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
    //选中菜单
    const onCheckSelect = (keys: any, e: any) => {
        let { checkedNodes, halfCheckedKeys } = e;
        let allkeys = [...keys]
        setCheckedIds(allkeys);
        let checkedList: any[] = [];
        checkedNodes.map((item: MenuType) => {
            checkedList.push({
                menuId: item.id,
                parentId: item.parentId,
                orderNum: item.orderNum
            })
        })
        let halfList: any[] = []
        if (halfCheckedKeys?.length) {
            halfCheckedKeys.filter((key: string) => {
                let item: any = menus.filter((menu: MenuType) => menu.id == key);
                halfList.push({
                    menuId: item[0].id,
                    parentId: item[0].parentId,
                    orderNum: item[0].orderNum
                })
            })
        }
        setCheckedList([...checkedList, ...halfList])
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
                <Form.Item<roleInfo>
                    label="角色名称"
                    name="name"
                    rules={rules.name}
                    initialValue={infoForm.name}
                >
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item<roleInfo>
                    label="角色编码"
                    name="code"
                    rules={rules.code}
                    initialValue={infoForm.code}
                >
                    <Input disabled={infoForm.id ? true : false} placeholder="请输入角色编码" />
                </Form.Item>
                <Form.Item<roleInfo>
                    label="状态"
                    name="status"
                    rules={rules.status}
                    valuePropName='status'
                    initialValue={infoForm.status}
                >
                    <Switch defaultChecked={infoForm.status == 1 ? true : false} checkedChildren="开启" unCheckedChildren="关闭" />
                </Form.Item>
                <Form.Item<roleInfo>
                    label="角色权限"
                >
                    <Spin spinning={loading}>
                        <Tree
                            checkable
                            defaultExpandAll={false}
                            fieldNames={fieldNames}
                            treeData={menus}
                            defaultExpandParent
                            checkedKeys={checkedIds}
                            onCheck={(selectedKeys, e) => onCheckSelect(selectedKeys, e)}
                        />
                    </Spin>
                </Form.Item>
            </Form>
        </ShowDrawer>
    )
}

export default Info