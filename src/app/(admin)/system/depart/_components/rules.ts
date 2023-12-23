export const rules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 2, max: 8, message: '名称长度2-8位', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入编码', trigger: 'blur' }
    ],
}