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

/**
 * 查询列表
 * @param req 
 * @param params
 * @returns 
 */
export const GET = async (req: NextRequest) => {
    try {
        let res = await getDeparts('-1');
        return NextResponse.json(responseData(200, '操作成功', { list: res }))
    } catch (err: any) {
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
        let { name = '',code} = data;
        if (!name) {
            return NextResponse.json(responseData(0, '名称不能为空'))
        }
        if (!code) {
            return NextResponse.json(responseData(0, '编码不能为空'))
        }
        let result = await prisma.depart.findMany({
            where: {
                code
            }
        });
        if (result?.length) {
            return NextResponse.json(responseData(0, '编码重复'))
        }
        await prisma.depart.create({data});
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}
/**
 * 删除信息
 * @param req 
 */
export const DELETE = async(req:NextRequest)=>{
    try{
        const { searchParams } = new URL(req.url);
        let ids = searchParams.getAll('ids[]');
        if (!ids || ids.length == 0) {
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        let users = await prisma.user.findMany({
            where:{
                departId:{
                    in: ids
                }
            }
        })
        if(users?.length){
            return NextResponse.json(responseData(0, '存在关联用户，请取消关联重试'))
        }
        await prisma.depart.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        return NextResponse.json(responseData(200, '操作成功'))
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
        let {code} = data;
        if(!id){
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        let codeResult = await prisma.depart.findMany({
            where:{
                code,
                NOT:{
                    id
                }
            }
        });
        if(codeResult?.length){
            return NextResponse.json(responseData(0, '编码重复'))
        }
        delete data.children;
        const res = await prisma.depart.update({
            where:{
                id,
            },
            data
        });
        return NextResponse.json(responseData(200, '操作成功',res))
    }catch(error:any){
        console.log(error)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

/**
 * 使用 递归 的方式，查询 所有
 * @param menuId 
 * @returns 
 */
async function getDeparts(parentId: string, name?: string) {
    let where: any = { parentId };
    if (name) {
        where.name = name
    }
    const node: any = await prisma.depart.findMany({
        where: { ...where }
    });
    if (!node || node.length==0) {
        return null;
    }
    if (node.length) {
        for (const child of node) {
            const childNodes = await getDeparts(child.id, name);
            child.children = childNodes;
        }
    }
    return node;
}