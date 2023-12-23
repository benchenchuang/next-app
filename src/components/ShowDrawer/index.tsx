import React from "react";
import { Button, Drawer, Space } from "antd";
import './index.scss'
import { CloseOutlined } from '@ant-design/icons';

const ShowDrawer = (props: any) => {
    let { children, title = '基本信息', size = 540, isShow = true,cancelText='取消',submitText='确定',isSubmit = true,footerComponent } = props;

    const onClose = () => {
        props.close();
    }

    const onSubmit = () => {
        props.submit()
    }
    return (
        <Drawer
            title={title}
            placement="right"
            width={size}
            onClose={onClose}
            closable={false}
            open={isShow}
            maskClosable={false}
            extra={
                <Space>
                    <Button type="text" onClick={onClose}><CloseOutlined /></Button>
                </Space>
            }
            footer={ 
                footerComponent?footerComponent:(
                    <Space className="control_footer">
                        <Button type="primary" ghost onClick={onClose}>{cancelText}</Button>
                        {
                            isSubmit && <Button type="primary" onClick={onSubmit}>{submitText}</Button>
                        }
                    </Space>
                )
            }
        >
            {children}
        </Drawer>
    );
};

export default ShowDrawer;
