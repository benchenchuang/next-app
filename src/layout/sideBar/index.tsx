'use client';
import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    SettingOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './side.module.scss';
import { useRouter,usePathname } from 'next/navigation';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('概览', 'dashboard', <DesktopOutlined />),
    getItem('系统管理', 'system', <SettingOutlined />, [
        getItem('用户管理', 'system/users'),
        getItem('部门管理', 'system/depart'),
        getItem('字典管理', 'system/dictionary'),
    ])
];

const LayoutSide = () => {
    let navigate = useRouter();
    let pathname = usePathname();

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string>('');
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    //点击菜单
    const handleClickMenu = (e: any) => {
        let { key } = e;
        navigate.push('/admin/'+key)
        setSelectedKeys(key)
    }
    //处理初始化菜单显示
    useEffect(()=>{
        let key = pathname.replace('/admin/','');
        let keys = key.split('/');
        if(keys.length>1){
            keys.pop()
            setOpenKeys(keys)
        }else{
            setOpenKeys([key])
        }
        setSelectedKeys(key)
    },[])

    return (
        <>
            {
                selectedKeys && <Menu
                    defaultSelectedKeys={[selectedKeys]}
                    defaultOpenKeys={openKeys}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handleClickMenu}
                />
            }
        </>
    )
}

export default LayoutSide