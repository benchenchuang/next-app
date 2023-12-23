import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { getParamsData, requestData, responseData } from "../../base.interface";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let page = Number(getParamsData(searchParams, 'page')) || 1;
        let size = Number(getParamsData(searchParams, 'size')) || 10;
        let title = getParamsData(searchParams, 'title');
        let where: any = {};
        if (title) {
            where.title = title;
        }
        let query = requestData(page, size, where)
        let data = await prisma.goods.findMany({
            ...query,
            orderBy:{
                'rank':'asc'
            }
        });
        let total = await prisma.goods.count({ where })
        return NextResponse.json(responseData(200, '操作成功', { list: data, page, size, total: total }))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    } 
}

export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { title, content } = data;
        if (!title) {
            return NextResponse.json(responseData(0, '标题不能为空'))
        }
        if (!content) {
            return NextResponse.json(responseData(0, '内容不能为空'))
        }
        await prisma.goods.create({ data });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let ids = searchParams.getAll('ids[]');
        if (!ids || ids.length == 0) {
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        await prisma.goods.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        let { id, ...data } = await req.json();
        if (!id) {
            return NextResponse.json(responseData(0, '缺少更新信息Id'))
        }
        delete data.password;
        const res = await prisma.goods.update({
            where: {
                id,
            },
            data
        });
        return NextResponse.json(responseData(200, '操作成功', res))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}