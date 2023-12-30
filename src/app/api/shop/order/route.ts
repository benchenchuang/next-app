import { prisma } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import { getParamsData, requestData, responseData } from "../../base.interface";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let page = Number(getParamsData(searchParams, 'page')) || 1;
        let size = Number(getParamsData(searchParams, 'size')) || 10;
        let title = getParamsData(searchParams, 'title');
        let status = getParamsData(searchParams, 'status');
        let name = getParamsData(searchParams, 'name');
        let where: any = {};
        if (title) {
            where.product = {
                is:{
                    title:{
                        contains:title
                    }
                }
            };
        }
        if (status || status === 0) {
            where.status = Number(status);
        }
        if (name) {
            where.customer = {
                is:{
                    name:{
                        contains:name
                    }
                }
            }
        }
        let query = requestData(page, size, where)
        let data = await prisma.order.findMany({
            ...query,
            include:{
                customer:{
                    select:{
                        name:true,
                        phone:true,
                        level:true,
                        status:true,
                        email:true
                    }
                },
                product:{
                    select:{
                        image:true,
                        title:true,
                        price:true,
                        content:true
                    }
                }
            }
        });
        let total = await prisma.order.count({ where })
        return NextResponse.json(responseData(200, '操作成功', { list: data, page, size, total: total }))
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { productId, address, phone, quantity } = data;
        if (!productId) {
            return NextResponse.json(responseData(0, '商品不能为空'))
        }
        if (quantity == 0) {
            return NextResponse.json(responseData(0, '数量不能为空'))
        }
        if (!address) {
            return NextResponse.json(responseData(0, '地址不能为空'))
        }
        if (!phone) {
            return NextResponse.json(responseData(0, '电话不能为空'))
        }
        data.total = data.price * data.quantity;
        await prisma.order.create({ data });
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
        delete data.customer;
        delete data.product;
        data.status = Number(data.status);
        const res = await prisma.order.update({
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

export const DELETE = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let ids = searchParams.getAll('ids[]');
        if (!ids || ids.length == 0) {
            return NextResponse.json(responseData(0, '缺少删除信息Id'))
        }
        //改状态 已删除 9
        await prisma.order.updateMany({
            where: {
                id: {
                    in: ids
                },
            },
            data: {
                status: 9
            }
        });
        return NextResponse.json(responseData(200, '操作成功'))
    } catch (err: any) {
        return NextResponse.json(responseData(0, '操作失败'))
    }
}
