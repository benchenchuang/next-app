'use client';
import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    SettingOutlined,
    TeamOutlined,
    ShoppingOutlined,
    GiftOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Spin } from 'antd';
import styles from './side.module.scss';
import { useRouter, usePathname } from 'next/navigation';
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
    getItem('概览', '/dashboard', <DesktopOutlined />),
    getItem('订单管理', '/order', <ShoppingOutlined />),
    getItem('商品管理', '/goods', <GiftOutlined />),
    getItem('会员管理', '/customer', <TeamOutlined />),
    getItem('系统管理', '/system', <SettingOutlined />, [
        getItem('用户管理', '/system/users'),
        getItem('部门管理', '/system/depart'),
        getItem('角色管理', '/system/role'),
        getItem('字典管理', '/system/dictionary'),
        getItem('菜单管理', '/system/menu'),
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
        navigate.push(key)
        setSelectedKeys(key)
    }
    //处理初始化菜单显示
    useEffect(() => {
        let keys = pathname.split('/');
        if (keys.length > 1) {
            keys.pop();
            setOpenKeys([keys.join('/')])
        } else {
            setOpenKeys([pathname])
        }
        setSelectedKeys(pathname)
    }, [])

    return (
        <>
            {
                selectedKeys ? <Menu
                    defaultSelectedKeys={[selectedKeys]}
                    defaultOpenKeys={openKeys}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handleClickMenu}
                /> : (<div className={`flex-column ${styles.spin}`}><Spin></Spin></div>)
            }
        </>
    )
}

export default LayoutSide