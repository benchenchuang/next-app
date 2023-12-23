/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-18 15:09:12
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 16:18:01
 * @FilePath: /next-app/src/components/ShowDict/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import { DictData } from '@/app/(admin)/system/dictionary/dict.type';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react'

const ShowDict = (props: { data: DictData[]; value: string; }) => {
    let { data, value } = props;
    let [showItem, setShowItem] = useState<DictData>();
    useEffect(() => {
        if (data && data.length && value) {
            data.map(item => {
                if (item.value == value) {
                    setShowItem(item);
                }
            })
        }
    }, [data,value])

    return (
        <Tag color={showItem?.color}>{showItem?.name}</Tag>
    )
}

export default ShowDict
