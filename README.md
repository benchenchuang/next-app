
## 基本记录

# 整体框架
- app           管理平台页面集合
  - views/layout 布局属于views下面所有页面的共有布局
- components    组件集合
- ui            所有app中用到的组件，目的是为了减少自动生成的页面
- layout        布局属于views下布局的样式与组件
- libs          公共的处理方法集合
- styles        样式文件夹，公共的样式文件存放
- theme         样式主题 主要是针对antd的

# 404.tsx
```
 yarn build + yarn start才可看到效果
 调试时使用/404路由
```
# 使用antd
```
    - yarn add antd
    - 一定要在app文件夹下使用
```
# sass使用
```
   - npm install sass
   - next.config.js
    const path = require('path')

    module.exports = {
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
    } 
```

# mongodb使用流程
```
- utils/db        mongoose.connect
- utils/models    mongoose.Schema
- utils/data      数据请求处理
```

# ahooks
```
- yarn add ahooks
- useAntdTable
- useDebounceFn
```
