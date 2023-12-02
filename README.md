<!--
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-01 19:15:44
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-01 19:24:44
 * @FilePath: /next-app/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

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
# PM2启动项目
```
npm i pm2 -g
pm2 start npm --name next-app -- start #启动
```

# Prisma使用
```
- 安装prisma                     npm install prisma --save-dev
- 初始化prisma                   npx prisma init --datasource-provider sqlite
- prisma/schema.prisma          进行配置信息（provider\url\model)
- 创建model之后 完成映射    npx prisma db push
- libs/db                       连接数据库
- app/api中使用                  
```
## 实际开发记录

# 1 Day
- api/system/**/route.ts中写增删改查接口
```
 POST       获取参数：let data = await req.json()
 DELETE     获取参数：let id = req.nextUrl.searchParams.get('id');
 PUT        获取参数：let {id,...data} = await req.json();
 GET        获取参数：const { searchParams } = new URL(req.url); let page = getParamsData(searchParams, 'page');
```

# 2 Day
- bcryptjs 进行用户密码加密
```
1、yarn add bcryptjs
2、/app/api/encrypt 中 加密 对比密码方法
```
- midddleware.ts 中间件的使用，主要是登录判断
- jose 登录权限验证
```
1、yarn add jose
2、api/login/route 处理post请求
3、设置cookie中包含token,用于中间件的判断
4、中间件判断token是否过期
```
