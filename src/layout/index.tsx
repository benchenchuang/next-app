/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-19 22:19:19
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-11-19 22:27:04
 * @FilePath: /next-app/src/app/views/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense,ReactNode } from 'react'
import styles from './layout.module.scss'
import Spinning from '@/components/Spinning'
import LayoutHeader from './header'
import LayoutSide from './sideBar'
import BreadCrumb from './sideBar/bread'

export default function MainLayout({ children }: { children: ReactNode}) {
    return (
        <>
            <Suspense fallback={<Spinning/>}>
                <div className={`flex-column ${styles.body}`}>
                    <div className={styles.header}>
                        <LayoutHeader />
                    </div>
                    <div className={`flex-row ${styles.main}`}>
                        <div className={styles.side}>
                            <LayoutSide />
                        </div>
                        <div className={`flex-column ${styles.content}`}>
                            {/* <BreadCrumb /> */}
                            <div className={styles.wrapper}>
                                {children}
                            </div>
                            <p className={styles.footer}>2023 @小红书</p>
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    )
}