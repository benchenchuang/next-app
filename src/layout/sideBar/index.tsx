'use client';
import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';
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
    let navigate = useRouter()
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState('1');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleClickMenu = (e: any) => {
        let { key } = e;
        navigate.push('/admin/'+key)
        setSelectedKeys(key)
    }

    return (
        <>
            <Menu
                defaultSelectedKeys={[selectedKeys]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                onClick={handleClickMenu}
            />
        </>
    )
}

export default LayoutSide