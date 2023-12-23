export const rules = {
    name: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
        { min: 2, max: 6, message: '用户名长度2-6位', trigger: 'blur' }
    ],
    parentId: [
        { required: true, message: '请选择父级', trigger: 'change' }
    ],
    type: [
        {
            required: true,
            message: '请选择菜单类型',
            trigger: 'change'
        }
    ],
    path: [
        {
            required: true,
            message: '请输入路径',
            trigger: 'blur'
        }
    ]
}