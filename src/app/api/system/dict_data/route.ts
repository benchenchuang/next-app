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
        let page = Number(getParamsData(searchParams, 'page')) || 1;
        let size = Number(getParamsData(searchParams, 'size')) || 10;
        let dictType = getParamsData(searchParams, 'dictType');
        let where:any = {};
        if(dictType){
            where.dictType = dictType;
        }
        let query = requestData(page, Number(size), where)
        let data = await prisma.dictData.findMany({
            ...query
        });
        let total = await prisma.dictData.count({
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
        let { name = '',code='',value='',dictType} = data;
        if (!dictType) {
            return NextResponse.json(responseData(0, '父级不能为空'))
        }
        if (!name) {
            return NextResponse.json(responseData(0, '名称不能为空'))
        }
        if (!code) {
            return NextResponse.json(responseData(0, '编码不能为空'))
        }
        if (!value) {
            return NextResponse.json(responseData(0, '值不能为空'))
        }
        let res = await prisma.dictData.findMany({
            where:{
                dictType:dictType
            }
        });
        if(res?.length){
            for(let i =0;i<res.length;i++){
                let item = res[i];
                if(item.name==name){
                    return NextResponse.json(responseData(0, '名称重复'))
                }
                if(item.code==code){
                    return NextResponse.json(responseData(0, '编码重复'))
                }
                if(item.value==value){
                    return NextResponse.json(responseData(0, '字典值重复'))
                }
            }
        }
        await prisma.dictData.create({data});
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
        await prisma.dictData.deleteMany({
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
        let {name,code,value,dictType} = data;
        if(!id){
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        if(!name){
            return NextResponse.json(responseData(0, '缺少更新信息名称'))
        }
        if(!code){
            return NextResponse.json(responseData(0, '缺少更新信息编码'))
        }
        if(!value){
            return NextResponse.json(responseData(0, '缺少更新信息值'))
        }

        let dictResult = await prisma.dictData.findMany({
            where:{
                dictType:dictType,
                NOT:{
                    id
                }
            }
        });
        if(dictResult?.length){
            for(let i =0;i<dictResult.length;i++){
                let item = dictResult[i];
                if(item.name==name){
                    return NextResponse.json(responseData(0, '名称重复'))
                }
                if(item.code==code){
                    return NextResponse.json(responseData(0, '编码重复'))
                }
                if(item.value==value){
                    return NextResponse.json(responseData(0, '字典值重复'))
                }
            }
        }
        const res = await prisma.dictData.update({
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