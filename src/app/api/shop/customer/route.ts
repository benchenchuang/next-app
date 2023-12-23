import { NextRequest, NextResponse } from "next/server";
import { getParamsData, requestData, responseData } from "../../base.interface";
import { prisma } from "@/libs/db";
import { encryption } from "../../encrypt";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        let page = Number(getParamsData(searchParams, 'page')) || 1;
        let size = Number(getParamsData(searchParams, 'size')) || 10;
        let name = getParamsData(searchParams, 'name');
        let phone = getParamsData(searchParams, 'phone');
        let where: any = {};
        if (name) {
            where.name = name;
        }
        if (phone) {
            where.phone = phone;
        }
        let query = requestData(page, size, where)
        let data = await prisma.customer.findMany({
            ...query,
            select: {
                id:true,
                name: true,
                phone: true,
                email: true,
                level: true,
                status: true,
                createTime: true
            },
        });
        let total = await prisma.customer.count({ where })
        return NextResponse.json(responseData(200, '操作成功', { list: data, page, size, total: total }))
    } catch (err: any) {
        console.log(err)
        return NextResponse.json(responseData(0, '操作失败'))
    }
}

export const POST = async (req: NextRequest) => {
    try {
        let data = await req.json();
        let { name, phone, password } = data;
        if (!name) {
            return NextResponse.json(responseData(0, '姓名不能为空'))
        }
        if (!phone) {
            return NextResponse.json(responseData(0, '手机号不能为空'))
        }
        if (!password) {
            return NextResponse.json(responseData(0, '密码不能为空'))
        }
        let encryptPassword = encryption(password);
        data.password = encryptPassword;
        await prisma.customer.create({ data });
        return NextResponse.json(responseData(200, '操作成功'))
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
        await prisma.customer.deleteMany({
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
        const res = await prisma.customer.update({
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