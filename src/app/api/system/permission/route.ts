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
        let roleId = getParamsData(searchParams, 'roleId');
        let where: any = {};
        if (roleId) {
            where.roleId = roleId;
        }
        let data = await prisma.permission.findMany({
            where,
            include:{
                menu:true
            }
        });
        return NextResponse.json(responseData(200, '操作成功', { list: data }))
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
        let { roleId = '', menuId = '' } = data;
        if (!roleId) {
            return NextResponse.json(responseData(0, '角色不能为空'))
        }
        if (!menuId) {
            return NextResponse.json(responseData(0, '菜单不能为空'))
        }
        await prisma.user.deleteMany({
            where: {
                roleId
            }
        });
        await prisma.permission.create({ data });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}