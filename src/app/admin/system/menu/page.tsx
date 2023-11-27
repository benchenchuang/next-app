'use client'
import { addInfo, remoteList } from '@/api/system/menu';
import React, { useEffect } from 'react'
// const fs = require('fs');

interface IFileItem{
    name:string
    path:string
}

const Menu = () => {
    const viewPath:string = 'src/app/admin'
    const ViewPaths:string[] = [];
    // const getFileList = (dir:string) => {
    //     let files = fs.readdirSync(dir)
    //     files.forEach((item:IFileItem) => {
    //         let filepath = dir + '/' + item
    //         let stat = fs.statSync(filepath)
    //         if (stat.isFile()) {
    //             if(filepath.indexOf('page')>0 ){
    //                 let start = viewPath.length;
    //                 let end = filepath.lastIndexOf('/');
    //                 let path = `views${filepath.substring(start,end)}`;
    //                 ViewPaths.push(path);
    //             }
    //         } else {
    //             getFileList(filepath)
    //         }
    //     })
    // }
    // getFileList(viewPath);
    
    const search = async()=>{
        let res = await remoteList({});
        console.log(res)
    }
    const created = async()=>{
        await addInfo({name:'商品22',desc:'相亲2222'})
    }
    useEffect(()=>{
        // created();
        search();
    },[])

    return (
        <div>Menu</div>
    )
}

export default Menu