'use client';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Modal, Spin, Tree, message } from 'antd';
import styles from './style.module.scss'
import './style.scss'
import UserList from '../users/page'
import ShowInfo from './_components/info'
import { deleteInfo, remoteList } from '@/api/system/depart';
import { DeleteOutlined, ExclamationCircleFilled, FormOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Depart = () => {
    const fieldNames = {
        title:'name',
        key:'id',
    }
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [loading,setLoading] = useState<boolean>(false);
    const [showModal,setShowModal] = useState<boolean>(false);
    // 加载
    const [list, setList] = useState<Array<any>>([]);
    const [currentId, setCurrentId] = useState<React.Key[]>();
    const [eidtInfo, setEditInfo] = useState<DepartInfo | object>();


    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };
    useEffect(()=>{
        search();
    },[])
    //搜索
    const search = async()=>{
        try {
            setEditInfo({});
            setLoading(true);
            let res = await remoteList({});
            let { list } = res.data;
            setList(list);
        } finally {
            setLoading(false)
        }
    }
    //选中项目
    const selectTreeItem = (id:React.Key[])=>{
        setCurrentId(id)
    }
    //添加 编辑信息
    const showItem = (item?:DepartInfo)=>{
        setEditInfo(item);
        setShowModal(true);
    }
    //删除信息
    const deleteItem = (item:DepartInfo)=>{
        let { id, name } = item;
        confirm({
            title: '操作提示',
            icon: <ExclamationCircleFilled />,
            content: `确定要删除 ${name} 部门?`,
            cancelText: '取消',
            okText: '确定',
            onOk: async () => {
                try {
                    await deleteInfo({ ids: [id] });
                    message.success('操作成功')
                    search()
                } catch (err) {
                    message.error('操作失败')
                }
            }
        });
    }

    //重写tree title
    const createTreeTitle = (data:any)=>{
        return (
            <div className={`flex-row ${styles.tree_title_box}`}>
                <span className={`flex-item ${styles.tree_title}`}>{data.name}</span>
                <span className='dept_edit'><FormOutlined onClick={()=>showItem(data)}/></span>
                <span className='dept_del'><DeleteOutlined onClick={()=>deleteItem(data)} /></span>
            </div>
        )
    }

    return (
        <div className={`flex-row ${styles.wrapper}`}>
            <Card
                title="部门列表"
                className={styles.sideBox}
                extra={<Button type='primary' onClick={() => setShowModal(true)}>添加部门</Button>}
                style={{ margin: '10px' }}>
                    <Spin spinning={loading}>
                        <Tree
                            onExpand={onExpand}
                            fieldNames={fieldNames}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            treeData={list}
                            onSelect={e=>selectTreeItem(e)}
                            titleRender={nodeData=>createTreeTitle(nodeData)}
                        />
                    </Spin>
            </Card>
            <Card
                title="用户列表"
                className={styles.mainBox}
                style={{ margin: '10px' }}>
                <UserList departId={currentId?.[0]} isShowSearch={false} />
            </Card>
            {
                showModal && <ShowInfo info={eidtInfo} list={list} submit={() => { setShowModal(false); search(); }} close={() => setShowModal(false)} />
            }
        </div>
    )
}

export default Depart

