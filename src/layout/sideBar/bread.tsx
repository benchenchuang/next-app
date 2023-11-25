import { Breadcrumb } from 'antd'
import React from 'react'
import styles from './side.module.scss'

const BreadCrumb = () => {

    const crubList = [
        {
            title: 'Home',
        },
        {
            title: <a href="">Application Center</a>,
        },
        {
            title: <a href="">Application List</a>,
        },
        {
            title: 'An Application',
        },
    ]
    return (
        <div className={styles.bread_crumb}>
            <Breadcrumb
                className='layout-bread-crumb'
                separator=">"
                items={crubList}
            />
        </div>
    )
}

export default BreadCrumb