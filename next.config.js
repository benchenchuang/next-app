/** @type {import('next').NextConfig} */
const { SERVER_ENV } = process.env
const path = require('path')

const nextConfig = {
  // experimental: {
  //     // appDir: true, //使用启用app目录
  //     urlImports: [], // 可使用三方地址，在引用css、img等位置需要配置
  // },
  reactStrictMode: true, //是否使用严格模式
  publicRuntimeConfig: {}, // 导入全局配置，服务端和客户端都可以访问
  poweredByHeader: SERVER_ENV !== 'production', // 是否在head中增加Nextjs信息
  images: {
    unoptimized: true
  },
  swcMinify: true, //使用swc压缩
  compress: true, // 是否压缩
  assetPrefix: '/', //静态资源引用的前缀，默认不需要处理。CDN优化需要修改。
  distDir: 'build',
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "~@styles/variables.scss";`
  }
  //路由重定向
  // async redirects() {
  //     return [
  //         {
  //             source: '/',
  //             destination: '/views/dashboard',
  //             permanent: true,
  //         },
  //         {
  //             source: '/views',
  //             destination: '/views/dashboard',
  //             permanent: true,
  //         },
  //     ]
  // },
}

module.exports =  nextConfig
