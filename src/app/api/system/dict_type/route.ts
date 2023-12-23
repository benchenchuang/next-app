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
        const { searchParams } = new URL(req.url);
        let page = Number(getParamsData(searchParams, 'page'));
        let size = Number(getParamsData(searchParams, 'size'));
        let name = getParamsData(searchParams, 'name');
        let where:any = {};
        if(name){
            where.name = name;
        }
        let query = requestData(page,size, where)
        let data = await prisma.dictType.findMany({
            ...query
        });
        let total = await prisma.dictType.count({
            where
        })
        return NextResponse.json(responseData(200, '操作成功', { list: data, page, size, total: total }))
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
        if(!code){
            return NextResponse.json(responseData(0, '编码不能为空'))
        }
        let result = await prisma.dictType.findMany({
            where:{
                name
            }
        });
        if(result?.length){
            return NextResponse.json(responseData(0, '名称重复'))
        }
        let codeResult = await prisma.dictType.findMany({
            where:{
                code
            }
        });
        if(codeResult?.length){
            return NextResponse.json(responseData(0, '编码重复'))
        }
        await prisma.dictType.create({data});
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        let message ='';
        if(err.meta.target){
            message = '数据重复'
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
        const { searchParams } = new URL(req.url);
        let ids = searchParams.getAll('ids[]');
        if (!ids || ids.length == 0) {
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        await prisma.dictType.deleteMany({
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
        let {name,code} = data;
        if(!id){
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        if(!name){
            return NextResponse.json(responseData(0, '缺少更新信息名称'))
        }
        if(!code){
            return NextResponse.json(responseData(0, '缺少更新信息编码'))
        }
        let result = await prisma.dictType.findMany({
            where:{
                name,
                NOT:{
                    id
                }
            }
        });
        if(result?.length){
            return NextResponse.json(responseData(0, '名称重复'))
        }
        let codeResult = await prisma.dictType.findMany({
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
        const res = await prisma.dictType.update({
            where:{
                id
            },
            data
        });
        return NextResponse.json(responseData(200, '操作成功',res))
    }catch(error:any){
        return NextResponse.json(responseData(0, '操作失败'))
    }
}