/*
* @Author: benchenchuang benchenchuang
* @Date: 2023-11-25 08:06:11
* @LastEditors: benchenchuang benchenchuang
* @LastEditTime: 2023-11-25 22:40:43
* @FilePath: /next-app/src/app/api/system/users/route.ts
* @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
*/
import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { getParamsData, requestData, responseData } from "@/app/api/base.interface";
import { encryption } from '@/app/api/encrypt';
/**
 * 查询列表
 * @param req 
 * @param params
 * @returns 
 */
export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let page = getParamsData(searchParams, 'page');
        let size = getParamsData(searchParams, 'size');
        let name = getParamsData(searchParams, 'name');
        let phone = getParamsData(searchParams, 'phone');
        let where:any = {};
        if(name){
            where.name = name;
        }
        if(phone){
            where.phone = phone;
        }
        let query = requestData(page, Number(size), where)
        console.log(query)
        let data = await prisma.user.findMany({
            ...query
        });
        let total = await prisma.user.count(where)
        return NextResponse.json(responseData(200, '操作成功', { list: data, page, size, total: total }))
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 添加数据
 * @param data 
 */
export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { username='',name = '', phone = '',password='123456' } = data;
        if (!username) {
            return NextResponse.json(responseData(0, '用户名不能为空'))
        }
        if (!name) {
            return NextResponse.json(responseData(0, '姓名不能为空'))
        }
        if (!phone) {
            return NextResponse.json(responseData(0, '手机号不能为空'))
        }
        let encryptPassword = encryption(password);
        data.password = encryptPassword;
        await prisma.user.create({data});
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        let message = '操作失败'
        let target = err.meta?.target || ''
        if(target){
            let labelBox = target.split('_');
            let label = labelBox[1];
            message = `${label} 已存在`
        }
        return NextResponse.json(responseData(0, message))
    }
}
/**
 * 删除信息
 * @param req 
 */
export const DELETE = async(req:NextRequest)=>{
    try{
        let id = req.nextUrl.searchParams.get('id');
        if(!id){
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        const res = await prisma.user.delete({
            where:{
                id
            }
        });
        return NextResponse.json(responseData(200, '操作成功',res))
    }catch(error:any){
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 更新信息
 * @param req 
 */
export const PUT = async(req:NextRequest)=>{
    try{
        let {id,...data} = await req.json();
        if(!id){
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        const res = await prisma.user.update({
            where:{
                id,
            },
            data
        });
        return NextResponse.json(responseData(200, '操作成功',res))
    }catch(error:any){
        return NextResponse.json(responseData(0, '操作失败'))
    }
}