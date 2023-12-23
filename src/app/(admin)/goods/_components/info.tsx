import React, { useEffect, useState } from 'react'
import ShowDrawer from '@/components/ShowDrawer'
import { App, Form, Input, InputNumber, Upload } from 'antd';
import { GoodsInfo } from '../goods.type';
import { rules } from './rules';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addInfo, updateInfo } from '@/api/goods';

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'


const Info = (props: any) => {
    let { info } = props;
    //初始化表单
    let initForm = {
        image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        title: '',
        price: 0,
        quantity: 0,
        rank: 0,
        content: ''
    }
    const { message } = App.useApp();
    const [form] = Form.useForm<GoodsInfo>();
    const [loading, setLoading] = useState(false);
    const [infoForm, setInfoForm] = useState<GoodsInfo>({ ...initForm, ...info });
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html, setHtml] = useState('')
    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        info?.content && setHtml(info.content)
    }, [])
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    //提交
    const onFinish = () => {
        form.validateFields().then(async values => {
            try {
                let sendForm = { ...infoForm, ...values,content:html }
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
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <ShowDrawer
            size={800}
            close={() => props.close()}
            submit={() => onFinish()}>
            <Form
                form={form}
                name="info"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item<GoodsInfo>
                    label="图片"
                    name="image"
                    rules={rules.image}
                    initialValue={infoForm.image}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                    >
                        {infoForm.image ? <img src={infoForm.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item<GoodsInfo>
                    label="标题"
                    name="title"
                    rules={rules.title}
                    initialValue={infoForm.title}
                >
                    <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item<GoodsInfo>
                    label="价格"
                    name="price"
                    rules={rules.price}
                    initialValue={infoForm.price}
                >
                    <InputNumber min={0} placeholder="请输入价格" style={{ width: '100%' }} addonAfter="元" />
                </Form.Item>
                <Form.Item<GoodsInfo>
                    label="数量"
                    name="quantity"
                    rules={rules.quantity}
                    initialValue={infoForm.quantity}
                >
                    <InputNumber min={0} placeholder="请输入数量" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<GoodsInfo>
                    label="排序"
                    name="rank"
                    initialValue={infoForm.rank}
                >
                    <InputNumber min={0} placeholder="请输入排序" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<GoodsInfo>
                    label="内容"
                    name="content"
                >
                    <>
                        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                            <Toolbar
                                editor={editor}
                                defaultConfig={toolbarConfig}
                                mode="default"
                                style={{ borderBottom: '1px solid #ccc' }}
                            />
                            <Editor
                                defaultConfig={editorConfig}
                                value={html}
                                onCreated={setEditor}
                                onChange={editor =>{
                                    setHtml(editor.getHtml());
                                }}
                                mode="default"
                                style={{ height: '500px', overflowY: 'hidden' }}
                            />
                        </div>
                    </>
                </Form.Item>
            </Form>
        </ShowDrawer>
    )
}

export default Info