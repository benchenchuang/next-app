import React from 'react'
import { Spin  } from 'antd';

export default function Spinning(props:{text?:string}) {
    return (
        <div className='spinner'>
            <Spin fullscreen >
                <text>{props.text || 'Loading'}</text>
            </Spin>
        </div>
    )
}