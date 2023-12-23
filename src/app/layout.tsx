import React from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/components/AntdRegistry';
import '@/styles/reset.css'
import '@/styles/global.scss'

import { ConfigProvider, App } from 'antd';
import theme from '@/theme/config';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import zhCN from 'antd/locale/zh_CN';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `${siteConfig.name}`
    },
    description: siteConfig.description,
    icons: [
        {
            url: '/vercel.svg',
            href: '/vercel.svg'
        }
    ],
    authors:{
        name:'chenchuang'
    },
    keywords:'nextjs, react, blog'
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body className={inter.className}>
            <StyledComponentsRegistry>
                <ConfigProvider theme={theme} locale={zhCN}>
                    <App>
                        {children}
                    </App>
                </ConfigProvider>
            </StyledComponentsRegistry>
        </body>
    </html>
);

export default RootLayout;
