'use client';
import React, { useState } from 'react'
import styles from './header.module.scss'
import {FullscreenOutlined,FullscreenExitOutlined,PoweroffOutlined,ExclamationCircleOutlined,CaretDownOutlined} from '@ant-design/icons'
import screenfull from 'screenfull';
import { App } from 'antd';
import { useRouter } from 'next/navigation'

const LayoutHeader = () => {
    const router = useRouter();
    const { message, modal } = App.useApp();
    const [isFull,setFull] = useState<boolean>(false);
    //切换全屏
    const switchScreenFull = ()=>{
        let full = !isFull;
        setFull(full);
        screenfull.toggle();
    }
    //退出登录
    const logOut = ()=>{
        modal.confirm({
            title: '操作提示',
            icon: <ExclamationCircleOutlined />,
            content: '确认退出登录？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                router.push('/login')
            },
        })
    }

    return (
        <div className={`flex-row ${styles.header_box}`}>
            <div className={`flex-row ${styles.logo_box}`}>
                <img src="/next.svg" alt="Vercel Logo" className={styles.logo} />
            </div>
            <span className={styles.welcome}>Admin 欢迎您</span>
            <div className={`flex-row ${styles.nav_box}`}></div>
            <div className={`flex-row ${styles.nav_side}`}>
                <div className={styles.control_item} onClick={switchScreenFull}>
                    {
                        isFull?<FullscreenExitOutlined />:<FullscreenOutlined />
                    }
                </div>
                <div className={styles.control_item} onClick={logOut}>
                    <PoweroffOutlined />
                </div>
                <div className={`flex-row ${styles.control_item}`}>
                    <img className={styles.avatar} alt='amin' src='/avatar.jpg'/>
                    <CaretDownOutlined className={styles.down} />
                </div>
            </div>
        </div>
    )
}

export default LayoutHeader