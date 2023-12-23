/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:16:29
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-11-25 08:18:47
 * @FilePath: /next-app/src/app/loading.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
    return (
        <div className='spinner'>
            <Spin fullscreen >
                <text>Loading</text>
            </Spin>
        </div>
    )
}

export default Loading