'use client';
import React, { createRef, useEffect, useState } from 'react'
import { Button, Card, Modal, Spin, message } from 'antd'
import styles from './style.module.scss'
import { deleteInfo, remoteList } from '@/api/system/role';
import ShowInfo from './_components/info';
import { FormOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import UserList from '../users/page'

const { confirm } = Modal;

const Role = () => {
    // 角色弹出控制
    const [showModal, setShowModal] = useState<boolean>(false);
    // 加载
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<Array<roleInfo>>([]);
    const [currentItem, setCurrentItem] = useState<roleInfo>();
    const [eidtInfo, setEditInfo] = useState<roleInfo | object>();

    useEffect(() => {
        search();
    }, []);

    //获取角色列表
    const search = async () => {
        try {
            setLoading(true);
            let res = await remoteList({});
            let { list } = res.data;
            setList(list);
        } finally {
            setLoading(false)
        }
    }
    //选择角色
    const selectedItem = (item: roleInfo) => {
        setCurrentItem(item)
    }
    //编辑信息
    const showInfo = (info: roleInfo | object) => {
        setEditInfo(info)
        setShowModal(true)
    }
    //删除
    const remove = (info: roleInfo) => {
        let { id, name } = info;
        confirm({
            title: '操作提示',
            icon: <ExclamationCircleFilled />,
            content: `确定要删除 ${name} 角色?`,
            cancelText: '取消',
            okText: '确定',
            onOk: async () => {
                try {
                    await deleteInfo({ ids: [id] });
                    message.success('操作成功')
                    search()
                } catch (err) {
                    // message.error('操作失败')
                }
            }
        });
    }

    return (
        <div className={`flex-row ${styles.wrapper}`}>
            <Card
                title="角色列表"
                className={styles.sideBox}
                extra={<Button type='primary' onClick={() => setShowModal(true)}>添加角色</Button>}
                style={{ margin: '10px' }}>
                <Spin spinning={loading}>
                    <div className={styles.role_box}>
                        {
                            !loading && list.map((role: roleInfo) => {
                                return role.name && (
                                    <div className={`${styles.role_item} flex-row ${currentItem?.id == role.id && styles.active}`} key={role.id}>
                                        <span className={styles.role_name} onClick={() => selectedItem(role)}>{role.name}</span>
                                        <Button className={styles.icon} size='middle' type='link' onClick={() => showInfo(role)}><FormOutlined /></Button>
                                        <Button className={styles.icon} size='middle' type='text' onClick={() => remove(role)} danger><DeleteOutlined /></Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Spin>
            </Card>
            <Card
                title="用户列表"
                className={styles.mainBox}
                style={{ margin: '10px' }}>
                <UserList roleId={currentItem?.id} isShowSearch={false}/>
            </Card>
            {
                showModal && <ShowInfo info={eidtInfo} submit={() => { setShowModal(false); search(); }} close={() => setShowModal(false)} />
            }
        </div>
    )
}

export default Role