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
    }, [])

    return (
        <Tag color={showItem?.color}>{showItem?.name}</Tag>
    )
}

export default ShowDict
